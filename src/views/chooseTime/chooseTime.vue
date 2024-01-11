<template>
  <div class="choose-time">
    <ui-choose-time
      @startChange="startChange"
      @endChange="endChange"
    ></ui-choose-time>
    <br />
    <br />

    <ui-choose-date></ui-choose-date>
  </div>
</template>

<script setup lang="ts">
interface timeValType {
  startTime: string;
  endTime: string;
}
const startChange = (val: string) => {
  console.log(val);
};

const endChange = (val: timeValType) => {
  console.log(val);
};
</script>

<style scoped lang="scss"></style>
