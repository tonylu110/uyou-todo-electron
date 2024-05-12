<script setup lang="ts">
import { ref } from 'vue'
import CheckBox from '../../../List/Item/CheckBox/CheckBox.vue'

const props = defineProps<{
  title: string
  id: number
  isOk: boolean
  color?: string | null
}>()

const okState = ref(props.isOk)
</script>

<template>
  <div relative flex items-center justify-between p-5px>
    <CheckBox v-model="okState" left="4px!" :num="id" :color="color ? color : 'primary-d'" />
    <div
      ml-30px
      :line="okState ? 'through' : ''"
      :c="okState
        ? '#333/25 dark:#bbb/25 selection:white'
        : '#333 dark:#bbb selection:white'"
    >
      {{ title }}
    </div>
    <div
      flex items-center justify-center rounded-7px
      bg="error-d/80 active:error-d" transition="all 300"
      p="x-4px y-6px hover:x-6px"
      opacity="0 hover:100" w="0 hover:16px" ml="0 hover:10px"
    >
      <div i-ph:trash-bold c-white />
    </div>
  </div>
</template>
