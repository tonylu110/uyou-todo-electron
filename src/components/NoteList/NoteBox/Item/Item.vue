<script setup lang="ts">
import { ref } from 'vue'
import CheckBox from '../../../List/Item/CheckBox/CheckBox.vue'

const props = defineProps<{
  title: string
  id: number
  isOk: boolean
  color?: string | null
}>()

const emits = defineEmits<{
  del: [id: number]
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
      flex="~ gap-5px"
      absolute right--10px overflow-hidden pr-10px
      w="15px hover:61px" transition="all 300"
      opacity="0 hover:100"
    >
      <div
        bg="primary-d active:primary-a" transition="all 300"
        w-16px flex items-center justify-center rounded-7px p-6px
      >
        <div i-ph:pencil-bold c-white />
      </div>
      <div
        bg="error-d active:error-a" transition="all 300"
        w-16px flex items-center justify-center rounded-7px p-6px
        @click="emits('del', id)"
      >
        <div i-ph:trash-bold c-white />
      </div>
    </div>
  </div>
</template>
