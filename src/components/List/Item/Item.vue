<template>
  <div class="list-item">
    <div class="time-area">
      <span>{{ getTime(time!) }}</span>
      <div>{{ i18n().copyText }}</div>
    </div>
    <span class="item-text" :style="okStyle">
      {{ text }}
    </span>
    <div class="close-button">
      <img src="/images/close.png" alt="" />
    </div>
    <div class="ok-button" @click="setOk">
      <img src="/images/ok.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import getTime from '../../../util/getTime';
import i18n from '../../../i18n';
import getOkStyle from '../../../data/getOkStyle';

const props = defineProps({
  time: Number,
  text: String,
  isOk: Boolean,
})

const emits = defineEmits<{
  (e: 'setOk', id: number, isOk: boolean): void
}>()

const okState = ref(props.isOk)
const okStyle = ref(getOkStyle(okState.value))

const setOk = () => {
  okState.value = !okState.value
  okStyle.value = getOkStyle(okState.value)
  emits('setOk', props.time!, okState.value)
}

</script>

<style lang="scss" scoped>
@import './style.scss';
</style>