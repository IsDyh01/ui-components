<template>
  <div>
    <el-dialog v-model="isVisible" v-bind="$attrs" class="el_dialog">
      <el-scrollbar height="400px">
        <ui-form
          ref="form"
          :options="options"
          label-width="100px"
          @on-change="onChange"
          @before-upload="beforeUpload"
          @on-preview="onPreview"
          @on-remove="onRemove"
          @before-remove="beforeRemove"
          @on-success="onSuccess"
          @on-exceed="onExceed"
        >
          <template #uploadArea>
            <slot name="uploadArea"></slot>
          </template>
          <template #uploadTip>
            <slot name="uploadTip"></slot>
          </template>
        </ui-form>
      </el-scrollbar>

      <!-- 底部按钮，需要父组件自定义传递按钮,需要把form实例对象传过去，因为父组件需要验证表单需要拿到表单的值 -->
      <template #footer>
        <slot name="footer" :form="form"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, PropType } from "vue";
import { FormOptions } from "../../form/src/types/types";

const emits = defineEmits(["update:visible"]);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  onChange: {
    type: Function,
  },
  beforeUpload: {
    type: Function,
  },
  onPreview: {
    type: Function,
  },
  onRemove: {
    type: Function,
  },
  beforeRemove: {
    type: Function,
  },
  onSuccess: {
    type: Function,
  },
  onExceed: {
    type: Function,
  },
});

//拿到form组件的实例对象
const form = ref(null);

//由于不能直接改变父组件传过来的props，因此需要再定义一个变量，用来改变弹出层的显示与隐藏
const isVisible = ref(props.visible);

watch(
  () => props.visible,
  (val) => {
    isVisible.value = val;
  }
);

watch(
  () => isVisible.value,
  (val) => {
    emits("update:visible", val);
  }
);
</script>

<style scoped lang="scss">
:deep(.el_dialog) {
  .el-dialog__body {
    .el-form {
      .el-form-item {
        width: 400px;
        margin: auto;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
