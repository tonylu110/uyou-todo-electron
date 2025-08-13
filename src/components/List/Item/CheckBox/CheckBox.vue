<script setup lang="ts">
interface Props {
  num: number
  color?: string
}

withDefaults(defineProps<Props>(), {
  color: 'primary-d',
})

const model = defineModel<boolean>()
</script>

<template>
  <div
    pointer-events-auto absolute
    top="50%" left-13px transform="translate-y--50%"
  >
    <input :id="`checkbox${num}`" v-model="model" type="checkbox" hidden>
    <label :for="`checkbox${num}`">
      <div
        :bg="model
          ? color
          : '#ddd dark:#555 hover:#ddd'"
        h-20px w-20px flex items-center justify-center rounded-full
        transition="300" scale="active:80 100"
      >
        <div v-if="model" i-ph:check-fat-fill text-10px c-white />
      </div>
    </label>
  </div>
</template>
