<script lang="ts" setup>
import { ref } from 'vue';
import CloseButton from '../components/CloseButton/CloseButton.vue';

const { ipcRenderer, IpcRendererEvent } = require('electron')
const os = require("os");

const versionShow = ref('')

ipcRenderer.send('get-app-version')
ipcRenderer.on('version', (event: typeof IpcRendererEvent, version: string) => {
  versionShow.value = version
})

const isWindows = navigator.userAgent.indexOf('Win') >= 0
const isMac = navigator.userAgent.indexOf('Mac') >= 0
const isWindows10OrAfter = os.release().split('.')[2] > 15063
</script>

<template>
  <div 
    drag :bg="(!isWindows || !isWindows10OrAfter) ? '#edd9b750' : 'transparent'"
    flex="~ col" justify-center items-center
    w-screen h-screen
  >
    <img 
      w-130px h-130px
      mb-30px
      src="/logo.png" 
      alt=""
    >
    <span c="#7a695c" font-bold text-24px>v{{ versionShow }}</span>
    <span 
      block mt-15px 
      text-14px c="#7a695c" font-bold
    >
      Copyright (c) 2022-present, Anthony Lu
    </span>
    <close-button v-if="!isMac"/>
  </div>
</template>