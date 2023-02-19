import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./pages/Home.vue"),
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("./pages/Settings/Setting.vue"),
  },
  {
    path: "/account",
    name: "account",
    component: () => import("./pages/Account.vue"),
  },
  {
    path: "/other",
    name: "other",
    component: () => import("./pages/Other.vue"),
  },
  {
    path: "/update",
    name: "update",
    component: () => import("./pages/Settings/Update.vue"),
  },
  {
    path: "/donate",
    name: "donate",
    component: () => import("./pages/Settings/Donate.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;