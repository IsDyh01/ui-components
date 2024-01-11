<template>
  <div id="layout">
    <el-container>
      <!-- 侧边栏菜单 -->
      <el-aside :class="{ 'is-collapse': collapse }">
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
            <!-- <Transition name="fade" mode="out-in">
              <router-view></router-view>
            </Transition> -->
            <router-view v-slot="{ Component }">
              <Transition name="fade" mode="out-in">
                <component :is="Component" />
              </Transition>
            </router-view>
          </div>
          <!-- 放置代码示例 -->
          <div class="code-container">
            <ViewVue :codeStr="codeStr"></ViewVue>
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
    width: 200px;
    transition: width 0.3s ease;
    background-color: var(--bg-color);
  }
  .is-collapse {
    width: 64px;
  }
  .el-main {
    padding: 0 0px 0px 0;
  }
  .el-header {
    height: 40px;
    background-color: var(--bg-color);
  }
  .container {
    display: flex;
    padding: 10px !important;
    box-sizing: border-box;
    height: calc(100% - 40px);
    background-color: var(--diviler-bg-color);

    .router-container {
      flex: 1;
      height: 100%;
      background-color: var(--bg-color);
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
      overflow-x: auto;
      height: 100%;
    }
  }
}
</style>
