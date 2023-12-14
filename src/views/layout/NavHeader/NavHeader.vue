<template>
  <div id="nav-header">
    <div class="icon">
      <SvgIcon
        iconName="Fold"
        :size="20"
        v-if="!collapse"
        @click="emits('update:collapse', true)"
      ></SvgIcon>
      <SvgIcon
        iconName="Expand"
        :size="20"
        v-else
        @click="emits('update:collapse', false)"
      ></SvgIcon>
    </div>
    <!-- <div class="switchTheme">
      <el-switch
        v-model="switchStatus"
        :active-action-icon="view"
        :inactive-action-icon="hide"
      />
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import SvgIcon from "../../../components/svgIcon/SvgIcon.vue";

defineProps<{
  collapse: boolean;
}>();

const emits = defineEmits<{
  (e: "update:collapse", val: boolean): void;
}>();
</script>
<style scoped lang="scss">
#nav-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .icon {
    cursor: pointer;
  }
}
</style>
