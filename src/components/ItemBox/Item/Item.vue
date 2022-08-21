<template>
  <div 
    class="item" 
    :style="showSwitch ? {backgroundColor: 'white', color: 'black', cursor: 'auto'} : ''"
    @click="emits('itemFun')"
  >
    <span>{{ title }}</span>
    <Switch 
      v-if="showSwitch"
      :swichState="switchState"
      @switch="emits('switchFun')"
    />
    <span v-if="showArrow && !showSwitch" class="material-icons">arrow_forward_ios</span>
  </div>
</template>

<script setup lang="ts">
import Switch from '../../Switch/Switch.vue';

defineProps({
  switchState: {
    default: true,
    type: Boolean
  },
  title: {
    default: 'title',
    type: String
  },
  showSwitch: {
    default: false,
    type: Boolean
  },
  showArrow: {
    default: true,
    type: Boolean
  }
})

const emits = defineEmits<{
  (e: 'switchFun'): void,
  (e: 'itemFun'): void
}>()
</script>

<style scoped lang="scss">
.item {
  position: relative;
  max-width: 550px;
  width: calc(100vw - 450px);
  height: 30px;
  padding: 10px 15px;
  border-radius: 7px;
  box-shadow: 0 2px 10px #00000030;
  background-color: white;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;

  &:active {
    background-color: #5985eb;
    color: white;
  }

  .material-icons {
    font-size: 18px;
  }
}
</style>