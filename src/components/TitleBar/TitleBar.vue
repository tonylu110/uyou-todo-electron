<template>
  <div class="title-bar">
    <div class="min-button" @click="minWindow()">
      <img src="/images/min.png" alt="">
    </div>
    <div class="close-button" @click="closeWindow()">
      <img src="/images/close.png" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
const ipcRenderer = require('electron').ipcRenderer
const closeWindow = () => {
  ipcRenderer.send("window-close")
}

const minWindow = () => {
  ipcRenderer.send("window-min")
}
</script>

<style lang="scss" scoped>
.title-bar {
  -webkit-app-region: drag;
  background-color: #7a695c;
  width: 100%;
  height: 40px;
  border-bottom: 1.5px solid #594b4270;
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
  }

  .close-button {
    background-color: #e5544b;

    &:hover {
      background-color: #c95047;
    }

    &:active {
      background-color: #99362f;
    }
  }

  .min-button {
    border: 0.5px solid #594b4270;

    &:hover {
      background-color: #00000010;
    }

    &:active {
      background-color: #00000030;
    }
  }
}
</style>