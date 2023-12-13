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
// import UI from "dyhdetest";
// import UI from "dyh-ui-components";
// import "dyh-ui-components/style.css";
// import UI from "../lib/ui-components.js";
// import { ChooseIcon } from "../lib/ui-components.js";
// import "../lib/style.css";

//全局引入打包后的组件库
// import UI from "../lib/index.js";
// import "../lib/style.css";

//引入mock
import "./mock";

console.log(import.meta.env.MODE);
console.log(import.meta.env.DEV);
console.log(import.meta.env);

const app = createApp(App);
console.log(app, "app");

app.use(router);
app.use(ElementPlus);
app.use(UI);
// app.use(ChooseIcon);

//全局注册图标,并且图标名字都为el-icon-name开头
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`el-icon-${toLine(key)}`, component);
}

const i = app.mount("#app");
console.log(i, "i");
