<script setup lang="ts">
import { toRef, watch } from 'vue'
import CheckBox from '../../List/Item/CheckBox/CheckBox.vue'

const props = defineProps<{
  id: number
  text: string
  ok: boolean
  star?: boolean
}>()

const emits = defineEmits<{
  setOk: [id: number, ok: boolean]
  delete: [id: number]
  setStar: [id: number, star: boolean]
}>()

const okState = toRef(props.ok)

watch(okState, (newValue) => {
  emits('setOk', props.id, newValue)
})
</script>

<template>
  <div
    w="[calc(100%-40px)]"
    relative flex items-center rounded-5px p-10px
  >
    <div absolute>
      <CheckBox v-model="okState" :num="id" left="!0" />
      <div
        absolute top="50%"
        left-27px transform="translate-y--50%"
        @click="emits('setStar', id, !star)"
      >
        <div
          :c="star ? '#e6a400' : '#555/20 dark:#bbb/20'"
          i-ph:star-fill pointer-events-auto block cursor-pointer text-14px
          scale="group-active:70 100" transition="transform 300"
        />
      </div>
    </div>
    <span
      ml-47px :line="okState ? 'through' : ''"
      :c="okState
        ? '#333/25 dark:#bbb/25 selection:white'
        : '#333 dark:#bbb selection:white'"
    >{{ text }}</span>
    <div
      transition="all 300"
      op="0 hover:100" w="5px hover:28px"
      absolute right-0 overflow-hidden pr-7px
    >
      <div
        bg="error-d active:error-a" transition="all 300"
        w-16px flex items-center justify-center rounded-7px p-6px
        @click="emits('delete', id)"
      >
        <div i-ph:trash-bold c-white />
      </div>
    </div>
  </div>
</template>
