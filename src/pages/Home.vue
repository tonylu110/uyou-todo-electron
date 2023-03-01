<template>
  <TabBar
    @rightClick="() => showAddItem = !showAddItem"
    @leftClick="() => router.push('/setting')"
    leftImg="settings"
    :title="i18n().listMenu.allTodo"
    :leftImgShow="false"
  />
  <List
    :showAddItem="showAddItem" 
    @setAddItem="() => showAddItem = false"
    :listData="listData"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TabBar from '../components/TabBar/TabBar.vue';
import List from '../components/List/List.vue';
import router from '../router';
import firstLoad from '../util/firstLoad';
import LocalStorage from '../util/localStorage';
import ITodoList from '../interface/ITodoListArray';
import i18n from '../i18n';

const showAddItem = ref(false)

firstLoad()

const listData = LocalStorage('get') as ITodoList[]
</script>