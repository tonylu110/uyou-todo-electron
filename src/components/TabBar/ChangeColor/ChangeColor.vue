<script setup lang="ts">
import { Dropdown as VDropdown } from 'floating-vue'
import { ref } from 'vue';

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
      p-5px w-20px rounded-5px no-drag cursor-pointer
      @click="showColor = true"
    >
      <div i-ph:palette-bold text-20px c="#555 dark:#bbb" block />
    </div>
    <template #popper>
      <div p-10px flex="~ gap-5px wrap" max-w-120px>
        <div
          p-10px bg="#eee dark:#555" rounded-5px
          @click="changColor(null)"
        />
        <div
          p-10px bg="#f04490" rounded-5px
          @click="changColor('#f04490')"
        />
        <div
          p-10px bg="#f96a02" rounded-5px
          @click="changColor('#f96a02')"
        />
        <div
          p-10px bg="#eb7760" rounded-5px
          @click="changColor('#eb7760')"
        />
        <div
          p-10px bg="#d9c003" rounded-5px
          @click="changColor('#d9c003')"
        />
        <div
          p-10px bg="#feb9be" rounded-5px
          @click="changColor('#feb9be')"
        />
        <div
          p-10px bg="#02aa33" rounded-5px
          @click="changColor('#02aa33')"
        />
        <div
          p-10px bg="#a3bc3c" rounded-5px
          @click="changColor('#a3bc3c')"
        />
        <div
          p-10px bg="#3f607f" rounded-5px
          @click="changColor('#3f607f')"
        />
        <div
          p-10px bg="#af7c5d" rounded-5px
          @click="changColor('#af7c5d')"
        />
      </div>
    </template>
  </VDropdown>
</template>