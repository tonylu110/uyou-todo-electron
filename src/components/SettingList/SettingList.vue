<template>
  <perfect-scrollbar class="list" :style="{justifyContent: justify}">
    <slot></slot>
  </perfect-scrollbar>
</template>

<script setup lang="ts">
defineProps<{
  justify?: string
}>()
</script>

<style scoped lang="scss">
.list {
  background-color: #eee;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding-top: 10px;
}
</style>