import ViewPdf from "./ViewPdf.vue";

import { App } from "vue";

export default {
  install(app: App) {
    app.component("ui-view-pdf", ViewPdf);
  },
};
