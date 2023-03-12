import { ElMessage } from "element-plus";

//用于复制文本
export const useCopy = (text: string) => {
  //创建input元素
  let oInput = document.createElement("input");
  //将text赋值给文本框
  oInput.value = text;
  //将input框插入文档
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand("Copy"); // 执行浏览器复制命令
  //复制成功弹窗
  ElMessage({
    message: "复制成功",
    type: "success",
  });
  document.body.removeChild(oInput);
};
