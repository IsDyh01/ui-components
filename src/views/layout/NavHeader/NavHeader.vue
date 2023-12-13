<template>
  <div id="nav-header">
    <div>折叠菜单</div>
    <div class="switchTheme">
      <el-switch
        v-model="switchStatus"
        :active-action-icon="view"
        :inactive-action-icon="hide"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Hide, View } from "@element-plus/icons-vue";
const hide = ref(Hide);
const view = ref(View);
const switchStatus = ref<boolean>(false);
</script>
<style scoped lang="scss">
#nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
