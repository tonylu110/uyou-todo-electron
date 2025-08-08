<script setup lang="ts">
import { shell } from 'electron'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Item from '../../components/ItemBox/Item/Item.vue'
import ItemBox from '../../components/ItemBox/ItemBox.vue'
import ItemSpace from '../../components/ItemBox/ItemSpace/ItemSpace.vine'
import SettingList from '../../components/SettingList/SettingList.vine'
import SponsorList from '../../components/Sponsor/List.vue'
import NoteTabBar from '../../components/TabBar/NoteTabBar.vue'
import TabBar from '../../components/TabBar/TabBar.vue'
import router from '../../router'
import emitter from '../../util/bus'
import openUrlInBrowser from '../../util/openUrlInBrowser'
import setSwitchFn from '../../util/setSwitchFn'

const { t } = useI18n()

const menuShort = ref(window.innerWidth < 750)
emitter.on('menuClose', (data) => {
  menuShort.value = data as boolean
})

const isVip = ref(localStorage.getItem('isVip') === 'true')

watch(isVip, (newValue) => {
  emitter.emit('changeVip', newValue)
})

const simpleMode = localStorage.getItem('simpleMode') === 'true'

const useCustColor = ref(localStorage.getItem('useCustColor') === 'true')

const newFloatUi = ref(localStorage.getItem('newFloatUi') === 'true')

const isNoteUI = localStorage.getItem('newNoteUI') === 'true'
</script>

<template>
  <component
    :is="isNoteUI ? NoteTabBar : TabBar"
    :title="t('vip.proVersion')"
    :right-img-show="false"
    :left-img-show="true"
    @left-click="router.back()"
  />
  <SettingList :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'">
    <ItemSpace
      v-if="!isVip"
    >
      <div w="100%">
        <h1>￥ 10.00</h1>
        <h4>{{ t('vip.8yuan') }}</h4>
        <p whitespace-pre-line>
          {{ t('vip.msg') }}
        </p>
      </div>
      <div flex="~ wrap" j ustify-center items-center>
        <img
          w-163px p-10px
          src="/images/donate/alipay.png"
          alt=""
        >
        <img
          w-163px p-10px
          src="/images/donate/wechatpay.png"
          alt=""
        >
        <img
          w-163px p-10px
          src="/images/donate/afd.png"
          alt=""
          :title="t('afd')"
          @click="openUrlInBrowser('https://afdian.com/a/tonylu')"
        >
      </div>
    </ItemSpace>
    <div
      v-else
      :w="menuShort ? (simpleMode ? '[calc(100vw-60px)]' : '[calc(100vw-118px)]') : '[calc(100vw-460px)]'"
      bg="warn-a" mb-10px h-auto max-w-540px flex items-center justify-start rounded-7px p-20px
      border="2px solid black/15" shadow="md warn-a/50"
    >
      <img src="/images/VIP.png" h-70px w-70px alt="" srcset="">
      <div flex="~ col gap-5px" ml-10px>
        <span text-18px font-bold>{{ t('vip.doPay') }}</span>
        <span text-14px>{{ t('vip.thanks') }}</span>
      </div>
    </div>
    <Item
      :title="t('vip.isPay')"
      :show-switch="true"
      :switch-state="isVip"
      @switch-fun="setSwitchFn('isVip', !isVip, () => isVip = !isVip)"
    />
    <ItemSpace
      v-if="!isVip"
    >
      <h2>{{ t('vip.proFeature') }}</h2>
      <ul>
        <li>{{ t('vip.custColor') }}</li>
        <li>{{ t('vip.showList') }}</li>
        <li>{{ t('vip.floatUI') }}</li>
        <li>{{ t('vip.setCustFont') }}</li>
        <li>{{ t('vip.more') }}</li>
      </ul>
    </ItemSpace>
    <template v-if="!isVip">
      <Item :title="t('otherList.aboutSponser')" @item-fun="shell.openExternal('https://github.com/tonylu110/uyou-todo-electron/discussions/34')" />
      <SponsorList />
    </template>
    <template v-if="isVip">
      <ItemBox>
        <Item
          :title="t('vip.floatUI')"
          :show-switch="true"
          :switch-state="newFloatUi"
          @switch-fun="setSwitchFn('newFloatUi', !newFloatUi, () => {
            newFloatUi = !newFloatUi
            emitter.emit('setNewFloatUi')
          })"
        />
        <Item
          :title="t('custListItem')"
          @item-fun="router.push('/setListItem?from=setting')"
        />
      </ItemBox>
      <Item
        :title="t('vip.setCustFont')"
        @item-fun="router.push('/fontSet?from=setting')"
      />
      <Item
        :title="t('vip.setCustPassKey')"
        @item-fun="router.push('/passKey?from=setting')"
      />
      <Item
        :title="t('vip.custColor')"
        :show-switch="true"
        :switch-state="useCustColor"
        @switch-fun="setSwitchFn('useCustColor', !useCustColor, () => useCustColor = !useCustColor)"
      />
    </template>
  </SettingList>
</template>
