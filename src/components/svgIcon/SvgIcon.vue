<template>
  <el-icon :size="size">
    <component :is="iconName"></component>
  </el-icon>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    iconName: string;
    size?: number;
  }>(),
  {
    size: 15,
  }
);
</script>
<style lang="scss" scoped>
.el-icon {
  color: var(--icon-color);
}
</style>
