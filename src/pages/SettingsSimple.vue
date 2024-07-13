<script setup lang="ts">
import os from 'node:os'
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TabBar from '../components/TabBar/TabBar.vue'
import router from '../router'
import SettingList from '../components/SettingList/SettingList.vine'
import Item from '../components/ItemBox/Item/Item.vue'
import ItemBox from '../components/ItemBox/ItemBox.vue'
import firstLoad from '../components/TitleBar/firstLoad'
import ItemButton from '../components/ItemBox/ItemButton/ItemButton.vue'
import emitter from '../util/bus'
import isDev from '../util/mode'
import setSwitchFn from '../util/setSwitchFn'
import ColorChange from '../components/SettingList/colorChange/colorChange.vine'

const { t } = useI18n()

const isLinux = !(process.platform === 'linux')
const isWindows10OrAfter = Number(os.release().split('.')[2]) > 15063
const isMac = process.platform === 'darwin'

const loginState = localStorage.getItem('uid') !== '' && localStorage.getItem('uid') !== null

const simpleModeState = ref(localStorage.getItem('simpleMode') === 'true')
const useSystemTitleBar = ref(localStorage.getItem('systemTitle') === 'true')
const topState = ref(firstLoad())
const textWrapState = ref(localStorage.getItem('textWrap') === 'true' || localStorage.getItem('textWrap') === null)
const menuBlurState = ref(localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null)
const enterAddState = ref(localStorage.getItem('enterAdd') === 'true')
const autoStartState = ref(localStorage.getItem('autoStart') === 'true')
const showToDoBtn = ref(localStorage.getItem('ToDoBtn') === 'true')

emitter.on('topWindow', (data: unknown) => {
  topState.value = (data as boolean)
})
emitter.on('routerShow', (data: unknown) => {
  // eslint-disable-next-line ts/no-use-before-define
  routerUrlState.value = (data as boolean)
})
function clearData() {
  localStorage.clear()
  window.location.reload()
}
function openUrl(url: string) {
  window.open(url)
}
const routerUrlState = ref((localStorage.getItem('routerUrl') === 'true' || !localStorage.getItem('routerUrl')) && isDev)
function showRouterUrl() {
  routerUrlState.value = !routerUrlState.value
  emitter.emit('routerShow', routerUrlState.value)
  localStorage.setItem('routerUrl', `${routerUrlState.value}`)
}
onBeforeUnmount(() => {
  emitter.off('routerShow')
  emitter.off('toastShow')
})

const isInDev = localStorage.getItem('isInDev') === 'true'
const localLang = navigator.language.toLowerCase()
</script>

<template>
  <TabBar
    :title="t('settingTitleText')"
    :right-img-show="false"
    bg-color="light"
    @left-click="router.back()"
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
    <ColorChange v-if="(!isLinux || isWindows10OrAfter) || isMac" />
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
      icon="i-icon-park:update-rotation"
      :title="t('update.updateTitle')"
      @item-fun="router.push('/update?from=setting')"
    />
    <ItemBox>
      <Item
        icon="i-icon-park:two-dimensional-code"
        :title="t('anotherSettings.simple')"
        :show-switch="true"
        :switch-state="simpleModeState"
        @switch-fun="setSwitchFn('simpleMode', !simpleModeState, () => simpleModeState = !simpleModeState, 'setSimple', t('restartApp'))"
      />
      <Item
        icon="i-icon-park:enter-key"
        :title="t('anotherSettings.enterToAdd')"
        :show-switch="true"
        :switch-state="enterAddState"
        @switch-fun="setSwitchFn('enterAdd', !enterAddState, () => enterAddState = !enterAddState)"
      />
      <Item
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
    </ItemBox>
    <ItemBox>
      <Item
        :title="t('useSystemBar')"
        :show-switch="true"
        :switch-state="useSystemTitleBar"
        @switch-fun="setSwitchFn('systemTitle', !useSystemTitleBar, () => useSystemTitleBar = !useSystemTitleBar, 'setSystemBar', t('restartApp'))"
      />
      <Item
        :title="t('setTopWindow')"
        :show-switch="true"
        :switch-state="topState"
        @switch-fun="setSwitchFn('alwaysOnTop', !topState, () => {
          topState = !topState
          emitter.emit('topWindow', topState)
        }, 'window-on-top')"
      />
      <Item
        v-if="(isLinux && isWindows10OrAfter) || isMac"
        :title="t('anotherSettings.menuBlur')"
        :show-switch="true"
        :switch-state="menuBlurState"
        @switch-fun="setSwitchFn('menuBlur', !menuBlurState, () => menuBlurState = !menuBlurState, 'setMenuBlur', t('restartApp'))"
      />
    </ItemBox>
    <Item v-if="isInDev" :title="t('anotherSettings.laboratory')" @item-fun="router.push('/lab?from=setting')" />
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
