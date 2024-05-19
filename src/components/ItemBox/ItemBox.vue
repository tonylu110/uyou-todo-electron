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
  --uno: mb-10px border-1px border-solid border-black/20 shadow-md rounded-7px
    bg-white;

  .box-radius {
    --uno: rounded-7px overflow-hidden;

    &:deep(.item) {
      --uno: shadow-none mb-0 rounded-0 border-b-1px border-b-solid
        border-b-black/10 border-x-0 border-t-0 bg-transparent;
      width: v-bind(itemWidth) !important;

      &:last-child {
        --uno: border-none;
      }
    }
  }
}
</style>
