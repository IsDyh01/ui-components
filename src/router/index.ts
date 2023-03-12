import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

//主体路由
import Container from "../components/container/src/index.vue";

import Home from "../views/Home.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Container,
    children: [
      {
        path: "/",
        component: Home,
      },
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
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
