<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core'
import { computed, ref } from 'vue'

withDefaults(defineProps<{
  mode: string
}>(), {
  mode: ''
})

const simpleMode = localStorage.getItem('simpleMode') === 'true'

const minWidth = ref(window.innerWidth < 750)
window.addEventListener('resize', () => {
  minWidth.value = window.innerWidth < 750
})

const isDark = usePreferredDark()

const errorColor = computed(() => isDark.value ? '#c95047' : '#e5544b')
const primaryColor = computed(() => isDark.value ? '#4e6fbb' : '#5985eb')
const errorColorA = computed(() => !isDark.value ? '#c95047' : '#e5544b')
const primaryColorA = computed(() => !isDark.value ? '#4e6fbb' : '#5985eb')
</script>

<template>
  <div
    :class="`item-button ${mode}`"
    :style="{ width: simpleMode ? 'calc(100% - 50px)' : (minWidth ? 'calc(100vw - 108px)' : '') }"
    :max-w="!simpleMode && minWidth ? '' : '550px'"
    c="#333 dark:#bbb"
    bg="white dark:#999/10"
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
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  &:active {
    background-color: v-bind(primaryColor);
    color: white;
  }

  &.primary {
    background-color: v-bind(primaryColor);
    color: white;
    border: none;

    &:active {
      background-color: v-bind(primaryColorA);
    }
  }

  &.error {
    background-color: v-bind(errorColor);
    color: white;
    border: none;

    &:active {
      background-color: v-bind(errorColorA);
    }
  }

  &:deep(.lang-img) {
    max-height: 50px;
  }
}
</style>
