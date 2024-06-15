<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  selected: boolean
}>()
</script>

<template>
  <div mb-2 w-268px flex items-center rounded-10px p-2 :bg="selected ? 'white dark:#272727' : 'active:black/10'">
    <div :class="icon" mr-2 block text-7 c="!primary-d" />
    <span text-4>{{ title }}</span>
  </div>
</template>
