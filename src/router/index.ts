import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import mainRouter from './mainRouter'
import settingsRouter from './settingsRouter'

const routes: Readonly<RouteRecordRaw[]> = [
  ...mainRouter,
  ...settingsRouter,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
