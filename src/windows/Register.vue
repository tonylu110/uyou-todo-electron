<script lang="ts" setup>
import Alert from '../components/Alert/Alert.vue'
import { reactive, ref } from "vue";
import CloseButton from '../components/CloseButton/CloseButton.vue';
import { isMac, isWindow } from "../util/os";
import i18n from "../i18n";

const { ipcRenderer } = require("electron");
const os = require("os");

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
    alertMsg.value = i18n().registerPage.plzAccAndPass
    showAlert.value = true
  } else if (!((formData.account >= 'a' && formData.account <= 'z') || (formData.account >= '0' && formData.account <= '9') || (formData.account >= 'A' && formData.account <= 'Z') || formData.account.indexOf('_') !== -1)) {
    alertMsg.value = i18n().registerPage.onlyNum
    showAlert.value = true
  } else if (formData.account.length > 10) {
    alertMsg.value = i18n().registerPage.accLen
    showAlert.value = true
  } else if (formData.password !== formData.rePassword) {
    alertMsg.value = i18n().registerPage.rePassError
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
        alertMsg.value = i18n().registerPage.regSuccess
        showAlert.value = true
      } else {
        alertMsg.value = i18n().registerPage.regFail
        showAlert.value = true
      }
    })
  }
}

const closeAlert = () => {
  showAlert.value = false
  if (alertMsg.value === i18n().registerPage.regSuccess) {
    closeWindow()
  }
}

const isWindows10OrAfter = os.release().split('.')[2] > 15063
</script>

<template>
  <div 
    :bg="(!isWindow() || !isWindows10OrAfter) ? '#edd9b750' : 'transparent'"
    flex="~ col" justify-center items-center
    w-screen h-screen drag
  >
    <img 
      w-150px h-150px mb-20px
      src="/logo.png" 
      alt="" class="logo"
    >
    <div p-7px flex items-center>
      <span 
        flex justify-content-right w-100px
        text-20px c="#7a695c" whitespace-pre
      >
        {{ i18n().registerPage.account }}
      </span>
      <input
        no-drag 
        p-10px 
        outline-none rounded-5px bg="#ffffff90"
        border="2px solid #00000010"
        type="text" 
        autofocus="true" 
        v-model="formData.account"
      >
    </div>
    <div p-7px flex items-center>
      <span
        flex justify-content-right w-100px
        text-20px c="#7a695c" whitespace-pre
      >
        {{ i18n().registerPage.password }}
      </span>
      <input 
        no-drag 
        p-10px 
        outline-none rounded-5px bg="#ffffff90"
        border="2px solid #00000010"
        type="password" 
        v-model="formData.password"
      >
    </div>
    <div p-7px flex items-center>
      <span
        flex justify-content-right w-100px
        text-20px c="#7a695c" whitespace-pre
      >
        {{ i18n().registerPage.rePass }}
      </span>
      <input 
        no-drag 
        p-10px
        outline-none rounded-5px bg="#ffffff90"
        border="2px solid #00000010"
        type="password" 
        v-model="formData.rePassword"
      >
    </div>
    <button 
      no-drag
      mt-10px p="x-20px y-5px" rounded-5px
      bg="#7a695c active:#574a40" c-white border-none
      text-18px cursor-pointer
      type="submit" 
      @click="register"
    >
      {{ i18n().registerPage.reg }}
    </button>
    <Alert
      :title="i18n().accountPage.alertTitle"
      :dialog-show="showAlert"
      :cancelButtonShow="false"
      @return="closeAlert"
    >
      {{ alertMsg }}
    </Alert>
    <close-button v-if="!isMac()"/>
  </div>
</template>