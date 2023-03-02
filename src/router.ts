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
    path: "/setting-sim",
    name: "settingSim",
    component: () => import("./pages/SettingsSimple.vue"),
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
  },
  {
    path: "/open",
    name: "openSource",
    component: () => import("./pages/Settings/openSource.vue"),
  },
  {
    path: "/lang",
    name: "lang",
    component: () => import("./pages/Settings/LangSet.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;