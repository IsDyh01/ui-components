<template>
  <el-popover
    popper-class="notification-popper-class"
    placement="bottom"
    :width="300"
    trigger="click"
  >
    <!-- el-popoverd组件(弹出框组件)的默认插槽放置弹出框的内容 -->
    <template #default>
      <!-- 这个slot是需要父组件传递过来内容展示，可以是一个列表，也可以是别的组件 -->
      <slot></slot>
    </template>
    <!-- reference插槽是放通过点击之后才能触发弹出框的元素,在这里是一个徽章组件(角标) -->
    <template #reference>
      <el-badge
        style="cursor: pointer"
        :value="value"
        :max="max"
        :is-dot="isDot"
      >
        <component :is="`el-icon-${toLine(icon)}`"></component>
      </el-badge>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { toLine } from "../../../utils";

const props = defineProps({
  //通知菜单的图标，默认为铃铛
  icon: {
    type: String,
    default: "Bell",
  },
  //角标的显示值，可以是数字也可以是文本
  value: {
    type: [String, Number],
    default: "",
  },
  //角标为数字时，显示的最大值，超过就显示max+
  max: {
    type: Number,
  },
  //是否将角标换为圆点展示
  isDot: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
svg {
  width: 1.4em;
  height: 1.4em;
}
</style>
