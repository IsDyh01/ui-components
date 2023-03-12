import { createApp } from "vue";

import App from "./App.vue";

import router from "./router/index";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import { toLine } from "./utils/index";

//既可以全部将组件引入注册，也可以按需引入注册
// import ChooseIconPlugin from "./components/chooseIcon" --> 按需引入
import UI from "./components";

//引入mock
import "./mock";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.use(UI);

//全局注册图标,并且图标名字都为el-icon-name开头
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`el-icon-${toLine(key)}`, component);
}

app.mount("#app");
