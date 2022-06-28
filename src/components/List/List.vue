<template>
  <div class="list">
    <Item />
  </div>
</template>

<script setup lang="ts">
import Item from './Item/Item.vue';

</script>

<style scoped>
.list {
  background-color: #edd9b7;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding-top: 10px;
}
</style>