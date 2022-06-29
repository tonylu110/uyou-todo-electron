<template>
  <div class="list">
    <Item 
      v-for="(item, index) in list"
      :key="index"
      :text="item.text"
      :time="item.id" 
      :isOk="item.ok"
      @setOk="setOk"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import firstLoad from '../../util/firstLoad';
import LocalStorage from '../../util/localStorage';
import Item from './Item/Item.vue';
import saveItemSet from './saveItemSet'

firstLoad()

const list = ref(LocalStorage('get'))

const setOk = (id: number, isOk: boolean) => {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id) {
      list.value![i].ok = isOk
    }
  }
  saveItemSet(list.value!)
}
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