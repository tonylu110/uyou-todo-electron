<script setup lang="ts">
defineProps<{
  num: number
}>()

const model = defineModel<boolean>()
</script>

<template>
  <div
    pointer-events-auto absolute
    top="50%" left-13px translate="y--50%"
  >
    <input :id="`checkbox${num}`" v-model="model" type="checkbox" hidden>
    <label :for="`checkbox${num}`">
      <div
        w-20px h-20px rounded-full
        :bg="model ? 'primary-d dark:primary-a' : 'white dark:#555 hover:#ddd'"
        flex items-center justify-center
        transition="300" scale="active:80 100"
      >
        <div v-if="model" i-ph:check-fat-fill c-white text-10px />
      </div>
    </label>
  </div>
</template>
