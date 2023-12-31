<template>
  <el-button type="primary" @click="handleDialog">
    <!-- 可以让用户控制按钮中间的文字 -->
    <slot>选择图标</slot>
  </el-button>

  <el-dialog
    :title="title"
    v-model="dialogVisible"
    align-center
    class="dyh--choose-icon-dialog-body-height"
  >
    <!-- 显示所有图标 -->
    <div class="container">
      <div
        class="item"
        v-for="(item, index) in Object.keys(ElementPlusIconsVue)"
        :key="index"
        @click="handleCopy(item)"
      >
        <!-- 动态渲染所有的组件 -->
        <SvgIcon :icon-name="item" :size="20"></SvgIcon>
        <!-- 展示图标原本的名字 -->
        <span>{{ item }}</span>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
// 先拿到所有的icon对象，内部是组件名称对应组件对象
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { useCopy } from "../../../hooks/useCopy";
import SvgIcon from "../../svgIcon/SvgIcon.vue";

const props = defineProps({
  title: String,
  visible: Boolean,
  test: String,
});

const emits = defineEmits(["update:visible"]);

//图标点击复制
const handleCopy = (item: string) => {
  //item为原本标签的名字
  useCopy(item);
};

const dialogVisible = ref(props.visible);

//按钮点击事件
const handleDialog = () => {
  emits("update:visible", !props.visible);
};

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val;
  }
);

watch(
  () => dialogVisible.value,
  (val) => {
    emits("update:visible", val);
  }
);
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  // height: 500px;
  // overflow-y: scroll;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    width: 25%;
    height: 70px;
    cursor: pointer;
  }
}
</style>
