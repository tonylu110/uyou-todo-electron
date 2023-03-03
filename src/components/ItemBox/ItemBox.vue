<template>
  <div class="item-box" :style="{width: simpleMode ? 'calc(100% - 20px)' : ''}">
    <div class="box-radius">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const simpleMode = localStorage.getItem('simpleMode') === 'true'

const itemWidth = simpleMode ? 'calc(100% - 30px)' : 'calc(100vw - 450px)'
</script>

<style lang="scss" scoped>
.item-box {
  margin-bottom: 10px;
  box-shadow: 0 2px 10px #00000030;
  border-radius: 7px;
  
  .box-radius {
    border-radius: 7px;
    overflow: hidden;

    &:deep(.item) {
      box-shadow: none;
      margin-bottom: 0;
      border-radius: 0;
      border-bottom: 1px solid #00000015;
      width: v-bind(itemWidth) !important;

      &:last-child {
        border: 0;
      }
    }
  }
}
</style>