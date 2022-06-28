<template>
  <div class="list">
    <Item 
      v-for="(item, index) in list"
      :key="index"
      :text="item.text"
      :time="item.id" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import firstLoad from '../../util/firstLoad';
import LocalStorage from '../../util/localStorage';
import Item from './Item/Item.vue';

firstLoad()

const list = ref(LocalStorage('get'))

</script>

<style scoped>
.list {
  background-color: #edd9b7;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding-top: 10px;
}
</style>