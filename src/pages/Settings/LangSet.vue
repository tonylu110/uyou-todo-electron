<template>
  <TabBar
      :title="i18n().language"
      :rightImgShow="false"
      :leftImgShow="true"
      @leftClick="router.back()"
      bg-color="light"
  />
  <SettingList>
    <div class="item-box" :style="{width: simpleMode ? 'calc(100% - 20px)' : ''}">
      <div class="box-radius">
        <div @click="() => menuClick('withSystem')" :class="langShow('withSystem') ? 'select' : ''" :style="{width: simpleMode ? 'calc(100% - 30px)' : ''}">
          <span>{{ i18n().setLangText }}</span>
          <span v-if="langShow('withSystem')" class="material-icons">check</span>
        </div>
        <div @click="() => menuClick('en')" :class="langShow('en') ? 'select' : ''" :style="{width: simpleMode ? 'calc(100% - 30px)' : ''}">
          <span>English</span>
          <span v-if="langShow('en')" class="material-icons">check</span>
        </div>
        <div @click="() => menuClick('es')" :class="langShow('es') ? 'select' : ''" :style="{width: simpleMode ? 'calc(100% - 30px)' : ''}">
          <span>Español</span>
          <span v-if="langShow('es')" class="material-icons">check</span>
        </div>
        <div @click="() => menuClick('zh-cn')" :class="langShow('zh-cn') ? 'select' : ''" :style="{width: simpleMode ? 'calc(100% - 30px)' : ''}">
          <span>中文（简体）</span>
          <span v-if="langShow('zh-cn')" class="material-icons">check</span>
        </div>
        <div @click="() => menuClick('zh-tw')" :class="langShow('zh-tw') ? 'select' : ''" :style="{width: simpleMode ? 'calc(100% - 30px)' : ''}">
          <span>中文（繁體）</span>
          <span v-if="langShow('zh-tw')" class="material-icons">check</span>
        </div>
        <div @click="() => menuClick('ja')" :class="langShow('ja') ? 'select' : ''" :style="{width: simpleMode ? 'calc(100% - 30px)' : ''}">
          <span>日本語</span>
          <span v-if="langShow('ja')" class="material-icons">check</span>
        </div>
      </div>
    </div>
  </SettingList>
</template>

<script lang="ts" setup>
import TabBar from "../../components/TabBar/TabBar.vue";
import SettingList from "../../components/SettingList/SettingList.vue";
import router from "../../router";
import i18n from "../../i18n";

const { ipcRenderer } = require('electron')

const menuClick = (lang: string) => {
  localStorage.setItem('lang', lang)
  ipcRenderer.send('set-lang', lang)
  location.reload()
}

const langShow = (lang: string): boolean => {
  const langLocal = localStorage.getItem('lang')
  return (lang === 'withSystem' && langLocal === null) || lang === langLocal;
}

const simpleMode = localStorage.getItem('simpleMode') === 'true'
</script>

<style scoped lang="scss">
.item-box {
  margin-bottom: 10px;
  box-shadow: 0 2px 10px #00000030;
  border-radius: 7px;

  .box-radius {
    border-radius: 7px;
    overflow: hidden;

    div {
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

      &:active .material-icons {
        color: white !important;
      }

      .material-icons {
        color: #5985eb;
      }
    }
  }
}
</style>