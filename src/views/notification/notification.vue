<template>
  <!-- <ui-notification :value="12"></ui-notification>
  <br />
  <br />
  <ui-notification :value="50" :max="30"></ui-notification>
  <br />
  <br />
  <ui-notification :value="50" :max="30" :isDot="true"></ui-notification>
  <br />
  <br />
  <ui-notification
    :value="50"
    :max="30"
    :isDot="true"
    icon="ChatRound"
  ></ui-notification> -->

  <ui-notification :value="50">
    <!-- 根据用户需要去给弹出框传递内容，在这里传递一个list -->
    <template #default>
      <ui-list
        @clickItem="clickItem"
        @clickAction="clickAction"
        :list="list"
        :actions="actions"
      ></ui-list>
    </template>
  </ui-notification>
</template>

<script setup lang="ts">
import { list, actions } from "./data";

let clickItem = (val: any) => {
  console.log(val);
};
let clickAction = (val: any) => {
  console.log(val);
};
</script>

<style scoped lang="scss"></style>
