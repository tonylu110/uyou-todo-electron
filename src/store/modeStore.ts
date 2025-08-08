import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModeStore = defineStore('mode', () => {
  const isDev = ref(false)

  function setDevMode(value: boolean) {
    isDev.value = value
  }

  const isSimpleMode = ref(localStorage.getItem('simpleMode') === 'true' || localStorage.getItem('simpleMode') === null)

  window.innerWidth < 750
    ? isSimpleMode.value = true
    : isSimpleMode.value = false

  return {
    isDev,
    isSimpleMode,
    setDevMode,
  }
})
