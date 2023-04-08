<script setup lang="ts">
import Alert from '../components/Alert/Alert.vue'
import { isWindow, isMac } from "../util/os";
import i18n from "../i18n";
import CloseButton from "../components/CloseButton/CloseButton.vue";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";

const { ipcRenderer } = require("electron");
const os = require("os");

const route = useRoute()

const closeWindow = () => {
  ipcRenderer.send('close-repass')
}

const formData = reactive({
  account: route.query.account,
  oldPass: '',
  newPass: ''
})

const showAlert = ref(false)
const alertMsg = ref('')

const repass = () => {
  if (formData.oldPass === '') {
    alertMsg.value = i18n().rePassPage.plzInOldPass
    showAlert.value = true
  } else if (formData.newPass === '') {
    alertMsg.value = i18n().rePassPage.plzInNewPass
    showAlert.value = true
  } else {
    fetch('https://api.todo.uyou.org.cn/editpasswd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uname: formData.account,
        passwd: formData.oldPass,
        newPass: formData.newPass
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res.code === 200) {
        alertMsg.value = i18n().rePassPage.setPassSuccess
        showAlert.value = true
      } else {
        alertMsg.value = i18n().rePassPage.setPassFail
        showAlert.value = true
      }
    })
  }
}

const closeAlert = () => {
  showAlert.value = false
  if (alertMsg.value === i18n().rePassPage.setPassSuccess) {
    closeWindow()
  }
}

const isWindows10OrAfter = os.release().split('.')[2] > 15063
</script>

<template>
  <div class="main-area" :style="{backgroundColor: !isWindow() || !isWindows10OrAfter ? '#edd9b750' : ''}">
    <img src="/logo.png" alt="" srcset="" class="logo">
    <div class="in">
      <span>{{ i18n().registerPage.account }}</span>
      <input type="text" disabled v-model="formData.account">
    </div>
    <div class="in">
      <span>{{ i18n().rePassPage.oldPass }}</span>
      <input type="password" autofocus="autofocus" v-model="formData.oldPass">
    </div>
    <div class="in">
      <span>{{ i18n().rePassPage.newPass }}</span>
      <input type="password" v-model="formData.newPass">
    </div>
    <button type="submit" @click="repass">{{ i18n().rePassPage.setPass }}</button>
    <Alert
      :title=i18n().accountPage.alertTitle
      :dialog-show="showAlert"
      :cancelButtonShow="false"
      @return="closeAlert"
    >
      {{ alertMsg }}
    </Alert>
    <close-button v-if="!isMac()"/>
  </div>
</template>

<style scoped lang="scss">
@import "./scss/register.scss";
</style>