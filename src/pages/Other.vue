<template>
  <TabBar
    @leftClick="() => router.push('/setting')"
    leftImg="settings"
    title=""
    :leftImgShow="false"
    :rightImgShow="false"
  />
  <List
    :listData="[]"
  />
</template>

<script setup lang="ts">
import TabBar from '../components/TabBar/TabBar.vue';
import List from '../components/List/List.vue';
import router from '../router';
</script>