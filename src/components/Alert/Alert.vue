<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePreferredDark } from '@vueuse/core'
import ContextMenu from '../ContextMenu/ContextMenu.vue'

const props = withDefaults(defineProps<{
  title?: string
  body?: Array<string>
  cancelButtonShow?: boolean
  dialogShow?: boolean
}>(), {
  title: 'title',
  body: () => ['1', '2'],
  cancelButtonShow: true,
  dialogShow: false,
})

const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'return'): void
}>()

const { t } = useI18n()

const dialog = ref(null) as unknown as Ref<HTMLDialogElement>

onMounted(() => {
  const closeAlert = () => {
    dialog.value.close()
  }

  watchEffect(() => {
    if (props.dialogShow) {
      dialog.value.removeEventListener('animationend', closeAlert)
      dialog.value.showModal()
    }
    else {
      dialog.value.addEventListener('animationend', closeAlert)
    }
  })
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

const isDark = usePreferredDark()

const primaryColor = computed(() => isDark.value ? '#4e6fbb' : '#5985eb')
</script>

<template>
  <dialog
    ref="dialog"
    :class="`alert ${dialogShow ? '' : 'hide'}`"
    bg="white dark:#333"
    border="1px solid #999 dark:black/10"
    @contextmenu="contextmenuClick"
  >
    <div
      class="title"
      c="#333 dark:#bbb"
    >
      {{ title }}
    </div>
    <div
      class="body"
      :style="{ alignItems: title === t('accountPage.alertTitle') ? 'center' : '' }"
      c="#333 dark:#bbb"
    >
      <slot />
    </div>
    <div class="buttons" no-drag>
      <div
        v-if="cancelButtonShow"
        class="cancel"
        c="#333 dark:#bbb"
        @click="emits('cancel')"
      >
        {{ t('alertText.cancelText') }}
      </div>
      <div class="return" :style="{ width: cancelButtonShow ? '' : '100%' }" @click="emits('return')">
        {{ t('alertText.returnText') }}
      </div>
    </div>
    <ContextMenu v-if="showContextMenu" :pos="contextMenu" :show-paste="false" />
  </dialog>
</template>

<style lang="scss" scoped>
@import "dialogAnimation.scss";

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

  .title {
    -webkit-app-region: drag;
    border-bottom: 1.5px solid #00000015;
    padding: 12px;
    display: flex;
    background: #00000008;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  .body {
    padding: 18px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    border-bottom: 1.5px solid #00000015;
    min-height: 3em;
    justify-content: center;

    &:deep(ul) {
      margin: 0;

      li {
        margin-left: -18px;
        user-select: text;
      }
    }

    &:deep(span) {
      display: block;
      white-space: pre-wrap;
      user-select: text;
      text-align: center;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    background: #00000010;

    div {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;

      &.cancel {
        border-right: 2px solid #00000010;

        &:active {
          background-color: #00000010 !important;
        }

        &:hover {
          background-color: #00000005;
        }
      }

      &.return {
        color: v-bind(primaryColor);

        &:active {
          background-color: v-bind(primaryColor) !important;
          color: white;
        }

        &:hover {
          background-color: #00000005;
        }
      }
    }
  }
}
</style>
