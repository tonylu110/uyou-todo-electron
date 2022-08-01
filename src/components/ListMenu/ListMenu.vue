<template>
  <div class="list-menu">
    <div class="list">
      <span class="title">分类</span>
      <div class="all-todo-list" @click="router.push('/')">
        <div>
          <span class="material-icons">list_alt</span>
          <span style="font-size: 14px; margin-left: 10px;">所有 ToDo</span>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="setting-list" @click="router.push('/setting')">
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
</script>

<style scoped lang="scss">
.list-menu {
  width: 300px;
  background-color: #fff6dc;
  height: calc(100vh - 40px);
  border-right: 1px solid #00000010;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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