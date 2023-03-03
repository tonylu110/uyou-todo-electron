<template>
  <div class="app-main">
    <title-bar/>
    <div class="app-list" :style="{height: titleBarShow ? 'calc(100vh - 65px)' : ''}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBar from "./components/TitleBar/TitleBar.vue";

const titleBarShow = localStorage.getItem('systemTitle') === 'true'
</script>

<style scoped lang="scss">
.app-list {
  width: 100vw;
  height: calc(100vh - 106px);
}
</style>