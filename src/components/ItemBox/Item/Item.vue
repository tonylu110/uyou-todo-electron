<script setup lang="ts">
import { ref } from 'vue'
import Switch from '../../Switch'

withDefaults(defineProps<{
  switchState?: boolean
  title: string
  showSwitch?: boolean
  showArrow?: boolean
  itemImg?: string
  showListBox?: boolean
  listBoxTitle?: string
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
  listBoxTitle: 'item',
})

const emits = defineEmits<{
  (e: 'switchFun'): void
  (e: 'itemFun'): void
  (e: string): void
}>()

const simpleMode = localStorage.getItem('simpleMode') === 'true'

const showList = ref(false)

const minWidth = ref(window.innerWidth < 750)
window.addEventListener('resize', () => {
  minWidth.value = window.innerWidth < 750
})
</script>

<template>
  <div
    class="item"
    :style="{
      backgroundColor: showSwitch || showListBox ? 'white' : '',
      color: showSwitch || showListBox ? 'black' : '',
      cursor: showSwitch || showListBox ? 'auto' : '',
      width: simpleMode ? 'calc(100% - 50px)' : (minWidth ? 'calc(100vw - 108px)' : ''),
    }"
    :max-w="!simpleMode && minWidth ? '' : '550px'"
    @click="emits('itemFun')"
  >
    <div>
      <div v-if="itemImg" class="img-back" />
      <img v-if="itemImg" :src="itemImg" alt="">
      <span :style="{ width: simpleMode ? 'calc(100vw - 115px)' : (minWidth ? 'calc(100vw - 165px)' : '') }">{{ title }}</span>
    </div>
    <Switch
      v-if="showSwitch"
      :swich-state="switchState"
      @switch="emits('switchFun')"
    />
    <div
      v-if="showListBox"
      border="1px solid black/10" right-7px
      absolute p="x-10px y-5px" rounded-5px
      bg="active:primary-d"
      cursor-pointer whitespace-nowrap
      class="group"
      @click="showList = !showList"
    >
      <div w="!fit" flex justify-center items-center group-active:c-white>
        {{ listBoxTitle }}
        <div v-if="showList" i-mdi:chevron-up ml-5px group-active:c-white />
        <div v-else i-mdi:chevron-down ml-5px group-active:c-white />
      </div>
      <div
        v-if="showList"
        absolute right-0 bg-white
        top-35px flex="~ !col" justify-center
        items-center shadow="md black/20" z-10
        p-10px border="1px solid black/5"
        rounded-7px whitespace-nowrap
      >
        <div
          v-for="(item, index) in list" :key="index"
          p="x-20px y-10px" w="[calc(100%-40px)]"
          bg="active:primary-a hover:primary-d"
          rounded-5px c="hover:white active:white"
          @click="emits(item.fn)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <div v-if="showArrow && !showSwitch && !showListBox" i-mdi:chevron-right text-24px absolute right-15px />
  </div>
</template>

<style scoped lang="scss">
.item {
  position: relative;
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
