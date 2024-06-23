<script setup lang="ts">
import { onMounted, ref } from 'vue'
import emitter from '../../../util/bus'

const props = defineProps<{
  id: string
  title?: string
  checked?: boolean
  index?: number
  icon?: string
  control?: boolean
}>()

const emits = defineEmits<{
  choose: [id: string, width: string, left: number]
  load: [width: string, left: number]
}>()

const labRef = ref<HTMLDivElement>()

onMounted(() => {
  if (props.index === 0) {
    emits('load', `${labRef.value!.offsetWidth + 4}px`, labRef.value!.getBoundingClientRect().left + 6)
  }
})

emitter.on('changeTab', (data) => {
  if (data === props.id && labRef.value!.offsetWidth) {
    emits('load', `${labRef.value!.offsetWidth + 4}px`, labRef.value!.getBoundingClientRect().left + 6)
  }
})
</script>

<template>
  <input
    :id
    type="radio"
    :checked
    hidden
  >
  <label
    ref="labRef"
    :for="id"
    p="x-3 y-1" :bg="control ? 'active:black/10' : ''"
    flex="~ 1" relative z-1 mx-3px w-full items-center rounded-full
    @click="(e) => {
      emits(
        'choose',
        id,
        `${(e.currentTarget as HTMLDivElement).offsetWidth + 4}px`,
        (e.currentTarget as HTMLDivElement).getBoundingClientRect().left + 6,
      )
    }"
  >
    <div v-if="icon" :class="icon" :mr="title ? '4px' : ''" />
    <span whitespace-nowrap text-3>{{ title }}</span>
  </label>
</template>
