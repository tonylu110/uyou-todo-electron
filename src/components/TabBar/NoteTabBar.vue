<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { isLinux, isMac, isWindows10OrAfter } from '../../util/os'
import WindowButtons from './windowButtons'

withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'title',
})

const route = useRoute()
const router = useRouter()

const isBlur = (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && (!isLinux() || isWindows10OrAfter())
</script>

<template>
  <div
    relative h-53px w-screen flex items-center justify-center drag
    :bg="isBlur ? (isMac() && route.name === 'Home' ? 'white/00' : 'white/50 dark:#333/50') : 'white/80 dark:#333/80'"
  >
    <div
      bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
      absolute :left="isMac() ? '80px' : '12px'" :top="isMac() ? '10px' : ''"
      w-20px cursor-pointer rounded-5px p-5px no-drag
      @click="router.back()"
    >
      <div i-ph:caret-left-bold c="#555 dark:#bbb" block text-20px />
    </div>
    <span text-5 font-bold>{{ title }}</span>
    <div fixed right-15px top-14px z-1>
      <WindowButtons />
    </div>
  </div>
</template>
