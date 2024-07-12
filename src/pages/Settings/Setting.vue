<script setup lang="ts">
import os from 'node:os'
import type { Ref } from 'vue'
import { onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElRadio, ElRadioGroup } from 'element-plus'
import { ipcRenderer, shell } from 'electron'
import TabBar from '../../components/TabBar/TabBar.vue'
import SettingList from '../../components/SettingList'
import Item from '../../components/ItemBox/Item/Item.vue'
import ItemBox from '../../components/ItemBox/ItemBox.vue'
import ItemButton from '../../components/ItemBox/ItemButton/ItemButton.vue'
import router from '../../router'
import firstLoad from '../../components/TitleBar/firstLoad'
import emitter from '../../util/bus'
import isDev from '../../util/mode'
import setSwitchFn from '../../util/setSwitchFn'
import ColorChange from '../../components/SettingList/colorChange'
import NoteTabBar from '../../components/TabBar/NoteTabBar.vue'

const { t } = useI18n()

const isWindows10OrAfter = Number(os.release().split('.')[2]) > 15063
const isLinux = !(process.platform === 'linux')
const isMac = !(process.platform === 'darwin')

const isWin11 = (process.platform === 'win32' && Number(os.release().split('.')[2]) >= 22000)

const titleBarShow = localStorage.getItem('systemTitle') === 'true'

const loginState = localStorage.getItem('uid') !== '' && localStorage.getItem('uid') !== null

const saveTopState = ref(localStorage.getItem('saveTopState') === 'true' || localStorage.getItem('saveTopState') === null)
const saveWindowSizeState = ref(localStorage.getItem('saveWindowSizeState') === 'true')
const autoUpdateState = ref(localStorage.getItem('autoUpdate') !== 'false')
const useSystemTitleBar = ref(localStorage.getItem('systemTitle') === 'true')
const topState = ref(firstLoad())
const menuBlurState = ref(localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null)
const showWindowMenuState = ref(localStorage.getItem('windowMenu') === 'true')
const enterAddState = ref(localStorage.getItem('enterAdd') === 'true')
const autoStartState = ref(localStorage.getItem('autoStart') === 'true')
const textWrapState = ref(localStorage.getItem('textWrap') === 'true' || localStorage.getItem('textWrap') === null)
const routerUrlState = ref((localStorage.getItem('routerUrl') === 'true' || !localStorage.getItem('routerUrl')) && isDev)
const showToDoBtn = ref(localStorage.getItem('ToDoBtn') === 'true')
const closeMsgBox = ref(localStorage.getItem('closeMsgBox') === 'true')
const remember = ref(localStorage.getItem('rememberClose') === 'true')
const showStar = ref(localStorage.getItem('showStar') === 'true' || localStorage.getItem('showStar') === null)

function showRouterUrl() {
  routerUrlState.value = !routerUrlState.value
  emitter.emit('routerShow', routerUrlState.value)
  localStorage.setItem('routerUrl', `${routerUrlState.value}`)
}
emitter.on('routerShow', (data: unknown) => {
  routerUrlState.value = (data as boolean)
})
function clearData() {
  localStorage.clear()
  window.location.reload()
}
function openAboutWindow() {
  ipcRenderer.send('open-about')
}
function changeMica(effect: string) {
  ipcRenderer.send('changeBlur', effect)
}
function openUrl(url: string) {
  window.open(url)
}

onBeforeUnmount(() => {
  emitter.off('routerShow')
  emitter.off('toastShow')
})

const isInDev = localStorage.getItem('isInDev') === 'true'

const startPageList = [
  {
    title: t('startPage.allTodos'),
    fn: 'home',
  },
  {
    title: t('startPage.today'),
    fn: 'today',
  },
]
const startPage = ref(localStorage.getItem('start') ? startPageList.filter(item => item.fn === localStorage.getItem('start'))[0].title : t('startPage.allTodos')) as unknown as Ref<string>
function setStartPage(StartPage: string) {
  localStorage.setItem('start', StartPage)
  startPage.value = startPageList.filter(item => item.fn === StartPage)[0].title
}

const minWidth = ref(window.innerWidth < 750)
window.addEventListener('resize', () => {
  minWidth.value = window.innerWidth < 750
})

const localCloseState = localStorage.getItem('closeState') === 'true'
const closeState = ref(remember.value ? localCloseState : false)
watch(closeState, (newValue) => {
  localStorage.setItem('closeState', `${newValue}`)
  emitter.emit('changeCloseState', newValue)
})

const isNoteUI = localStorage.getItem('newNoteUI') === 'true'
const localLang = navigator.language.toLowerCase()
</script>

