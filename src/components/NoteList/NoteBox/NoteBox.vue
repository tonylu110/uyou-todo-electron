<script setup lang="ts">
withDefaults(defineProps<{
  title: string
}>(), {
  title: 'title',
})
</script>

<template>
  <div

    mb-30px break-inside-avoid rounded-10px bg-white
  >
    <div

      p="y-5px x-10px"
      absolute ml-10px rounded-7px bg-primary-d c-white transform="translate-y--50%"
    >
      {{ title }}
    </div>
  </div>
</template>
