<script setup lang="ts">
import { ref } from 'vue'
import LocalStorage from '../../../util/localStorage'
import Item from './Item/Item.vue'

const props = withDefaults(defineProps<{
  title: string
  id?: number
  color?: string | null
  icon?: string
  otherCate?: boolean
}>(), {
  title: 'title',
  color: 'primary-d',
})

const emits = defineEmits<{
  deleteCate: []
}>()

const list = ref(LocalStorage('get'))
const listData = ref(list.value!.filter(listData => listData.cate === `${props.id}`))
const otherList = ref(list.value!.filter(listData => listData.cate === undefined))
</script>

<template>
  <div
    mb-30px break-inside-avoid rounded-10px bg="white dark:#333"
  >
    <div
      p="y-5px x-10px r-0"
      :bg="color ? color : 'primary-d'"
      absolute ml-10px flex items-center rounded-7px c-white no-drag
      transform="translate-y--50%"
    >
      <div :class="otherCate ? 'i-ph:smiley-blank-bold' : (icon ? icon : 'i-ph:radio-button-bold')" mr-8px />
      <span>{{ title }}</span>
      <div
        flex="~ gap-5px" w="0 hover:37px" transition="all 300"
        items-center overflow-hidden p="r-10px l-7px" op="0 hover:100"
      >
        <div>
          <div i-ph:pencil-bold block />
        </div>
        <div @click="emits('deleteCate')">
          <div i-ph:trash-bold block />
        </div>
      </div>
    </div>
    <div p="10px t-20px">
      <template v-if="otherCate">
        <div v-for="item in otherList" :key="item.id">
          <Item
            :id="item.id"
            :title="item.text"
            :is-ok="item.ok"
          />
        </div>
      </template>
      <template v-else>
        <div v-for="item in listData" :key="item.id">
          <Item
            :id="item.id"
            :title="item.text"
            :is-ok="item.ok"
            :color="color"
          />
        </div>
      </template>
      <div
        v-if="!otherCate" w="[calc(100%-20px)]"
        bg="black/5 active:black/10" mt-5px flex items-center justify-center rounded-7px
        p-10px
        transition="all 300"
      >
        <div i-ph:plus-bold />
      </div>
    </div>
  </div>
</template>
