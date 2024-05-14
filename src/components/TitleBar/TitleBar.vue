<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import emitter from '../../util/bus'
import { closeWindow, minWindow, topWindow } from '../../util/windowApi'
import firstLoad from './firstLoad'

// eslint-disable-next-line ts/no-var-requires, ts/no-require-imports
const os = require('node:os')

const isMac = navigator.userAgent.includes('Mac')

const titleBarShow = !(localStorage.getItem('systemTitle') === 'true')

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

// const title = ref('uyou ToDo')
// const route = useRoute()
// watchEffect(() => {
//   switch (route.name) {
//     case 'account':
//       title.value = i18n().accountPage.account
//       break;
//     case 'setting':
//       title.value = i18n().settingTitleText
//       break;
//     default:
//       title.value = 'uyou ToDo'
//       break;
//   }
// })

const isWindows = navigator.userAgent.includes('Win')
const isWindows10OrAfter = os.release().split('.')[2] > 15063
const listMenuColor = ref('')
if (isWindows && (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && isWindows10OrAfter)
  listMenuColor.value = '#fff6dc00'

const simpleMode = localStorage.getItem('simpleMode') === 'true'

const routeName = ref('')
const routeQueryName = ref('')
const route = useRoute()

const form = ref('')

const routeLight = ref(false)

watchEffect(() => {
  routeName.value = route.name as unknown as string
  routeQueryName.value = route.query.listName as unknown as string
  form.value = route.query.from as unknown as string
  routeLight.value = routeName.value === 'settingSim' || form.value === 'setting' || routeName.value === 'setting' || routeName.value === 'account'
})
</script>

<template>
  <div
    v-if="titleBarShow"
    class="title-bar"
    bg-transparent
    :style="{
      justifyContent: isMac ? 'flex-start' : '',
      width: simpleMode ? '100vw' : '',
      marginLeft: simpleMode ? '0' : '',
    }"
  >
    <div
      :bg="topState ? 'error-d hover:error-h active:error-a' : 'black/10 hover:black/20 active:black/30'"
      :right="isMac ? '12px' : ''"
      :left="isMac ? '' : '12px'"

      absolute mt-5px h-13px w-13px flex cursor-pointer items-center justify-center rounded-5px rounded-full p-6px no-drag
      @click="onTopWindow"
    >
      <div i-fluent:pin-12-filled text-13px :c="topState ? 'white' : '#555'" />
    </div>
    <!-- <span class="title-text" c="!#555" mt-5px>
      {{ title }}
    </span> -->
    <div
      v-if="!isMac"
      bg="black/10 hover:black/20 active:black/30"

      absolute right-42px mt-5px h-13px w-13px flex cursor-pointer items-center justify-center rounded-5px rounded-full p-6px no-drag
      @click="minWindow"
    >
      <div i-mdi:minus-thick text-13px c="#555" />
    </div>
    <div
      v-if="!isMac"
      bg="black/10 hover:error-d active:error-a"

      absolute right-12px mt-5px h-13px w-13px flex cursor-pointer items-center justify-center rounded-5px rounded-full p-6px no-drag
      class="group"
      @click="closeWindow()"
    >
      <div i-mdi:close-thick text-13px c="#555 group-hover:white" />
    </div>
    <div v-if="!simpleMode" class="list-menu-color" :style="{ backgroundColor: listMenuColor }" />
    <div v-if="!simpleMode" class="list-menu-drag" />
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
