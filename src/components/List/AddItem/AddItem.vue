<template>
  <div class="add" ref="addItemDom">
    <div class="add-time-area">
      <span>{{ moment(todoTime).format('hh:mm A') }}</span>
    </div>
    <textarea class="add-item-text" rows="3" v-model="text" @keydown.enter="keyEnter"></textarea>
  </div>
  <div class="buttons">
    <button :style="{width: showAddButton ? '50%' : '', margin: showAddButton ? '' : '0 0 0 -6px'}" class="ok-button" @click="addItem">
      <div i-mdi:check-bold text-24px></div>
    </button>
    <button :style="{width: showAddButton ? '50%' : ''}" class="close-button" @click="showAddItem">
      <div i-mdi:close-thick text-24px></div>
    </button>
  </div>
  <ContextMenu
      :pos="contextMenu"
      v-if="showContextMenu"
      @paste-text="paste"
      :custom="customContextMenu"
      @clear="text = ''"
      @close="showAddItem"
  />
</template>

<script setup lang="ts">
import {onMounted, Ref, ref, watchEffect} from 'vue';
import moment from 'moment';
import i18n from '../../../i18n';
import ContextMenu from "../../ContextMenu/ContextMenu.vue";

const todoTime = ref(new Date().getTime())
const showAddButton = ref(false)
const text = ref('')

watchEffect(() => {
  showAddButton.value = text.value !== '';
})

const emits = defineEmits<{
  (e: 'setAddItem'): void,
  (e: 'addItem', id: number, text: string): void
}>()

const addItem = () => {
  emits('addItem', todoTime.value, text.value)
}

const showAddItem = () => {
  emits('setAddItem')
}

const addItemDom = ref(null) as unknown as Ref<HTMLElement>

const showContextMenu = ref(false)
const contextMenu = ref({
  top: 0,
  left: 0
})

onMounted(() => {
  addItemDom.value.addEventListener('contextmenu', e => {
    e.preventDefault()

    showContextMenu.value = true

    contextMenu.value = {
      top: e.pageY,
      left: e.pageX
    }
  })

  document.addEventListener('click', () => {
    showContextMenu.value = false
  })
})

const customContextMenu = [{
  label: i18n().contextMenu.clearTxt,
  event: 'clear',
  icon: 'i-mdi:backspace',
  color: '#d6010f'
},{
  label: i18n().contextMenu.closeItem,
  event: 'close',
  icon: 'i-mdi:close-circle-outline',
  color: '#d6010f'
}]

const paste = (pasteText: string) => {
  text.value = pasteText
}

const keyEnter = () => {
  if (localStorage.getItem('enterAdd') === 'true') {
    addItem()
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>