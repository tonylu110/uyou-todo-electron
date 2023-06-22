<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Alert from '../components/Alert/Alert.vue'
import CloseButton from '../components/CloseButton'
import { isMac, isWindows10OrAfter } from '../util/os'
import i18n from '../i18n'

const os = require('node:os')
const { ipcRenderer } = require('electron')

const formData = reactive({
  account: '',
  password: '',
  rePassword: '',
})

function closeWindow() {
  ipcRenderer.send('close-register')
}

const showAlert = ref(false)
const alertMsg = ref('')

function register() {
  if (formData.account === '' || formData.password === '' || formData.rePassword === '') {
    alertMsg.value = i18n().registerPage.plzAccAndPass
    showAlert.value = true
  }
  else if (!((formData.account >= 'a' && formData.account <= 'z') || (formData.account >= '0' && formData.account <= '9') || (formData.account >= 'A' && formData.account <= 'Z') || formData.account.includes('_'))) {
    alertMsg.value = i18n().registerPage.onlyNum
    showAlert.value = true
  }
  else if (formData.account.length > 10) {
    alertMsg.value = i18n().registerPage.accLen
    showAlert.value = true
  }
  else if (formData.password !== formData.rePassword) {
    alertMsg.value = i18n().registerPage.rePassError
    showAlert.value = true
  }
  else {
    fetch('https://api.todo.uyou.org.cn/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uname: formData.account,
        passwd: formData.password,
      }),
    }).then((res) => {
      return res.json()
    }).then((res) => {
      if (res.code === 200) {
        alertMsg.value = i18n().registerPage.regSuccess
        showAlert.value = true
      }
      else {
        alertMsg.value = i18n().registerPage.regFail
        showAlert.value = true
      }
    })
  }
}

function closeAlert() {
  showAlert.value = false
  if (alertMsg.value === i18n().registerPage.regSuccess)
    closeWindow()
}
</script>

<template>
  <div
    :bg="isWindows10OrAfter() ? 'transparent' : '#edd9b750'"
    flex="~ col" justify-center items-center
    w-screen h-screen drag
  >
    <img
      w-150px h-150px mb-20px
      src="/logo.png"
      alt=""
    >
    <div p-7px flex items-center>
      <span
        flex justify-content-right w-100px
        text-20px c="#7a695c" whitespace-pre
      >
        {{ i18n().registerPage.account }}
      </span>
      <input
        v-model="formData.account"
        no-drag
        p-10px outline-none rounded-5px
        bg="#ffffff90"
        border="2px solid #00000010"
        type="text"
        autofocus="true"
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
        v-model="formData.password"
        no-drag
        p-10px outline-none rounded-5px
        bg="#ffffff90"
        border="2px solid #00000010"
        type="password"
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
        v-model="formData.rePassword"
        no-drag
        p-10px outline-none rounded-5px
        bg="#ffffff90"
        border="2px solid #00000010"
        type="password"
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
      :cancel-button-show="false"
      @return="closeAlert"
    >
      {{ alertMsg }}
    </Alert>
    <CloseButton v-if="!isMac()" />
  </div>
</template>
