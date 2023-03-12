import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 引入jsx插件
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
});
