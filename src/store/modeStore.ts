import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModeStore = defineStore('mode', () => {
  const isDev = ref(false)

  function setDevMode(value: boolean) {
    isDev.value = value
  }

  return {
    isDev,
    setDevMode,
  }
})
