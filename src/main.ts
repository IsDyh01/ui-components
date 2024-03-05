import { createApp } from "vue";

import App from "./App.vue";

import router from "./router/index";

import pinia from "./store/index";

// 引入初始化主题文件
import initTheme from "./utils/changeTheme";

// 引入全局样式文件
import "./style/index.scss";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

//既可以全部将组件引入注册，也可以按需引入注册
// import ChooseIconPlugin from "./components/chooseIcon" --> 按需引入
import UI from "./components";

//引入mock
import "./mock";

// 初始化主题
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "light");
}
const theme = localStorage.getItem("theme");
initTheme(theme!);

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.use(UI);
// app.use(ChooseIcon);

//全局注册图标,
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  // console.log(key);

  app.component(key, component);
}

app.mount("#app");
