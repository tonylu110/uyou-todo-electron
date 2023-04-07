<script lang="ts" setup>
import Alert from '../components/Alert/Alert.vue'
import { reactive, ref } from "vue";
import CloseButton from '../components/CloseButton/CLoseButton.vue';
import { isMac, isWindow } from "../util/os";

const { ipcRenderer } = require("electron");
const os = require("os");

const useLang = ref()

const formData = reactive({
  account: '',
  password: '',
  rePassword: ''
})

const closeWindow = () => {
  ipcRenderer.send('close-register')
}

const showAlert = ref(false)
const alertMsg = ref('')

const register = () => {
  if (formData.account === '' || formData.password === '' || formData.rePassword === '') {
    alertMsg.value = '请输入账号和密码'
    showAlert.value = true
  } else if (!((formData.account >= 'a' && formData.account <= 'z') || (formData.account >= '0' && formData.account <= '9') || (formData.account >= 'A' && formData.account <= 'Z') || formData.account.indexOf('_') !== -1)) {
    alertMsg.value = '仅支持数字和字母'
    showAlert.value = true
  } else if (formData.account.length > 10) {
    alertMsg.value = '账号长度小于10'
    showAlert.value = true
  } else if (formData.password !== formData.rePassword) {
    alertMsg.value = '密码不一致'
    showAlert.value = true
  } else {
    fetch('https://api.todo.uyou.org.cn/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uname: formData.account,
        passwd: formData.password
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res.code === 200) {
        alertMsg.value = '注册成功'
        showAlert.value = true
      } else {
        alertMsg.value = '注册失败'
        showAlert.value = true
      }
    })
  }
}

const closeAlert = () => {
  showAlert.value = false
  if (alertMsg.value === '注册成功') {
    closeWindow()
  }
}

const isWindows10OrAfter = os.release().split('.')[2] > 15063
</script>

<template>
  <div class="main-area" :style="{backgroundColor: !isWindow() || !isWindows10OrAfter ? '#edd9b750' : ''}">
    <img src="/logo.png" alt="" srcset="" class="logo">
    <div class="in">
      <span>账号：</span>
      <input type="text" autofocus="autofocus" v-model="formData.account">
    </div>
    <div class="in">
      <span>密码：</span>
      <input type="password" v-model="formData.password">
    </div>
    <div class="in">
      <span>重复密码：</span>
      <input type="password" v-model="formData.rePassword">
    </div>
    <button type="submit" @click="register">注册</button>
    <Alert
      title="提示"
      :dialog-show="showAlert"
      :cancelButtonShow="false"
      @return="closeAlert"
      :lang="useLang"
    >
      {{ alertMsg }}
    </Alert>
    <close-button v-if="!isMac()"/>
  </div>
</template>

<style scoped lang="scss">
@import "./scss/register.scss";
</style>