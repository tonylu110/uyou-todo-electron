<script setup lang="ts">
const props = defineProps<{
  color: string | null
}>()

const emits = defineEmits<{
  setColor: [color: string | null]
}>()

function showCheck(checkColor: string) {
  return checkColor === props.color
}

const list = [null, '#f04490', '#f96a02', '#eb7760', '#d9c003', '#feb9be', '#02aa33', '#a3bc3c', '#3f607f', '#af7c5d']
</script>

<template>
  <div flex="~ wrap gap-5px" p-x-7px>
    <div
      v-for="item, index in list"
      :key="index"
      :bg="item ? item! : 'primary-d'"
      h-26px w-49px flex items-center justify-center rounded-13px
      @click="emits('setColor', item)"
    >
      <div v-if="showCheck(item!)" i-mdi:check-bold c-white />
    </div>
  </div>
</template>
