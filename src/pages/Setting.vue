<template>
  <TabBar 
    title=""
    :rightImgShow="false"
    :leftImgShow="false"
  />
  <SettingList />
</template>

<script setup lang="ts">
import TabBar from '../components/TabBar/TabBar.vue';
import SettingList from '../components/SettingList/SettingList.vue';
</script>