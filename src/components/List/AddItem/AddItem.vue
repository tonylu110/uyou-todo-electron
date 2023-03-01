<template>
  <div class="add" ref="addItemDom">
    <div class="add-time-area">
      <span>{{ moment(todoTime).format('hh:mm A') }}</span>
    </div>
    <textarea class="add-item-text" rows="3" v-model="text"></textarea>
  </div>
  <div class="buttons">
    <button :style="{width: showAddButton ? '50%' : '', margin: showAddButton ? '' : '0', border: showAddButton ? '' : '0'}" class="ok-button" @click="addItem">
      <span class="material-icons">check</span>
    </button>
    <button :style="{width: showAddButton ? '50%' : ''}" class="close-button" @click="showAddItem">
      <span class="material-icons">close</span>
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
  icon: 'backspace',
  color: '#d6010f'
},{
  label: i18n().contextMenu.closeItem,
  event: 'close',
  icon: 'highlight_off',
  color: '#d6010f'
}]

const paste = (pasteText: string) => {
  text.value = pasteText
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>