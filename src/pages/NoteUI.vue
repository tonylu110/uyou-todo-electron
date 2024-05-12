<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import WindowButtons from '../components/TabBar/windowButtons'
import SettingList from '../components/SettingList'
import NoteList from '../components/NoteList/NoteList.vue'
import CateAdd from '../components/NoteList/CateAdd/CateAdd.vue'
import firstLoad from '../components/TitleBar/firstLoad'
import { topWindow } from '../util/windowApi'
import emitter from '../util/bus'
import { isMac } from '../util/os'

const router = useRouter()

const showCateAdd = ref(false)

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
</script>

<template>
  <SettingList h="![calc(100vh-160px)]" p-y="!80px" drag>
    <div
      v-if="!isMac()"
      :bg="topState
        ? 'error-d hover:error-h active:error-a'
        : 'black/10 hover:black/20 active:black/30'"
      fixed left-15px top-14px mr-7px h-13px w-13px flex cursor-pointer
      items-center justify-center rounded-5px rounded-full p-6px no-drag
      @click="onTopWindow"
    >
      <div i-fluent:pin-12-filled text-13px :c="topState ? 'white' : '#555'" />
    </div>

    <div fixed right-15px top-14px>
      <WindowButtons />
    </div>

    <NoteList />

    <div
      flex="~ gap-10px" fixed bottom-15px right-15px no-drag
    >
      <div
        bg="primary-d active:primary-a"
        transition="duration-300 all"
        rounded="10px hover:30px"
        shadow="md" flex items-center justify-center p-13px active:transform-scale-90
        @click="showCateAdd = true"
      >
        <div i-ph:plus-bold text-22px c-white />
      </div>
      <div

        bg="primary-d active:primary-a"
        transition="duration-300 all"
        rounded="10px hover:30px"
        shadow="md" flex items-center justify-center p-13px active:transform-scale-90
        @click="router.push('/setting')"
      >
        <div i-ph:gear-fine-bold text-22px c-white />
      </div>
    </div>
    <CateAdd :open="showCateAdd" @close="showCateAdd = false" />
  </SettingList>
</template>
