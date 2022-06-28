<template>
  <div class="list-item">
    <div class="time-area">
      <span>{{ getTime(time!) }}</span>
      <div>{{ i18n().copyText }}</div>
    </div>
    <span class="item-text">
      {{ text }}
    </span>
    <div class="close-button">
      <img src="/images/close.png" alt="" />
    </div>
    <div class="ok-button">
      <img src="/images/ok.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import getTime from '../../../util/getTime';
import i18n from '../../../i18n';

const props = defineProps({
  time: Number,
  text: String
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>