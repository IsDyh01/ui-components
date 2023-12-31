<template>
  <ui-sliding-verify
    :onError="onError"
    :onSuccess="onSuccess"
  ></ui-sliding-verify>
</template>
<script lang="ts" setup>
const onError = () => {
  console.log(111);
};

const onSuccess = () => {
  console.log(222);
};
</script>
<style lang="scss" scoped></style>
