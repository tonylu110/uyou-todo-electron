<template>
  <TabBar 
    title="捐赠"
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

</script>

<style scoped>

</style>