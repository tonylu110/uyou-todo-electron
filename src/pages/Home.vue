<template>
  <TabBar
    @rightClick="() => showAddItem = true" 
    @leftClick="() => router.push('/setting')"
    leftImg="settings"
    title=""
    :leftImgShow="false"
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
import router from '../router';

const showAddItem = ref(false)
</script>