<script setup lang="ts" vapor>
import { closeWindow } from '../../../util/windowApi'

const emit = defineEmits<{
  numClick: [num: string]
  ok: []
}>()
</script>

<template>
  <div mt-10px w-210px flex justify-between gap-10px>
    <div
      bg="error-d/50 active:error-d"
      h-64px flex flex-1 items-center justify-center rounded-7px shadow-md
      @click="closeWindow(void 0, true)"
    >
      <div i-ph:x-bold />
    </div>
    <div
      bg="primary-d/50 active:primary-d"
      h-64px flex flex-1 items-center justify-center rounded-7px shadow-md
      @click="emit('ok')"
    >
      <div i-ph:check-bold />
    </div>
  </div>
</template>
