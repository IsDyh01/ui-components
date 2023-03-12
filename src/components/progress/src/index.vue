<template>
  <!-- v-bind="$attrs"支持el-progress得其他属性 -->
  <el-progress :percentage="p" :type="type" v-bind="$attrs"></el-progress>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const props = defineProps({
  //进度条百分比
  percentage: {
    type: Number,
    required: true,
  },
  // 是否有动画效果
  isAnimate: {
    type: Boolean,
    default: false,
  },
  // 动画时长(毫秒)
  time: {
    type: Number,
    default: 3000,
  },
  //进度条类型
  type: {
    default: "line",
    validator(value: string) {
      // The value must match one of these strings line/circle/dashboard
      return ["line", "circle", "dashboard"].includes(value);
    },
  },
});

const p = ref(0);

onMounted(() => {
  if (props.isAnimate) {
    //如果有动画
    let t = Math.ceil(props.time / props.percentage);
    let timer = setInterval(() => {
      p.value++;
      if (p.value >= props.percentage) {
        p.value = props.percentage;
        clearInterval(timer);
      }
    }, t);
  } else {
    //如果没有动画，直接赋值
    p.value = props.percentage;
  }
});
</script>

<style scoped lang="scss"></style>
