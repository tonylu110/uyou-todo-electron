<script setup lang="ts">
withDefaults(defineProps<{
  title: string
}>(), {
  title: 'title'
})
</script>

<template>
  <div 
    break-inside-avoid bg-white mb-30px
    rounded-10px
  >
    <div
      bg-primary-d rounded-7px
      p="y-5px x-10px" c-white absolute
      ml-10px transform="translate-y--50%"
    >
      {{ title }}
    </div>
    <slot />
  </div>
</template>