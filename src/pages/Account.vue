<template>
  <TabBar 
    :title="i18n().accountPage.account"
    :rightImgShow="false"
    @leftClick="() => router.back()"
    :leftImgShow="false"
  />
  <AccountList />
</template>

<script setup lang="ts">
import router from '../router';
import TabBar from '../components/TabBar/TabBar.vue';
import AccountList from '../components/AccountList/AccountList.vue';
import i18n from '../i18n';
</script>

<style scoped>

</style>