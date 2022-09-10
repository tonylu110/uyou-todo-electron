import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./pages/Home.vue"),
    meta: {
      index: 0
    }
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("./pages/Setting.vue"),
    meta: {
      index: 0
    }
  },
  {
    path: "/account",
    name: "account",
    component: () => import("./pages/Account.vue"),
    meta: {
      index: 1
    }
  },
  {
    path: "/other",
    name: "other",
    component: () => import("./pages/Other.vue"),
    meta: {
      index: 0
    }
  },
  {
    path: "/update",
    name: "update",
    component: () => import("./pages/Update.vue"),
    meta: {
      index: 1
    }
  },
  {
    path: "/donate",
    name: "donate",
    component: () => import("./pages/Donate.vue"),
    meta: {
      index: 1
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;