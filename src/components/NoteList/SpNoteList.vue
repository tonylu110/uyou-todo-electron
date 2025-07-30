<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import NoteBox from './NoteBox/NoteBox.vue'

const { t } = useI18n()
</script>

<template>
  <div
    absolute w-75vw no-drag col-gap-20px
    columns="1 sm:2"
  >
    <NoteBox
      id="today"
      icon="i-ph:sun-bold"
      color="success-d"
      :title="t('startPage.today')"
      :show-add-item="false"
      :show-btn="false"
    />
    <NoteBox
      id="star"
      icon="i-ph:star-bold"
      color="warn-a"
      :title="t('custList.star')"
      :show-add-item="false"
      :show-btn="false"
    />
  </div>
</template>
