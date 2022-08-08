<template>
  <div class="list-menu" :style="{backgroundColor: listMenuColor}">
    <div class="list">
      <span class="title">{{ i18n().accountPage.account }}</span>
      <div class="all-todo-list" :style="{backgroundColor: routeName === 'account' ? '#00000010' : ''}" @click="router.push('/account')">
        <div>
          <span class="material-icons">account_circle</span>
          <span style="font-size: 14px; margin-left: 10px;">{{ i18n().myAccount }}</span>
        </div>
      </div>
      <span class="title">{{ i18n().listMenu.cate }}</span>
      <div class="all-todo-list" :style="{backgroundColor: routeName === 'Home' ? '#00000010' : ''}" @click="router.push('/')">
        <div>
          <span class="material-icons">list_alt</span>
          <span style="font-size: 14px; margin-left: 10px;">{{ i18n().listMenu.allTodo }}</span>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="setting-list" :style="{backgroundColor: routeName === 'setting' ? '#00000010' : ''}" @click="router.push('/setting')">
        <div>
          <span class="material-icons">settings</span>
          <span style="font-size: 14px; margin-left: 10px;">{{ i18n().settingTitleText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import i18n from '../../i18n';
import router from '../../router';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const routeName = ref('')
const route = useRoute()
watchEffect(() => {
  routeName.value = route.name as unknown as string
  console.log(routeName.value);
})

const isWindows = navigator.userAgent.indexOf('Win')>=0
const listMenuColor = ref('')
if (isWindows) {
  listMenuColor.value = '#fff6dc77'
}
</script>

<style scoped lang="scss">
.list-menu {
  width: 300px;
  background-color: #fff6dcaa;
  height: calc(100vh - 40px);
  border-right: 1px solid #00000010;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;

  .list {
    .title {
      display: block;
      margin: 10px 0 0 20px;
      font-weight: bold;
      color: #00000090;
    }

    .setting-list {
      padding: 10px 20px;
      width: 259px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      border-top: 2px solid #00000010;
      border-bottom: 2px solid #00000010;

      div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      span {
        color: #00000090;
        font-size: 18px;
        font-weight: bold;
      }

      &:hover {
        background-color: #00000005;
      }

      &:active {
        background-color: #00000010;
      }
    }

    .all-todo-list {
      @extend .setting-list;
      margin-top: 10px;
    }
  }
}
</style>