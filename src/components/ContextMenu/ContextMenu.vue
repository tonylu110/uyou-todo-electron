<script lang="ts" setup>
import { computed, onMounted, reactive, ref, useTemplateRef, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { clipboard } from 'electron'
import type customContextMenu from './customContextMenu.type'

interface Props {
  pos: {
    top: number
    left: number
  }
  text?: string
  showCopy?: boolean
  showPaste?: boolean
  custom?: Array<customContextMenu>
}

const { showCopy = true, showPaste = true, pos, text, custom } = defineProps<Props>()

const emits = defineEmits<{
  (e: 'pasteText', text: string): void
  (e: string | undefined): void
  (e: 'closeContext'): void
}>()

const { t } = useI18n()

const topAndLeft = reactive({
  top: `${pos.top}px`,
  left: `${pos.left}px`,
})
const position = reactive({
  top: computed({
    get: () => `${pos.top}px`,
    set: (value) => {
      topAndLeft.top = value
    },
  }),
  left: computed({
    get: () => `${pos.left}px`,
    set: (value) => {
      topAndLeft.left = value
    },
  }),
  bottom: 'auto',
  right: 'auto',
})

const textProp = ref(text)
watchEffect(() => {
  textProp.value = text!
})
function copy() {
  const copyText = window.getSelection()!.toString()
  if (copyText)
    clipboard.writeText(copyText)
  else
    clipboard.writeText(textProp.value!)
}

function paste() {
  const pasteText = clipboard.readText()
  emits('pasteText', pasteText)
}

const customMenu = ref(custom)
watchEffect(() => {
  customMenu.value = custom
})

const useCateDom = useTemplateRef('cateDom')
onMounted(() => {
  const maxHeight = window.innerHeight - useCateDom.value!.clientHeight
  const maxWidth = window.innerWidth - useCateDom.value!.clientWidth

  if (pos.top > maxHeight) {
    position.top = 'auto'
    position.bottom = '10px'
  }
  if (pos.left > maxWidth) {
    position.left = 'auto'
    position.right = '10px'
  }
})

const showItemChild = ref(false)
function itemFn(isChild?: boolean, event?: string) {
  if (isChild) {
    showItemChild.value = !showItemChild.value
  }
  else {
    emits(event)
    emits('closeContext')
  }
}
</script>

<template>
  <div
    ref="cateDom"
    class="menu"
    :style="{
      top: topAndLeft.top,
      left: topAndLeft.left,
      bottom: position.bottom,
      right: position.right,
    }"
    bg="white/80 dark:#333/80"
  >
    <div v-if="showCopy" class="img" flex items-center @click="copy">
      <div i-ph:copy-bold mr-5px text-14px c="#555 dark:#bbb" />
      <span c="#555 dark:#bbb">{{ t('contextMenu.copy') }}</span>
    </div>
    <div v-if="showPaste" class="img" flex items-center @click="paste">
      <div i-mdi:content-paste mr-5px text-14px c="#555 dark:#bbb" />
      <span c="#555 dark:#bbb">{{ t('contextMenu.paste') }}</span>
    </div>
    <span v-if="custom" class="menu-line" />
    <template v-if="custom">
      <div
        v-for="(item, index) in customMenu"
        :key="index"
        class="img"
        :bg="showItemChild && Array.isArray(item.children) ? '!hover:transparent' : ''"
        @click.stop="itemFn(Array.isArray(item.children), item.event)"
      >
        <div flex items-center justify-between>
          <div flex items-center>
            <div v-if="item.icon" :class="item.icon" mr-5px text-14px c="#555 dark:#bbb" :style="{ color: item.color }" />
            <span c="#555 dark:#bbb" :style="{ color: item.color }">{{ item.label }}</span>
          </div>
          <div
            v-if="Array.isArray(item.children)" i-fluent:chevron-right-12-filled
            c="#555 dark:#bbb" transition="300 transform"
            :rotate="showItemChild ? '90' : '0'"
          />
        </div>
        <div v-if="showItemChild && Array.isArray(item.children)" grid mt-10px class="child">
          <div
            v-for="(child, childI) in item.children"
            :key="childI"
            p="y-7px r-7px l-32px" c="#555 dark:#bbb"
            m="l--12px r--12px" overflow-hidden
            bg="hover:black/10" rounded-5px
            @click.stop="child.event"
          >
            {{ t('listMenu.to') + child.label }}
          </div>
        </div>
      </div>
    </template>
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

@keyframes showList {
  0% {
    grid-template-rows: 0fr;
  }
  100% {
    grid-template-rows: 1fr;
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

    .child {
      grid-template-rows: 0fr;
      animation: showList 0.3s forwards;
    }

    &:hover {
      background-color: #00000010;
    }
  }
}
</style>
