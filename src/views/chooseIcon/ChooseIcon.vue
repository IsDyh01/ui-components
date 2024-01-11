<template>
  <div class="choose-icon">
    <ui-choose-icon title="选择图标" v-model:visible="visible"></ui-choose-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import UiChooseIcon from "../components/chooseIcon/src/index.vue";
const visible = ref(false);
</script>

<style scoped lang="scss"></style>
