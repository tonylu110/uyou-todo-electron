<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TabBar from '../../components/TabBar/TabBar.vue'
import SettingList from '../../components/SettingList'
import router from '../../router'

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
</script>

<template>
  <TabBar
    :title="t('language')"
    :right-img-show="false"
    :left-img-show="true"
    bg-color="light"
    @left-click="router.back()"
  />
  <SettingList>
    <div class="item-box" :style="{ width: simpleMode ? 'calc(100% - 20px)' : '' }">
      <div class="box-radius">
        <div
          class="item group"
          :class="langShow('withSystem') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('withSystem')"
        >
          <span c="#333 dark:#bbb group-active:white">{{ t('setLangText') }}</span>
          <div v-if="langShow('withSystem')" i-mdi:check text-24px c="primary-d dark:primary-a" />
        </div>
        <div
          class="item group"
          :class="langShow('en-us') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('en')"
        >
          <span c="#333 dark:#bbb group-active:white">English</span>
          <div v-if="langShow('en')" i-mdi:check text-24px c="primary-d dark:primary-a" />
        </div>
        <div
          class="item group"
          :class="langShow('es') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('es')"
        >
          <span c="#333 dark:#bbb group-active:white">Español</span>
          <div v-if="langShow('es')" i-mdi:check text-24px c="primary-d dark:primary-a" />
        </div>
        <div
          class="item group"
          :class="langShow('zh-cn') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('zh-cn')"
        >
          <span c="#333 dark:#bbb group-active:white">中文（简体）</span>
          <div v-if="langShow('zh-cn')" i-mdi:check text-24px c="primary-d dark:primary-a" />
        </div>
        <div
          class="item group"
          :class="langShow('zh-tw') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('zh-tw')"
        >
          <span c="#333 dark:#bbb group-active:white">中文（繁體）</span>
          <div v-if="langShow('zh-tw')" i-mdi:check text-24px c="primary-d dark:primary-a" />
        </div>
        <div
          class="item group"
          :class="langShow('ja') ? 'select' : ''"
          :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
          bg="white dark:#999/10 active:primary-d dark:active:primary-a"
          @click="() => menuClick('ja')"
        >
          <span c="#333 dark:#bbb group-active:white">日本語</span>
          <div v-if="langShow('ja')" i-mdi:check text-24px c="primary-d dark:primary-a" />
        </div>
      </div>
    </div>
  </SettingList>
</template>

<style scoped lang="scss">
.item-box {
  margin-bottom: 10px;
  border: 1px solid #00000015;
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
