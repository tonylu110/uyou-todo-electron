<script setup lang="ts">
import type { Ref } from 'vue'
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
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
import ColorChange from '../../components/SettingList/ColorChange'

const { t } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const os = require('node:os')
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const { ipcRenderer, shell } = require('electron')

const isWindows10OrAfter = os.release().split('.')[2] > 15063
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
const simpleModeState = ref(localStorage.getItem('simpleMode') === 'true')
const enterAddState = ref(localStorage.getItem('enterAdd') === 'true')
const autoStartState = ref(localStorage.getItem('autoStart') === 'true')
const textWrapState = ref(localStorage.getItem('textWrap') === 'true')
const routerUrlState = ref((localStorage.getItem('routerUrl') === 'true' || !localStorage.getItem('routerUrl')) && isDev)
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
</script>

<template>
  <TabBar
    :title="t('settingTitleText')"
    :right-img-show="false"
    :left-img-show="false"
    bg-color="light"
  />
  <SettingList>
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
    <ColorChange />
    <Item
      :title="loginState ? t('myAccount') : t('loginText')"
      @item-fun="() => router.push('/account?from=setting')"
    />
    <ItemBox>
      <Item
        :title="t('update.autoUpdate')"
        :show-switch="true"
        :switch-state="autoUpdateState"
        @switch-fun="setSwitchFn('autoUpdate', !autoUpdateState, () => autoUpdateState = !autoUpdateState)"
      />
      <Item
        :title="t('update.updateTitle')"
        @item-fun="router.push('/update?from=setting')"
      />
    </ItemBox>
    <ItemBox>
      <Item
        :title="t('anotherSettings.simple')"
        :show-switch="true"
        :switch-state="simpleModeState"
        @switch-fun="setSwitchFn('simpleMode', !simpleModeState, () => simpleModeState = !simpleModeState, 'setSimple', t('restartApp'))"
      />
      <Item
        :title="t('startPage.startPage')"
        :show-list-box="true"
        :list-box-title="startPage"
        :list="startPageList"
        @home="setStartPage('home')"
        @today="setStartPage('today')"
      />
      <Item
        :title="t('anotherSettings.enterToAdd')"
        :show-switch="true"
        :switch-state="enterAddState"
        @switch-fun="setSwitchFn('enterAdd', !enterAddState, () => enterAddState = !enterAddState)"
      />
      <Item
        v-if="isLinux"
        :title="t('anotherSettings.autoStart')"
        :show-switch="true"
        :switch-state="autoStartState"
        @switch-fun="setSwitchFn('autoStart', !autoStartState, () => autoStartState = !autoStartState, 'setAutoStart')"
      />
      <Item
        :title="t('anotherSettings.itemWrap')"
        :show-switch="true"
        :switch-state="textWrapState"
        @switch-fun="setSwitchFn('routerUrl', !textWrapState, () => textWrapState = !textWrapState)"
      />
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
        class="item-blur item"
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
    <Item v-if="isInDev" title="Laboratory" @item-fun="router.push('/lab?from=setting')" />
    <ItemBox>
      <Item :title="t('otherList.toWeb')" item-img="./images/web.png" @item-fun="shell.openExternal('https://uyoutodo.uyou.org.cn/#/')" />
      <Item :title="t('otherList.toPhone')" item-img="./images/phone.png" @item-fun="shell.openExternal('https://github.com/tonylu110/uyou-todo-uni/releases')" />
      <Item :title="t('otherList.toDonate')" item-img="./images/donate.png" @item-fun="router.push('/donate?from=setting')" />
    </ItemBox>
    <ItemBox>
      <Item :title="t('anotherSettings.openSource')" @item-fun="router.push('/open?from=setting')" />
      <Item :title="t('anotherSettings.about')" @item-fun="openAboutWindow" />
    </ItemBox>
    <ItemButton mode="error" @click="clearData">
      {{ t('clearData') }}
    </ItemButton>
    <ItemButton @click="router.push('/lang?from=setting')">
      <img src="/images/lang.png" alt="" class="lang-img">
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
