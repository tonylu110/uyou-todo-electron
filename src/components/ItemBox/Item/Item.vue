<template>
  <div 
    class="item" 
    :style="{
      backgroundColor: showSwitch || showListBox ? 'white' : '',
      color: showSwitch || showListBox ? 'black' : '',
      cursor: showSwitch || showListBox ?  'auto' : '',
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
    <div
      border="1px solid black/10" right-15px relative
      p="x-10px y-5px" rounded-5px bg="active:black/10"
      cursor-pointer
      v-if="showListBox"
      @click="showList = !showList"
    >
      <div w="!fit" flex justify-center items-center>
        {{ listBoxTitle }}
        <div i-mdi:chevron-down ml-5px></div>
      </div>
      <div 
        absolute right-0 bg-white top-0
        flex="~ !col" justify-center items-center
        shadow="md black/10" z-10 p-10px
        rounded-7px
        v-if="showList"
      >
        <div 
          p="x-15px y-10px" bg="active:black/10 hover:black/5" rounded-5px
          v-for="(item, index) in list" 
          :key="index" 
          @click="emits(item.fn)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <div i-mdi:chevron-right text-24px absolute right-15px v-if="showArrow && !showSwitch && !showListBox"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Switch from '../../Switch';

withDefaults(defineProps<{
  switchState?: boolean
  title: string
  showSwitch?: boolean
  showArrow?: boolean
  itemImg?: string
  showListBox?: boolean,
  listBoxTitle?: string,
  list?: {
    title: string
    fn: string
  }[]
}>(), {
  switchState: true,
  title: 'title',
  showSwitch: false,
  showArrow: true,
  showListBox: false,
  listBoxTitle: 'item'
})

const emits = defineEmits<{
  (e: 'switchFun'): void
  (e: 'itemFun'): void
  (e: string): void
}>()

const simpleMode = localStorage.getItem('simpleMode') === 'true'

const showList = ref(false)
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