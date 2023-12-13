import { App } from "vue";
import recursionMenu from "./src/menu";

// 让这个组件可以通过use的形式使用
export default {
  install(app: App) {
    app.component("ui-recursionMenu", recursionMenu);
  },
};
