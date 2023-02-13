<template>
  <dialog :class="`alert ${dialogShow ? '' : 'hide'}`" ref="dialog">
    <div class="title">
      {{ title }}
    </div>
    <div class="body" :style="{alignItems: title === i18n().accountPage.alertTitle ? 'center' : ''}">
      <span v-for="(item, index) in body" :key="index">{{ item }}</span>
    </div>
    <div class="buttons">
      <div class="cancel" v-if="cancelButtonShow" @click="emits('cancel')">{{ i18n().alertText.cancelText }}</div>
      <div class="return" :style="{width: cancelButtonShow ? '' : '100%'}" @click="emits('return')">{{ i18n().alertText.returnText}}</div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref, watchEffect} from "vue"
import i18n from '../../i18n'

const props = withDefaults(defineProps<{
  title: string
  body: Array<string>
  cancelButtonShow: boolean
  dialogShow: boolean
}>(), {
  title: 'title',
  body: () => ['1', '2'],
  cancelButtonShow: true,
  dialogShow: false
})

const emits = defineEmits<{
  (e: 'cancel'): void,
  (e: 'return'): void
}>()

const dialog = ref(null) as unknown as Ref<HTMLDialogElement>

onMounted(() => {
  const closeAlert = () => {
    dialog.value.close()
  }

  watchEffect(() => {
    if (props.dialogShow) {
      dialog.value.removeEventListener('animationend', closeAlert)
      dialog.value.showModal()
    } else {
      dialog.value.addEventListener('animationend', closeAlert)
    }
  })
})
</script>

<style lang="scss" scoped>
@import "dialogAnimation.scss";

.alert {
  padding: 0;
  z-index: 10;
  background-color: white;
  width: 300px;
  border-radius: 9px;
  box-shadow: 0 5px 20px #00000050;
  border: 1px solid #999;
  overflow: hidden;
  transition: dialog;
  user-select: none;
  color: #00000090;

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

    span {
      display: block;
      white-space: pre-wrap;
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
          background-color: #00000010;
        }
      }

      &.return {
        color: #5985eb;

        &:active {
          background-color: #5985eb;
          color: white;
        }
      }
    }
  }
}
</style>