<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElSlider } from 'element-plus'
import { ipcRenderer } from 'electron'
import TabBar from '../../../components/TabBar/TabBar.vue'
import SettingList from '../../../components/SettingList/SettingList.vine'
import Item from '../../../components/ItemBox/Item/Item.vue'
import setSwitchFn from '../../../util/setSwitchFn'
import { createToast } from '../../../components/Toast'
import ItemText from '../../../components/ItemBox/ItemText/ItemText.vine'
import ItemSpace from '../../../components/ItemBox/ItemSpace/ItemSpace.vine'
import NoteTabBar from '../../../components/TabBar/NoteTabBar.vue'

const { t } = useI18n()

const router = useRouter()

const useCustomFont = ref(localStorage.getItem('useCustomFont') === 'true')
const fontName = ref(localStorage.getItem('customFontName'))
ipcRenderer.on('getFontName', (_event: unknown, font: string) => {
  fontName.value = font
  localStorage.setItem('customFontName', fontName.value)
})

const fontNameBold = ref(localStorage.getItem('customFontNameBold'))
ipcRenderer.on('getFontNameBold', (_event: unknown, font: string) => {
  fontNameBold.value = font
  localStorage.setItem('customFontNameBold', fontNameBold.value)
})

function selectFont() {
  ipcRenderer.send('setFont')
}

function selectBoldFont() {
  ipcRenderer.send('setBoldFont')
}

const fontSize = ref(Number(localStorage.getItem('fontSize') ? localStorage.getItem('fontSize') : '33'))

watch(fontSize, (newValue) => {
  localStorage.setItem('fontSize', `${newValue}`)
  ipcRenderer.send('setFontSize', newValue)
})

const isNoteUI = localStorage.getItem('newNoteUI') === 'true'
</script>

<template>
  <NoteTabBar v-if="isNoteUI" :title="t('vip.setCustFont')" />
  <TabBar
    v-else
    :title="t('vip.setCustFont')"
    :right-img-show="false"
    @left-click="() => router.back()"
  />
  <SettingList :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'">
    <Item
      :title="t('setFont.useCustomFont')"
      :show-switch="true"
      :switch-state="useCustomFont"
      @switch-fun="() => setSwitchFn('useCustomFont', !useCustomFont, () => {
        useCustomFont = !useCustomFont
        createToast({ msg: t('restartApp') })
      })"
    />
    <template v-if="useCustomFont">
      <ItemText>{{ t('setFont.setFontSize') }}</ItemText>
      <ItemSpace items-center>
        <div w="90%">
          <ElSlider
            v-model="fontSize"
            :step="33"
            show-stops
            :show-tooltip="false"
          />
        </div>
        <div flex justify-between w="95%">
          <span>{{ t('setFont.small') }}</span>
          <span>{{ t('setFont.normal') }}</span>
          <span>{{ t('setFont.big') }}</span>
          <span>{{ t('setFont.large') }}</span>
        </div>
      </ItemSpace>
      <ItemText>{{ t('setFont.setFont') }}</ItemText>
      <ItemText :is-bold="true">
        {{ t('setFont.regular') }}
      </ItemText>
      <Item
        :title="fontName ? `${t('setFont.select')} ${fontName}` : t('setFont.donnotSelect')"
        @item-fun="selectFont"
      />
      <ItemText :is-bold="true">
        {{ t('setFont.bold') }}
      </ItemText>
      <Item
        :title="fontNameBold ? `${t('setFont.select')} ${fontNameBold}` : t('setFont.donnotSelect')"
        @item-fun="selectBoldFont"
      />
    </template>
  </SettingList>
</template>
