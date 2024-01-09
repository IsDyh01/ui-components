import { App } from "vue";
import TreesComponents from "./TreesComponents.vue";

export default {
  install(app: App) {
    app.component("ui-trees-components", TreesComponents);
  },
};
