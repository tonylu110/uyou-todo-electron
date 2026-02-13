<script setup lang="ts" vapor>
import { onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import emitter from '../../util/bus'
import { isLinux, isMac, isWindows10OrAfter } from '../../util/os'
import { topWindow } from '../../util/windowApi'
import Beta from '../Beta/Beta.vine'
import firstLoad from '../TitleBar/firstLoad'
import WindowButtons from './windowButtons'

interface Props {
  title?: string
  showBeta?: boolean
  useAiBg?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'title',
})

const route = useRoute()
const router = useRouter()

const topState = ref(firstLoad())
function onTopWindow() {
  topState.value = !topState.value
  topWindow(topState.value)
  localStorage.setItem('alwaysOnTop', `${topState.value}`)
  emitter.emit('topWindow', topState.value)
}
emitter.on('topWindow', (data: unknown) => {
  topState.value = (data as boolean)
})

onUnmounted(() => {
  emitter.off('topWindow')
})

const isBlur = (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && (!isLinux() || isWindows10OrAfter())

const systemTitle = localStorage.getItem('systemTitle') === 'true'
</script>

<template>
  <div
    relative z-1 h-53px w-screen flex items-center justify-center drag
    :bg="isBlur ? (isMac() && route.name === 'Home' ? 'white/00' : 'white/50 dark:#333/50') : 'white/80 dark:#333/80'"
  >
    <div
      absolute :left="isMac() ? '85px' : '12px'" :top="isMac() ? '10px' : ''"
      flex items-center
    >
      <div
        v-if="!isMac() && !systemTitle"
        :bg="topState
          ? 'error-d hover:error-h active:error-a'
          : 'black/10 hover:black/20 active:black/30'"
        m="r-3 l-3px" h-13px w-13px flex cursor-pointer
        items-center justify-center rounded-5px rounded-full p-6px no-drag
        @click="onTopWindow"
      >
        <div i-fluent:pin-12-filled text-13px :c="topState ? 'white' : '#555'" />
      </div>
      <div
        bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
        w-20px cursor-pointer rounded-5px p-5px no-drag
        @click="router.back()"
      >
        <div i-ph:caret-left-bold c="#555 dark:#bbb" block text-20px />
      </div>
    </div>
    <div flex items-end>
      <span text-5 font-bold>{{ title }}</span>
      <Beta v-if="showBeta" :useAiBg mb-1 ml-1 />
    </div>
    <div v-if="!systemTitle" fixed right-15px top-14px z-1>
      <WindowButtons />
    </div>
  </div>
</template>
