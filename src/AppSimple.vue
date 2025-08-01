<script setup lang="ts">
import type ITodoList from './interface/ITodoListArray'
import { usePreferredDark } from '@vueuse/core'
import { ipcRenderer } from 'electron'
import { ElConfigProvider } from 'element-plus'
import en from 'element-plus/es/locale/lang/en'
import es from 'element-plus/es/locale/lang/es'
import ja from 'element-plus/es/locale/lang/ja'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import setTime from './components/List/Item/setTime'
import OpenPass from './components/OpenPass/OpenPass.vue'
import RouterUrl from './components/RouterUrl'
import { useModeStore } from './store/modeStore'
import emitter from './util/bus'
import getCateList from './util/getCateList'
import LocalStorage from './util/localStorage'
import { isLinux, isWindows10OrAfter } from './util/os'

const modeStore = useModeStore()

ipcRenderer.on('isDev', (_ev, value) => {
  modeStore.setDevMode(value)
})

const { t, locale } = useI18n()

const routerShow = ref((localStorage.getItem('routerUrl') === 'true' || !localStorage.getItem('routerUrl')) && modeStore.isDev)

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

const useOpenPass = ref(localStorage.getItem('useOpenPass') === 'true')
const openPass = ref(localStorage.getItem('openPass') ? localStorage.getItem('openPass') : '')
const passAlert = ref(useOpenPass.value && openPass.value !== '')
</script>

<template>
  <Transition name="open-pass">
    <OpenPass v-if="passAlert" v-model="passAlert" />
  </Transition>
  <ElConfigProvider :locale="useLocale">
    <RouterUrl v-if="routerShow" />
    <div
      :bg="!isBlur ? (isDark ? 'black' : '#aaa') : ''"
      :opacity="passAlert ? '0' : '100'"
      :class="isDark ? 'dark' : ''"
    >
      <div h-100vh w-100vw overflow-hidden>
        <router-view />
      </div>
    </div>
  </ElConfigProvider>
</template>

<style scoped lang="scss">
.open-pass-leave-active {
  transition-property: opacity, top;
  transition-duration: 0.4s, 0.4s;
}

.open-pass-enter-from,
.open-pass-leave-to {
  opacity: 0;
  top: 100%;
}
</style>
