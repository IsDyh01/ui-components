<template>
  <el-button type="primary" @click="open">编辑用户</el-button>
  <ui-model-form
    v-model="visible"
    title="编辑用户"
    :options="options"
    center
    :on-change="handleChange"
    :on-success="handleSuccess"
  >
    <template #uploadArea>
      <el-button size="small" type="primary">Click to upload</el-button>
    </template>
    <template #uploadTip>
      <div style="color: #ccc; font-size: 12px">
        jpg/png files with a size less than 500kb
      </div>
    </template>
    <template #footer="{ form }">
      <el-button @click="cancle(form)">取消</el-button>
      <el-button type="primary" @click="confirm(form)">确认</el-button>
    </template>
  </ui-model-form>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { FormOptions } from "../../components/form/src/types/types";

//控制弹出层的显示与隐藏
const visible = ref(false);

//打开弹出层
const open = () => {
  visible.value = true;
};

//取消按钮
const cancle = (form: any) => {
  visible.value = false;
};
//确认按钮
const confirm = (form: any) => {
  //form实例暴漏的有验证表单方法以及获取表单数据的方法
  const validate = form.validate();
  validate((valid: any) => {
    if (valid) {
      ElMessage.success("编辑成功");
      visible.value = false;
      console.log(form.getFormDate());
    } else {
      ElMessage.error("验证失败");
    }
  });
};

//表单配置项
const options: FormOptions[] = [
  {
    type: "input",
    value: "",
    label: "用户名",
    prop: "username",
    placeholder: "请输入用户名",
    rules: [
      {
        required: true,
        message: "用户名不能为空",
        trigger: "blur",
      },
      {
        min: 2,
        max: 6,
        message: "用户名在2-6位之间",
        trigger: "blur",
      },
    ],
    attrs: {
      style: {
        width: "300px",
      },
    },
  },
  {
    type: "input",
    value: "",
    label: "密码",
    prop: "password",
    placeholder: "请输入密码",
    rules: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "blur",
      },
      {
        min: 6,
        max: 15,
        message: "密码在6-15位之间",
        trigger: "blur",
      },
    ],
    attrs: {
      type: "password",
      style: {
        width: "300px",
      },
    },
  },
  {
    type: "select",
    value: "1",
    label: "职位",
    placeholder: "请选择职位",
    prop: "role",
    rules: [
      {
        required: true,
        message: "职位不能为空",
        trigger: "blur",
      },
    ],
    attrs: {
      style: {
        width: "300px",
      },
    },
    children: [
      {
        type: "option",
        value: "1",
        label: "经理",
      },
      {
        type: "option",
        value: "2",
        label: "客服",
      },
      {
        type: "option",
        value: "3",
        label: "老板",
      },
    ],
  },
  {
    type: "checkbox-group",
    value: [],
    label: "爱好",
    prop: "hobby",
    children: [
      {
        type: "checkbox",
        label: "篮球",
      },
      {
        type: "checkbox",
        label: "足球",
      },
      {
        type: "checkbox",
        label: "排球",
      },
    ],
  },
  {
    type: "radio-group",
    value: "",
    label: "性别",
    prop: "gender",
    children: [
      {
        type: "radio",
        label: "男",
      },
      {
        type: "radio",
        label: "女",
      },
    ],
  },
  {
    type: "upload",
    label: "上传",
    prop: "pic",
    uploadAttrs: {
      action: "http://127.0.0.1:5173",
      multiple: true,
      limit: 3,
      showFileList: true,
    },
    // rules: [
    //   {
    //     required: true,
    //     message: "图片不能为空",
    //     trigger: "blur",
    //   },
    // ],
  },
];

//上传文件事件
let handleSuccess = (val: any) => {
  console.log("success");
  console.log(val);
};
let handleChange = (val: any) => {
  console.log("change");
  console.log(val);
};
</script>

<style scoped lang="scss"></style>
