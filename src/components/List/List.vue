<template>
  <perfect-scrollbar class="list">
    <transition name="add">
      <div v-if="showAddItem" ref="add" class="add-list">
        <AddItem
          @setAddItem="setAddItem"
          @addItem="addItem"
        />
      </div>
    </transition>
    <transition-group :name="routeName === 'Home' ? 'item' : 'other'">
      <Item
        v-for="item in list"
        :key="item.id"
        :text="item.text"
        :time="item.id"
        :isOk="item.ok"
        @setOk="setOk"
        @deleteItem="deleteItem"
        ref="item"
      />
    </transition-group>
    <div 
      i-mdi:list-box-outline 
      top="50%" translate="y-[calc(-50%-20px)]" absolute 
      text-150px c="#7a695c50"
      v-if="list.length === 0"
    ></div>
  </perfect-scrollbar>
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

const routeName = ref(route.name)
watchEffect(() => {
  routeName.value = route.name
})
</script>

<style scoped lang="scss">
.list {
  background-color: #edd9b7;
  height: calc(100% - 65px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding-top: 10px;

  .add-list {
    width: calc(100% - 20px);
  }
}

.add-enter-from,
.add-leave-to {
  margin-top: calc(-114px - 4rem);
}

.add-enter-to,
.add-leave-from {
  margin-top: 0;
}

.add-enter-active,
.add-leave-active {
  transition: margin .3s;
}

.item-leave-to {
  transform: translate(-120%);
}

.item-enter-from,
.item-enter-to,
.item-leave-from {
  transform: translateX(0);
}

.item-enter-active,
.item-leave-active {
  transition: transform .4s;
}

.item-move {
  transition: all .5s;
}
</style>