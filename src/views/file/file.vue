<template>
  <ui-file @change="change"></ui-file>
</template>

<script setup lang="ts">
const change = (fileList: File[]) => {
  console.log(fileList);
};
</script>
