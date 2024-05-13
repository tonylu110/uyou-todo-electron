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
  if (inPass.value === openPass.value)
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
        :w="menuShort ? '[calc(100vw-118px)]' : '[calc(100vw-460px)]'"
        flex="~ wrap"
        bg="white dark:#999/10" mb-10px h-auto max-w-540px items-center justify-center rounded-7px p-20px border="1px solid #00000020"
      >
        <input v-model="openPass" type="password" w="100%" border="1px black/30" rounded-5px p-10px text-center outline-primary-d>
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
