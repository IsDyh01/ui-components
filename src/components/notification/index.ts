import notification from "./src/index.vue";
import { App } from "vue";

//可以通过app.use()来进行注册成全局组件
export default {
  install(app: App) {
    app.component("ui-notification", notification);
  },
};
