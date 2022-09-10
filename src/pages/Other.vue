<template>
  <div class="page">
    <TabBar
      @leftClick="() => router.push('/setting')"
      leftImg="settings"
      :title="title"
      :leftImgShow="false"
      :rightImgShow="false"
    />
    <List
      :listData="listData"
    />
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, watchEffect } from 'vue';
import TabBar from '../components/TabBar/TabBar.vue';
import List from '../components/List/List.vue';
import router from '../router';
import { useRoute } from 'vue-router';
import LocalStorage from '../util/localStorage';
import ITodoList from '../interface/ITodoListArray';
import i18n from '../i18n';

const title = ref('')

const listData = ref([]) as unknown as Ref<ITodoList[]>

const route = useRoute()
const list = ref(LocalStorage('get'))
watchEffect(() => {
  if (route.query.listName === 'allNotDo') {
    listData.value = list.value!.filter(listData => listData.ok === false)
    title.value = i18n().listMenu.incompleted
  } else if (route.query.listName === 'allDo') {
    listData.value = list.value!.filter(listData => listData.ok === true)
    title.value = i18n().listMenu.completed
  }
})
</script>