<script lang="ts" setup>
import { useRoute } from 'vue-router';

const ipcRenderer = require('electron').ipcRenderer
const route = useRoute()

const close = () => {
  ipcRenderer.send(`close-${(route.name as unknown as string)}`)
}
</script>

<template>
  <div 
    fixed right-7.5px top-7.5px
    bg="#e5544b hover:#c95047 active:#99362f"
    h-20px w-50px
    flex items-center justify-center
    rounded-5px 
    no-drag
    cursor-pointer
    c-white
    z-1
    @click="close"
  >
    <div i-mdi:close-thick c-white text-12px ml-1px></div>
  </div>
</template>