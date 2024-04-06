<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Dropdown as VDropdown } from 'floating-vue'
import { usePreferredDark } from '@vueuse/core'
import CateMenu from '../CateMenu/CateMenu.vue'
import getCateList from '../../util/getCateList'
import emitter from '../../util/bus'
import { isLinux, isMac, isWindows10OrAfter } from '../../util/os'
import type { cateItem } from '../ListMenu/ICateItem'
import changeCate from '../ListMenu/changCate'
import windowButtons from './windowButtons'
import TodayShow from './TodayShow/TodayShow.vue'

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
  leftImg: 'i-ph:caret-left-bold',
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

const useCustColor = ref(localStorage.getItem('useCustColor') === 'true')
const showColor = ref(false)

const isDark = usePreferredDark()

const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
const cateList: cateItem[] = reactive(JSON.parse(localCateList!).data)
const bgColor = ref(cateList.filter(value => value.id === Number(route.query.listName)))

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
  bgColor.value[0].color = color
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

watchEffect(() => {
  bgColor.value = cateList.filter(value => value.id === Number(route.query.listName))
})
</script>

<template>
  <div
    class="title-bar" drag
    :style="{
      borderTopLeftRadius: isRound ? '15px' : '',
      backgroundColor: !isNaN(Number.parseInt((route.query.listName as string))) && useCustColor
        ? isBlur
          ? bgColor[0].color
            ? `${bgColor[0].color}50` : isDark ? 'rgba(51, 51, 51, 0.5)' : 'rgba(255, 255, 255, 0.5)'
          : bgColor[0].color
            ? `${bgColor[0].color}cc` : isDark ? 'rgba(51, 51, 51, 0.8)' : 'rgba(255, 255, 255, 0.8)'
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
          <div i-ph:house-bold text-20px c="#555 dark:#bbb" block />
        </div>
        <div
          v-if="showWrap"
          bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
          p-5px w-20px rounded-5px no-drag cursor-pointer
          @click="showWrapFn"
        >
          <div i-ph:caret-up-down-bold text-20px c="#555 dark:#bbb" block />
        </div>
      </div>
    </div>
    <div flex="~ col" items-end mr-15px>
      <div :h="!systemTitleShow ? '' : '26px'">
        <window-buttons v-if="!systemTitleShow" />
      </div>
      <div flex mt-12px :h="rightImgShow ? '' : '30px'">
        <TodayShow v-if="route.query.listName === 'today'"/>
        <VDropdown
          v-model:shown="showColor"
          :distance="12"
          placement="bottom"
        >
          <div
            v-if="!isNaN(Number.parseInt((route.query.listName as string))) && useCustColor"
            bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20"
            p-5px w-20px rounded-5px no-drag cursor-pointer
            @click="showColor = true"
          >
            <div i-ph:palette-bold text-20px c="#555 dark:#bbb" block />
          </div>
          <template #popper>
            <div p-10px flex="~ gap-5px wrap" max-w-120px>
              <div
                p-10px bg="#eee dark:#555" rounded-5px
                @click="changColor(null)"
              />
              <div
                p-10px bg="#f04490" rounded-5px
                @click="changColor('#f04490')"
              />
              <div
                p-10px bg="#f96a02" rounded-5px
                @click="changColor('#f96a02')"
              />
              <div
                p-10px bg="#eb7760" rounded-5px
                @click="changColor('#eb7760')"
              />
              <div
                p-10px bg="#d9c003" rounded-5px
                @click="changColor('#d9c003')"
              />
              <div
                p-10px bg="#feb9be" rounded-5px
                @click="changColor('#feb9be')"
              />
              <div
                p-10px bg="#02aa33" rounded-5px
                @click="changColor('#02aa33')"
              />
              <div
                p-10px bg="#a3bc3c" rounded-5px
                @click="changColor('#a3bc3c')"
              />
              <div
                p-10px bg="#3f607f" rounded-5px
                @click="changColor('#3f607f')"
              />
              <div
                p-10px bg="#af7c5d" rounded-5px
                @click="changColor('#af7c5d')"
              />
            </div>
          </template>
        </VDropdown>
        <div
          v-if="rightImgShow"
          bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20" ml-10px
          p-5px w-20px rounded-5px no-drag cursor-pointer
          @click="() => emits('rightClick')"
        >
          <div i-ph:plus-circle-bold text-20px c="#555 dark:#bbb" block />
        </div>
        <div
          v-if="syncImgShow && rightImgShow"
          bg="black/10 hover:black/20 dark:#999/10 dark:hover:#999/20" ml-10px
          p-5px w-20px rounded-5px no-drag cursor-pointer
          @click="sync"
        >
          <div i-ph:file-cloud-bold text-20px c="#555 dark:#bbb" block />
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
