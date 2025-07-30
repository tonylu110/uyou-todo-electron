<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCateStore } from '../../store/cateStore'
import { useTodoStore } from '../../store/todoStore'
import NoteBox from './NoteBox/NoteBox.vue'

const { t } = useI18n()
const todoStore = useTodoStore()
const cateStore = useCateStore()

const hasOtherTodos = computed(() => {
  return todoStore.otherTodos.length > 0
})

onMounted(async () => {
  const uid = localStorage.getItem('uid')
  const autoSync = localStorage.getItem('autoSync') === 'true' || localStorage.getItem('autoSync') === null
  if ((uid !== '' && uid !== null) && autoSync) {
    await todoStore.syncFromServer(uid)
  }
})
</script>

<template>
  <div
    absolute w-75vw no-drag col-gap-20px
    columns="1 sm:2 md:3 lg:4 xl:5"
  >
    <NoteBox
      v-for="item in cateStore.cateList"
      :id="item.id"
      :key="item.id"
      :title="item.title"
      :color="item.color"
      :icon="item.icon"
    />
    <NoteBox
      v-if="hasOtherTodos"
      :title="t('noteui.other')"
      :other-cate="true"
    />
  </div>
</template>
