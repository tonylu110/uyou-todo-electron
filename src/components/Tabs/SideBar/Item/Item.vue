<script setup lang="ts" vapor>
import emitter from '../../../../util/bus'

const props = defineProps<{
  icon: string
  title: string
  selected: boolean
  id?: string
}>()

function changeTab() {
  emitter.emit('changeTab', props.id)
}
</script>

<template>
  <div
    mb-2 w-268px flex items-center rounded-10px p-2
    :bg="selected ? 'white dark:black/30' : 'active:black/10'"
    @click="changeTab"
  >
    <div :class="icon" mr-2 block text-7 c="!primary-d" />
    <span text-4>{{ title }}</span>
  </div>
</template>
