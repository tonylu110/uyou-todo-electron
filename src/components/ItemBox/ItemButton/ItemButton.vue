<template>
  <div :class="'item-button ' + mode" :style="{width: simpleMode ? 'calc(100% - 50px)' : ''}">
    <slot>button</slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  mode: {
    default: '',
    type: String
  }
})

const simpleMode = localStorage.getItem('simpleMode') === 'true'
</script>

<style lang="scss" scoped>
.item-button {
  position: relative;
  max-width: 550px;
  width: calc(100vw - 450px);
  height: 30px;
  min-height: 30px;
  padding: 10px 15px;
  border-radius: 7px;
  box-shadow: 0 2px 10px #00000030;
  background-color: white;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-weight: bold;

  &:active {
    background-color: #5985eb;
    color: white;
  }

  &.primary {
    background-color: #5985eb;
    color: white;

    &:active {
      background-color: #4e6fbb;
    }
  }

  &.error {
    background-color: #e5544b;
    color: white;

    &:active {
      background-color: #c95047;
    }
  }

  &:deep(.lang-img) {
    max-height: 50px;
  }
}
</style>