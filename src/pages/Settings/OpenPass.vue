<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TabBar from '../../components/TabBar/TabBar.vue'
import router from '../../router'
import SettingList from '../../components/SettingList'
import setSwitchFn from '../../util/setSwitchFn'
import Item from '../../components/ItemBox/Item/Item.vue'
import emitter from '../../util/bus'
import ItemButton from '../../components/ItemBox/ItemButton/ItemButton.vue'
import Alert from '../../components/Alert/Alert.vue'

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
  if(inPass.value === openPass.value)
    alertShow.value = false
  else
    alertMsg.value = t('openPass.passErr')
}
</script>

<template>
  <TabBar
    :title="t('anotherSettings.openPass')"
    :right-img-show="false"
    :left-img-show="true"
    @left-click="router.back()"
  />
  <SettingList>
    <Item
      :title="t('openPass.useOpenPass')"
      :show-switch="true"
      :switch-state="useOpenPass"
      @switch-fun="setSwitchFn('useOpenPass', !useOpenPass, () => useOpenPass = !useOpenPass)"
    />
    <template v-if="useOpenPass">
      <div
        v-if="useOpenPass"
        :w="menuShort ? '[calc(100vw-118px)]' : '[calc(100vw-460px)]'" p-20px mb-10px max-w-540px h-auto
        flex="~ wrap" justify-center items-center
        bg="white dark:#999/10" rounded-7px border="1px solid #00000020"
      >
        <input type="password" w="100%" p-10px rounded-5px outline-primary-d border="1px black/30" text-center v-model="openPass">
      </div>
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
    :title="t('openPass.plzPass')"
    @cancel="router.back()"
    @return="ok"
  >
    <div flex="~ col" justify-center items-center>
      <div :mb="alertMsg ? '15px' : '0px'">{{ alertMsg }}</div>
      <input 
        type="password" 
        v-model="inPass" 
        @keyup.enter="ok"
        w="80%" p-10px rounded-5px outline-primary-d 
        border="1px black/30" text-center
      >
    </div>
  </Alert>
</template>
