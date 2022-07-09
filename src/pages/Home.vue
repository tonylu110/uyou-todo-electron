<template>
  <TabBar
    @onAddClick="() => showAddItem = true" 
  />
  <List
    :showAddItem="showAddItem" 
    @setAddItem="() => showAddItem = false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TabBar from '../components/TabBar/TabBar.vue';
import List from '../components/List/List.vue';

const showAddItem = ref(false)
</script>

<style scoped>

</style>