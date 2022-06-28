<template>
  <div class="title-bar">
    <span>uyou ToDo</span>
    <img src="/images/plus.png" alt="" @click="onAddClick" />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: 'onAddClick'): void
}>()

const onAddClick = () => {
  emits('onAddClick')
}
</script>

<style lang="scss" scoped>
.title-bar {
  position: relative;
  height: 55px;
  width: 100%;
  background-color: #7a695c;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 5px #594b4270;
  z-index: 10;

  span {
    color: white;
    font-size: 20px;
    font-weight: bold;
  }

  img {
    position: absolute;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    right: 10px;
    cursor: pointer;

    &:hover {
      background-color: #00000010;
    }

    &:active {
      background-color: #00000020;
    }
  }
}
</style>