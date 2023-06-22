<script lang="ts" setup>
import TabBar from '../../components/TabBar/TabBar.vue'
import SettingList from '../../components/SettingList'
import ItemBox from '../../components/ItemBox/ItemBox.vue'
import Item from '../../components/ItemBox/Item/Item.vue'
import router from '../../router'
import i18n from '../../i18n'

const ipcRenderer = require('electron').ipcRenderer

function openUrlInBrowser(url: string) {
  ipcRenderer.send('open-url', url)
}
</script>

<template>
  <TabBar
    :title="i18n().anotherSettings.openSource"
    :right-img-show="false"
    :left-img-show="true"
    bg-color="light"
    @leftClick="router.back()"
  />
  <SettingList>
    <ItemBox>
      <Item title="electron" @itemFun="openUrlInBrowser('https://github.com/electron')" />
      <Item title="vue" @itemFun="openUrlInBrowser('https://github.com/vuejs')" />
      <Item title="vite" @itemFun="openUrlInBrowser('https://github.com/vitejs')" />
      <Item title="TypeScript" @itemFun="openUrlInBrowser('https://github.com/microsoft/TypeScript')" />
      <Item title="sass" @itemFun="openUrlInBrowser('https://github.com/sass')" />
      <Item title="moment" @itemFun="openUrlInBrowser('https://github.com/moment')" />
      <Item title="mica-electron By GregVido" @itemFun="openUrlInBrowser('https://github.com/GregVido/mica-electron')" />
      <Item title="material-design-icons-iconfont By jossef" @itemFun="openUrlInBrowser('https://github.com/jossef/material-design-icons-iconfont')" />
      <Item title="electron-store By sindresorhus" @itemFun="openUrlInBrowser('https://github.com/sindresorhus/electron-store')" />
      <Item title="vue3-perfect-scrollbar By mercs600" @itemFun="openUrlInBrowser('https://github.com/mercs600/vue3-perfect-scrollbar')" />
      <Item title="concurrently By open-cli-tools" @itemFun="openUrlInBrowser('https://github.com/open-cli-tools/concurrently')" />
      <Item title="wait-on By jeffbski" @itemFun="openUrlInBrowser('https://github.com/jeffbski/wait-on')" />
    </ItemBox>
  </SettingList>
</template>

<style scoped lang="scss">

</style>
