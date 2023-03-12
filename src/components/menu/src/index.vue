<template>
  <!-- 最多只有二级菜单 -->
  <!-- 使用v-bind="$attrs"的目的是可以根据elemnt-plus上的el-menu的属性去随意添加，不用在props内注册 -->
  <el-menu
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    :router="router"
    v-bind="$attrs"
  >
    <template v-for="(item, i) in data" :key="i">
      <!-- 如果item没有children就是一级菜单 -->
      <el-menu-item
        v-if="!item.children || !item.children.length"
        :index="item.index"
      >
        <component
          v-if="item.icon"
          :is="`el-icon-${toLine(item.icon)}`"
        ></component>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <!-- 如果item有孩子就是二级菜单 -->
      <el-sub-menu
        v-if="item.children && item.children.length"
        :index="item.index"
      >
        <template #title>
          <component
            v-if="item.icon"
            :is="`el-icon-${toLine(item.icon)}`"
          ></component>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="(item1, index1) in item.children"
          :key="index1"
          :index="item1.index"
        >
          <component
            v-if="item1.icon"
            :is="`el-icon-${toLine(item1.icon)}`"
          ></component>
          <span>{{ item1.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
//导入每个菜单项的类型
import { MenuItemType } from "./types";
//导入vue的类型检测
import { PropType } from "vue";

import { toLine } from "../../../utils";

const props = defineProps({
  //菜单数据
  data: {
    type: Array as PropType<MenuItemType[]>,
    required: true,
  },
  // 默认选中的菜单
  defaultActive: {
    type: String,
    default: "",
  },
  // 是否是路由模式
  router: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
svg {
  margin-right: 4px;
  width: 1em;
  height: 1em;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
}
</style>
