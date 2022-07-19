<template>
  <div class="alert">
    <div class="title">
      {{ title }}
    </div>
    <div class="body">
      <span v-for="(item, index) in body" :key="index">{{ item }}</span>
    </div>
    <div class="buttons">
      <div class="cancel" @click="emits('cancel')">{{ i18n().alertText.cancelText }}</div>
      <div class="return" @click="emits('return')">{{ i18n().alertText.returnText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import i18n from '../../i18n'

defineProps({
  title: {
    default: 'title',
    type: String
  },
  body: {
    default: ['1', '2'],
    type: Array<string>
  }
})

const emits = defineEmits<{
  (e: 'cancel'): void,
  (e: 'return'): void
}>()
</script>

<style lang="scss" scoped>
.alert {
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #edd9b7;
  width: 220px;
  border-radius: 8px;
  box-shadow: 0 5px 8px #594b4270;

  .title {
    background-color: #7a695c;
    color: white;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    border-radius: 8px 8px 0 0;
  }

  .body {
    padding: 8px;

    span {
      display: block;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 35px;
    background-color: #ece1cc;
    border-radius: 0 0 8px 8px;

    div {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      &.cancel {
        border-radius: 0 0 0 8px;
        border-right: 2px solid #00000010;

        &:active {
          background-color: #00000010;
        }
      }

      &.return {
        border-radius: 0 0 8px 0;

        &:active {
          background-color: #5985eb;
          color: white;
        }
      }
    }
  }
}
</style>