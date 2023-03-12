<template>
  <!-- line型进度条 -->
  <div>
    <ui-progress :percentage="50" color="green"></ui-progress>
  </div>
  <div>
    <ui-progress :percentage="80" :isAnimate="true"></ui-progress>
  </div>
  <!-- 圆形进度条 -->
  <div>
    <ui-progress :percentage="50" type="circle"></ui-progress>
  </div>
  <div>
    <ui-progress :percentage="25" :isAnimate="true" type="circle"></ui-progress>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
div {
  margin-bottom: 30px;
}
</style>
