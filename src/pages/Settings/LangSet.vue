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
        <div class="item" :class="langShow('withSystem') ? 'select' : ''" :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }" @click="() => menuClick('withSystem')">
          <span>{{ t('setLangText') }}</span>
          <div v-if="langShow('withSystem')" i-mdi:check text-24px c="#5985eb" />
        </div>
        <div class="item" :class="langShow('en-us') ? 'select' : ''" :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }" @click="() => menuClick('en')">
          <span>English</span>
          <div v-if="langShow('en')" i-mdi:check text-24px c="#5985eb" />
        </div>
        <div class="item" :class="langShow('es') ? 'select' : ''" :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }" @click="() => menuClick('es')">
          <span>Español</span>
          <div v-if="langShow('es')" i-mdi:check text-24px c="#5985eb" />
        </div>
        <div class="item" :class="langShow('zh-cn') ? 'select' : ''" :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }" @click="() => menuClick('zh-cn')">
          <span>中文（简体）</span>
          <div v-if="langShow('zh-cn')" i-mdi:check text-24px c="#5985eb" />
        </div>
        <div class="item" :class="langShow('zh-tw') ? 'select' : ''" :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }" @click="() => menuClick('zh-tw')">
          <span>中文（繁體）</span>
          <div v-if="langShow('zh-tw')" i-mdi:check text-24px c="#5985eb" />
        </div>
        <div class="item" :class="langShow('ja') ? 'select' : ''" :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }" @click="() => menuClick('ja')">
          <span>日本語</span>
          <div v-if="langShow('ja')" i-mdi:check text-24px c="#5985eb" />
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
      background-color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #333;
      border-bottom: 1px solid #00000015;

      &:last-child {
        border: 0;
      }

      &:active {
        background-color: #5985eb;
        color: white;
      }
    }
  }
}
</style>
