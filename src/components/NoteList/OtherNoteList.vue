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
</script>

<template>
  <div
    absolute w-75vw no-drag col-gap-20px
    col-count="1 sm:2"
  >
    <NoteBox
      id="allNotDo"
      icon="i-ph:circle-bold"
      color="error-d"
      :list
      :title="t('listMenu.incompleted')"
      :show-add-item="false"
      :show-btn="false"
      @del-item="del"
      @set-ok="setOk"
    />
    <NoteBox
      id="allDo"
      icon="i-ph:check-circle-bold"
      color="gray-400"
      :list
      :title="t('listMenu.completed')"
      :show-add-item="false"
      :show-btn="false"
      @del-item="del"
      @set-ok="setOk"
    />
  </div>
</template>
