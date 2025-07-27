<script setup lang="ts" vapor>
import type { cateItem } from '../ListMenu/ICateItem'
import { usePreferredDark } from '@vueuse/core'
import { ipcRenderer } from 'electron'
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import emitter from '../../util/bus'
import getCateList from '../../util/getCateList'
import { isLinux, isMac, isWindows10OrAfter } from '../../util/os'
import CateMenu from '../CateMenu/CateMenu.vue'
import changeCate from '../ListMenu/changCate'
import ChangeColor from './ChangeColor/ChangeColor.vue'
import Delete from './Delete/Delete.vine'
import TodayShow from './TodayShow/TodayShow.vue'
import windowButtons from './windowButtons'

interface Props {
  title?: string
  leftImgShow?: boolean
  rightImgShow?: boolean
  leftImg?: string
  bgColor?: string
  showMore?: boolean
  showWrap?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'uyou ToDo',
  leftImgShow: true,
  rightImgShow: true,
  leftImg: 'i-ph:caret-left-bold',
  showWrap: false,
})

const emits = defineEmits<{
  rightClick: []
  leftClick: []
  deleteAllItem: []
}>()

const router = useRouter()
const route = useRoute()

const systemTitleShow = localStorage.getItem('systemTitle') === 'true'

const syncImgShow = ref(false)

onMounted(() => {
  const uid = localStorage.getItem('uid')
  if (uid !== '' && uid !== null)
    syncImgShow.value = true
})

function sync() {
  if (syncImgShow.value) {
    fetch('https://api.todo.uyou.org.cn/gettodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: localStorage.getItem('uid'),
      }),
    }).then((res) => {
      return res.json()
    }).then((res) => {
      localStorage.setItem('ToDo', res.data)
      window.location.reload()
    })
    getCateList()
  }
}

const isRound = ref(false)

