<template>
  <perfect-scrollbar class="list" :style="{justifyContent: justify, backgroundColor: simpleMode ? (isMac ? '#eeeeee90' : 'transparent') : ''}">
    <slot></slot>
  </perfect-scrollbar>
</template>

<script setup lang="ts">
defineProps<{
  justify?: string
}>()

const simpleMode = localStorage.getItem('simpleMode') === 'true'

const isMac = navigator.userAgent.indexOf('Mac')>=0
</script>

<style scoped lang="scss">
.list {
  background-color: #eee;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding-top: 10px;
}
</style>