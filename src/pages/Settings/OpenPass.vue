<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TabBar from '../../components/TabBar/TabBar.vue'
import router from '../../router'
import SettingList from '../../components/SettingList/SettingList.vine'
import setSwitchFn from '../../util/setSwitchFn'
import Item from '../../components/ItemBox/Item/Item.vue'
import emitter from '../../util/bus'
import ItemButton from '../../components/ItemBox/ItemButton/ItemButton.vue'
import Alert from '../../components/Alert/Alert.vue'
import NoteTabBar from '../../components/TabBar/NoteTabBar.vue'
import ItemSpace from '../../components/ItemBox/ItemSpace/ItemSpace.vine'

const { t } = useI18n()

const useOpenPass = ref(localStorage.getItem('useOpenPass') === 'true')

const menuShort = ref(window.innerWidth < 750)
emitter.on('menuClose', (data) => {
  menuShort.value = data as boolean
})

const openPass = ref(localStorage.getItem('openPass') ? localStorage.getItem('openPass') : '')

function setPass() {
  localStorage.setItem('openPass', openPass.value!)
}

function clearPass() {
  openPass.value = ''
  localStorage.setItem('openPass', '')
}

const alertShow = ref(useOpenPass.value && openPass.value !== '')
const alertMsg = ref('')
const inPass = ref('')
function ok() {
  if (inPass.value === openPass.value)
    alertShow.value = false
  else
    alertMsg.value = t('openPass.passErr')
}

const isNoteUI = localStorage.getItem('newNoteUI') === 'true'
</script>

<template>
  <NoteTabBar v-if="isNoteUI" :title="t('anotherSettings.openPass')" />
  <TabBar
    v-else
    :title="t('anotherSettings.openPass')"
    :right-img-show="false"
    :left-img-show="true"
    @left-click="router.back()"
  />
  <SettingList :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'">
    <Item
      :title="t('openPass.useOpenPass')"
      :show-switch="true"
      :switch-state="useOpenPass"
      @switch-fun="setSwitchFn('useOpenPass', !useOpenPass, () => useOpenPass = !useOpenPass)"
    />
    <template v-if="useOpenPass">
      <ItemSpace>
        <input
          v-model="openPass" type="password"
          w="[calc(100%-20px)]" border="1px black/30"
          my-2 rounded-5px p-10px text-center outline-primary-d
        >
      </ItemSpace>
      <ItemButton mode="primary" @click="setPass">
        <span>{{ t('openPass.usePass') }}</span>
      </ItemButton>
      <ItemButton mode="error" @click="clearPass">
        <span>{{ t('openPass.clearPass') }}</span>
      </ItemButton>
    </template>
  </SettingList>
  <Alert
    :dialog-show="alertShow"
    :show-title="false"
    @cancel="router.back()"
    @return="ok"
  >
    <div flex="~ col" items-center justify-center>
      <div mb-20px font-bold>
        {{ t('openPass.plzPass') }}
      </div>
      <div :mb="alertMsg ? '15px' : '0px'">
        {{ alertMsg }}
      </div>
      <input
        v-model="inPass"
        type="password"
        w="80%"
        border="1px black/30"
        rounded-5px p-10px text-center outline-primary-d @keyup.enter="ok"
      >
    </div>
  </Alert>
</template>
