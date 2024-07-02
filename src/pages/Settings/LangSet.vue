<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TabBar from '../../components/TabBar/TabBar.vue'
import SettingList from '../../components/SettingList'
import router from '../../router'
import NoteTabBar from '../../components/TabBar/NoteTabBar.vue'

const { t, locale } = useI18n()

function menuClick(lang: string) {
  localStorage.setItem('lang', lang)
  if (lang === 'withSystem')
    locale.value = navigator.language.toLowerCase()
  else
    locale.value = lang
}

function langShow(lang: string): boolean {
  const langLocal = localStorage.getItem('lang')
  return (lang === 'withSystem' && langLocal === null) || lang === langLocal
}

const simpleMode = localStorage.getItem('simpleMode') === 'true'
const localLang = navigator.language.toLowerCase()

const isNoteUI = localStorage.getItem('newNoteUI') === 'true'
</script>

<template>
  <NoteTabBar v-if="isNoteUI" :title="t('language')" />
  <TabBar
    v-else
    :title="t('language')"
    :right-img-show="false"
    :left-img-show="true"
    bg-color="light"
    @left-click="router.back()"
  />
  <SettingList :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'">
    <div class="item-box" :style="{ width: simpleMode ? 'calc(100% - 20px)' : '' }" shadow-md>
      <div class="box-radius">
        <div
          class="group item"
          :class="langShow('withSystem') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('withSystem')"
        >
          <div flex items-center>
            <div i-emojione-v1:globe-showing-americas mr-3 text-5 />
            <span c="#333 dark:#bbb group-active:white">{{ t('setLangText') }}</span>
          </div>
          <div v-if="langShow('withSystem')" i-mdi:check text-24px c="primary-d dark:primary-a" />
        </div>
        <div
          class="item group"
          :class="langShow('en-us') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('en')"
        >
          <div flex items-center>
            <div i-circle-flags:us mr-3 text-5 />
            <span c="#333 dark:#bbb group-active:white">English</span>
          </div>
          <div v-if="langShow('en')" i-mdi:check text-24px c="primary-d dark:primary-a" />
        </div>
        <div
          class="item group"
          :class="langShow('es') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('es')"
        >
          <div flex items-center>
            <div i-circle-flags:es mr-3 text-5 />
            <span c="#333 dark:#bbb group-active:white">Español</span>
          </div>
          <div v-if="langShow('es')" i-mdi:check text-24px c="primary-d dark:primary-a" />
        </div>
        <div
          class="item group"
          :class="langShow('zh-cn') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('zh-cn')"
        >
          <div flex items-center>
            <div i-circle-flags:cn mr-3 text-5 />
            <span c="#333 dark:#bbb group-active:white">中文（简体）</span>
          </div>
          <div v-if="langShow('zh-cn')" i-mdi:check text-24px c="primary-d dark:primary-a" />
        </div>
        <div
          class="item group"
          :class="langShow('zh-tw') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('zh-tw')"
        >
          <div flex items-center>
            <div :class="localLang === 'zh-tw' ? 'i-circle-flags:tw' : 'i-circle-flags:cn-hk'" mr-3 text-5 />
            <span c="#333 dark:#bbb group-active:white">{{ localLang === 'zh-tw' ? t('zh-tw') : '中文（繁體）' }}</span>
          </div>
          <div v-if="langShow('zh-tw')" i-mdi:check text-24px c="primary-d dark:primary-a" />
        </div>
        <div
          class="item group"
          :class="langShow('ja') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('ja')"
        >
          <div flex items-center>
            <div i-circle-flags:jp mr-3 text-5 />
            <span c="#333 dark:#bbb group-active:white">日本語</span>
          </div>
          <div v-if="langShow('ja')" i-mdi:check text-24px c="primary-d dark:primary-a" />
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

  .box-radius {
    border-radius: 7px;
    overflow: hidden;

    .item {
      position: relative;
      max-width: 550px;
      width: calc(100vw - 450px);
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
