<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TabBar from '../components/TabBar/TabBar.vue'
import router from '../router'
import SettingList from '../components/SettingList'
import Item from '../components/ItemBox/Item/Item.vue'
import ItemBox from '../components/ItemBox/ItemBox.vue'
import firstLoad from '../components/TitleBar/firstLoad'
import ItemButton from '../components/ItemBox/ItemButton/ItemButton.vue'
import emitter from '../util/bus'
import isDev from '../util/mode'
import setSwitchFn from '../util/setSwitchFn'
import ColorChange from '../components/SettingList/ColorChange'

const { t } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const os = require('node:os')

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
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
    <ColorChange v-if="(isLinux && isWindows10OrAfter) || !isMac" />
    <Item
      :title="loginState ? t('myAccount') : t('loginText')"
      @item-fun="() => router.push('/account?from=setting')"
    />
    <Item
      :title="t('update.updateTitle')"
      @item-fun="router.push('/update?from=setting')"
    />
    <ItemBox>
      <Item
        :title="t('anotherSettings.simple')"
        :show-switch="true"
        :switch-state="simpleModeState"
        @switch-fun="setSwitchFn('simpleMode', !simpleModeState, () => simpleModeState = !simpleModeState, 'setSimple', t('restartApp'))"
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
    <Item v-if="isInDev" title="Laboratory" @item-fun="router.push('/lab?from=setting')" />
    <ItemButton mode="error" @click="clearData">
      {{ t('clearData') }}
    </ItemButton>
    <ItemButton @click="router.push('/lang?from=setting')">
      <img src="/images/lang.png" alt="" class="lang-img">
    </ItemButton>
  </SettingList>
</template>
