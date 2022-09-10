<template>
  <div class="page">
    <TabBar 
      :title="i18n().accountPage.account"
      :rightImgShow="false"
      @leftClick="() => router.back()"
      :leftImgShow="form === 'setting'"
    />
    <AccountList />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import router from '../router';
import TabBar from '../components/TabBar/TabBar.vue';
import AccountList from '../components/AccountList/AccountList.vue';
import i18n from '../i18n';
import { useRoute } from 'vue-router';

const form = ref('')
const route = useRoute()

watchEffect(() => {
  form.value = route.query.from as unknown as string
})
</script>