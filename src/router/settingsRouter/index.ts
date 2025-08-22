import type { RouteRecordRaw } from 'vue-router'
import Account from '../../pages/Account.vue'
import Ai from '../../pages/Settings/Ai.vine.ts'
import Donate from '../../pages/Settings/Donate.vue'
import LangSet from '../../pages/Settings/LangSet.vue'
import Mode from '../../pages/Settings/Mode.vue'
import OpenPass from '../../pages/Settings/OpenPass.vue'
import OpenSource from '../../pages/Settings/openSource.vue'
import ToDoBackup from '../../pages/Settings/ToDoBackup.vine.ts'
import Update from '../../pages/Settings/Update.vue'
import labRouter from './labRouter'
import vipRouter from './vipRouter'

const settingsRouter: Readonly<RouteRecordRaw[]> = [
  {
    path: '/account',
    name: 'account',
    component: Account,
  },
  {
    path: '/update',
    name: 'update',
    component: Update,
  },
  {
    path: '/donate',
    name: 'donate',
    component: Donate,
  },
  {
    path: '/open',
    name: 'openSource',
    component: OpenSource,
  },
  {
    path: '/lang',
    name: 'lang',
    component: LangSet,
  },
  {
    path: '/openPass',
    name: 'openPass',
    component: OpenPass,
  },

  {
    path: '/mode',
    name: 'mode',
    component: Mode,
  },
  {
    path: '/backup',
    name: 'backup',
    component: ToDoBackup,
  },
  {
    path: '/ai',
    name: 'ai',
    component: Ai,
  },
  ...labRouter,
  ...vipRouter,
]

export default settingsRouter
