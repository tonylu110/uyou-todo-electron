<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref, watchEffect } from 'vue'
import moment from 'moment'
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

const addItemDom = ref(null) as unknown as Ref<HTMLElement>

const showContextMenu = ref(false)
const contextMenu = ref({
  top: 0,
  left: 0,
})

onMounted(() => {
  addItemDom.value.addEventListener('contextmenu', (e) => {
    e.preventDefault()

    showContextMenu.value = true

    contextMenu.value = {
      top: e.pageY,
      left: e.pageX,
    }
  })

  document.addEventListener('click', () => {
    showContextMenu.value = false
  })
})

const customContextMenu = [{
  label: t('contextMenu.clearTxt'),
  event: 'clear',
  icon: 'i-mdi:backspace',
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
  <div ref="addItemDom" class="add">
    <div class="add-time-area">
      <span>{{ moment(todoTime).format('hh:mm A') }}</span>
    </div>
    <textarea v-model="text" class="add-item-text" rows="3" @keydown.enter="keyEnter" />
  </div>
  <div class="buttons">
    <button :style="{ width: showAddButton ? '50%' : '', margin: showAddButton ? '' : '0 0 0 -6px' }" class="ok-button" @click="addItem">
      <div i-mdi:check-bold text-24px />
    </button>
    <button :style="{ width: showAddButton ? '50%' : '' }" class="close-button" @click="showAddItem">
      <div i-mdi:close-thick text-24px />
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
