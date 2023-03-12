<template>
  <el-form
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
    v-bind="$attrs"
    ref="form"
  >
    <template v-for="(item, index) in options" :key="index">
      <el-form-item
        v-if="!item.children || !item.children.length"
        :label="item.label"
        :prop="item.prop"
      >
        <!-- 内部元素的渲染需要通过每个表单配置项的type拼接 -->
        <component
          v-if="item.type !== 'upload'"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
          :placeholder="item.placeholder"
          v-bind="item.attrs"
        ></component>

        <!-- 文件上传组件单独处理 -->
        <el-upload
          v-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
          :on-exceed="onExceed"
        >
          <!-- 上传组件的插槽 -->
          <slot name="uploadArea"></slot>
          <template #tip>
            <slot name="uploadTip"></slot>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item v-else :label="item.label" :prop="item.prop">
        <component
          :is="`el-${item.type}`"
          :key="index"
          :placeholder="item.placeholder"
          v-model="model[item.prop!]"
          v-bind="item.attrs"
        >
          <component
            :is="`el-${child.type}`"
            v-for="(child, index) in item.children"
            :key="index"
            :label="child.label"
            :value="child.value"
            v-bind="child.attrs"
          ></component>
        </component>
      </el-form-item>
    </template>

    <!-- 表单操作的插槽，form是表单的实例，可以执行表单上的一些方法 -->
    <el-form-item label="" label-width="150px">
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, watch } from "vue";
import { FormOptions } from "./types/types";

//拿到表单实例
let form = ref(null);

let emits = defineEmits([
  "on-preview",
  "on-remove",
  "on-success",
  "on-error",
  "on-progress",
  "on-change",
  "before-upload",
  "before-remove",
  "on-exceed",
]);
const props = defineProps({
  // 表单的配置数组
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function,
  },
});

//表单的验证方法
const validate = () => {
  return (form.value! as any).validate;
};

//获取表单数据方法
const getFormDate = () => {
  return model.value;
};

defineExpose({
  validate,
  getFormDate,
});

//表单内的每个表单元素相关联的值
const model = ref<any>({});
//表单的校验规则
const rules = ref<any>({});

//初始化表单的model与rules
function initForm() {
  let m: any = {};
  let r: any = {};
  props.options.forEach((item: FormOptions) => {
    m[item.prop!] = item.value;
    r[item.prop!] = item.rules;
  });

  model.value = m;
  rules.value = r;
}
//挂在之后先初始化表单
onMounted(() => {
  initForm();
});

//监听父组件传递的options，如果options动态改变，需要重新初始化表单
watch(
  () => props.options,
  () => {
    initForm();
  },
  {
    deep: true,
  }
);

// 上传组件的所有方法
let onPreview = (file: File) => {
  emits("on-preview", file);
};
let onRemove = (file: File, fileList: FileList) => {
  emits("on-remove", { file, fileList });
};
let onSuccess = (response: any, file: File, fileList: FileList) => {
  console.log("success");

  // 上传图片成功 给表单上传项赋值
  let uploadItem = props.options.find((item) => item.type === "upload")!;
  model.value[uploadItem.prop!] = { response, file, fileList };
  emits("on-success", { response, file, fileList });
};
let onError = (err: any, file: File, fileList: FileList) => {
  emits("on-error", { err, file, fileList });
};
let onProgress = (event: any, file: File, fileList: FileList) => {
  emits("on-progress", { event, file, fileList });
};
let onChange = (file: File, fileList: FileList) => {
  emits("on-change", { file, fileList });
};
let beforeUpload = (file: File) => {
  emits("before-upload", file);
};
let beforeRemove = (file: File, fileList: FileList) => {
  emits("before-remove", { file, fileList });
};
let onExceed = (files: File, fileList: FileList) => {
  emits("on-exceed", { files, fileList });
};
</script>

<style scoped lang="scss"></style>
