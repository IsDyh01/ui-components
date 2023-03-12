<template>
  <div>
    <div class="container">
      <div class="text" :style="{ color: textColor }">
        <slot v-if="slots.default"></slot>
        <span v-else>{{ text }}</span>
      </div>
      <!-- 上升图标 -->
      <component
        :is="`el-icon-${toLine(upIcon)}`"
        v-if="type === 'up'"
        :style="{ color: !reverseColor ? upIconColor : 'green' }"
      ></component>
      <!-- 下降图标 -->
      <component
        :is="`el-icon-${toLine(downIcon)}`"
        v-else
        :style="{ color: !reverseColor ? downIconColor : 'red' }"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from "vue";
import { toLine } from "../../../utils";

const textColor = computed(() => {
  return props.type === "up" ? props.upTextColor : props.downTextColor;
});

//拿到slots对象，看父组件是否使用了插槽来传递text文本，如果使用了插槽，就显示插槽的内容
const slots = useSlots();

const props = defineProps({
  //趋势标志的类型，上升 || 下降 默认为up(上升)
  type: {
    type: String,
    default: "up",
  },
  //文本
  text: {
    type: String,
    default: "",
  },
  //是否使用颜色反转，只限于图标默认颜色反转，提供此属性，将忽视传递的自定义颜色,即上升图标-绿色 下降图标-红色
  reverseColor: {
    type: Boolean,
    default: false,
  },
  //上升图标的颜色,默认为红色
  upIconColor: {
    type: String,
    default: "red",
  },
  //下降图标的颜色,默认为绿色
  downIconColor: {
    type: String,
    default: "green",
  },
  //自定义上升文字颜色,默认黑色
  upTextColor: {
    type: String,
    default: "rgb(0,0,0)",
  },
  //自定义下降文字颜色，默认黑色
  downTextColor: {
    type: String,
    default: "rgb(0,0,0)",
  },
  //自定义上升图标
  upIcon: {
    type: String,
    default: "ArrowUp",
  },
  //自定义下降图标
  downIcon: {
    type: String,
    default: "ArrowDown",
  },
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  .text {
    font-size: 16px;
    margin-right: 5px;
  }
  svg {
    width: 1em;
    height: 1em;
  }
}
</style>
