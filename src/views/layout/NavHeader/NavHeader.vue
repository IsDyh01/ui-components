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
    <div class="switchTheme">
      <el-switch v-model="switchStatus" @change="switchChange" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import SvgIcon from "../../../components/svgIcon/SvgIcon.vue";
import useThemeStore from "../../../store/theme";
import initTheme from "../../../utils/changeTheme";

defineProps<{
  collapse: boolean;
}>();

const themeStore = useThemeStore();

const switchStatus = ref<boolean>(themeStore.theme === "light" ? false : true);

const emits = defineEmits<{
  (e: "update:collapse", val: boolean): void;
}>();

const switchChange = () => {
  themeStore.changeTheme();
  initTheme(themeStore.theme);
};
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
