<template>
  <div id="layout">
    <el-container>
      <!-- 侧边栏菜单 -->
      <el-aside>
        <NavSide :collapse="collapse"></NavSide>
      </el-aside>
      <!-- 主内容区域 -->
      <el-main>
        <el-header>
          <NavHeader v-model:collapse="collapse"></NavHeader>
        </el-header>
        <div class="container">
          <div class="router-container">
            <!-- 放置子路由 -->
            <router-view></router-view>
          </div>
          <!-- 放置代码示例 -->
          <div class="code-container">
            <ViewVue v-model:codeStr="codeStr"></ViewVue>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import NavSide from "./NavSide/NavSide.vue";
import NavHeader from "./NavHeader/NavHeader.vue";
import ViewVue from "./ViewVue/ViewVue.vue";
const collapse = ref<boolean>(false); // 左侧菜单是否折叠
const route = useRoute();
const codeStr = ref<string>("");
watch(
  route,
  (newVal) => {
    codeStr.value = String(newVal.meta.codeStr);
  },
  {
    immediate: true,
  }
);
</script>
<style scoped lang="scss">
#layout {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-aside {
    // width: 100px;
    max-width: 200px;
    // min-width: none;
    // width: 0;
  }
  .el-main {
    padding: 0 0px 0px 0;
  }
  .el-header {
    height: 40px;
  }
  .container {
    display: flex;
    padding: 10px !important;
    box-sizing: border-box;
    height: calc(100% - 40px);
    background-color: #eee;

    .router-container {
      flex: 1;
      height: 100%;
      background-color: white;
      margin-right: 10px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #aaa;
        border-radius: 10px;
      }
    }
    .code-container {
      flex: 1;
      height: 100%;
    }
  }
}
</style>
