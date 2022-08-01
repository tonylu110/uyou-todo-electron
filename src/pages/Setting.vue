<template>
  <TabBar 
    :title="i18n().settingTitleText"
    :rightImgShow="false"
    :leftImgShow="false"
  />
  <SettingList />
</template>

<script setup lang="ts">
import TabBar from '../components/TabBar/TabBar.vue';
import router from '../router'
import SettingList from '../components/SettingList/SettingList.vue';
import i18n from '../i18n';
</script>