<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emits = defineEmits<{
  setSide: []
}>()

const menuBlur = localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null
</script>

<template>
  <div
    fixed
    left-0 top-0 z-2 h-screen w-screen :bg="open ? 'black/20' : 'black/0'"
    transition="all duration-200"
    :pointer-events="open ? 'auto' : 'none'" @click="emits('setSide')"
  >
    <div
      :bg="menuBlur ? '#ddd dark:#333' : '#ddd/50 dark:#333/50'" absolute h-screen
      w-300px pl-4 shadow-xl backdrop-blur-xl no-drag
      :left="open ? '0' : '-316px'"
      transition="all duration-200"
    >
      <div h-12 />
      <div mb-2 ml-2 @click="emits('setSide')">
        <div i-f7:sidebar-left text-7 c-primary-d />
      </div>
      <div mb-6 ml-2 text-8 c-primary-d font-bold>
        uyou ToDo
      </div>
      <slot />
    </div>
  </div>
</template>
