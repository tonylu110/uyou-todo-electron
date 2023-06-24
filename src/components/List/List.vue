<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import LocalStorage from '../../util/localStorage'
import type ITodoList from '../../interface/ITodoListArray'
import i18n from '../../i18n'
import setSwitchFn from '../../util/setSwitchFn'
import Item from './Item/Item.vue'
import saveItemSet from './saveItemSet'
import AddItem from './AddItem/AddItem.vue'

const props = defineProps({
  showAddItem: Boolean,
  listData: {
    default: [] as ITodoList[],
    type: Array,
  },
})

const emits = defineEmits<{
  (e: 'setAddItem'): void
}>()

const route = useRoute()

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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
        }),
      }).then((res) => {
        return res.json()
      }).then((res) => {
        localStorage.setItem('ToDo', res.data)
        list.value = LocalStorage('get') as ITodoList[]
      })
    }
  }
})

function setOk(id: number, isOk: boolean) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id)
      list.value![i].ok = isOk
  }
  for (let i = 0; i < listAll.value!.length; i++) {
    if (listAll.value![i].id === id)
      listAll.value![i].ok = isOk
  }
  saveItemSet(listAll.value!)
}

function addItem(id: number, text: string) {
  emits('setAddItem')
  if (route.query.listName) {
    const item: ITodoList = {
      text,
      id,
      ok: false,
      cate: `${route.query.listName}`,
    }
    list.value!.unshift(item)
    listAll.value!.unshift(item)
    saveItemSet(listAll.value!)
  }
  else {
    const item: ITodoList = {
      text,
      id,
      ok: false,
    }
    list.value!.unshift(item)
    saveItemSet(list.value!)
  }
}

function setAddItem() {
  emits('setAddItem')
}

function deleteItem(id: number) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id)
      list.value!.splice(i, 1)
  }
  for (let i = 0; i < listAll.value!.length; i++) {
    if (listAll.value![i].id === id)
      listAll.value!.splice(i, 1)
  }
  saveItemSet(listAll.value!)
}

const routeName = ref(route.name)
watchEffect(() => {
  routeName.value = route.name
})

function setCate(id: number, cateId: number) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id)
      list.value![i].cate = `${cateId}`
  }
  for (let i = 0; i < listAll.value!.length; i++) {
    if (listAll.value![i].id === id)
      listAll.value![i].cate = `${cateId}`
  }
  saveItemSet(listAll.value!)
}

function setStar(id: number, star: boolean) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id)
      list.value![i].star = star
  }
  for (let i = 0; i < listAll.value!.length; i++) {
    if (listAll.value![i].id === id)
      listAll.value![i].star = star
  }
  saveItemSet(listAll.value!)
}

const showNotDo = ref(localStorage.getItem('notDoShow') === 'true' || localStorage.getItem('notDoShow') === null)
const simpleMode = localStorage.getItem('simpleMode') === 'true'
</script>

<template>
  <perfect-scrollbar class="list">
    <transition name="add">
      <div v-if="showAddItem" ref="add" class="add-list">
        <AddItem
          @set-add-item="setAddItem"
          @add-item="addItem"
        />
      </div>
    </transition>
    <transition-group v-if="routeName === 'Home' || route.query.listName === 'allDo' || route.query.listName === 'allNotDo'" :name="routeName === 'Home' ? 'item' : 'other'">
      <Item
        v-for="item in list"
        :key="item.id"
        ref="item"
        :text="item.text"
        :time="item.id"
        :is-ok="item.ok"
        :is-star="item.star"
        @set-ok="setOk"
        @delete-item="deleteItem"
        @set-cate="setCate"
        @set-star="setStar"
      />
    </transition-group>
    <template v-else name="other">
      <Item
        v-for="item in list.filter(listData => listData.ok === false)"
        :key="item.id"
        ref="item"
        :text="item.text"
        :time="item.id"
        :is-ok="item.ok"
        :is-star="item.star"
        @set-ok="setOk"
        @delete-item="deleteItem"
        @set-cate="setCate"
        @set-star="setStar"
      />
      <div
        v-if="route.query.listName !== 'allDo' && route.query.listName !== 'allNotDo' && list.filter(listData => listData.ok === true).length > 0"
        bg="#fff6dc hover:#f3ebd3 active:#eae2ca" :translate="simpleMode ? 'x-[calc(-50vw+50%+10px)]' : 'x-[calc(((-100vw+300px)/2)+50%+10px)]'"
        whitespace-nowrap mb-10px p-x-10px p-y-5px rounded-5px c="#6e492f"
        font-bold flex items-center cursor-pointer
        shadow="sm black/30"
        @click="setSwitchFn('notDoShow', !showNotDo, () => showNotDo = !showNotDo)"
      >
        <div i-fluent:caret-down-12-filled text-18px mr-5px :rotate="showNotDo ? '0' : '-90'" transition-300 />
        {{ i18n().listMenu.completed }}
        <div
          ml-5px text-10px
          rounded-20px bg="#6e492f" c="#fff6dc"
          w-1rem h-1rem font-normal
          flex items-center justify-center
        >
          {{ list!.filter(listData => listData.ok === true).length }}
        </div>
      </div>
      <template v-if="showNotDo">
        <Item
          v-for="item in list.filter(listData => listData.ok === true)"
          :key="item.id"
          ref="item"
          :text="item.text"
          :time="item.id"
          :is-ok="item.ok"
          :is-star="item.star"
          @set-ok="setOk"
          @delete-item="deleteItem"
          @set-cate="setCate"
          @set-star="setStar"
        />
      </template>
    </template>
    <div
      v-if="list.length === 0"
      i-mdi:list-box-outline top="50%" translate="y-[calc(-50%-20px)]"
      absolute text-150px
      c="#7a695c50"
    />
  </perfect-scrollbar>
</template>

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
