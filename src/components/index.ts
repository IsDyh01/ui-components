//拿到所有得组件全局注册安装对象(插件对象)
import ChooseIcon from "./chooseIcon";

import ChooseArea from "./chooseArea";

import trend from "./trend";

import notification from "./notification";

import list from "./list";

import menu from "./menu";

import progress from "./progress";

import chooseTime from "./chooseTime";

import chooseDate from "./chooseDate";

import chooseCity from "./chooseCity";

import form from "./form";

import modelForm from "./modelForm";

import table from "./table";

import viewPdf from "./viewPdf";

import slidingVerify from "./slidingVerify";

import { App } from "vue";

const componentsPlugin = [
  ChooseIcon,
  ChooseArea,
  trend,
  notification,
  list,
  menu,
  progress,
  chooseTime,
  chooseDate,
  chooseCity,
  form,
  modelForm,
  table,
  viewPdf,
  slidingVerify,
];

//在这里继续写一个插件，这个插件可以执行所有组件得插件对象来进行注测
export default {
  install(app: App) {
    componentsPlugin.forEach((item) => {
      app.use(item);
    });
  },
};