const isWindows = navigator.userAgent.includes('Win')
if (isWindows && (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && localStorage.getItem('systemTitle') === 'true' && !(localStorage.getItem('simpleMode') === 'true'))
  isRound.value = true

const simpleMode = localStorage.getItem('simpleMode') === 'true'

const showList = ref(false)
function showListFn() {
  showList.value = !showList.value
}

function showWrapFn() {
  emitter.emit('showWrap')
}

ipcRenderer.on('useKeyAddItem', () => {
  emits('rightClick')
})

const isBlur = (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && (!isLinux() || isWindows10OrAfter())

const useCustColor = ref(localStorage.getItem('useCustColor') === 'true')

const isDark = usePreferredDark()

const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
const cateList: cateItem[] = reactive(JSON.parse(localCateList!).data)
const useBgColor = ref(cateList.filter(value => value.id === Number(route.query.listName)))

function changColor(color: string | null) {
  for (let i = 0; i < cateList.length; i++) {
    if (cateList[i].id === Number(route.query.listName))
      cateList[i].color = color
  }
  localStorage.setItem('cate', JSON.stringify({
    data: cateList,
  }))
  emitter.emit('setCate', JSON.stringify({
    data: cateList,
  }))
  useBgColor.value[0].color = color
  emitter.emit('changeBgColor', color)
  if (localStorage.getItem('uid')) {
    changeCate({
      uid: localStorage.getItem('uid')!,
      data: {
        data: cateList,
      },
    })
  }
}

const newNoteUI = localStorage.getItem('newNoteUI') === 'true'

watchEffect(() => {
  useBgColor.value = cateList.filter(value => value.id === Number(route.query.listName))
})
</script>

<template>
  <div
    class="title-bar" drag
    :style="{
      borderTopLeftRadius: isRound ? '15px' : '',
      backgroundColor: !isNaN(Number.parseInt((route.query.listName as string))) && useCustColor
        ? isBlur
          ? useBgColor[0].color
            ? `${useBgColor[0].color}50` : isDark ? 'rgba(51, 51, 51, 0.5)' : 'rgba(255, 255, 255, 0.5)'
          : useBgColor[0].color
            ? `${useBgColor[0].color}cc` : isDark ? 'rgba(51, 51, 51, 0.8)' : 'rgba(255, 255, 255, 0.8)'
        : isBlur
          ? isDark ? 'rgba(51, 51, 51, 0.5)' : 'rgba(255, 255, 255, 0.5)'
          : isDark ? 'rgba(51, 51, 51, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    }"
  >
    <div :ml="leftImgShow || showWrap ? '15px' : '20px'" flex="~ col-reverse">
      <div relative :mb="leftImgShow || showWrap ? '' : '20px'">
        <span
          :style="{ maxWidth: simpleMode ? 'calc(100vw - 140px)' : '' }"
          :text="leftImgShow || showWrap ? '20px' : '40px'"
          c="#555 dark:#bbb"
        >{{ title }}</span>
        <div
          v-if="simpleMode && (route.name === 'Home' || route.name === 'other')"
          w="[calc(100%+20px)]"
          absolute top-0 flex cursor-pointer items-center text-20px c-transparent font-bold no-drag
          @click="showListFn"
        >
          {{ title }}
          <div v-if="showList && simpleMode" c="#555 dark:#bbb" i-mdi:menu-up vertical-baseline text-20px />
          <div v-else c="#555 dark:#bbb" i-mdi:menu-down vertical-baseline text-20px />
        </div>
      </div>
      <div
        :h="leftImgShow || showWrap ? '' : '30px'" flex
        :mb="isMac()
          ? simpleMode
            ? '15px'
            : newNoteUI
              ? '20px'
              : '10px'
          : '10px'"
        :ml="isMac() && (simpleMode || newNoteUI) ? '65px' : ''"
        :mt="isMac() && newNoteUI ? '-5px' : ''"
      >
        <div
          v-if="leftImgShow"
          bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
          mr-10px w-20px cursor-pointer rounded-5px p-5px no-drag
          @click="() => emits('leftClick')"
        >
          <div
            :class="leftImg"
            c="#555 dark:#bbb" block text-20px
          />
        </div>
        <div
          v-if="route.name !== 'Home' && simpleMode"
          bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
          mr-10px w-20px cursor-pointer rounded-5px p-5px no-drag
          @click="router.push('/')"
        >
          <div c="#555 dark:#bbb" i-ph:house-bold block text-20px />
        </div>
        <div
          v-if="showWrap"
          bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
          w-20px cursor-pointer rounded-5px p-5px no-drag
          @click="showWrapFn"
        >
          <div c="#555 dark:#bbb" i-ph:caret-up-down-bold block text-20px />
        </div>
      </div>
    </div>
    <div flex="~ col" mr-15px items-end>
      <div :h="!systemTitleShow ? '' : '26px'">
        <window-buttons v-if="!systemTitleShow" />
      </div>
      <div mt-12px flex :h="rightImgShow ? '' : '30px'">
        <Delete v-if="route.query.listName === 'allDo'" @delete="emits('deleteAllItem')" />
        <TodayShow v-if="route.query.listName === 'today'" />
        <ChangeColor
          v-if="!isNaN(Number.parseInt((route.query.listName as string))) && useCustColor"
          @change-color="changColor"
        />
        <div
          v-if="rightImgShow"
          bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
          ml-10px w-20px cursor-pointer rounded-5px p-5px no-drag
          @click="() => emits('rightClick')"
        >
          <div c="#555 dark:#bbb" i-ph:plus-circle-bold block text-20px />
        </div>
        <div
          v-if="syncImgShow && rightImgShow"
          bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
          ml-10px w-20px cursor-pointer rounded-5px p-5px no-drag
          @click="sync"
        >
          <div c="#555 dark:#bbb" i-ph:file-cloud-bold block text-20px />
        </div>
      </div>
    </div>
  </div>
  <CateMenu v-if="showList && simpleMode" @click-menu="showListFn" />
</template>

<style lang="scss" scoped>
.title-bar {
  position: relative;
  height: 95px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 10;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
  }
}
</style>
