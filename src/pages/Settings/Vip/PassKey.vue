<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Item from '../../../components/ItemBox/Item/Item.vue'
import ItemSpace from '../../../components/ItemBox/ItemSpace/ItemSpace.vine'
import SettingList from '../../../components/SettingList/SettingList.vine'
import NoteTabBar from '../../../components/TabBar/NoteTabBar.vue'
import TabBar from '../../../components/TabBar/TabBar.vue'
import setSwitchFn from '../../../util/setSwitchFn'

const { t } = useI18n()

const router = useRouter()

const useCustPass = ref(localStorage.getItem('useCustPass') === 'true')
const passKey = ref(localStorage.getItem('passKey'))

function setPassKey(key: string) {
  passKey.value = key
  localStorage.setItem('passKey', passKey.value)
}

const isNoteUI = localStorage.getItem('newNoteUI') === 'true'
</script>

<template>
  <component
    :is="isNoteUI ? NoteTabBar : TabBar"
    :title="t('vip.setCustPassKey')"
    :right-img-show="false"
    :left-img-show="true"
    @left-click="router.back()"
  />
  <SettingList :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'">
    <Item
      :title="t('setPassKey.useCustPass')"
      :show-switch="true"
      :switch-state="useCustPass"
      @switch-fun="() => setSwitchFn('useCustPass', !useCustPass, () => useCustPass = !useCustPass)"
    />
    <template v-if="useCustPass">
      <ItemSpace flex="~ row wrap gap-10px" justify-center>
        <div
          h-80px w-80px rounded-10px p-10px border="2px solid black/10"
          :bg="passKey === 'nums' || !passKey ? 'primary-d' : 'white'"
          @click="setPassKey('nums')"
        >
          <img
            src="/keyboard/n1.png"
            alt="keyboard1"
            h-full w-full rounded-7px
          >
        </div>
        <div
          h-80px w-80px rounded-10px p-10px border="2px solid black/10"
          :bg="passKey === 'nums2' ? 'primary-d' : 'white'"
          @click="setPassKey('nums2')"
        >
          <img
            src="/keyboard/n2.png"
            alt="keyboard2"
            h-full w-full rounded-7px
          >
        </div>
        <div
          h-80px w-80px rounded-10px p-10px border="2px solid black/10"
          :bg="passKey === 'none' ? 'primary-d' : 'white'"
          @click="setPassKey('none')"
        >
          <img
            src="/keyboard/none.png"
            alt="keyboard3"
            h-full w-full rounded-7px
          >
        </div>
      </ItemSpace>
    </template>
  </SettingList>
</template>
