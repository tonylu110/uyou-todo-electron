<template>
  <perfect-scrollbar class="list" :style="{justifyContent: justify, backgroundColor: simpleMode ? (!isWin || !isWindows10OrAfter ? '#eeeeee90' : 'transparent') : ''}">
    <slot></slot>
  </perfect-scrollbar>
</template>

<script setup lang="ts">
const os = require("os");

defineProps<{
  justify?: string
}>()

const simpleMode = localStorage.getItem('simpleMode') === 'true'

const isWin = navigator.userAgent.indexOf('Win')>=0
const isWindows10OrAfter = os.release().split('.')[2] > 15063
</script>

<style scoped lang="scss">
.list {
  background-color: #eee;
  width: 100%;
  height: calc(100% - 65px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding-top: 10px;
}
</style>