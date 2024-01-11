<template>
  <div class="form">
    <ui-form
      :options="options"
      label-width="100px"
      class="el_form"
      @on-change="handleChange"
      @before-upload="handleBeforeUpload"
      @on-preview="handlePreview"
      @on-remove="handleRemove"
      @before-remove="beforeRemove"
      @on-success="handleSuccess"
      @on-exceed="handleExceed"
    >
      <template #uploadArea>
        <el-button size="small" type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div style="color: #ccc; font-size: 12px">
          jpg/png files with a size less than 500kb
        </div>
      </template>

      <template #action="scope">
        <el-button type="primary" @click="submitForm(scope)">提交</el-button>
        <el-button @click="resetForm(scope)">重置</el-button>
      </template>
    </ui-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { FormOptions } from "../../components/form/src/types/types";

const submitForm = (scope: any) => {
  scope.form.validate((isvalidate: any) => {
    if (isvalidate) {
      ElMessage.success("提交成功");
      //所有表单验证成功,拿到表单内所有的值
      console.log(scope.model);
    } else {
      ElMessage.error("表单验证失败");
      console.log("验证失败");
    }
  });
};

const resetForm = (scope: any) => {
  //拿到子组件内的表单实例，调用其上边的方法清除所有表单
  scope.form.resetFields();
};

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

let handleRemove = (file: any, fileList: any) => {
  console.log("handleRemove");
  console.log(file, fileList);
};
let handlePreview = (file: any) => {
  console.log("handlePreview");
  console.log(file);
};
let beforeRemove = (val: any) => {
  console.log("beforeRemove");
  // return ElMessageBox.confirm(`Cancel the transfert of ${val.file.name} ?`)
};
let handleExceed = (val: any) => {
  console.log("handleExceed", val);
  // ElMessage.warning(
  //   `The limit is 3, you selected ${val.files.length
  //   } files this time, add up to ${val.files.length + val.fileList.length} totally`
  // )
};
let handleSuccess = (val: any) => {
  console.log("success");
  console.log(val);
};
let handleChange = (val: any) => {
  console.log("change");
  console.log(val);
};
let handleBeforeUpload = (val: any) => {
  console.log("handleBeforeUpload");
  console.log(val);
};
</script>

<style scoped lang="scss">
:deep(.el_form) {
  .el-form-item {
    width: 400px;
    margin: auto;
    margin-bottom: 20px;
  }
}
</style>
