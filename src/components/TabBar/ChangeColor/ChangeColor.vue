<script setup lang="ts">
import { Dropdown as VDropdown } from 'floating-vue'
import { ref } from 'vue'

const emit = defineEmits<{
  changeColor: [color: string | null]
}>()

const showColor = ref(false)

function changColor(color: string | null) {
  emit('changeColor', color)
  showColor.value = false
}
</script>

<template>
  <VDropdown
    v-model:shown="showColor"
    :distance="12"
    placement="bottom"
  >
    <div
      bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
      w-20px cursor-pointer rounded-5px p-5px no-drag
      @click="showColor = true"
    >
      <div c="#555 dark:#bbb" i-ph:palette-bold block text-20px />
    </div>
    <template #popper>
      <div flex="~ gap-5px wrap" max-w-120px p-10px>
        <div
          bg="#eee dark:#555" rounded-5px p-10px
          @click="changColor(null)"
        />
        <div
          bg="#f04490" rounded-5px p-10px
          @click="changColor('#f04490')"
        />
        <div
          bg="#f96a02" rounded-5px p-10px
          @click="changColor('#f96a02')"
        />
        <div
          bg="#eb7760" rounded-5px p-10px
          @click="changColor('#eb7760')"
        />
        <div
          bg="#d9c003" rounded-5px p-10px
          @click="changColor('#d9c003')"
        />
        <div
          bg="#feb9be" rounded-5px p-10px
          @click="changColor('#feb9be')"
        />
        <div
          bg="#02aa33" rounded-5px p-10px
          @click="changColor('#02aa33')"
        />
        <div
          bg="#a3bc3c" rounded-5px p-10px
          @click="changColor('#a3bc3c')"
        />
        <div
          bg="#3f607f" rounded-5px p-10px
          @click="changColor('#3f607f')"
        />
        <div
          bg="#af7c5d" rounded-5px p-10px
          @click="changColor('#af7c5d')"
        />
      </div>
    </template>
  </VDropdown>
</template>
