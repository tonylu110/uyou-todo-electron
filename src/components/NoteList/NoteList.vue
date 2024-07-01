<script setup lang="ts">
import { onBeforeUnmount, reactive, ref } from 'vue'
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

function delCate(id: number | string) {
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

function delWithToDo(id: number | string) {
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
  list.value!.unshift({
    ok: false,
    id: new Date().getTime(),
    text: itemText.value,
    cate: `${cateid.value}`,
    time: Number(time),
  })

  saveItemSet(list.value!)
  itemText.value = ''
  openAddItem.value = false
}
function close() {
  openAddItem.value = false
  itemText.value = ''
}

function del(id: number) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id)
      list.value!.splice(i, 1)
  }
  saveItemSet(list.value!)
}
emitter.on('searchDelete', (id) => {
  const useId = id as number

  del(useId)
})

function setOk(id: number, isOk: boolean) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id)
      list.value![i].ok = isOk
  }
  saveItemSet(list.value!)
}
emitter.on('searchSetOk', (data) => {
  const useData = data as {
    id: number
    ok: boolean
  }

  setOk(useData.id, useData.ok)
})

function edit(id: string | number, name: string, icon: string, color: string | null) {
  for (let i = 0; i < cateList.length; i++) {
    if (cateList[i].id === id) {
      cateList[i].title = name
      cateList[i].icon = icon
      cateList[i].color = color
    }
  }
  localStorage.setItem('cate', JSON.stringify({
    data: cateList,
  }))
  emitter.emit('setCate', JSON.stringify({
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

onBeforeUnmount(() => {
  emitter.off('searchSetOk')
  emitter.off('searchDelete')
  emitter.off('noteShowAddItem')
  emitter.off('addCateNote')
})
</script>

<template>
  <div
    absolute w-75vw no-drag col-gap-20px
    col-count="1 sm:2 md:3 lg:4 xl:5"
  >
    <NoteBox
      v-for="item in cateList"
      :id="item.id"
      :key="item.id"
      :list
      :title="item.title"
      :color="item.color"
      :icon="item.icon"
      @delete-cate="delCate"
      @del-with-to-do="delWithToDo"
      @del-item="del"
      @set-ok="setOk"
      @edit="edit"
    />
    <NoteBox
      v-if="otherList.length > 0"
      :list
      :title="t('noteui.other')"
      :other-cate="true"
      @del-item="del"
      @set-ok="setOk"
    />
    <AddItem v-model="itemText" :open="openAddItem" @close="close" @add="addItem" />
  </div>
</template>
