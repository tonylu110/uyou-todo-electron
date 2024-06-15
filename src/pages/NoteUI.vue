<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ipcRenderer } from 'electron'
import WindowButtons from '../components/TabBar/windowButtons'
import SettingList from '../components/SettingList'
import NoteList from '../components/NoteList/NoteList.vue'
import CateAdd from '../components/NoteList/CateAdd/CateAdd.vue'
import firstLoad from '../components/TitleBar/firstLoad'
import { topWindow } from '../util/windowApi'
import emitter from '../util/bus'
import { isMac } from '../util/os'
import Search from '../components/Search/Search.vue'
import Tabs from '../components/Tabs/Tabs.vue'
import Tab from '../components/Tabs/Tab/Tab.vue'
import SideBar from '../components/Tabs/SideBar/SideBar.vue'
import Item from '../components/Tabs/SideBar/Item/Item.vue'
import Alert from '../components/Alert/Alert.vue'
import { versionCode } from '../util/appVersionCode'

const router = useRouter()

const { t, locale } = useI18n()

const alertShow = ref(false)
const alertMsg = ref<string[]>([])
const newVersion = ref('')

const version = versionCode
const autoUpdateState = localStorage.getItem('autoUpdate') !== 'false'

if (autoUpdateState) {
  fetch('https://api.todo.uyou.org.cn/update/get').then((res) => {
    return res.json()
  }).then((res) => {
    if (res[1].code > version) {
      if (locale.value === 'zh-cn')
        alertMsg.value = res[1].data
      else
        alertMsg.value = res[1].enData
      newVersion.value = res[1].version
      alertShow.value = true
    }
  })
}

function returnClick() {
  alertShow.value = false
  ipcRenderer.send('open-url', 'https://github.com/tonylu110/uyou-todo-electron/releases')
}

const showCateAdd = ref(false)

const topState = ref(firstLoad())
function onTopWindow() {
  topState.value = !topState.value
  topWindow(topState.value)
  localStorage.setItem('alwaysOnTop', `${topState.value}`)
  emitter.emit('topWindow', topState.value)
}
emitter.on('topWindow', (data: unknown) => {
  topState.value = (data as boolean)
})

const lableWidth = ref('')
const lableLeft = ref('0')
const tabsRef = ref<{
  $el: HTMLDivElement
}>()
function choose(id: string, width: string, left: number) {
  setLab(width, left)
  return id
}

function setLab(width: string, left: number) {
  lableWidth.value = width
  lableLeft.value = `${left - (tabsRef.value!.$el.getBoundingClientRect().left + 12)}px`
}

const showTab = ref(!(window.innerWidth < 640))
window.addEventListener('resize', () => {
  if (window.innerWidth < 640) {
    showTab.value = false
  }
  else {
    showTab.value = true
  }
})

const openSideBar = ref(false)

const showSearch = ref(false)
</script>

<template>
  <SettingList h="![calc(100vh-160px)]" p-y="!80px">
    <div fixed left-0 top-0 h-65px w-full drag />
    <div fixed left-0 top-0 h-full w-12vw drag />
    <div fixed right-0 top-0 h-full w-12vw drag />
    <SideBar :open="openSideBar" @set-side="openSideBar = false">
      <Item icon="i-f7:square-list" :title="t('noteui.allcate')" :selected="true" />
      <Item icon="i-f7:today" :title="t('noteui.othercate')" :selected="false" />
      <Item icon="i-f7:search" :title="t('noteui.search')" :selected="false" @click="showSearch = true" />
    </SideBar>
    <Tabs ref="tabsRef" :lab-width="lableWidth" :lab-left="lableLeft">
      <template #header>
        <Tab id="side" icon="i-f7:sidebar-left" :control="true" @choose="openSideBar = true" />
      </template>
      <template #footer>
        <Tab id="search" icon="i-f7:search" :control="true" @choose="showSearch = true" />
      </template>
      <Tab id="all" :title="t('noteui.allcate')" :checked="true" :index="0" @choose="choose" @load="setLab" />
      <Tab v-if="showTab" id="use" :title="t('noteui.othercate')" :index="1" @choose="choose" />
    </Tabs>
    <div
      v-if="!isMac()"
      :bg="topState
        ? 'error-d hover:error-h active:error-a'
        : 'black/10 hover:black/20 active:black/30'"
      fixed left-15px top-14px mr-7px h-13px w-13px flex cursor-pointer
      items-center justify-center rounded-5px rounded-full p-6px no-drag
      @click="onTopWindow"
    >
      <div i-fluent:pin-12-filled text-13px :c="topState ? 'white' : '#555'" />
    </div>

    <div fixed right-15px top-14px z-1>
      <WindowButtons />
    </div>

    <NoteList />

    <div
      flex="~ gap-10px" fixed bottom-15px right-15px no-drag
    >
      <div
        bg="primary-d active:primary-a"
        transition="duration-300 all"
        rounded="10px hover:30px"
        shadow="md hover:lg primary-d/70 dark:primary-a/70"
        flex items-center justify-center p-13px
        transform="active:scale-90 hover:scale-120"
        @click="showCateAdd = true"
      >
        <div i-ph:plus-bold text-22px c-white />
      </div>
      <div
        bg="primary-d active:primary-a"
        transition="duration-300 all"
        rounded="10px hover:30px"
        shadow="md hover:lg primary-d/70 dark:primary-a/70"
        flex items-center justify-center p-13px
        transform="active:scale-90 hover:scale-120"
        @click="router.push('/setting')"
      >
        <div i-ph:gear-fine-bold text-22px c-white />
      </div>
    </div>
    <CateAdd :open="showCateAdd" @close="showCateAdd = false" />
    <Search :open="showSearch" @close="showSearch = false" />
  </SettingList>
  <Alert
    :dialog-show="alertShow"
    :title="`${t('updateText')} v${newVersion}`"
    :confirm-btn-name="t('update.gotoUpdate')"
    @cancel="() => alertShow = false"
    @return="returnClick"
  >
    <ul m-0 p-l-20px>
      <li v-for="(item, index) in alertMsg" :key="index">
        {{ item.slice(2) }}
      </li>
    </ul>
  </Alert>
</template>
