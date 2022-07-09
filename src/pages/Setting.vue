<template>
  <TabBar 
    title="设置"
    :rightImgShow="false"
    leftImg="./images/back.png"
    @leftClick="() => router.push('/')"
  />
  <SettingList />
</template>

<script setup lang="ts">
import TabBar from '../components/TabBar/TabBar.vue';
import router from '../router'
import SettingList from '../components/SettingList/SettingList.vue';
</script>