import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: () => import('./pages/Home.tsx'),
      noteUI: () => import('./pages/NoteUI.vue'),
    },
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('./pages/Settings/Setting.vue'),
  },
  {
    path: '/setting-sim',
    name: 'settingSim',
    component: () => import('./pages/SettingsSimple.vue'),
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('./pages/Account.vue'),
  },
  {
    path: '/other',
    name: 'other',
    component: () => import('./pages/Other.tsx'),
  },
  {
    path: '/update',
    name: 'update',
    component: () => import('./pages/Settings/Update.vue'),
  },
  {
    path: '/donate',
    name: 'donate',
    component: () => import('./pages/Settings/Donate.vue'),
  },
  {
    path: '/open',
    name: 'openSource',
    component: () => import('./pages/Settings/openSource.vue'),
  },
  {
    path: '/lang',
    name: 'lang',
    component: () => import('./pages/Settings/LangSet.vue'),
  },
  {
    path: '/lab',
    name: 'lab',
    component: () => import('./pages/Laboratory'),
  },
  {
    path: '/setListItem',
    name: 'setListItem',
    component: () => import('./pages/Laboratory/showListItem'),
  },
  {
    path: '/fontSet',
    name: 'fontSet',
    component: () => import('./pages/Settings/Vip/FontSet.vue'),
  },
  {
    path: '/vip',
    name: 'vip',
    component: () => import('./pages/Settings/vip.vue'),
  },
  {
    path: '/openPass',
    name: 'openPass',
    component: () => import('./pages/Settings/OpenPass.vue'),
  },
  {
    path: '/passKey',
    name: 'passKey',
    component: () => import('./pages/Settings/Vip/PassKey.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
