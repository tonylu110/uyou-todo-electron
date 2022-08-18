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
    <span v-if="list.length === 0" class="material-icons">list_alt</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, watchEffect } from 'vue';
import LocalStorage from '../../util/localStorage';
import Item from './Item/Item.vue';
import saveItemSet from './saveItemSet'
import AddItem from './AddItem/AddItem.vue';
import ITodoList from '../../interface/ITodoListArray';
import { useRoute } from 'vue-router';

const route = useRoute()

const props = defineProps({
  showAddItem: Boolean,
  listData: {
    default: [] as ITodoList[],
    type: Array
  }
})

const list: Ref<ITodoList[]> = ref(props.listData) as Ref<ITodoList[]>
const listAll = ref(LocalStorage('get'))

watchEffect(() => {
  list.value = props.listData as unknown as ITodoList[]
})

onMounted(() => {
  if (route.name === 'Home') {
    const uid = localStorage.getItem('uid')
    const autoSync = localStorage.getItem('autoSync') === 'true' || localStorage.getItem('autoSync') === null
    if ((uid !== '' && uid !== null) && autoSync) {
      fetch('https://api.todo.uyou.org.cn/gettodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: uid
        })
      }).then(res => {
        return res.json()
      }).then(res => {
        localStorage.setItem('ToDo', res.data)
        list.value = LocalStorage('get') as ITodoList[]
      })
    }
  }
})

const setOk = (id: number, isOk: boolean) => {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id) {
      list.value![i].ok = isOk
    }
  }
  for (let i = 0; i < listAll.value!.length; i++) {
    if (listAll.value![i].id === id) {
      listAll.value![i].ok = isOk
    }
  }
  saveItemSet(listAll.value!)
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
  for (let i = 0; i < listAll.value!.length; i++) {
    if (listAll.value![i].id === id) {
      listAll.value!.splice(i, 1)
    }
  }
  saveItemSet(listAll.value!)
}
</script>

<style scoped lang="scss">
.list {
  background-color: #edd9b7;
  width: calc(100vw - 300px);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding-top: 10px;

  .material-icons {
    position: absolute;
    top: 50%;
    font-size: 150px;
    transform: translateY(calc(-50% + 20px));
    color: #00000020;
  }
}
</style>