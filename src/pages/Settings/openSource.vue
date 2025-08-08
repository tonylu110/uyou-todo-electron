<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Item from '../../components/ItemBox/Item/Item.vue'
import ItemBox from '../../components/ItemBox/ItemBox.vue'
import ItemSpace from '../../components/ItemBox/ItemSpace/ItemSpace.vine'
import SettingList from '../../components/SettingList/SettingList.vine'
import NoteTabBar from '../../components/TabBar/NoteTabBar.vue'
import TabBar from '../../components/TabBar/TabBar.vue'
import router from '../../router'
import openUrlInBrowser from '../../util/openUrlInBrowser'

const { t } = useI18n()

const isNoteUI = localStorage.getItem('newNoteUI') === 'true'

const list = [
  {
    name: 'electron',
    url: 'https://github.com/electron',
  },
  {
    name: 'vue',
    url: 'https://github.com/vuejs',
  },
  {
    name: 'vue macros',
    url: 'https://github.com/vue-macros/vue-macros',
  },
  {
    name: 'vue devtools',
    url: 'https://github.com/vuejs/devtools-next',
  },
  {
    name: 'vue vine',
    url: 'https://github.com/vue-vine',
  },
  {
    name: 'vueuse',
    url: 'https://github.com/vueuse/vueuse',
  },
  {
    name: 'vite',
    url: 'https://github.com/vitejs/vite',
  },
  {
    name: 'TypeScript',
    url: 'https://github.com/microsoft/TypeScript',
  },
  {
    name: 'sass',
    url: 'https://github.com/sass',
  },
  {
    name: 'moment',
    url: 'https://github.com/moment',
  },
  {
    name: 'es-toolkit',
    url: 'https://github.com/toss/es-toolkit',
  },
  {
    name: 'mica-electron By GregVido',
    url: 'https://github.com/GregVido/mica-electron',
  },
  {
    name: 'unocss By antfu',
    url: 'https://github.com/unocss/unocss',
  },
  {
    name: 'electron-store By sindresorhus',
    url: 'https://github.com/sindresorhus/electron-store',
  },
  {
    name: 'vue3-perfect-scrollbar By mercs600',
    url: 'https://github.com/mercs600/vue3-perfect-scrollbar',
  },
  {
    name: 'concurrently By open-cli-tools',
    url: 'https://github.com/open-cli-tools/concurrently',
  },
  {
    name: 'wait-on By jeffbski',
    url: 'https://github.com/jeffbski/wait-on',
  },
]
</script>

<template>
  <component
    :is="isNoteUI ? NoteTabBar : TabBar"
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
      <Item
        v-for="item in list"
        :key="item.name"
        :title="item.name"
        @item-fun="openUrlInBrowser(item.url)"
      />
    </ItemBox>
  </SettingList>
</template>
