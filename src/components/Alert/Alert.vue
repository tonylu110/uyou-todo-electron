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

const props = defineProps({
  title: {
    default: 'title',
    type: String
  },
  body: {
    default: ['1', '2'],
    type: Array<string>
  },
  cancelButtonShow: {
    default: true,
    type: Boolean
  },
  dialogShow: {
    default: false,
    type: Boolean
  }
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
      dialog.value.removeEventListener('webkitAnimationEnd', closeAlert)
      dialog.value.showModal()
    } else {
      dialog.value.addEventListener('webkitAnimationEnd', closeAlert)
    }
  })
})
</script>

<style lang="scss" scoped>
.alert {
  padding: 0;
  z-index: 10;
  background-color: #edd9b7;
  width: 300px;
  border-radius: 9px;
  box-shadow: 0 5px 8px #594b4270;
  border: 1px solid #999;
  overflow: hidden;
  transition: dialog;

  .title {
    -webkit-app-region: drag;
    background-color: #7a695c;
    color: white;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  .body {
    padding: 10px;
    font-size: 14px;
    color: #6e492f;
    display: flex;
    flex-direction: column;

    span {
      display: block;
      white-space: pre-wrap;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 35px;
    background-color: #ece1cc;

    div {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      color: #7a695c;
      font-weight: bold;
      cursor: pointer;

      &.cancel {
        border-right: 2px solid #00000010;

        &:active {
          background-color: #00000010;
        }
      }

      &.return {
        &:active {
          background-color: #5985eb;
          color: white;
        }
      }
    }
  }
}
</style>