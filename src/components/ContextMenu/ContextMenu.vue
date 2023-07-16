<script lang="ts" setup>
import { onMounted, reactive, ref, watchEffect } from 'vue'
import type { Ref } from 'vue'

import { useI18n } from 'vue-i18n'

const props = withDefaults(defineProps<{
  pos: {
    top: number
    left: number
  }
  text?: string
  showCopy?: boolean
  showPaste?: boolean
  custom?: Array<{
    label?: string
    event: string
    icon?: string
    color?: string
  }>
}>(), {
  showCopy: true,
  showPaste: true,
})

const emits = defineEmits<{
  (e: 'pasteText', text: string): void
  (e: string): void
}>()

const { t } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const { clipboard } = require('electron')

const position = reactive({
  top: `${props.pos.top}px`,
  left: `${props.pos.left}px`,
  bottom: 'auto',
  right: 'auto',
})

const textProp = ref(props.text)
watchEffect(() => {
  textProp.value = props.text!
})
function copy() {
  const copyText = window.getSelection()!.toString()
  if (copyText)
    clipboard.writeText(copyText)
  else
    clipboard.writeText(textProp.value)
}

function paste() {
  const pasteText = clipboard.readText()
  emits('pasteText', pasteText)
}

const customMenu = ref(props.custom)
watchEffect(() => {
  customMenu.value = props.custom
})

const cateDom = ref(null) as unknown as Ref<HTMLDivElement>

onMounted(() => {
  const maxHeight = window.innerHeight - cateDom.value!.clientHeight
  const maxWidth = window.innerWidth - cateDom.value!.clientWidth

  if (props.pos.top > maxHeight) {
    position.top = 'auto'
    position.bottom = '10px'
  }
  if (props.pos.left > maxWidth) {
    position.left = 'auto'
    position.right = '10px'
  }
})
</script>

<template>
  <div
    ref="cateDom"
    class="menu"
    :style="{
      top: position.top,
      left: position.left,
      bottom: position.bottom,
      right: position.right,
    }"
    bg="white/80 dark:#333/80"
  >
    <div v-if="showCopy" class="img" @click="copy">
      <div i-ph:copy-bold text-14px mr-5px c="#555 dark:#bbb" />
      <span c="#555 dark:#bbb">{{ t('contextMenu.copy') }}</span>
    </div>
    <div v-if="showPaste" class="img" @click="paste">
      <div i-mdi:content-paste text-14px mr-5px c="#555 dark:#bbb" />
      <span c="#555 dark:#bbb">{{ t('contextMenu.paste') }}</span>
    </div>
    <span v-if="custom" class="menu-line" />
    <div v-for="(item, index) in customMenu" v-show="custom" :key="index" class="img" @click="emits(item.event)">
      <div v-if="item.icon" :class="item.icon" text-14px mr-5px c="#555 dark:#bbb" :style="{ color: item.color }" />
      <span c="#555 dark:#bbb" :style="{ color: item.color }">{{ item.label }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes openMenu {
  from {
    transform: scale(0, 0);
  }
  to {
    transform: scale(1, 1);
  }
}

.menu {
  position: fixed;
  z-index: 500;
  backdrop-filter: blur(5px);
  border-radius: 8px;
  box-shadow: 0 0 20px #00000040;
  overflow: hidden;
  padding: 5px;
  transform-origin: left top;
  animation: openMenu 250ms ease;

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
