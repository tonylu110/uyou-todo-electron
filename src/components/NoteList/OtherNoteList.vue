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
      id="allNotDo"
      icon="i-ph:circle-bold"
      color="error-d"
      :title="t('listMenu.incompleted')"
      :show-add-item="false"
      :show-btn="false"
    />
    <NoteBox
      id="allDo"
      icon="i-ph:check-circle-bold"
      color="gray-400"
      :title="t('listMenu.completed')"
      :show-add-item="false"
      :show-btn="false"
      :show-delete="true"
    />
  </div>
</template>
