<template>
  <TabBar 
    title="账号"
    :rightImgShow="false"
    leftImg="./images/back.png"
    @leftClick="() => router.push('/setting')"
  />
  <AccountList />
</template>

<script setup lang="ts">
import router from '../router';
import TabBar from '../components/TabBar/TabBar.vue';
import AccountList from '../components/AccountList/AccountList.vue';

</script>

<style scoped>

</style>