import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";
import chooseIcon from "../views/chooseIcon/ChooseIcon.vue?raw";
import chooseArea from "@/views/chooseArea/ChooseArea.vue?raw";
import chooseCity from "@/views/chooseCity/ChooseCity.vue?raw";
import chooseTime from "@/views/chooseTime/ChooseTime.vue?raw";
import notification from "@/views/notification/notification.vue?raw";
import menu from "@/views/menu/menu.vue?raw";
import progress from "@/views/progress/progress.vue?raw";
import form from "@/views/form/form.vue?raw";
import modelForm from "@/views/modelForm/modelForm.vue?raw";
import table from "@/views/table/table.vue?raw";
import trend from "@/views/trend/trend.vue?raw";
import ViewPdf from "@/views/viewPdf/ViewPdf.vue?raw";
// import slidingVerify from '@/views/slidingVerify.vue'
import slidingVerify from "@/views/slidingVerify/SlidingVerify.vue?raw";
import treesComponents from "@/views/treesComponents/TreesComponents.vue?raw";

export const allRoutes = [
  {
    path: "/slidingVerify",
    component: () => import("../views/slidingVerify/SlidingVerify.vue"),
    meta: { title: "滑动验证", icon: "Document", codeStr: slidingVerify },
    children: [],
  },
  {
    path: "/treesComponents",
    component: () => import("../views/treesComponents/TreesComponents.vue"),
    meta: { title: "树形组件", icon: "Document", codeStr: treesComponents },
    children: [],
  },
  {
    path: "/viewPdf",
    component: () => import("../views/viewPdf/ViewPdf.vue"),
    meta: { title: "pdf预览", icon: "Document", codeStr: ViewPdf },
    children: [],
  },
  {
    path: "/chooseIcon",
    component: () => import("../views/chooseIcon/ChooseIcon.vue"),
    meta: { title: "选择图标", icon: "Document", codeStr: chooseIcon },
    children: [],
  },
  {
    path: "/chooseArea",
    component: () => import("../views/chooseArea/ChooseArea.vue"),
    meta: { title: "选择区域", icon: "Document", codeStr: chooseArea },
    children: [],
  },
  {
    path: "/trend",
    component: () => import("../views/trend/trend.vue"),
    meta: { title: "趋势", icon: "Document", codeStr: trend },
    children: [],
  },
  {
    path: "/notification",
    component: () => import("../views/notification/notification.vue"),
    meta: { title: "通知", icon: "Document", codeStr: notification },
    children: [],
  },
  {
    path: "/menu",
    component: () => import("../views/menu/menu.vue"),
    meta: { title: "菜单", icon: "Document", codeStr: menu },
    children: [],
  },
  {
    path: "/progress",
    component: () => import("../views/progress/progress.vue"),
    meta: { title: "进度条", icon: "Document", codeStr: progress },
    children: [],
  },
  {
    path: "/chooseTime",
    component: () => import("../views/chooseTime/chooseTime.vue"),
    meta: { title: "选择时间", icon: "Document", codeStr: chooseTime },
    children: [],
  },
  {
    path: "/chooseCity",
    component: () => import("../views/chooseCity/chooseCity.vue"),
    meta: { title: "选择城市", icon: "Document", codeStr: chooseCity },
    children: [],
  },
  {
    path: "/form",
    component: () => import("../views/form/form.vue"),
    meta: { title: "表单", icon: "Document", codeStr: form },
    children: [],
  },
  {
    path: "/modelForm",
    component: () => import("../views/modelForm/modelForm.vue"),
    meta: { title: "弹出框表单", icon: "Document", codeStr: modelForm },
    children: [],
  },
  {
    path: "/table",
    component: () => import("../views/table/table.vue"),
    meta: { title: "表格", icon: "Document", codeStr: table },
    children: [],
  },
];

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../views/layout/layout.vue"),
    children: allRoutes,
    redirect: "/slidingVerify",
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
