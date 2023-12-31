// import SlidingVerify from "./SlidingVerify.vue";
import SlidingVerify from "./Sliding.vue";
import { App } from "vue";
export default {
  install(app: App) {
    app.component("ui-sliding-verify", SlidingVerify);
  },
};
