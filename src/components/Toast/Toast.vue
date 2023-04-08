<template>
  <div
    p-7px
    rounded-5px
    font-bold
    c="#996b3d" bg="#fff6dc" shadow-xl
    animate-duration-300 animate-fill-mode-forwards animate-ease
    :top="center ? '50%' : ''"
    :left="center ? '50%' : (simpleMode ? '' : 'calc(50% + 150px)')"
    :translate="center ? '-50%' : '-x-50%'"
    :position="center ? 'absolute' : 'fixed'"
    :class="center ? '' : 'animate-toastShow'"
  >
    {{ msg }}
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  msg: string
  center?: boolean
}>(), {
  msg: 'toast'
})

const simpleMode = window.innerWidth < 800
</script>