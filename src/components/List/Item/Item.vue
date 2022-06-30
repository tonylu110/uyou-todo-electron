<template>
  <div class="list-item">
    <div class="time-area">
      <span>{{ getTime(time!) }}</span>
      <div @click="copyText">{{ i18n().copyText }}</div>
    </div>
    <span class="item-text" :style="okStyle">
      {{ text }}
    </span>
    <div class="close-button" @click="deleteItem">
      <img src="/images/close.png" alt="" />
    </div>
    <div class="ok-button" @click="setOk">
      <img src="/images/ok.png" alt="" />
    </div>
    <Toast
      v-if="showToast"
      :msg="i18n().copyToast"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import getTime from '../../../util/getTime';
import i18n from '../../../i18n';
import getOkStyle from '../../../data/getOkStyle';
import Toast from '../../Toast/Toast.vue';

const props = defineProps({
  time: Number,
  text: String,
  isOk: Boolean,
})

const emits = defineEmits<{
  (e: 'setOk', id: number, isOk: boolean): void,
  (e: 'deleteItem', id: number): void
}>()

const okState = ref(props.isOk)
const okStyle = ref(getOkStyle(okState.value))

watchEffect(() => {
  okState.value = props.isOk
  okStyle.value = getOkStyle(props.isOk)
})

const setOk = () => {
  okState.value = !okState.value
  okStyle.value = getOkStyle(okState.value)
  emits('setOk', props.time!, okState.value)
}

const deleteItem = () => {
  emits('deleteItem', props.time!)
}

const showToast = ref(false)
const copyText = () => {
  navigator.clipboard.writeText(props.text!).then(() => {
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 1000)
  })
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>