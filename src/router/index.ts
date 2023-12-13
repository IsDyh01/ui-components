import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";

const allRoutes = [
  {
    path: "/chooseIcon",
    component: () => import("../views/chooseIcon/ChooseIcon.vue"),
  },
  {
    path: "/chooseArea",
    component: () => import("../views/chooseArea/ChooseArea.vue"),
  },
  {
    path: "/trend",
    component: () => import("../views/trend/trend.vue"),
  },
  {
    path: "/notification",
    component: () => import("../views/notification/notification.vue"),
  },
  {
    path: "/menu",
    component: () => import("../views/menu/menu.vue"),
  },
  {
    path: "/progress",
    component: () => import("../views/progress/progress.vue"),
  },
  {
    path: "/chooseTime",
    component: () => import("../views/chooseTime/chooseTime.vue"),
  },
  {
    path: "/chooseCity",
    component: () => import("../views/chooseCity/chooseCity.vue"),
  },
  {
    path: "/form",
    component: () => import("../views/form/form.vue"),
  },
  {
    path: "/modelForm",
    component: () => import("../views/modelForm/modelForm.vue"),
  },
  {
    path: "/table",
    component: () => import("../views/table/table.vue"),
  },
  {
    path: "/table/:id",
    component: () => import("../views/table/table.vue"),
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
