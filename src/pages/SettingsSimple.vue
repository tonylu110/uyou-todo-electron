<template>
  <tab-bar
    :title="i18n().settingTitleText"
    :right-img-show="false"
    @left-click="router.back()"
    bg-color="light"
  />
  <setting-list>
    <ItemBox v-if="isDev">
      <Item
        title="UnoCss dev"
        @item-fun="openUrl('http://localhost:3000/__unocss')"
      />
      <Item 
        title="Show router url"
        :show-switch="true"
        @switch-fun="showRouterUrl"
        :switch-state="routerUrlState"
      />
    </ItemBox>
    <Item
      :title="loginState ? i18n().myAccount : i18n().loginText"
      @item-fun="() => router.push('/account?from=setting')"
    />
    <Item
      :title="i18n().update.updateTitle"
      @item-fun="router.push('/update?from=setting')"
    />
    <ItemBox>
      <Item
        :title="i18n().anotherSettings.simple"
        :show-switch="true"
        :switch-state="simpleModeState"
        @switch-fun="setSwitchFn('simpleMode', !simpleModeState, () => simpleModeState = !simpleModeState, 'setSimple', i18n().restartApp)"
      />
      <Item
        :title="i18n().anotherSettings.enterToAdd"
        :show-switch="true"
        :switch-state="enterAddState"
        @switch-fun="setSwitchFn('enterAdd', !enterAddState, () => enterAddState = !enterAddState)"
      />
      <Item
        v-if="isLinux"
        :title="i18n().anotherSettings.autoStart"
        :show-switch="true"
        :switch-state="autoStartState"
        @switch-fun="setSwitchFn('autoStart', !autoStartState, () => autoStartState = !autoStartState, 'setAutoStart')"
      />
      <Item
        :title="i18n().anotherSettings.itemWrap"
        :show-switch="true"
        :switch-state="textWrapState"
        @switch-fun="setSwitchFn('routerUrl', !textWrapState, () => textWrapState = !textWrapState)"
      />
    </ItemBox>
    <ItemBox>
      <Item
        :title="i18n().useSystemBar"
        :show-switch="true"
        :switch-state="useSystemTitleBar"
        @switch-fun="setSwitchFn('systemTitle', !useSystemTitleBar, () => useSystemTitleBar = !useSystemTitleBar, 'setSystemBar', i18n().restartApp)"
      />
      <Item
        :title="i18n().setTopWindow"
        :show-switch="true"
        :switch-state="topState"
        @switch-fun="setSwitchFn('alwaysOnTop', !topState, () => {
          topState = !topState
          emitter.emit('topWindow', topState)
        }, 'window-on-top')"
      />
      <Item
        v-if="(isLinux && isWindows10OrAfter) || isMac"
        :title="i18n().anotherSettings.menuBlur"
        :showSwitch="true"
        :switchState="menuBlurState"
        @switch-fun="setSwitchFn('menuBlur', !menuBlurState, () => menuBlurState = !menuBlurState, 'setMenuBlur', i18n().restartApp)"
      />
    </ItemBox>
    <Item title="Laboratory" @item-fun="router.push('/lab?from=setting')" v-if="isInDev"/>
    <ItemButton mode="error" @click="clearData">{{ i18n().clearData }}</ItemButton>
    <ItemButton @click="router.push('/lang?from=setting')">
      <img src="/images/lang.png" alt="" class="lang-img" />
    </ItemButton>
  </setting-list>
</template>

<script setup lang="ts">
import TabBar from "../components/TabBar/TabBar.vue";
import i18n from "../i18n";
import router from "../router";
import SettingList from "../components/SettingList";
import Item from "../components/ItemBox/Item/Item.vue";
import { onBeforeUnmount, ref } from "vue";
import ItemBox from "../components/ItemBox/ItemBox.vue";
import firstLoad from "../components/TitleBar/firstLoad";
import ItemButton from "../components/ItemBox/ItemButton/ItemButton.vue";
import emitter from "../util/bus";
import isDev from "../util/mode";
import setSwitchFn from "../util/setSwitchFn";

const os = require('os')

const isLinux = !(process.platform === 'linux')
const isWindows10OrAfter = os.release().split('.')[2] > 15063
const isMac = process.platform === 'darwin'

const loginState = localStorage.getItem('uid') !== '' && localStorage.getItem('uid') !== null

const simpleModeState = ref(localStorage.getItem('simpleMode') === 'true')
const useSystemTitleBar = ref(localStorage.getItem('systemTitle') === 'true')
const topState = ref(firstLoad())
const textWrapState = ref(localStorage.getItem('textWrap') === 'true')
const menuBlurState = ref(localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null)
const enterAddState = ref(localStorage.getItem('enterAdd') === 'true')
const autoStartState = ref(localStorage.getItem('autoStart') === 'true')

emitter.on('topWindow', (data: unknown) => {
  topState.value = (data as boolean)
})
emitter.on('routerShow', (data: unknown) => {
  routerUrlState.value = (data as boolean)
})
const clearData = () => {
  localStorage.clear()
  window.location.reload()
}
const openUrl = (url: string) => {
  window.open(url)
}
const routerUrlState = ref((localStorage.getItem('routerUrl') === 'true' || !localStorage.getItem('routerUrl')) && isDev)
const showRouterUrl = () => {
  routerUrlState.value = !routerUrlState.value
  emitter.emit('routerShow', routerUrlState.value)
  localStorage.setItem('routerUrl', routerUrlState.value + '')
}
onBeforeUnmount(() => {
  emitter.off('routerShow')
  emitter.off('toastShow')
})

const isInDev = localStorage.getItem('isInDev') === 'true'
</script>