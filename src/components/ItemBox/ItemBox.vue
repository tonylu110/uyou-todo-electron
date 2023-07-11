<script setup lang="ts">
import { computed, ref } from 'vue'

const simpleMode = localStorage.getItem('simpleMode') === 'true'

const minWidth = ref(window.innerWidth < 750)
window.addEventListener('resize', () => {
  minWidth.value = window.innerWidth < 750
})

const itemWidth = computed(() => simpleMode ? 'calc(100% - 30px)' : (minWidth.value ? 'calc(100vw - 108px)' : 'calc(100vw - 450px)'))
</script>

<template>
  <div class="item-box" :style="{ width: simpleMode ? 'calc(100% - 20px)' : (minWidth ? 'calc(100vw - 78px)' : '') }">
    <div class="box-radius">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-box {
  margin-bottom: 10px;
  border: 1px solid #00000015;
  border-radius: 7px;

  .box-radius {
    border-radius: 7px;
    overflow: hidden;

    &:deep(.item) {
      box-shadow: none;
      margin-bottom: 0;
      border-radius: 0;
      border-bottom: 1px solid #00000015;
      border-top: 0px;
      border-left: 0px;
      border-right: 0px;
      width: v-bind(itemWidth) !important;

      &:last-child {
        border: 0;
      }
    }
  }
}
</style>
