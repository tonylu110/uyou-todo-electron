<script setup lang="ts">
import { closeWindow } from '../../../util/windowApi'

const emit = defineEmits<{
  numClick: [num: string]
  ok: []
}>()
</script>

<template>
  <div

    grid grid-cols-3 grid-rows-4 mt-10px w-210px gap-9px
  >
    <div

      bg="gray/50 active:gray" h-64px flex items-center justify-center rounded-full shadow-md
      @click="emit('numClick', '1')"
    >
      1
    </div>
    <div

      bg="gray/50 active:gray" h-64px flex items-center justify-center rounded-full shadow-md
      @click="emit('numClick', '2')"
    >
      2
    </div>
    <div

      bg="gray/50 active:gray" h-64px flex items-center justify-center rounded-full shadow-md
      @click="emit('numClick', '3')"
    >
      3
    </div>
    <div

      bg="gray/50 active:gray" h-64px flex items-center justify-center rounded-full shadow-md
      @click="emit('numClick', '4')"
    >
      4
    </div>
    <div

      bg="gray/50 active:gray" h-64px flex items-center justify-center rounded-full shadow-md
      @click="emit('numClick', '5')"
    >
      5
    </div>
    <div

      bg="gray/50 active:gray" h-64px flex items-center justify-center rounded-full shadow-md
      @click="emit('numClick', '6')"
    >
      6
    </div>
    <div

      bg="gray/50 active:gray" h-64px flex items-center justify-center rounded-full shadow-md
      @click="emit('numClick', '7')"
    >
      7
    </div>
    <div

      bg="gray/50 active:gray" h-64px flex items-center justify-center rounded-full shadow-md
      @click="emit('numClick', '8')"
    >
      8
    </div>
    <div

      bg="gray/50 active:gray" h-64px flex items-center justify-center rounded-full shadow-md
      @click="emit('numClick', '9')"
    >
      9
    </div>
    <div

      bg="error-d/50 active:error-d" h-64px flex items-center justify-center rounded-full shadow-md
      @click="closeWindow(void 0, true)"
    >
      <div i-ph:x-bold />
    </div>
    <div

      bg="gray/50 active:gray" h-64px flex items-center justify-center rounded-full shadow-md
      @click="emit('numClick', '0')"
    >
      0
    </div>
    <div

      bg="primary-d/50 active:primary-d" h-64px flex items-center justify-center rounded-full shadow-md
      @click="emit('ok')"
    >
      <div i-ph:check-bold />
    </div>
  </div>
</template>
