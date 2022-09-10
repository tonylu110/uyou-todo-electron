<template>
  <div class="page">
    <TabBar 
      :title="i18n().update.updateTitle"
      :rightImgShow="false"
      :leftImgShow="true"
      @leftClick="router.back()"
    />
    <UpdateList />
  </div>
</template>

<script setup lang="ts">
import TabBar from '../components/TabBar/TabBar.vue';
import UpdateList from '../components/UpdateList/UpdateList.vue';
import i18n from '../i18n';
import router from '../router';
</script>