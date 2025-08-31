import type { RouteRecordRaw } from 'vue-router'
import Home from '../../pages/Home.vine.ts'
import NoteUI from '../../pages/NoteUI.vine.ts'
import Other from '../../pages/Other.vine.ts'
import Setting from '../../pages/Settings/Setting.vue'
import SettingsSimple from '../../pages/SettingsSimple.vue'

const mainRouter: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      noteUI: NoteUI,
    },
  },
  {
    path: '/other',
    name: 'other',
    component: Other,
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting,
  },
  {
    path: '/setting-sim',
    name: 'settingSim',
    component: SettingsSimple,
  },
]

export default mainRouter
