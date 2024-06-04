<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { cateItem } from '../ListMenu/ICateItem'
import LocalStorage from '../../util/localStorage'
import emitter from '../../util/bus'
import changeCate from '../ListMenu/changCate'
import saveItemSet from '../List/saveItemSet'
import type ITodoList from '../../interface/ITodoListArray'
import NoteBox from './NoteBox/NoteBox.vue'
import AddItem from './AddItem/AddItem.vue'

interface addCate {
  name: string
  icon: string
  color?: string
}

const { t } = useI18n()

const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
const cateList: cateItem[] = reactive(JSON.parse(localCateList!).data)

const list = ref(LocalStorage('get'))
const otherList = ref(list.value!.filter(listData => listData.cate === undefined))

emitter.on('addCateNote', (date) => {
  const cate = date as addCate

  cateList.push({
    id: new Date().getTime(),
    title: cate.name,
    icon: cate.icon,
    color: cate.color ? cate.color : 'primary-d',
  })
  localStorage.setItem('cate', JSON.stringify({
    data: cateList,
  }))
  if (localStorage.getItem('uid')) {
    changeCate({
      uid: localStorage.getItem('uid')!,
      data: {
        data: cateList,
      },
    })
  }
})

function delCate(id: number) {
  for (let i = 0; i < cateList.length; i++) {
    if (cateList[i].id === id)
      cateList.splice(i, 1)
  }
  localStorage.setItem('cate', JSON.stringify({
    data: cateList,
  }))
  if (localStorage.getItem('uid')) {
    changeCate({
      uid: localStorage.getItem('uid')!,
      data: {
        data: cateList,
      },
    })
  }
}

function delWithToDo(id: number) {
  const listAll = ref<ITodoList[]>(LocalStorage('get')!)

  const resultArr = listAll.value.filter((value) => {
    return value.cate !== `${id}`
  })

  saveItemSet(resultArr)

  delCate(id)
}

const openAddItem = ref(false)
const itemText = ref('')
const cateid = ref<number>()
emitter.on('noteShowAddItem', (cateId) => {
  cateid.value = cateId as number
  openAddItem.value = true
})
function addItem(time: string) {
  emitter.emit('noteAddItem', { text: itemText.value, cateid: cateid.value, time })
  itemText.value = ''
  openAddItem.value = false
}
function close() {
  openAddItem.value = false
  itemText.value = ''
}
</script>

<template>
  <div
    w-75vw no-drag col-gap-20px
    col-count="1 sm:2 md:3 lg:4 xl:5"
  >
    <NoteBox
      v-for="item in cateList"
      :id="item.id"
      :key="item.id"
      :title="item.title"
      :color="item.color"
      :icon="item.icon"
      @delete-cate="delCate"
      @del-with-to-do="delWithToDo"
    />
    <NoteBox
      v-if="otherList.length > 0"
      :title="t('noteui.other')"
      :other-cate="true"
    />
    <AddItem v-model="itemText" :open="openAddItem" @close="close" @add="addItem" />
  </div>
</template>
