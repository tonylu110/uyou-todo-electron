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
const backgroundColor = !isWindows || !isWindows10OrAfter ? '#edd9b750' : '#ffffff00'
</script>

<template>
    <div class="background">
        <img src="/logo.png" alt="">
        <span class="version">v{{ versionShow }}</span>
        <span class="copyright">Copyright (c) 2022-present, Anthony Lu</span>
        <close-button v-if="!isMac"/>
    </div>
</template>

<style lang="scss" scoped>
.background {
    -webkit-app-region: drag;
    background-color: v-bind(backgroundColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;

    img {
        width: 130px;
        height: 130px;
        margin-bottom: 30px;
    }

    span {
        color: #7a695c;
        font-weight: bold;
        font-size: 24px;

        &.copyright {
            font-size: 14px !important;
            display: block;
            margin-top: 15px;
        }
    }
}
</style>