<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import type { cateItem } from '../ListMenu/ICateItem'
import NoteBox from './NoteBox/NoteBox.vue'

const { t } = useI18n()

const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
const cateList: cateItem[] = reactive(JSON.parse(localCateList!).data)
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
    />
    <NoteBox
      :title="t('noteui.other')"
      :other-cate="true"
    />
  </div>
</template>
