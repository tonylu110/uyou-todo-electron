<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  mode: {
    default: '',
    type: String,
  },
})

const simpleMode = localStorage.getItem('simpleMode') === 'true'

const minWidth = ref(window.innerWidth < 750)
window.addEventListener('resize', () => {
  minWidth.value = window.innerWidth < 750
})
</script>

<template>
  <div
    :class="`item-button ${mode}`"
    :style="{ width: simpleMode ? 'calc(100% - 50px)' : (minWidth ? 'calc(100vw - 108px)' : '') }"
    :max-w="!simpleMode && minWidth ? '' : '550px'"
  >
    <slot>button</slot>
  </div>
</template>

<style lang="scss" scoped>
.item-button {
  position: relative;
  width: calc(100vw - 450px);
  height: 30px;
  min-height: 30px;
  padding: 10px 15px;
  border-radius: 7px;
  border: 1px solid #00000020;
  background-color: white;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-weight: bold;

  &:active {
    background-color: #5985eb;
    color: white;
  }

  &.primary {
    background-color: #5985eb;
    color: white;
    border: none;

    &:active {
      background-color: #4e6fbb;
    }
  }

  &.error {
    background-color: #e5544b;
    color: white;
    border: none;

    &:active {
      background-color: #c95047;
    }
  }

  &:deep(.lang-img) {
    max-height: 50px;
  }
}
</style>
