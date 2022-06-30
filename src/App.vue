<script setup lang="ts">
import { ref } from 'vue';
import TabBar from './components/TabBar/TabBar.vue';
import List from './components/List/List.vue';
import TitleBar from './components/TitleBar/TitleBar.vue';

const showAddItem = ref(false)
</script>

<template>
  <div class="list-main">
    <TitleBar />
    <TabBar
      @onAddClick="() => showAddItem = true" 
    />
    <List
      :showAddItem="showAddItem" 
      @setAddItem="() => showAddItem = false"
    />
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
