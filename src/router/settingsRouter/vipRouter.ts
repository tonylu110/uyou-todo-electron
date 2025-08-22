import type { RouteRecordRaw } from 'vue-router'
import ShowListItem from '../../pages/Laboratory/showListItem'
import Vip from '../../pages/Settings/vip.vue'
import FontSet from '../../pages/Settings/Vip/FontSet.vue'
import PassKey from '../../pages/Settings/Vip/PassKey.vue'

const vipRouter: Readonly<RouteRecordRaw[]> = [
  {
    path: '/vip',
    name: 'vip',
    component: Vip,
  },
  {
    path: '/fontSet',
    name: 'fontSet',
    component: FontSet,
  },
  {
    path: '/setListItem',
    name: 'setListItem',
    component: ShowListItem,
  },
  {
    path: '/passKey',
    name: 'passKey',
    component: PassKey,
  },
]

export default vipRouter
