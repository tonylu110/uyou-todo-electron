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
    component: () => import("./pages/Setting.vue"),
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
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;