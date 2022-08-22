<template>
  <div class="lang-menu">
    <div class="box-radius">
      <div @click="() => menuClick('withSystem')" :class="langShow('withSystem') ? 'select' : ''">
        <span>{{ i18n().setLangText }}</span>
        <span v-if="langShow('withSystem')" class="material-icons">check</span>
      </div>
      <div @click="() => menuClick('en')" :class="langShow('en') ? 'select' : ''">
        <span>English</span>
        <span v-if="langShow('en')" class="material-icons">check</span>
      </div>
      <div @click="() => menuClick('es')" :class="langShow('es') ? 'select' : ''">
        <span>Español</span>
        <span v-if="langShow('es')" class="material-icons">check</span>
      </div>
      <div @click="() => menuClick('zh-cn')" :class="langShow('zh-cn') ? 'select' : ''">
        <span>中文（简体）</span>
        <span v-if="langShow('zh-cn')" class="material-icons">check</span>
      </div>
      <div @click="() => menuClick('zh-tw')" :class="langShow('zh-tw') ? 'select' : ''">
        <span>中文（繁體）</span>
        <span v-if="langShow('zh-tw')" class="material-icons">check</span>
      </div>
      <div @click="() => menuClick('ja')" :class="langShow('ja') ? 'select' : ''">
        <span>日本語</span>
        <span v-if="langShow('ja')" class="material-icons">check</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import i18n from '../../../i18n';

const menuClick = (lang: string) => {
  localStorage.setItem('lang', lang)
  location.reload()
}

const langShow = (lang: string): boolean => {
  const langLocal = localStorage.getItem('lang')
  if ((lang === 'withSystem' && langLocal === null) || lang === langLocal) {
    return true
  } else {
    return false
  }
}
</script>

<style scoped lang="scss">
.lang-menu {
  width: 250px;
  background-color: white;
  position: fixed;
  box-shadow: 0 10px 20px #00000040;
  z-index: 1;
  border-radius: 7px;
  top: 50%;
  transform: translate(0%, -40%);
  border: 1px solid #aaa;

  .box-radius {
    border-radius: 7px;
    overflow: hidden;

    div {
      padding: 15px;
      background-color: #00000000;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #00000020;

      &:hover {
        background-color: #00000010;
      }

      &:active {
        background-color: #5985eb;
        color: white;
      }

      &:last-child {
        border: none;
      }

      .material-icons {
        font-size: 18px;
        font-weight: bold;
      }

      &:active .material-icons {
        color: white;
      }

      &.select {
        background-color: #5985eb;
        color: white;
      }
    }
  }
}
</style>