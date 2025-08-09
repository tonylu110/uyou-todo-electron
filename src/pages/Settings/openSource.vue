<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import list from '../../assets/data/openRepoList.json'
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
        v-for="(item, index) in list"
        :key="index"
        :title="item.name"
        @item-fun="openUrlInBrowser(item.url)"
      />
    </ItemBox>
  </SettingList>
</template>
