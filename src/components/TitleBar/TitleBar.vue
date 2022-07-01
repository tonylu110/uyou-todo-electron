<template>
  <div class="title-bar" :style="{justifyContent: isMac ? 'flex-start' : ''}">
    <div 
      :class="topState ? 'on-top-button-sel' :'on-top-button'"
      :style="{
        left: isMac ? '' : '7.5px',
        right: isMac ? '0' : ''
      }"  
      @click="onTopWindow"
    >
      <img src="/images/top.png" alt="">
    </div>
    <div v-if="isMac" class="close-button-mac" @click="closeWindow">
      <img src="/images/close.png" alt="">
    </div>
    <div v-if="isMac" class="min-button-mac" @click="minWindow">
      <img src="/images/min.png" alt="">
    </div>
    <div v-if="!isMac" class="min-button" @click="minWindow">
      <img src="/images/min.png" alt="">
    </div>
    <div v-if="!isMac" class="close-button" @click="closeWindow">
      <img src="/images/close.png" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import firstLoad from './firstLoad';

const isMac = navigator.userAgent.indexOf('Mac')>=0

const ipcRenderer = require('electron').ipcRenderer
const closeWindow = () => {
  ipcRenderer.send("window-close")
}

const minWindow = () => {
  ipcRenderer.send("window-min")
}

const topState = ref(firstLoad())
const onTopWindow = () => {
  topState.value = !topState.value
  ipcRenderer.send('window-on-top', topState.value)
  localStorage.setItem('alwaysOnTop', topState.value + '')
}
</script>

<style lang="scss" scoped>
.title-bar {
  -webkit-app-region: drag;
  background-color: #7a695c;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #594b4270;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  div {
    margin-top: 2px;
    height: 20px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 7.5px;
    border-radius: 5px;
    -webkit-app-region: no-drag;
    cursor: pointer;

    img {
      width: 12px;
      height: 12px;
    }

    &.close-button {
      background-color: #e5544b;
      width: 52px;
      height: 21px;
      margin-top: 1px;

      &:hover {
        background-color: #c95047;
      }

      &:active {
        background-color: #99362f;
      }
    }

    &.min-button {
      border: 0.5px solid #594b4270;

      &:hover {
        background-color: #00000010;
      }

      &:active {
        background-color: #00000030;
      }
    }

    &.close-button-mac {
      @extend .close-button;
      margin-left: 7.5px;
      width: 21px;
    }

    &.min-button-mac {
      @extend .min-button;
      width: 20px;
    }

    &.on-top-button {
      @extend .min-button;
      position: absolute;
    }

    &.on-top-button-sel {
      @extend .close-button;
      position: absolute;
    }
  }
}
</style>