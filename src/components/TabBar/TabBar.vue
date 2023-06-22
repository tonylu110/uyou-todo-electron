<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CateMenu from '../CateMenu/CateMenu.vue'
import getCateList from '../../util/getCateList'
import emitter from '../../util/bus'
import Alert from '../Alert/Alert.vue'
import i18n from '../../i18n'

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
  leftImg: 'i-fluent:chevron-left-16-filled',
  bgColor: 'default',
  showMore: false,
  showWrap: false,
})

const emits = defineEmits<{
  (e: 'rightClick'): void
  (e: 'leftClick'): void
}>()

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const ipcRenderer = require('electron').ipcRenderer

const systemTitleShow = localStorage.getItem('systemTitle') === 'true'

const syncImgShow = ref(false)

onMounted(() => {
  const uid = localStorage.getItem('uid')
  if (uid !== '' && uid !== null)
    syncImgShow.value = true
})

const route = useRoute()

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

const dialogShow = ref(false)

ipcRenderer.on('useKeyAddItem', () => {
  emits('rightClick')
})
</script>

<template>
  <div
    :class="`title-bar ${simpleMode ? '' : 'drag'}`"
    :style="{
      borderTopLeftRadius: isRound ? '15px' : '',
      backgroundColor: bgColor === 'light' ? 'white' : '',
      boxShadow: bgColor === 'light' ? '0 1px 10px #00000020' : '',
    }"
  >
    <div v-if="leftImgShow" class="box left-img" :style="{ border: bgColor === 'light' ? '1px solid #00000020' : '' }" @click="() => emits('leftClick')">
      <div
        :class="leftImg"
        text-22px c-white
        :c="bgColor === 'light' ? '#777' : ''"
      />
    </div>
    <div
      v-if="showWrap"
      :left="leftImgShow ? '47px' : '10px'"
      class="box"
      @click="showWrapFn"
    >
      <div i-ph:caret-up-down-fill text-20px c-white />
    </div>
    <div relative>
      <span :style="{ color: bgColor === 'light' ? '#555' : '', maxWidth: simpleMode ? 'calc(100vw - 140px)' : '' }">{{ title }}</span>
      <div
        v-if="showMore" absolute top-0 text-20px
        font-bold flex w="[calc(100%+20px)]"
        items-center c-transparent
        cursor-pointer
        @click="showListFn"
      >
        {{ title }}
        <div v-if="showList && simpleMode" i-mdi:menu-up text-20px c-white vertical-baseline />
        <div v-else i-mdi:menu-down text-20px c-white vertical-baseline />
      </div>
    </div>
    <div
      v-if="rightImgShow"
      :right="simpleMode || systemTitleShow ? '' : '!80px'"
      class="box right-img"
      @click="() => emits('rightClick')"
    >
      <div i-mdi:pencil-plus text-20px c-white />
    </div>
    <div
      v-if="syncImgShow && rightImgShow"
      :right="simpleMode || systemTitleShow ? '' : '!116px'"
      class="box sync-img"
      @click="sync"
    >
      <div i-fluent:cloud-sync-24-filled text-22px c-white />
    </div>
    <div
      v-if="!simpleMode && !systemTitleShow" flex no-drag absolute
      right-14px
    >
      <div
        cursor-pointer p-7px mr-7px
        w-11px h-11px rounded-full
        bg="black/10 hover:black/20 active:black/30"
        class="group"
        @click="() => ipcRenderer.send('window-min')"
      >
        <div
          i-fluent-emoji-high-contrast:minus block
          :c="route.name === 'Home' || route.name === 'other' ? 'white' : '#555'"
          text-11px text-center
        />
      </div>
      <div
        cursor-pointer p-6px
        w-13px h-13px rounded-full
        bg="black/10 hover:error-d active:error-a"
        class="group"
        @click="dialogShow = true"
      >
        <div
          i-mdi:close-thick block
          :c="route.name === 'Home' || route.name === 'other' ? 'white' : '#555 group-hover:white group-active:white'"
          text-13px text-center
        />
      </div>
    </div>
  </div>
  <CateMenu v-if="showList && simpleMode" @click-menu="showListFn" />
  <Alert
    :dialog-show="dialogShow"
    :title="i18n().accountPage.alertTitle"
    @cancel="dialogShow = false"
    @return="() => ipcRenderer.send('window-close')"
  >
    <span>Do you want to close uyou ToDo</span>
  </Alert>
</template>

<style lang="scss" scoped>
.title-bar {
  position: relative;
  height: 55px;
  background-color: #7a695c;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 5px #594b4270;
  z-index: 10;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
    font-size: 20px;
    font-weight: bold;
  }

  .box {
    position: absolute;
    border-radius: 5px;
    width: 22px;
    height: 22px;
    padding: 4px;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #594b4270;
    -webkit-app-region: no-drag;

    & span {
      display: block;
      font-size: 22px;
    }

    &:hover {
      background-color: #00000010;
    }

    &:active {
      background-color: #00000020;
    }

    &.left-img {
      left: 10px;
    }

    &.right-img {
      right: 10px;
    }

    &.sync-img {
      right: 47px;
    }
  }
}
</style>
