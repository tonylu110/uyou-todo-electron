<template>
  <div class="list">
    <AddItem 
      v-if="showAddItem"
      @setAddItem="setAddItem"
      @addItem="addItem"
    />
    <Item 
      v-for="(item, index) in list"
      :key="index"
      :text="item.text"
      :time="item.id" 
      :isOk="item.ok"
      @setOk="setOk"
      @deleteItem="deleteItem"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import firstLoad from '../../util/firstLoad';
import LocalStorage from '../../util/localStorage';
import Item from './Item/Item.vue';
import saveItemSet from './saveItemSet'
import AddItem from './AddItem/AddItem.vue';
import ITodoList from '../../interface/ITodoListArray';

defineProps({
  showAddItem: Boolean,
})

firstLoad()

const list = ref(LocalStorage('get'))

onMounted(() => {
  const uid = localStorage.getItem('uid')
  if (uid !== '' && uid !== null) {
    document.addEventListener("storage", () => {
      list.value = LocalStorage('get')
    })
  }
})

const setOk = (id: number, isOk: boolean) => {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id) {
      list.value![i].ok = isOk
    }
  }
  saveItemSet(list.value!)
}

const addItem = (id: number, text: string) => {
  emits('setAddItem')
  const item: ITodoList = {
    text: text,
    id: id,
    ok: false
  }
  list.value!.unshift(item)
  saveItemSet(list.value!)
}

const emits = defineEmits<{
  (e: 'setAddItem'): void
}>()

const setAddItem = () => {
  emits('setAddItem')
}

const deleteItem = (id: number) => {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id) {
      list.value!.splice(i, 1)
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