<template>
  <div class="toast">
    {{ msg }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  msg: {
    default: '消息',
    type: String
  }
})
</script>

<style scoped lang="scss">
.toast {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: #fff6dc;
  padding: 7px;
  border-radius: 5px;
  color: #996b3d;
  box-shadow: 0 2px 5px #7a695c90;
  font-weight: bold;
}
</style>