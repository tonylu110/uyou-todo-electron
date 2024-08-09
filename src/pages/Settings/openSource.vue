<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TabBar from '../../components/TabBar/TabBar.vue'
import SettingList from '../../components/SettingList/SettingList.vine'
import ItemBox from '../../components/ItemBox/ItemBox.vue'
import Item from '../../components/ItemBox/Item/Item.vue'
import router from '../../router'
import NoteTabBar from '../../components/TabBar/NoteTabBar.vue'
import ItemSpace from '../../components/ItemBox/ItemSpace/ItemSpace.vine'
import openUrlInBrowser from '../../util/openUrlInBrowser'

const { t } = useI18n()

const isNoteUI = localStorage.getItem('newNoteUI') === 'true'
</script>

<template>
  <NoteTabBar v-if="isNoteUI" :title="t('anotherSettings.openSource')" />
  <TabBar
    v-else
    :title="t('anotherSettings.openSource')"
    :right-img-show="false"
    :left-img-show="true"
    bg-color="light"
    @left-click="router.back()"
  />
  <SettingList :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'">
    <ItemSpace items-center>
      <div whitespace-pre-wrap text-center>
        {{ t('open.thanks') }}
      </div>
    </ItemSpace>
    <ItemBox>
      <Item title="electron" @item-fun="openUrlInBrowser('https://github.com/electron')" />
      <Item title="vue" @item-fun="openUrlInBrowser('https://github.com/vuejs')" />
      <Item title="vue macros" @item-fun="openUrlInBrowser('https://github.com/vue-macros/vue-macros')" />
      <Item title="vue devtools" @item-fun="openUrlInBrowser('https://github.com/vuejs/devtools-next')" />
      <Item title="vue vine" @item-fun="openUrlInBrowser('https://github.com/vue-vine')" />
      <Item title="vueuse" @item-fun="openUrlInBrowser('https://github.com/vueuse')" />
      <Item title="vite" @item-fun="openUrlInBrowser('https://github.com/vitejs')" />
      <Item title="TypeScript" @item-fun="openUrlInBrowser('https://github.com/microsoft/TypeScript')" />
      <Item title="sass" @item-fun="openUrlInBrowser('https://github.com/sass')" />
      <Item title="moment" @item-fun="openUrlInBrowser('https://github.com/moment')" />
      <Item title="lodash" @item-fun="openUrlInBrowser('https://github.com/lodash/lodash')" />
      <Item title="mica-electron By GregVido" @item-fun="openUrlInBrowser('https://github.com/GregVido/mica-electron')" />
      <Item title="unocss By antfu" @item-fun="openUrlInBrowser('https://github.com/unocss/unocss')" />
      <Item title="electron-store By sindresorhus" @item-fun="openUrlInBrowser('https://github.com/sindresorhus/electron-store')" />
      <Item title="vue3-perfect-scrollbar By mercs600" @item-fun="openUrlInBrowser('https://github.com/mercs600/vue3-perfect-scrollbar')" />
      <Item title="concurrently By open-cli-tools" @item-fun="openUrlInBrowser('https://github.com/open-cli-tools/concurrently')" />
      <Item title="wait-on By jeffbski" @item-fun="openUrlInBrowser('https://github.com/jeffbski/wait-on')" />
    </ItemBox>
  </SettingList>
</template>
