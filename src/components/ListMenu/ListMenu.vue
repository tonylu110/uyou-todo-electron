<template>
  <div class="list-menu" :style="{backgroundColor: listMenuColor, height: titleBarShow ? '100vh' : ''}">
    <div class="list">
      <span class="title">{{ i18n().accountPage.account }}</span>
      <div class="account-list" 
        :style="{backgroundColor: routeName === 'account' && form !== 'setting' ? '#00000010' : ''}" 
        @click="router.push('/account')"
      >
        <div>
          <span class="material-icons">account_circle</span>
          <span style="font-size: 14px; margin-left: 10px;">{{ i18n().myAccount }}</span>
        </div>
      </div>
      <span class="title">{{ i18n().listMenu.cate }}</span>
      <div class="all-todo-list" 
        :style="{ backgroundColor: routeName === 'Home' ? '#00000010' : '', borderTop: '2px solid #00000010' }" 
        @click="router.push('/')"
      >
        <div>
          <span class="material-icons">list_alt</span>
          <span style="font-size: 14px; margin-left: 10px;">{{ i18n().listMenu.allTodo }}</span>
        </div>
      </div>
      <div class="all-todo-list" :style="{backgroundColor: routeQueryName === 'allNotDo' ? '#00000010' : ''}" @click="toList('allNotDo')">
        <div>
          <span class="material-icons">panorama_fisheye</span>
          <span style="font-size: 14px; margin-left: 10px;">{{ i18n().listMenu.incompleted }}</span>
        </div>
      </div>
      <div class="all-todo-list" :style="{backgroundColor: routeQueryName === 'allDo' ? '#00000010' : ''}" @click="toList('allDo')">
        <div>
          <span class="material-icons">check_circle</span>
          <span style="font-size: 14px; margin-left: 10px;">{{ i18n().listMenu.completed }}</span>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="setting-list" :style="{backgroundColor: routeName === 'setting' || form === 'setting' ? '#00000010' : ''}" @click="router.push('/setting')">
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

const titleBarShow = localStorage.getItem('systemTitle') === 'true'

const routeName = ref('')
const routeQueryName = ref('')
const route = useRoute()

const form = ref('')

watchEffect(() => {
  routeName.value = route.name as unknown as string
  routeQueryName.value = route.query.listName as unknown as string
  form.value = route.query.from as unknown as string
})

const toList = (listName: string) => {
  router.push({
    path: '/other',
    query: {
      listName
    }
  })
}

const isWindows = navigator.userAgent.indexOf('Win')>=0
const listMenuColor = ref('')
if (isWindows && localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) {
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
      
      &:not(:last-child) {
        margin-bottom: -11px;
      }

      &:nth-child(odd) {
        border-top: 0px;
      }

      &:nth-child(even) {
        border-top: 0px;
      }
    }

    .account-list {
      @extend .setting-list;
      margin-top: 12px
    }
  }
}
</style>