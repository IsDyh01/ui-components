<template>
  <div class="home">
    一个基于element-plus+vue3+vite的业务组件的二次封装组件库
  </div>
  <!-- <div class="parentNode">
    <div v-auth="code">权限按钮</div>
  </div>
  <div @click="updateAuth">点击更新权限</div> -->
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.home {
  margin-left: 250px;
  // font-size: 40px;
}
.container {
  width: 300px;
  height: 400px;
  border: 1px solid red;
  overflow: auto;
}
.scroll-container {
  width: 100%;
  height: 4000px;
}
.item {
  height: 40px;
  width: 100%;
  color: red;
  line-height: 40px;
  background-color: black;
  box-sizing: border-box;
  // padding: 10px;
}
</style>
