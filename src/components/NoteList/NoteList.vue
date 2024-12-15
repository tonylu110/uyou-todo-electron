<script setup lang="ts">
import type ITodoList from '../../interface/ITodoListArray'
import type { cateItem } from '../ListMenu/ICateItem'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import emitter from '../../util/bus'
import LocalStorage from '../../util/localStorage'
import saveItemSet from '../List/saveItemSet'
import changeCate from '../ListMenu/changCate'
import NoteBox from './NoteBox/NoteBox.vue'

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

onMounted(() => {
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
})

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

const itemText = ref('')
const cateid = ref<number>()
emitter.on('noteShowAddItem', (data) => {
  const cate = data as { id: number, text: string }
  cateid.value = cate.id
  itemText.value = cate.text
})
function addItem() {
  list.value!.push({
    ok: false,
    id: new Date().getTime(),
    text: itemText.value,
    cate: `${cateid.value}`,
  })

  saveItemSet(list.value!)
}
emitter.on('noteShowAddItem', (data) => {
  const cate = data as { id: number, text: string }
  cateid.value = cate.id
  itemText.value = cate.text
  addItem()
})

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

function editItem(id: number, title: string, cateId: number | string) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id) {
      list.value![i].text = title
      list.value![i].cate = `${cateId}`
    }
  }

  saveItemSet(list.value!)
}

function setStar(id: number, star: boolean) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id) {
      list.value![i].star = star
    }
  }

  saveItemSet(list.value!)
}

emitter.on('searchSetStar', (data) => {
  const useData = data as {
    id: number
    star: boolean
  }

  setStar(useData.id, useData.star)
})

onBeforeUnmount(() => {
  emitter.off('searchSetOk')
  emitter.off('searchDelete')
  emitter.off('searchSetStar')
  emitter.off('noteShowAddItem')
  emitter.off('addCateNote')
})
</script>

<template>
  <div
    absolute w-75vw no-drag col-gap-20px
    columns="1 sm:2 md:3 lg:4 xl:5"
  >
    <NoteBox
      v-for="item in cateList"
      :id="item.id"
      :key="item.id"
      :list="list!"
      :title="item.title"
      :color="item.color"
      :icon="item.icon"
      @delete-cate="delCate"
      @del-with-to-do="delWithToDo"
      @del-item="del"
      @set-ok="setOk"
      @edit="edit"
      @edit-item="editItem"
      @set-star="setStar"
    />
    <NoteBox
      v-if="otherList.length > 0"
      :list="list!"
      :title="t('noteui.other')"
      :other-cate="true"
      @del-item="del"
      @set-ok="setOk"
      @edit-item="editItem"
      @set-star="setStar"
    />
  </div>
</template>
