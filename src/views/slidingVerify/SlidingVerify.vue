<template>
  <div class="sliding-verify">
    <ui-sliding-verify
      :onError="onError"
      :onSuccess="onSuccess"
    ></ui-sliding-verify>
  </div>
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
