<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TabBar from '../../components/TabBar/TabBar.vue'
import SettingList from '../../components/SettingList'
import ItemBox from '../../components/ItemBox/ItemBox.vue'
import Item from '../../components/ItemBox/Item/Item.vue'
import router from '../../router'

const { t } = useI18n()

// eslint-disable-next-line ts/no-var-requires, ts/no-require-imports
const ipcRenderer = require('electron').ipcRenderer

function openUrlInBrowser(url: string) {
  ipcRenderer.send('open-url', url)
}
</script>

<template>
  <TabBar
    :title="t('anotherSettings.openSource')"
    :right-img-show="false"
    :left-img-show="true"
    bg-color="light"
    @left-click="router.back()"
  />
  <SettingList>
    <ItemBox>
      <Item title="electron" @item-fun="openUrlInBrowser('https://github.com/electron')" />
      <Item title="vue" @item-fun="openUrlInBrowser('https://github.com/vuejs')" />
      <Item title="vueuse" @item-fun="openUrlInBrowser('https://github.com/vueuse')" />
      <Item title="vite" @item-fun="openUrlInBrowser('https://github.com/vitejs')" />
      <Item title="TypeScript" @item-fun="openUrlInBrowser('https://github.com/microsoft/TypeScript')" />
      <Item title="sass" @item-fun="openUrlInBrowser('https://github.com/sass')" />
      <Item title="moment" @item-fun="openUrlInBrowser('https://github.com/moment')" />
      <Item title="mica-electron By GregVido" @item-fun="openUrlInBrowser('https://github.com/GregVido/mica-electron')" />
      <Item title="material-design-icons-iconfont By jossef" @item-fun="openUrlInBrowser('https://github.com/jossef/material-design-icons-iconfont')" />
      <Item title="electron-store By sindresorhus" @item-fun="openUrlInBrowser('https://github.com/sindresorhus/electron-store')" />
      <Item title="vite-plugin-vue-devtools By webfansplz" @item-fun="openUrlInBrowser('https://github.com/GregVido/mica-electron')" />
      <Item title="vue3-perfect-scrollbar By mercs600" @item-fun="openUrlInBrowser('https://github.com/mercs600/vue3-perfect-scrollbar')" />
      <Item title="concurrently By open-cli-tools" @item-fun="openUrlInBrowser('https://github.com/open-cli-tools/concurrently')" />
      <Item title="wait-on By jeffbski" @item-fun="openUrlInBrowser('https://github.com/jeffbski/wait-on')" />
    </ItemBox>
  </SettingList>
</template>
