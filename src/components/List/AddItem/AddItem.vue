<template>
  <div class="add">
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
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import moment from 'moment';
import i18n from '../../../i18n';

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
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>