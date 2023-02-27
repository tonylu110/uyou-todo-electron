<template>
  <div class="menu" :style="{top: position.top + 'px', left: position.left + 'px'}">
    <div @click="copy" v-if="showCopy">
      <span class="material-icons">content_copy</span>
      <span>复制</span>
    </div>
    <div @click="paste" v-if="showPaste">
      <span class="material-icons">content_paste</span>
      <span>粘贴</span>
    </div>
    <span v-if="custom" class="menu-line"></span>
    <div v-if="custom" v-for="(item, index) in custom" :key="index" @click="emits(item.event)" :style="{color: item.color}">
      <span class="material-icons" v-if="item.icon">{{ item.icon }}</span>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, ref } from "vue";

const { clipboard } = require('electron')

const props = withDefaults(defineProps<{
  pos: {
    top: number,
    left: number
  },
  text?: string,
  showCopy?: boolean,
  showPaste?: boolean,
  custom?: Array<{
    label: string,
    event: string,
    icon: string,
    color: string
  }>
}>(), {
  showCopy: true,
  showPaste: true
})

const position = ref()

watchEffect(() => {
  position.value = props.pos
})

const copy = () => {
  const copyText = window.getSelection()!.toString()
  clipboard.writeText(copyText)
}

const emits = defineEmits<{
  (e: 'pasteText', text: string): void
}>()

const paste = () => {
  const pasteText = clipboard.readText()
  emits('pasteText', pasteText)
}
</script>

<style scoped lang="scss">
.menu {
  background-color: #ffffff70;
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  backdrop-filter: blur(5px);
  border-radius: 8px;
  box-shadow: 0 0 20px #00000040;
  overflow: hidden;
  padding: 5px;
  border: 1px solid #ccc;

  .menu-line {
    height: 1px;
    background-color: #00000020;
    width: calc(100% + 10px);
    transform: translateX(-5px);
    display: block;
    margin: 5px 0;
  }

  div {
    padding: 8px 12px;
    color: #555;
    font-weight: bold;
    border-radius: 6px;
    font-size: 14px;
    display: flex;
    align-items: center;

    .material-icons {
      font-size: 14px;
      font-weight: bold;
      margin-right: 5px;
    }

    &:hover {
      background-color: #00000010;
    }
  }
}
</style>