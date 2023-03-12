//拿到所有得组件全局注册安装对象(插件对象)
import ChooseIconPlugin from "./chooseIcon";

import ChooseAreaPlugin from "./chooseArea";

import trendPlugin from "./trend";

import notificationPlugin from "./notification";

import listPlugin from "./list";

import menuPlugin from "./menu";

import progressPlugin from "./progress";

import chooseTimePlugin from "./chooseTime";

import chooseDatePlugin from "./chooseDate";

import chooseCityPlugin from "./chooseCity";

import formPlugin from "./form";

import modelFormPlugin from "./modelForm";

import tablePlugin from "./table";

import { App } from "vue";

const componentsPlugin = [
  ChooseIconPlugin,
  ChooseAreaPlugin,
  trendPlugin,
  notificationPlugin,
  listPlugin,
  menuPlugin,
  progressPlugin,
  chooseTimePlugin,
  chooseDatePlugin,
  chooseCityPlugin,
  formPlugin,
  modelFormPlugin,
  tablePlugin,
];

//在这里继续写一个插件，这个插件可以执行所有组件得插件对象来进行注测
export default {
  install(app: App) {
    componentsPlugin.forEach((item) => {
      app.use(item);
    });
  },
};
