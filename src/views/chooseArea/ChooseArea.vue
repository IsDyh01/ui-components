<template>
  <ui-choose-area @change="getAreaData"></ui-choose-area>
</template>

<script setup lang="ts">
// import UiChooseArea from "../components/chooseArea/src/index.vue";

const getAreaData = (data: any) => {
  console.log(data);
};
</script>

<style scoped lang="scss"></style>
