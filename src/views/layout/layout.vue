<template>
  <div id="layout">
    <el-container>
      <!-- 侧边栏菜单 -->
      <el-aside>
        <NavSide></NavSide>
      </el-aside>
      <!-- 主内容区域 -->
      <el-main>
        <el-header>
          <NavHeader></NavHeader>
        </el-header>
        <div class="router-container">
          <!-- 放置子路由 -->
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import NavSide from "./NavSide/NavSide.vue";
import NavHeader from "./NavHeader/NavHeader.vue";
</script>
<style scoped lang="scss">
#layout {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-aside {
    width: 100px;
  }
  .el-main {
    padding: 0 0px 20px 0;
  }
  .el-header {
    height: 40px;
  }
  .router-container {
    padding: 0 20px;
    height: calc(100% - 40px);
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 10px;
    }
    .test {
      height: 2000px;
      background-color: black;
    }
  }
}
</style>
