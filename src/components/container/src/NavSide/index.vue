<template>
  <!-- <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="collapse"
  >
    <el-menu-item index="1">
      <el-icon><el-icon-document /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><el-icon-document /></el-icon>
      <span>图标选择器</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><el-icon-document /></el-icon>
      <span>省市区选择</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><el-icon-document /></el-icon>
      <span>趋势图标</span>
    </el-menu-item>
  </el-menu> -->
  <!-- <ui-menu
    :data="data"
    @select="select"
    :default-active="defaultActve"
    :collapse="collapse"
  ></ui-menu> -->
  <ui-menu
    :data="data"
    router
    :default-active="$route.path"
    :collapse="collapse"
  ></ui-menu>
</template>

<script setup lang="ts">
// import { ref } from "vue";
// import { useRouter, useRoute } from "vue-router";
const props = defineProps({
  collapse: Boolean,
});
//第一种点击跳转的方式
// const router = useRouter();
// const route = useRoute();
// const defaultActve = ref(route.path);

// const select = (index: any) => {
//   router.push(index);

//   defaultActve.value = index;
// };

let data = [
  {
    icon: "HomeFilled",
    name: "首页",
    index: "/",
  },
  {
    icon: "Check",
    name: "图标选择器",
    index: "/chooseIcon",
  },
  {
    icon: "Setting",
    name: "表单",
    index: "/form",
  },
  {
    icon: "Setting",
    name: "弹出框表单",
    index: "/modelForm",
  },
  {
    icon: "ShoppingBag",
    name: "表格",
    index: "/table",
  },
  {
    icon: "Menu",
    name: "导航菜单",
    index: "/menu",
  },
  {
    icon: "TurnOff",
    name: "城市选择",
    index: "/chooseCity",
  },
  {
    icon: "Location",
    name: "省市区选择",
    index: "/chooseArea",
  },
  {
    icon: "Sort",
    name: "趋势标记",
    index: "/trend",
  },
  {
    icon: "Timer",
    name: "时间选择",
    index: "/chooseTime",
  },
  {
    icon: "Bell",
    name: "通知菜单",
    index: "/notification",
  },

  {
    icon: "DArrowRight",
    name: "进度条",
    index: "/progress",
  },
];
</script>

<style scoped lang="scss"></style>
