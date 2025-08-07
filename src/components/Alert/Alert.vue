<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ContextMenu from '../ContextMenu/ContextMenu.vue'

interface Props {
  title?: string
  body?: string[]
  cancelButtonShow?: boolean
  dialogShow?: boolean
  showTitle?: boolean
  confirmBtnName?: string
  cancelBtnName?: string
  bodyPadding?: string
}

const { title = 'title', cancelButtonShow = true, dialogShow = false, showTitle = true } = defineProps<Props>()

const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'return'): void
}>()

const { t } = useI18n()

const useDialog = useTemplateRef('dialog')

onMounted(() => {
  const closeAlert = () => {
    useDialog.value!.close()
  }

  watch(
    () => dialogShow,
    (newVal) => {
      if (newVal) {
        useDialog.value!.removeEventListener('animationend', closeAlert)
        useDialog.value!.showModal()
      }
      else {
        useDialog.value!.addEventListener('animationend', closeAlert)
      }
    },
  )
})

const showContextMenu = ref(false)
const contextMenu = ref({
  top: 0,
  left: 0,
})

function contextmenuClick(e: MouseEvent) {
  e.preventDefault()

  showContextMenu.value = true

  contextMenu.value = {
    top: e.pageY,
    left: e.pageX,
  }
}

onMounted(() => {
  document.addEventListener('click', () => {
    showContextMenu.value = false
  })
})
</script>

<template>
  <dialog
    ref="dialog"
    :class="`alert ${dialogShow ? '' : 'hide'}`"
    bg="white dark:#333"
    border-none no-drag
    @contextmenu="contextmenuClick"
  >
    <div
      c="#333 dark:#bbb"
    >
      <div v-if="showTitle" text-6 font-bold m="t-15px l-20px">
        {{ title }}
      </div>
      <div flex="~ col" min-h-16 justify-center :p="bodyPadding ? bodyPadding : '20px'">
        <slot />
      </div>
      <div flex="~ gap-15px" bg="black/5" p-15px no-drag>
        <button
          flex-1 rounded-5px p-y-5px outline-none no-drag
          c="dark:#111 #fff" border="2px solid primary-d dark:primary-a"
          shadow="sm black/30 active:none"
          bg="primary-d/90 dark:primary-a/90 active:primary-d active:dark:primary-a"
          @click="emits('return')"
        >
          {{ confirmBtnName ? confirmBtnName : t('alertText.returnText') }}
        </button>
        <button
          v-if="cancelButtonShow"
          flex-1 rounded-5px p-y-5px outline-none no-drag
          c="dark:#111 #fff" border="2px solid error-d dark:error-a"
          shadow="sm black/30 active:none"
          bg="error-d/90 dark:error-a/90 active:error-d dark:active:error-a"
          @click="emits('cancel')"
        >
          {{ cancelBtnName ? cancelBtnName : t('alertText.cancelText') }}
        </button>
      </div>
    </div>
    <ContextMenu v-if="showContextMenu" :pos="contextMenu" :show-paste="false" />
  </dialog>
</template>

<style lang="scss" scoped>
@use 'dialogAnimation';

.alert {
  padding: 0;
  z-index: 10;
  width: 300px;
  border-radius: 9px;
  box-shadow: 0 5px 20px #00000050;
  overflow: hidden;
  transition: dialog;
  user-select: none;
  outline: none;
}
</style>
