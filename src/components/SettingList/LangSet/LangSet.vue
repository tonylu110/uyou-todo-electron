<template>
  <div class="lang-menu">
    <div @click="() => menuClick('withSystem')">{{ i18n().setLangText }}</div>
    <div @click="() => menuClick('en')">English</div>
    <div @click="() => menuClick('es')">Español</div>
    <div @click="() => menuClick('zh-cn')">中文（简体）</div>
    <div @click="() => menuClick('zh-tw')">中文（繁體）</div>
    <div @click="() => menuClick('ja')">日本語</div>
  </div>
</template>

<script setup lang="ts">
import i18n from '../../../i18n';

const menuClick = (lang: string) => {
  localStorage.setItem('lang', lang)
  location.reload()
}
</script>

<style scoped lang="scss">
.lang-menu {
  width: 160px;
  padding: 10px;
  background-color: white;
  position: absolute;
  box-shadow: 0 0 10px #00000030;
  z-index: 1;
  border-radius: 7px;
  top: 50%;
  transform: translate(0%, -50%);

  div {
    padding: 10px;
    background-color: #00000000;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #00000010;
    }

    &:active {
      background-color: #5985eb;
      color: white;
    }
  }
}
</style>