<template>
  <NoteTabBar v-if="isNoteUI" :title="t('settingTitleText')" />
  <TabBar
    v-else
    :title="t('settingTitleText')"
    :right-img-show="false"
    bg-color="light"
    @left-click="router.back()"
  />
  <SettingList :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'">
    <ItemBox v-if="isDev">
      <Item
        title="UnoCss dev"
        @item-fun="openUrl('http://localhost:3000/__unocss')"
      />
      <Item
        title="Show router url"
        :show-switch="true"
        :switch-state="routerUrlState"
        @switch-fun="showRouterUrl"
      />
    </ItemBox>
    <ColorChange v-if="(!isLinux || isWindows10OrAfter) || !isMac" />
    <Item :title="t('vip.proVersion')" icon="i-icon-park:vip-one" @item-fun="router.push('/vip?from=setting')" />
    <ItemBox>
      <Item
        icon="i-icon-park:reduce-user"
        :title="loginState ? t('myAccount') : t('loginText')"
        @item-fun="() => router.push('/account?from=setting')"
      />
      <Item
        icon="i-icon-park:lock-one"
        :title="t('anotherSettings.openPass')"
        @item-fun="router.push('/openPass?from=setting')"
      />
    </ItemBox>
    <Item
      icon="i-icon-park:two-dimensional-code"
      :title="t('anotherSettings.model')"
      @item-fun="router.push('/mode?from=setting')"
    />
    <ItemBox>
      <Item
        icon="i-icon-park:auto-focus"
        :title="t('update.autoUpdate')"
        :show-switch="true"
        :switch-state="autoUpdateState"
        @switch-fun="setSwitchFn('autoUpdate', !autoUpdateState, () => autoUpdateState = !autoUpdateState)"
      />
      <Item
        icon="i-icon-park:update-rotation"
        :title="t('update.updateTitle')"
        @item-fun="router.push('/update?from=setting')"
      />
    </ItemBox>
    <ItemBox>
      <Item
        v-if="!isNoteUI"
        icon="i-icon-park:web-page"
        :title="t('startPage.startPage')"
        :show-list-box="true"
        :list-box-title="startPage"
        :list="startPageList"
        @home="setStartPage('home')"
        @today="setStartPage('today')"
      />
      <Item
        v-if="!isNoteUI"
        icon="i-icon-park:enter-key"
        :title="t('anotherSettings.enterToAdd')"
        :show-switch="true"
        :switch-state="enterAddState"
        @switch-fun="setSwitchFn('enterAdd', !enterAddState, () => enterAddState = !enterAddState)"
      />
      <Item
        v-if="!isNoteUI"
        icon="i-icon-park:eyes"
        :title="t('anotherSettings.itemBtnShow')"
        :show-switch="true"
        :switch-state="showToDoBtn"
        @switch-fun="setSwitchFn('ToDoBtn', !showToDoBtn, () => showToDoBtn = !showToDoBtn)"
      />
      <Item
        v-if="isLinux"
        icon="i-icon-park:computer"
        :title="t('anotherSettings.autoStart')"
        :show-switch="true"
        :switch-state="autoStartState"
        @switch-fun="setSwitchFn('autoStart', !autoStartState, () => autoStartState = !autoStartState, 'setAutoStart')"
      />
      <Item
        icon="i-icon-park:reverse-operation-out"
        :title="t('anotherSettings.itemWrap')"
        :show-switch="true"
        :switch-state="textWrapState"
        @switch-fun="setSwitchFn('textWrap', !textWrapState, () => textWrapState = !textWrapState)"
      />
      <Item
        v-if="isNoteUI"
        icon="i-icon-park:star"
        :title="t('anotherSettings.star')"
        :show-switch="true"
        :switch-state="showStar"
        @switch-fun="setSwitchFn('showStar', !showStar, () => showStar = !showStar)"
      />
    </ItemBox>
    <ItemBox v-if="isMac">
      <Item
        :title="t('quit.closeMsgBox')"
        :show-switch="true"
        :switch-state="closeMsgBox"
        @switch-fun="setSwitchFn('closeMsgBox', !closeMsgBox, () => {
          closeMsgBox = !closeMsgBox
          emitter.emit('changeCloseMsgBox', closeMsgBox)
        })"
      />
      <Item
        :title="t('anotherSettings.rememberQuit')"
        :show-switch="true"
        :switch-state="remember"
        @switch-fun="setSwitchFn('rememberClose', !remember, () => {
          remember = !remember
          emitter.emit('changeRemember', remember)
        })"
      />
      <div
        v-if="remember"
        class="item"
        :max-w="minWidth ? '[calc(100vw-450px)]' : '550px'"
        bg="white dark:#999/10"

        h-30px min-h-30px flex items-center justify-center p="x-15px y-10px"
      >
        <ElRadioGroup
          v-model="closeState"
          flex="~ row"
        >
          <ElRadio :value="false">
            {{ t('quit.tray') }}
          </ElRadio>
          <ElRadio :value="true">
            {{ t('quit.quit') }}
          </ElRadio>
        </ElRadioGroup>
      </div>
    </ItemBox>
    <ItemBox>
      <Item
        :title="t('useSystemBar')"
        :show-switch="true"
        :switch-state="useSystemTitleBar"
        @switch-fun="setSwitchFn('systemTitle', !useSystemTitleBar, () => useSystemTitleBar = !useSystemTitleBar, 'setSystemBar', t('restartApp'))"
      />
      <Item
        v-if="titleBarShow && isMac"
        :title="t('anotherSettings.windowMenu')"
        :show-switch="true"
        :switch-state="showWindowMenuState"
        @switch-fun="setSwitchFn('windowMenu', !showWindowMenuState, () => showWindowMenuState = !showWindowMenuState, 'setWindowMenu')"
      />
      <Item
        v-if="(isLinux && isWindows10OrAfter) || !isMac"
        :title="t('anotherSettings.menuBlur')"
        :show-switch="true"
        :switch-state="menuBlurState"
        @switch-fun="setSwitchFn('menuBlur', !menuBlurState, () => menuBlurState = !menuBlurState, 'setMenuBlur', t('restartApp'))"
      />
      <div
        v-if="isWin11 && menuBlurState"
        class="item item-blur"
        :max-w="minWidth ? '' : '550px'"
        bg="white dark:#999/10"
      >
        <div
          c="black dark:#bbb active:white"
          bg="active:primary-d dark:active:primary-a"
          @click="changeMica('mica')"
        >
          Mica Effect
        </div>
        <div
          c="black dark:#bbb active:white"
          bg="active:primary-d dark:active:primary-a"
          @click="changeMica('tabbed')"
        >
          Mica Tabbed
        </div>
        <div
          c="black dark:#bbb active:white"
          bg="active:primary-d dark:active:primary-a"
          @click="changeMica('acrylic')"
        >
          Acrylic
        </div>
      </div>
    </ItemBox>
    <ItemBox>
      <Item
        :title="t('setTopState')"
        :show-switch="true"
        :switch-state="saveTopState"
        @switch-fun="setSwitchFn('saveTopState', !saveTopState, () => saveTopState = !saveTopState)"
      />
      <Item
        v-if="titleBarShow"
        :title="t('setTopWindow')"
        :show-switch="true"
        :switch-state="topState"
        @switch-fun="setSwitchFn('alwaysOnTop', !topState, () => topState = !topState, 'window-on-top')"
      />
      <Item
        :title="t('saveWindowSize')"
        :show-switch="true"
        :switch-state="saveWindowSizeState"
        @switch-fun="setSwitchFn('saveWindowSizeState', !saveWindowSizeState, () => saveWindowSizeState = !saveWindowSizeState, 'setWindowSizeState')"
      />
    </ItemBox>
    <Item v-if="isInDev" :title="t('anotherSettings.laboratory')" @item-fun="router.push('/lab?from=setting')" />
    <ItemBox>
      <Item :title="t('otherList.toFind')" icon="i-icon-park:message" @item-fun="shell.openExternal('https://github.com/tonylu110/uyou-todo-electron/discussions/6')" />
      <Item :title="t('otherList.toGithub')" icon="i-icon-park:github" @item-fun="shell.openExternal('https://github.com/tonylu110/uyou-todo-electron')" />
      <Item :title="t('otherList.toDonate')" icon="i-icon-park:coffee-machine" @item-fun="router.push('/donate?from=setting')" />
    </ItemBox>
    <ItemBox>
      <Item :title="t('anotherSettings.openSource')" icon="i-icon-park:heart-ballon" @item-fun="router.push('/open?from=setting')" />
      <Item :title="t('anotherSettings.about')" icon="i-icon-park:info" @item-fun="openAboutWindow" />
    </ItemBox>
    <ItemButton mode="error" @click="clearData">
      {{ t('clearData') }}
    </ItemButton>
    <ItemButton @click="router.push('/lang?from=setting')">
      <div flex gap-4>
        <div i-flagpack:us text-7 drop-shadow-md />
        <div i-flagpack:gb-ukm text-7 drop-shadow-md />
        <div i-flagpack:es text-7 drop-shadow-md />
        <div i-flagpack:cn text-7 drop-shadow-md />
        <div i-flagpack:hk text-7 drop-shadow-md />
        <div v-if="localLang === 'zh-tw'" i-flagpack:tw text-7 drop-shadow-md />
        <div i-flagpack:jp text-7 drop-shadow-md />
      </div>
    </ItemButton>
  </SettingList>
</template>

<style scoped lang="scss">
.item-blur {
  position: relative;
  width: calc(100vw - 450px);
  min-height: 30px;
  height: 30px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 130px;
    margin: 0 10px;
    text-align: center;
    height: 2em;
    line-height: 2em;
    border-radius: 5px;
    border: 1px solid #00000015;
    cursor: pointer;
    font-size: 14px;
  }
}
</style>
