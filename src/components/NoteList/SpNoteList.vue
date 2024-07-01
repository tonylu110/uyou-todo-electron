<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LocalStorage from '../../util/localStorage'
import emitter from '../../util/bus'
import saveItemSet from '../List/saveItemSet'
import NoteBox from './NoteBox/NoteBox.vue'

const { t } = useI18n()

const list = ref(LocalStorage('get'))

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

onBeforeUnmount(() => {
  emitter.off('searchSetOk')
  emitter.off('searchDelete')
})

function editItem(id: number, title: string, cateId: number | string) {
  for (let i = 0; i < list.value!.length; i++) {
    if (list.value![i].id === id) {
      list.value![i].text = title
      list.value![i].cate = `${cateId}`
    }
  }

  saveItemSet(list.value!)
}
</script>

<template>
  <div
    absolute w-75vw no-drag col-gap-20px
    col-count="1 sm:2"
  >
    <NoteBox
      id="today"
      icon="i-ph:sun-bold"
      color="success-d"
      :list
      :title="t('startPage.today')"
      :show-add-item="false"
      :show-btn="false"
      @edit-item="editItem"
      @del-item="del"
      @set-ok="setOk"
    />
    <NoteBox
      id="star"
      icon="i-ph:star-bold"
      color="warn-a"
      :list
      :title="t('custList.star')"
      :show-add-item="false"
      :show-btn="false"
      @edit-item="editItem"
      @del-item="del"
      @set-ok="setOk"
    />
  </div>
</template>
