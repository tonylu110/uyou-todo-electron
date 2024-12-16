<script setup lang="ts">
import { ElOption, ElSelect } from 'element-plus'
import { ref } from 'vue'
import Switch from '../../Switch'

interface Props {
  switchState?: boolean
  title: string
  showSwitch?: boolean
  showArrow?: boolean
  itemImg?: string
  icon?: string
  iconColor?: string
  showListBox?: boolean
  listBoxTitle?: string
  list?: {
    title: string
    fn: string
    icon: string
  }[]
}

const {
  switchState = true,
  title = 'title',
  showSwitch = false,
  showArrow = true,
  itemImg = '',
  icon = '',
  iconColor = 'primary-d dark:primary-a',
  showListBox = false,
  list = [],
  listBoxTitle,
} = defineProps<Props>()

const emits = defineEmits<{
  (e: 'switchFun'): void
  (e: 'itemFun'): void
  (e: string): void
}>()

const simpleMode = localStorage.getItem('simpleMode') === 'true'

const listTitle = ref(listBoxTitle)

const minWidth = ref(window.innerWidth < 750)
window.addEventListener('resize', () => {
  minWidth.value = window.innerWidth < 750
})
</script>

<template>
  <div
    class="group item"
    :style="{
      cursor: showSwitch || showListBox ? 'auto' : '',
      width: simpleMode ? 'calc(100% - 50px)' : (minWidth ? 'calc(100vw - 108px)' : ''),
    }"
    :max-w="!simpleMode && minWidth ? '' : '550px'"
    :bg="showSwitch || showListBox ? 'white dark:#999/10' : 'white dark:#999/10 !active:primary-d !dark:active:primary-a'"
    :c="showSwitch || showListBox ? 'black dark:#bbb' : 'black dark:#bbb'" shadow-md
    border="1px solid black/20"
    @click="emits('itemFun')"
  >
    <div>
      <div v-if="itemImg" class="img-back" />
      <img v-if="itemImg" :src="itemImg" alt="">
      <div v-if="icon" :class="icon" mr-3 block text-6 :c="iconColor" />
      <span
        :style="{ width: simpleMode ? 'calc(100vw - 115px)' : (minWidth ? 'calc(100vw - 165px)' : '') }"
        :c="showSwitch || showListBox ? '' : 'group-active:white'"
      >{{ title }}</span>
    </div>
    <Switch
      v-if="showSwitch"
      :swich-state="switchState"
      @switch="emits('switchFun')"
    />
    <div absolute right-7px w-auto>
      <ElSelect
        v-if="showListBox"
        v-model="listTitle"
      >
        <ElOption
          v-for="item, index in list"
          :key="index"
          :label="item.title"
          :value="item.title"
          @click="emits(item.fn)"
        >
          <div flex items-center>
            <div :class="item.icon" mr-6px />
            <span>{{ item.title }}</span>
          </div>
        </ElOption>
      </ElSelect>
    </div>
    <div v-if="showArrow && !showSwitch && !showListBox" i-mdi:chevron-right absolute right-15px text-24px group-active:c-white />
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
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  :deep(.el-select) {
    .el-select__selection {
      --uno: min-w-80px;
    }
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
