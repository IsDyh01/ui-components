<template>
  <div style="display: flex">
    <div style="margin-right: 20px">
      <!-- max-time属性设置如果有选择结束时间，那么在重新选择开始时间时不能超过结束时间 -->
      <el-time-select
        v-model="startTime"
        :max-time="endTime"
        :placeholder="startPlaceholder"
        :start="startTimeStart"
        :step="startStep"
        :end="startTimeEnd"
        v-bind="$attrs.startOptions"
      ></el-time-select>
    </div>
    <div>
      <!-- min-time属性设置为startTime说明该选择器的最小能选择的值应该是开始时间之后，开始之前的日期不能选择 -->
      <el-time-select
        v-model="endTime"
        :min-time="startTime"
        :placeholder="endPlaceholder"
        :start="endTimeStart"
        :step="endStep"
        :end="endTimeEnd"
        :disabled="!startTime"
        v-bind="$attrs.endOptions"
      ></el-time-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

let props = defineProps({
  // 开始时间的占位符
  startPlaceholder: {
    type: String,
    default: "请选择开始时间",
  },
  // 结束时间的占位符
  endPlaceholder: {
    type: String,
    default: "请选择结束时间",
  },
  // 开始时间的开始选择
  startTimeStart: {
    type: String,
    default: "08:00",
  },
  // 开始时间的步进
  startStep: {
    type: String,
    default: "00:30",
  },
  // 开始时间的结束选择
  startTimeEnd: {
    type: String,
    default: "24:00",
  },
  // 结束时间的开始选择
  endTimeStart: {
    type: String,
    default: "08:00",
  },
  // 结束时间的步进
  endStep: {
    type: String,
    default: "00:30",
  },
  // 结束时间的结束选择
  endTimeEnd: {
    type: String,
    default: "24:00",
  },
});

let emits = defineEmits(["startChange", "endChange"]);

// 开始时间
let startTime = ref<string>("");
// 结束时间
let endTime = ref<string>("");
// 是否禁用结束时间,也可以直接在结束日期选择框中得disable属性设置!startTime,表示如果开始日期没有值就禁用
let endTimeDisabled = ref<boolean>(true);

// 监听开始时间的变化
watch(
  () => startTime.value,
  (val) => {
    if (val === "") {
      //如果没有选值的话，需要把结束日期也置为空，然后禁用结束日期
      endTime.value = "";
      endTimeDisabled.value = true;
    } else {
      //如果有值的话
      endTimeDisabled.value = false;
      // 给父组件分发事件
      emits("startChange", val);
    }
  }
);

// 监听结束时间的变化
watch(
  () => endTime.value,
  (val) => {
    if (val !== "") {
      emits("endChange", {
        startTime: startTime.value,
        endTime: val,
      });
    }
  }
);
</script>

<style lang="scss" scoped></style>
