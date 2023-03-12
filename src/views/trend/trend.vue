<template>
  <!-- 初始组件封装 -->
  <!-- <div class="trend">
    <div><ui-trend text="销售额"></ui-trend></div>
    <div><ui-trend text="销量" type="down"></ui-trend></div>
  </div> -->

  <!-- 实现文本的插槽（有插槽忽略text属性）以及图标颜色的反转（有反转忽略传入的图标颜色属性） -->
  <!-- <div class="trend">
    <div><ui-trend text="销售额" reverseColor></ui-trend></div>
    <div><ui-trend text="销量" type="down" reverseColor>营业额</ui-trend></div>
  </div> -->

  <!-- 实现自定义文字颜色以及自定义图标 -->
  <div class="trend">
    <div>
      <ui-trend text="销售额" upTextColor="red" upIcon="CaretTop"></ui-trend>
    </div>
    <div>
      <ui-trend
        text="销量"
        type="down"
        downTextColor="green"
        downIcon="CaretBottom"
        >营业额</ui-trend
      >
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.trend {
  display: flex;
  align-items: center;
  div {
    margin-right: 10px;
  }
}
</style>
