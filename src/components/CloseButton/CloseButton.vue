<script lang="ts" setup>
import { useRoute } from 'vue-router';

const ipcRenderer = require('electron').ipcRenderer
const route = useRoute()

const close = () => {
    ipcRenderer.send(`close-${(route.name as unknown as string)}`)
}
</script>

<template>
    <div class="close-button" @click="close">
        <span class="material-icons">close</span>
    </div>
</template>

<style lang="scss" scoped>
.close-button {
    position: fixed;
    right: 7.5px;
    top: 7.5px;
    background-color: #e5544b;
    height: 20px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    -webkit-app-region: no-drag;
    cursor: pointer;
    color: white;
    z-index: 1;

    &:hover {
        background-color: #c95047;
    }

    &:active {
        background-color: #99362f;
    }

    span {
        color: white;
        display: block;
        font-size: 12px;
        font-weight: bold;
        margin-left: 1px;
    }
}
</style>