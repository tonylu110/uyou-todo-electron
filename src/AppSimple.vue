<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { usePreferredDark } from '@vueuse/core'
import RouterUrl from './components/RouterUrl'
import emitter from './util/bus'
import isDev from './util/mode'
import getCateList from './util/getCateList'
import { isLinux, isWindows10OrAfter } from './util/os'

const route = useRoute()
const router = useRouter()
const isWinDow = ref(true)

router.isReady().then(() => {
  isWinDow.value = route.query.isWin === 'true'
})

const routerShow = ref((localStorage.getItem('routerUrl') === 'true' || !localStorage.getItem('routerUrl')) && isDev)

emitter.on('routerShow', (data: unknown) => {
  routerShow.value = (data as boolean)
})

onBeforeUnmount(() => {
  emitter.off('routerShow')
})

onMounted(() => {
  setTimeout(() => {
    getCateList()
  }, 0)
})

const isDark = usePreferredDark()

const isBlur = (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && (!isLinux() || isWindows10OrAfter())
</script>

<template>
  <RouterUrl v-if="routerShow" />
  <router-view name="isWindow" />
  <div
    v-if="!isWinDow"
    :bg="!isBlur ? (isDark ? 'black' : '#e5e5e5') : ''"
    :class="isDark ? 'dark' : ''"
  >
    <div overflow-hidden w-100vw h-100vh>
      <router-view />
    </div>
  </div>
</template>
