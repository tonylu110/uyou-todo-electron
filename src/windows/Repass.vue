<script setup lang="ts">
import Alert from '../components/Alert/Alert.vue'
import { isWindow, isMac } from "../util/os";
import i18n from "../i18n";
import CloseButton from "../components/CloseButton";
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
  <div 
    :bg="(!isWindow() || !isWindows10OrAfter) ? '#edd9b750' : 'transparent'"
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
        no-drag 
        p-10px 
        outline-none rounded-5px bg="#ffffff30"
        border="2px solid #00000010"
        c="#00000070"
        type="text" 
        disabled 
        v-model="formData.account"
      >
    </div>
    <div p-7px flex items-center>
      <span
        flex justify-content-right w-100px
        text-20px c="#7a695c" whitespace-pre
      >
        {{ i18n().rePassPage.oldPass }}
      </span>
      <input
        no-drag 
        p-10px 
        outline-none rounded-5px bg="#ffffff90"
        border="2px solid #00000010" 
        type="password" 
        autofocus="true" 
        v-model="formData.oldPass"
      >
    </div>
    <div p-7px flex items-center>
      <span
        flex justify-content-right w-100px
        text-20px c="#7a695c" whitespace-pre
      >
        {{ i18n().rePassPage.newPass }}
      </span>
      <input
        no-drag 
        p-10px 
        outline-none rounded-5px bg="#ffffff90"
        border="2px solid #00000010" 
        type="password" 
        v-model="formData.newPass"
      >
    </div>
    <button 
      no-drag
      mt-10px p="x-20px y-5px" rounded-5px
      bg="#7a695c active:#574a40" c-white border-none
      text-18px cursor-pointer
      type="submit" 
      @click="repass"
    >
      {{ i18n().rePassPage.setPass }}
    </button>
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