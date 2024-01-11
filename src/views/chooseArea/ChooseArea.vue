<template>
  <div class="choose-area">
    <ui-choose-area @change="getAreaData"></ui-choose-area>
  </div>
</template>

<script setup lang="ts">
// import UiChooseArea from "../components/chooseArea/src/index.vue";

const getAreaData = (data: any) => {
  console.log(data);
};
</script>

<style scoped lang="scss"></style>
