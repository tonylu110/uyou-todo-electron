import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./pages/Home.vue"),
  },
  {
    path: "/help",
    name: "help",
    component: () => import("./pages/Setting.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;