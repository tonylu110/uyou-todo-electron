<script setup lang="ts">
import { closeWindow } from '../../util/windowApi'

const emit = defineEmits<{
  numClick: [num: string]
  ok: []
}>()
</script>

<template>
  <div 
    grid w-210px grid-cols-3 grid-rows-4 gap-9px
    mt-10px
  >
    <div 
      flex justify-center items-center shadow-md
      bg="gray/50 active:gray" h-64px rounded-7px
      @click="emit('numClick', '1')"
    >
      1
    </div>
    <div 
      flex justify-center items-center shadow-md
      bg="gray/50 active:gray" h-64px rounded-7px
      @click="emit('numClick', '2')"
    >
      2
    </div>
    <div 
      flex justify-center items-center shadow-md
      bg="gray/50 active:gray" h-64px rounded-7px
      @click="emit('numClick', '3')"
    >
      3
    </div>
    <div 
      flex justify-center items-center shadow-md
      bg="gray/50 active:gray" h-64px rounded-7px
      @click="emit('numClick', '4')"
    >
      4
    </div>
    <div 
      flex justify-center items-center shadow-md
      bg="gray/50 active:gray" h-64px rounded-7px
      @click="emit('numClick', '5')"
    >
      5
    </div>
    <div 
      flex justify-center items-center shadow-md
      bg="gray/50 active:gray" h-64px rounded-7px
      @click="emit('numClick', '6')"
    >
      6
    </div>
    <div 
      flex justify-center items-center shadow-md
      bg="gray/50 active:gray" h-64px rounded-7px
      @click="emit('numClick', '7')"
    >
      7
    </div>
    <div 
      flex justify-center items-center shadow-md
      bg="gray/50 active:gray" h-64px rounded-7px
      @click="emit('numClick', '8')"
    >
      8
    </div>
    <div 
      flex justify-center items-center shadow-md
      bg="gray/50 active:gray" h-64px rounded-7px
      @click="emit('numClick', '9')"
    >
      9
    </div>
    <div 
      flex justify-center items-center shadow-md
      bg="error-d/50 active:error-d" h-64px rounded-7px
      @click="closeWindow(void 0, true)"
    >
      <div i-ph:x-bold/>
    </div>
    <div 
      flex justify-center items-center shadow-md
      bg="gray/50 active:gray" h-64px rounded-7px
      @click="emit('numClick', '0')"
    >
      0
    </div>
    <div 
      flex justify-center items-center shadow-md
      bg="primary-d/50 active:primary-d" h-64px rounded-7px
      @click="emit('ok')"
    >
      <div i-ph:check-bold/>
    </div>
  </div>
</template>