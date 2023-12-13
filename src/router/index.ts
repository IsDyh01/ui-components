import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";

export const allRoutes = [
  {
    path: "/chooseIcon",
    component: () => import("../views/chooseIcon/ChooseIcon.vue"),
    meta: { title: "选择图标", icon: "Document" },
    children: [],
  },
  {
    path: "/chooseArea",
    component: () => import("../views/chooseArea/ChooseArea.vue"),
    meta: { title: "选择区域", icon: "Document" },
    children: [],
  },
  {
    path: "/trend",
    component: () => import("../views/trend/trend.vue"),
    meta: { title: "趋势", icon: "Document" },
    children: [],
  },
  {
    path: "/notification",
    component: () => import("../views/notification/notification.vue"),
    meta: { title: "通知", icon: "Document" },
    children: [],
  },
  {
    path: "/menu",
    component: () => import("../views/menu/menu.vue"),
    meta: { title: "菜单", icon: "Document" },
    children: [],
  },
  {
    path: "/progress",
    component: () => import("../views/progress/progress.vue"),
    meta: { title: "进度条", icon: "Document" },
    children: [],
  },
  {
    path: "/chooseTime",
    component: () => import("../views/chooseTime/chooseTime.vue"),
    meta: { title: "选择时间", icon: "Document" },
    children: [],
  },
  {
    path: "/chooseCity",
    component: () => import("../views/chooseCity/chooseCity.vue"),
    meta: { title: "选择城市", icon: "Document" },
    children: [],
  },
  {
    path: "/form",
    component: () => import("../views/form/form.vue"),
    meta: { title: "表单", icon: "Document" },
    children: [],
  },
  {
    path: "/modelForm",
    component: () => import("../views/modelForm/modelForm.vue"),
    meta: { title: "弹出框表单", icon: "Document" },
    children: [],
  },
  {
    path: "/table",
    component: () => import("../views/table/table.vue"),
    meta: { title: "表格", icon: "Document" },
    children: [],
  },
];

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../views/layout/layout.vue"),
    children: allRoutes,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
