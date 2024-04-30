<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TabBar from '../../../components/TabBar/TabBar.vue'
import SettingList from '../../../components/SettingList'
import Item from '../../../components/ItemBox/Item/Item.vue'
import setSwitchFn from '../../../util/setSwitchFn'
import ItemSpace from '../../../components/ItemBox/ItemSpace'

const { t } = useI18n()

const router = useRouter()

const useCustPass = ref(localStorage.getItem('useCustPass') === 'true')
const passKey = ref(localStorage.getItem('passKey'))

function setPassKey(key: string) {
  passKey.value = key
  localStorage.setItem('passKey', passKey.value)
}
</script>

<template>
  <TabBar
    :title="t('vip.setCustPassKey')"
    :right-img-show="false"
    :left-img-show="true"
    @left-click="router.back()"
  />
  <SettingList>
    <Item
      :title="t('setPassKey.useCustPass')"
      :show-switch="true"
      :switch-state="useCustPass"
      @switch-fun="() => setSwitchFn('useCustPass', !useCustPass, () => useCustPass = !useCustPass)"
    />
    <template v-if="useCustPass">
      <ItemSpace>
        <button @click="setPassKey('nums')">
          1
        </button>
        <button @click="setPassKey('nums2')">
          2
        </button>
        <button @click="setPassKey('none')">
          2
        </button>
      </ItemSpace>
    </template>
  </SettingList>
</template>
