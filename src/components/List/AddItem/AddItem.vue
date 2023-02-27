<template>
  <div class="add" ref="addItemDom">
    <div class="add-time-area">
      <span>{{ moment(todoTime).format('hh:mm A') }}</span>
      <div class="buttons">
        <div class="ok-button" 
          :style="{opacity: showAddButton}"
          @click="addItem"
        >{{ i18n().addText }}</div>
        <div class="cancel-button" @click="showAddItem">{{ i18n().cancelText }}</div>
      </div>
    </div>
    <textarea class="add-item-text" rows="4" v-model="text"></textarea>
    <ContextMenu
      :pos="contextMenu"
      v-if="showContextMenu"
      @paste-text="paste"
      :show-copy="false"
    />
  </div>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref, watchEffect} from 'vue';
import moment from 'moment';
import i18n from '../../../i18n';
import ContextMenu from "../../ContextMenu/ContextMenu.vue";

const todoTime = ref(new Date().getTime())
const showAddButton = ref('')
const text = ref('')

watchEffect(() => {
  if (text.value !== '') {
    showAddButton.value = '1'
  } else {
    showAddButton.value = ''
  }
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

const paste = (pasteText: string) => {
  text.value = pasteText
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>