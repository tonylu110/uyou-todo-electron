<template>
  <div class="menu" :style="{top: position.top + 'px', left: position.left + 'px'}">
    <div @click="copy" v-if="showCopy" class="img">
      <div i-mdi:content-copy text-14px mr-5px></div>
      <span>{{ i18n().contextMenu.copy }}</span>
    </div>
    <div @click="paste" v-if="showPaste" class="img">
      <div i-mdi:content-paste text-14px mr-5px></div>
      <span>{{ i18n().contextMenu.paste }}</span>
    </div>
    <span v-if="custom" class="menu-line"></span>
    <div class="img" v-if="custom" v-for="(item, index) in customMenu" :key="index" @click="emits(item.event)" :style="{color: item.color}">
      <div :class="item.icon" text-14px mr-5px v-if="item.icon"></div>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, ref } from "vue";
import i18n from "../../i18n";

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
    label?: string,
    event?: string,
    icon?: string,
    color?: string
  }>
}>(), {
  showCopy: true,
  showPaste: true
})

const position = ref()

watchEffect(() => {
  position.value = props.pos
})

const textProp = ref(props.text)
watchEffect(() => {
  textProp.value = props.text!
})
const copy = () => {
  const copyText = window.getSelection()!.toString()
  if (copyText) {
    clipboard.writeText(copyText)
  } else {
    clipboard.writeText(textProp.value)
  }
}

const emits = defineEmits<{
  (e: 'pasteText' | string | undefined, text?: string): void
}>()

const paste = () => {
  const pasteText = clipboard.readText()
  emits('pasteText', pasteText)
}

const customMenu = ref(props.custom)
watchEffect(() => {
  customMenu.value = props.custom
})
</script>

<style scoped lang="scss">
.menu {
  background-color: #ffffff90;
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

  .img {
    padding: 8px 12px;
    color: #555;
    font-weight: bold;
    border-radius: 6px;
    font-size: 14px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #00000010;
    }
  }
}
</style>