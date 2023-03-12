<template>
  <el-container>
    <!-- auto指根据内部内容宽度的变化自动变化 -->
    <el-aside width="auto">
      <!-- 菜单 -->
      <nav-side :collapse="isCollapse"></nav-side>
    </el-aside>
    <el-container>
      <!-- 折叠菜单图标 -->
      <el-header>
        <nav-header v-model:collapse="isCollapse"></nav-header>
      </el-header>
      <!-- 封装组件展示入口 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavHeader from "./NavHeader/index.vue";
import NavSide from "./NavSide/index.vue";
//菜单是否折叠
const isCollapse = ref(false);
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  height: 40px;
}
</style>
