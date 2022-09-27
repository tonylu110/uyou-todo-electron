<template>
  <TabBar 
    :title="i18n().otherList.toDonate"
    :rightImgShow="false"
    :leftImgShow="true"
    @leftClick="router.back()"
  />
  <DonateList/>
</template>

<script setup lang="ts">
import TabBar from '../components/TabBar/TabBar.vue';
import DonateList from '../components/DonateList/DonateList.vue'
import router from '../router';
import i18n from '../i18n';
</script>

<style scoped>

</style>