<script setup lang="ts">
import TitleBar from './components/TitleBar/TitleBar.vue';
</script>

<template>
  <div class="list-main">
    <TitleBar />
    <router-view></router-view>
  </div>
</template>

<style>
::-webkit-scrollbar {
    display: none;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  user-select: none;
}

.list-main {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
