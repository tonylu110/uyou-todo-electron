<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import ContextMenu from '../../ContextMenu/ContextMenu.vue'

const emits = defineEmits<{
  (e: 'setAddItem'): void
  (e: 'addItem', id: number, text: string): void
}>()

const { t } = useI18n()

const todoTime = ref(new Date().getTime())
const showAddButton = ref(false)
const text = ref('')

watchEffect(() => {
  showAddButton.value = text.value !== ''
})

function addItem() {
  emits('addItem', todoTime.value, text.value)
}

function showAddItem() {
  emits('setAddItem')
}

const showContextMenu = ref(false)
const contextMenu = ref({
  top: 0,
  left: 0,
})

function contextmenuClick(e: MouseEvent) {
  e.preventDefault()

  showContextMenu.value = true

  contextMenu.value = {
    top: e.clientY,
    left: e.clientX,
  }
}

onMounted(() => {
  document.addEventListener('click', () => {
    showContextMenu.value = false
  })
})

const customContextMenu = [{
  label: t('contextMenu.clearTxt'),
  event: 'clear',
  icon: 'i-ph:trash-bold',
  color: '#d6010f',
}, {
  label: t('contextMenu.closeItem'),
  event: 'close',
  icon: 'i-mdi:close-circle-outline',
  color: '#d6010f',
}]

function paste(pasteText: string) {
  text.value = pasteText
}

function keyEnter() {
  if (localStorage.getItem('enterAdd') === 'true')
    addItem()
}
</script>

<template>
  <div
    class="add"
    shadow="sm black/20"
    bg="#eee/80 dark:#222/50 selection:primary-d selection:dark:primary-a"
    @contextmenu="contextmenuClick"
  >
    <textarea
      v-model="text"
      v-focus
      class="add-item-text" rows="4"
      c="#555 dark:#bbb selection:white"
      @keydown.enter="keyEnter"
    />
  </div>
  <div class="buttons">
    <button
      :style="{
        width: showAddButton ? '50%' : '',
        margin: showAddButton ? '' : '0 0 0 -6px',
      }"
      bg="success-d dark:success-a active:success-a active:dark:success-d"
      border="3px solid white dark:#444"
      class="ok-button"
      @click="addItem"
    >
      <div i-mdi:check-bold text-24px c="white dark:#444" />
    </button>
    <button
      :style="{ width: showAddButton ? '50%' : '' }"
      bg="error-d dark:error-a active:error-a active:dark:error-d"
      border="3px solid white dark:#444"
      class="close-button"
      @click="showAddItem"
    >
      <div i-mdi:close-thick text-24px c="white dark:#444" />
    </button>
  </div>
  <ContextMenu
    v-if="showContextMenu"
    :pos="contextMenu"
    :custom="customContextMenu"
    @paste-text="paste"
    @clear="text = ''"
    @close="showAddItem"
  />
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
