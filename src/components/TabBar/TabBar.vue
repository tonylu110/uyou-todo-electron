<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CateMenu from '../CateMenu/CateMenu.vue'
import getCateList from '../../util/getCateList'
import emitter from '../../util/bus'
import { isLinux, isMac, isWindows10OrAfter } from '../../util/os'
import windowButtons from './windowButtons'

withDefaults(defineProps<{
  title?: string
  leftImgShow?: boolean
  rightImgShow?: boolean
  leftImg?: string
  bgColor?: string
  showMore?: boolean
  showWrap?: boolean
}>(), {
  title: 'uyou ToDo',
  leftImgShow: true,
  rightImgShow: true,
  leftImg: 'i-ph:caret-left-fill',
  bgColor: 'light',
  showMore: false,
  showWrap: false,
})

const emits = defineEmits<{
  (e: 'rightClick'): void
  (e: 'leftClick'): void
}>()

const router = useRouter()
const route = useRoute()

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const ipcRenderer = require('electron').ipcRenderer

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
</script>

<template>
  <div
    class="title-bar"
    :bg="isBlur ? 'white/50 dark:#333/50' : 'white/80 dark:#333/80'" drag
    :style="{
      borderTopLeftRadius: isRound ? '15px' : '',
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
          v-if="simpleMode && (route.name === 'Home' || route.name === 'other')" absolute top-0 text-20px
          font-bold flex w="[calc(100%+20px)]"
          items-center c-transparent
          cursor-pointer no-drag
          @click="showListFn"
        >
          {{ title }}
          <div v-if="showList && simpleMode" i-mdi:menu-up text-20px c="#555 dark:#bbb" vertical-baseline />
          <div v-else i-mdi:menu-down text-20px c="#555 dark:#bbb" vertical-baseline />
        </div>
      </div>
      <div
        :h="leftImgShow || showWrap ? '' : '30px'" flex
        :mb="isMac() && simpleMode ? '15px' : '10px'"
        :ml="isMac() && simpleMode ? '65px' : ''"
      >
        <div
          v-if="leftImgShow"
          bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20" mr-10px
          p-5px w-20px rounded-5px no-drag cursor-pointer
          @click="() => emits('leftClick')"
        >
          <div
            :class="leftImg"
            text-20px c="#555 dark:#bbb" block
          />
        </div>
        <div
          v-if="route.name !== 'Home' && simpleMode"
          bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
          p-5px w-20px rounded-5px no-drag cursor-pointer mr-10px
          @click="router.push('/')"
        >
          <div i-mdi:home text-20px c="#555 dark:#bbb" block />
        </div>
        <div
          v-if="showWrap"
          bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
          p-5px w-20px rounded-5px no-drag cursor-pointer
          @click="showWrapFn"
        >
          <div i-ph:caret-up-down-fill text-20px c="#555 dark:#bbb" block />
        </div>
      </div>
    </div>
    <div flex="~ col" items-end mr-15px>
      <div :h="!systemTitleShow ? '' : '26px'">
        <window-buttons v-if="!systemTitleShow" />
      </div>
      <div flex mt-12px :h="rightImgShow ? '' : '30px'">
        <div
          v-if="rightImgShow"
          bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
          p-5px w-20px rounded-5px no-drag cursor-pointer
          @click="() => emits('rightClick')"
        >
          <div i-mdi:pencil-plus text-20px c="#555 dark:#bbb" block />
        </div>
        <div
          v-if="syncImgShow && rightImgShow"
          bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20" ml-10px
          p-5px w-20px rounded-5px no-drag cursor-pointer
          @click="sync"
        >
          <div i-fluent:cloud-sync-24-filled text-20px c="#555 dark:#bbb" block />
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
