<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { usePreferredDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import ja from 'element-plus/es/locale/lang/ja'
import es from 'element-plus/es/locale/lang/es'
import en from 'element-plus/es/locale/lang/en'
import { ElConfigProvider } from 'element-plus'
import RouterUrl from './components/RouterUrl'
import emitter from './util/bus'
import isDev from './util/mode'
import getCateList from './util/getCateList'
import { isLinux, isWindows10OrAfter } from './util/os'
import LocalStorage from './util/localStorage'
import type ITodoList from './interface/ITodoListArray'
import setTime from './components/List/Item/setTime'

const route = useRoute()
const router = useRouter()
const isWinDow = ref(true)

const { t, locale } = useI18n()

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

function setAllDarkMode(dark: boolean) {
  if (dark)
    document.querySelector('html')?.classList.add('dark')
  else
    document.querySelector('html')?.classList.remove('dark')
}

setAllDarkMode(isDark.value)

watch(isDark, (newValue) => {
  setAllDarkMode(newValue)
})

const isBlur = (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && (!isLinux() || isWindows10OrAfter())

const useLocale = computed(() => {
  if (locale.value === 'zh-cn')
    return zhCn
  else if (locale.value === 'zh-tw')
    return zhTw
  else if (locale.value === 'ja')
    return ja
  else if (locale.value === 'es')
    return es
  else
    return en
})

onMounted(() => {
  const listData = LocalStorage('get') as ITodoList[]

  listData.forEach((item) => {
    if (item.time)
      setTime(item.time, item.text, t('todo-time'))
  })
})
</script>

<template>
  <ElConfigProvider :locale="useLocale">
    <RouterUrl v-if="routerShow" />
    <div :class="isDark ? 'dark' : ''">
      <router-view name="isWindow" />
    </div>
    <div
      v-if="!isWinDow"
      :bg="!isBlur ? (isDark ? 'black' : '#e5e5e5') : ''"
      :class="isDark ? 'dark' : ''"
    >
      <div overflow-hidden w-100vw h-100vh>
        <router-view />
      </div>
    </div>
  </ElConfigProvider>
</template>
