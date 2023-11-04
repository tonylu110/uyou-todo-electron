<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TabBar from '../../components/TabBar/TabBar.vue'
import router from '../../router'
import SettingList from '../../components/SettingList'
import setSwitchFn from '../../util/setSwitchFn'
import Item from '../../components/ItemBox/Item/Item.vue'

const { t } = useI18n()

const useOpenPass = ref(localStorage.getItem('useOpenPass') === 'true')
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
  </SettingList>
</template>
