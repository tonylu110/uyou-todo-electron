import type { RouteRecordRaw } from 'vue-router'
import Laboratory from '../../pages/Laboratory'

const labRouter: Readonly<RouteRecordRaw[]> = [
  {
    path: '/lab',
    name: 'lab',
    component: Laboratory,
  },
]

export default labRouter
