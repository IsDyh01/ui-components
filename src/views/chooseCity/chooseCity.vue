<template>
  <ui-choose-city
    @changeCity="changeCity"
    @changeProvince="changeProvince"
  ></ui-choose-city>
</template>

<script setup lang="ts">
const changeProvince = (val: string) => {
  console.log(val);
};

const changeCity = (val: any) => {
  console.log(val);
};
</script>

<style scoped lang="scss"></style>
