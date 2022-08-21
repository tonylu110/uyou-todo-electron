<template>
  <div class="switch" @click="clickSwitch">
    <div class="buttonShow">
      <div class="pot" :style="{transform: swichState ? '' : 'translateX(-1.75em)'}"></div>
      <div class="button" :style="{transform: swichState ? '' : 'translateX(-1.75em)'}"></div>
      <div class="pot close" :style="{transform: swichState ? '' : 'translateX(-1.75em)'}"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  swichState: {
    default: true,
    type: Boolean
  }
})
const emits = defineEmits<{
  (e: 'switch'): void
}>()
const clickSwitch = () => {
  emits('switch')
}
</script>

<style scoped lang="scss">
.switch {
  height: 1.75em;
  background-color: white;
  box-shadow: inset 1px 1px 5px #00000030;
  position: absolute;
  right: 10px;
  width: 3.45em;
  border-radius: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  border: 1px solid #00000030;
  cursor: pointer;

  .buttonShow {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: .575em;
    justify-content: space-between;

    .pot {
      width: 8px;
      height: 8px;
      background-color: #5985eb;
      border-radius: 5px;
      transition: transform 0.3s;
      border: 1px solid #5985eb;

      &.close {
        margin-left: 0px;
        background-color: #eee;
        margin-left: .65em;
        border: 1px solid #ccc;
      }
    }

    .button {
      width: 1.55em;
      height: 1.55em;
      background-color: white;
      box-shadow: 1px 1px 3px #00000050;
      border-radius: 1em;
      border: 1px solid #00000020;
      transition: transform 0.3s;
      margin-left: .55em;
      margin-top: -.05em;
    }
  }
}
</style>