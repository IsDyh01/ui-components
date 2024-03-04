import { App } from "vue";
// import file from "./src/index.vue";
import file from "./src/index.vue";

export default {
  install(app: App) {
    app.component("ui-file", file);
  },
};
