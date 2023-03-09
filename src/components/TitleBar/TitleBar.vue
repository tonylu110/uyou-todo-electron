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
        left: isMac ? '' : '7.5px',
        right: isMac ? '0' : ''
      }"  
      @click="onTopWindow"
    >
      <img :src="isMac || (simpleMode && (routeName !== 'settingSim' && form !== 'setting')) ? './images/top.png' : (topState ? './images/top.png' : './images/top-black.png')" alt="">
    </div>
    <span class="title-text" :style="{color: routeLight ? '#555' : 'white'}">
      {{ simpleMode ? '' : title }}
    </span>
    <!-- <div v-if="isMac" class="close-button-mac button" @click="closeWindow">
      <span class="material-icons">close</span>
    </div>
    <div v-if="isMac" class="min-button-mac button" @click="minWindow">
      <span class="material-icons">horizontal_rule</span>
    </div>
    <div v-if="isMac" class="min-button-mac button max" @click="maxWindow">
      <span class="material-icons">check_box_outline_blank</span>
    </div> -->
    <div v-if="!isMac" class="min-button button" @click="minWindow">
      <span class="material-icons" :style="{color: routeLight ? '#555' : 'white'}">horizontal_rule</span>
    </div>
    <div v-if="!isMac && !simpleMode" class="min-button button" @click="maxWindow">
      <span class="material-icons" :style="{color: routeLight ? '#555' : 'white'}">check_box_outline_blank</span>
    </div>
    <div v-if="!isMac" class="close-button button" @click="closeWindow">
      <span class="material-icons">close</span>
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
}

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
const listMenuColor = ref('')
if (isWindows && (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null)) {
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