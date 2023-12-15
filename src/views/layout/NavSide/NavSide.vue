<template>
  <div id="nav-side">
    <ui-recursionMenu :data="menuList" :collapse="collapse"></ui-recursionMenu>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { allRoutes } from "../../../router/index";
import { MenuItemType } from "../../../components/menu/src/types";
defineProps<{
  collapse: boolean;
}>();

let menuList = ref<MenuItemType[]>([]);

const handlerRoutesToMenuList = (routes: any[]) => {
  if (Array.isArray(routes)) {
    const list = routes.map(
      (route: {
        meta: { icon: string | undefined; title: string };
        path: string;
        children: any[];
      }) => {
        const item: MenuItemType = {
          icon: "",
          children: [],
          title: "",
          index: "",
        };
        item.icon = route.meta?.icon;
        item.index = route.path;
        item.title = route.meta?.title!;
        if (route.children?.length) {
          item.children = handlerRoutesToMenuList(route.children);
        }
        return item;
      }
    );
    return list;
  }
};

onMounted(() => {
  menuList.value = handlerRoutesToMenuList(allRoutes)!;
});
</script>
<style scoped lang="scss">
#nav-side {
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
