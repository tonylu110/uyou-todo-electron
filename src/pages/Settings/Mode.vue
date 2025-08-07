<script lang="ts" setup>
import { ipcRenderer } from 'electron'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SettingList from '../../components/SettingList/SettingList.vine'
import NoteTabBar from '../../components/TabBar/NoteTabBar.vue'
import TabBar from '../../components/TabBar/TabBar.vue'
import { createToast } from '../../components/Toast'
import router from '../../router'

const { t } = useI18n()

const simpleModeState = ref(localStorage.getItem('simpleMode') === 'true')
const newNoteUI = ref(localStorage.getItem('newNoteUI') === 'true')

function menuClick(mode: string) {
  if (mode === 'normal') {
    simpleModeState.value = false
    localStorage.setItem('simpleMode', `${simpleModeState.value}`)
    newNoteUI.value = false
    localStorage.setItem('newNoteUI', `${newNoteUI.value}`)
    ipcRenderer.send('setSimple', simpleModeState.value)
  }
  else if (mode === 'note') {
    newNoteUI.value = true
    localStorage.setItem('newNoteUI', `${newNoteUI.value}`)
    simpleModeState.value = false
    localStorage.setItem('simpleMode', `${simpleModeState.value}`)
    ipcRenderer.send('setSimple', simpleModeState.value)
  }
  else if (mode === 'simple') {
    simpleModeState.value = true
    localStorage.setItem('simpleMode', `${simpleModeState.value}`)
    newNoteUI.value = false
    localStorage.setItem('newNoteUI', `${newNoteUI.value}`)
    ipcRenderer.send('setSimple', simpleModeState.value)
  }
  createToast({ msg: t('restartApp') })
}

function modeShow(mode: string): boolean {
  if (mode === 'normal')
    return !simpleModeState.value && !newNoteUI.value
  else if (mode === 'note')
    return newNoteUI.value
  else
    return simpleModeState.value
}

const simpleMode = ref(localStorage.getItem('simpleMode') === 'true')

onMounted(() => {
  window.innerWidth < 750
    ? simpleMode.value = true
    : simpleMode.value = false
})

window.addEventListener('resize', () => {
  window.innerWidth < 750
    ? simpleMode.value = true
    : simpleMode.value = false
})

const isNoteUI = localStorage.getItem('newNoteUI') === 'true'
</script>

<template>
  <NoteTabBar v-if="isNoteUI" :title="t('anotherSettings.model')" />
  <TabBar
    v-else
    :title="t('anotherSettings.model')"
    :right-img-show="false"
    :left-img-show="true"
    bg-color="light"
    @left-click="router.back()"
  />
  <SettingList :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'">
    <div
      class="item-box"
      :w="simpleMode
        ? isNoteUI
          ? '[calc(100vw-108px)]'
          : '[calc(100%-50px)]'
        : '[calc(100vw-450px)]'
      " shadow-md
    >
      <div class="box-radius">
        <div
          class="group item"
          :class="modeShow('normal') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('normal')"
        >
          <span c="#333 dark:#bbb group-active:white">{{ t('mode.normal') }}</span>
          <div v-if="modeShow('normal')" i-mdi:check text-24px c="primary-d dark:primary-a" />
        </div>
        <div
          class="group item"
          :class="modeShow('normal') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('note')"
        >
          <span c="#333 dark:#bbb group-active:white">{{ t('mode.note') }}</span>
          <div v-if="modeShow('note')" i-mdi:check text-24px c="primary-d dark:primary-a" />
        </div>
        <div
          class="item group"
          :class="modeShow('simple') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('simple')"
        >
          <span c="#333 dark:#bbb group-active:white">{{ t('anotherSettings.simple') }}</span>
          <div v-if="modeShow('simple')" i-mdi:check text-24px c="primary-d dark:primary-a" />
        </div>
      </div>
    </div>
  </SettingList>
</template>

<style scoped lang="scss">
.item-box {
  margin-bottom: 10px;
  border: 1px solid rgba($color: #000000, $alpha: 0.2);
  border-radius: 7px;
  max-width: 550px;

  .box-radius {
    border-radius: 7px;
    overflow: hidden;

    .item {
      position: relative;
      max-width: 550px;
      width: calc(100% - 30px);
      min-height: 30px;
      height: 30px;
      padding: 10px 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #00000015;

      &:last-child {
        border: 0;
      }
    }
  }
}
</style>
