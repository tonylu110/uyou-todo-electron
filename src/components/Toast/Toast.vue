<template>
  <div
    :class="`toast ${center ? '' : 'an'} ${simpleMode ? 'simple' : ''}`"
    :style="{
      top: center ? '50%' : '',
      left: center ? '50%' : 'calc(50% + 150px)',
      transform: center ? 'translateX(-50%) translateY(-50%)' : 'translateX(-50%)',
      position: center ? 'absolute' : 'fixed'
    }"
  >
    {{ msg }}
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  msg: string
  center?: boolean
}>(), {
  msg: 'toast'
})

const simpleMode = window.innerWidth < 800
</script>

<style scoped lang="scss">
@keyframes toastShow {
  0% {
    bottom: calc(-1rem - 20px);
  }
  100% {
    bottom: 50px;
  }
}

.toast {
  background-color: #fff6dc;
  padding: 7px;
  border-radius: 5px;
  color: #996b3d;
  box-shadow: 0 2px 5px #7a695c90;
  font-weight: bold;

  &.an {
    animation: toastShow .3s;
    animation-fill-mode: forwards;
  }

  &.simple {
    left: 50%;
  }
}
</style>