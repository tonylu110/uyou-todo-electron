<template>
  <div 
    class="item" 
    :style="{
      backgroundColor: showSwitch ? 'white' : '',
      color: showSwitch ? 'black' : '',
      cursor: showSwitch ?  'auto' : '',
      width: simpleMode ? 'calc(100% - 50px)' : ''
    }"
    @click="emits('itemFun')"
  >
    <div>
      <div class="img-back" v-if="itemImg"></div>
      <img v-if="itemImg" :src="itemImg" alt="">
      <span :style="{width: simpleMode ? 'calc(100vw - 115px)' : ''}">{{ title }}</span>
    </div>
    <Switch 
      v-if="showSwitch"
      :swichState="switchState"
      @switch="emits('switchFun')"
    />
    <div i-mdi:chevron-right text-24px absolute right-15px v-if="showArrow && !showSwitch"></div>
  </div>
</template>

<script setup lang="ts">
import Switch from '../../Switch';

withDefaults(defineProps<{
  switchState?: boolean
  title: string
  showSwitch?: boolean
  showArrow?: boolean
  itemImg?: string
}>(), {
  switchState: true,
  title: 'title',
  showSwitch: false,
  showArrow: true
})

const emits = defineEmits<{
  (e: 'switchFun'): void,
  (e: 'itemFun'): void
}>()

const simpleMode = localStorage.getItem('simpleMode') === 'true'
</script>

<style scoped lang="scss">
.item {
  position: relative;
  max-width: 550px;
  width: calc(100vw - 450px);
  min-height: 30px;
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

  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 25px;
      height: 25px;
      margin-right: 22.5px;
      margin-left: -2.5px;
    }

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: calc(100vw - 515px);
      max-width: 550px;
    }
  }
  
  .img-back {
    height: 50px;
    width: 50px;
    background-color: #00000005;
    z-index: 0;
    position: absolute;
    left: 0;
    border-right: 1px solid #00000010;
  }

  &:active .img-back {
    background-color: transparent;
    border: none;
  }
}
</style>