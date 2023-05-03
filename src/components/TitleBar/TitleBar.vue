<template>
  <div
    class="title-bar"
    :style="{
      justifyContent: isMac ? 'flex-start' : '',
      width: simpleMode ? '100vw' : '',
      marginLeft: simpleMode ? '0' : '',
      backgroundColor: routeLight ? 'white' : '',
      borderBottom: routeLight ? '1px solid #00000020' : ''
    }"
    v-if="titleBarShow"
  >
    <div 
      :class="topState ? 'on-top-button-sel button' :'on-top-button button'"
      :style="{
        left: isMac ? '' : '10px',
        right: isMac ? '0' : '',
        border: (form === 'setting' || routeName === 'setting' || routeName === 'account' || routeName === 'settingSim') && topState ? '' : '1px solid #00000020'
      }"  
      @click="onTopWindow"
    >
      <div i-fluent:pin-48-filled text-14px :c="(isMac && !simpleMode && !routeLight) || (simpleMode && (routeName !== 'settingSim' && form !== 'setting')) ? 'white' : (topState ? 'white' : '#777')"></div>
    </div>
    <span class="title-text" :style="{color: routeLight ? '#555' : 'white'}">
      {{ simpleMode ? '' : title }}
    </span>
    <div v-if="!isMac" class="min-button button" @click="minWindow" :style="{border: form === 'setting' || routeName === 'account' || routeName === 'settingSim' || routeName === 'setting' ? '1px solid #00000020' : ''}">
      <div i-fluent-emoji-high-contrast:minus :c="routeLight ? '#777' : 'white'" text-10px></div>
    </div>
    <div v-if="!isMac && !simpleMode" class="min-button button" @click="maxWindow" :style="{border: form === 'setting' || routeName === 'account' || routeName === 'setting' ? '1px solid #00000020' : ''}">
      <div i-fluent:checkbox-unchecked-12-filled :c="routeLight ? '#777' : 'white'" text-14px></div>
    </div>
    <div v-if="!isMac" class="close-button button" @click="closeWindow">
      <div i-mdi:close-thick c-white text-12px></div>
    </div>
    <div class="list-menu-color" :style="{backgroundColor: listMenuColor}" v-if="!simpleMode"></div>
    <div class="list-menu-drag" v-if="!simpleMode"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import firstLoad from './firstLoad';
import i18n from '../../i18n';
import emitter from '../../util/bus';

const os = require('os')

const isMac = navigator.userAgent.indexOf('Mac')>=0

const titleBarShow = !(localStorage.getItem('systemTitle') === 'true')

const ipcRenderer = require('electron').ipcRenderer
const closeWindow = () => {
  ipcRenderer.send("window-close")
}

const minWindow = () => {
  ipcRenderer.send("window-min")
}

const maxWindow = () => {
  ipcRenderer.send("window-max")
}

const topState = ref(firstLoad())
const onTopWindow = () => {
  topState.value = !topState.value
  ipcRenderer.send('window-on-top', topState.value)
  localStorage.setItem('alwaysOnTop', topState.value + '')
  emitter.emit('topWindow', topState.value)
}
emitter.on('topWindow', (data: unknown) => {
  topState.value = (data as boolean)
})

const title = ref('uyou ToDo')
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

const isWindows = navigator.userAgent.indexOf('Win')>=0
const isWindows10OrAfter = os.release().split('.')[2] > 15063
const listMenuColor = ref('')
if (isWindows && (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && isWindows10OrAfter) {
  listMenuColor.value = '#fff6dc00'
}

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

<style lang="scss" scoped>
@import './style.scss';
</style>