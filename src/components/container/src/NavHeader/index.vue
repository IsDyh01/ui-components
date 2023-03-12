<template>
  <div class="nav-header">
    <span @click="toggle"
      ><el-icon-expand v-if="collapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold
    ></span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  collapse: Boolean,
});

const emit = defineEmits(["update:collapse"]);

const toggle = () => {
  //通过emit将菜单状态传递给父组件，然后父组件值改变，又会传递给nav-aside组件，改变菜单状态
  emit("update:collapse", !props.collapse);
};
</script>

<style scoped lang="scss">
.nav-header {
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 40px;
  svg {
    width: 1.5em;
    height: 1.5em;
  }
}
</style>
