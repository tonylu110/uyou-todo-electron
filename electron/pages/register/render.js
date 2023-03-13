import Alert from "../components/alert/alert.js";
import { isMac, isWindow } from "../util/os.js";
import i18n from "../i18n/index.js";

const { createApp, reactive, ref } = require('vue')
const ipcRenderer = require('electron').ipcRenderer
const os = require('os')

createApp({
  components: {
    Alert
  },
  setup() {
    const useLang = ref()

    ipcRenderer.on('lang', (ev, lang) => {
      useLang.value = lang
    })

    const closeWindow = () => {
      ipcRenderer.send('close-register')
    }

    const formData = reactive({
      account: '',
      password: '',
      rePassword: ''
    })

    const showAlert = ref(false)
    const alertMsg = ref([''])

    const register = () => {
      if (formData.account === '' || formData.password === '' || formData.rePassword === '') {
        alertMsg.value = [i18n(useLang.value).registerPage.plzAccAndPass]
        showAlert.value = true
      } else if (!((formData.account >= 'a' && formData.account <= 'z') || (formData.account >= '0' && formData.account <= '9') || (formData.account >= 'A' && formData.account <= 'Z') || formData.account.indexOf('_') !== -1)) {
        alertMsg.value = [i18n(useLang.value).registerPage.onlyNum]
        showAlert.value = true
      } else if (formData.account.length > 10) {
        alertMsg.value = [i18n(useLang.value).registerPage.accLen]
        showAlert.value = true
      } else if (formData.password !== formData.rePassword) {
        alertMsg.value = [i18n(useLang.value).registerPage.rePassError]
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
            alertMsg.value = [i18n(useLang.value).registerPage.regSuccess]
            showAlert.value = true
          } else {
            alertMsg.value = [i18n(useLang.value).registerPage.regFail]
            showAlert.value = true
          }
        })
      }
    }

    const closeAlert = () => {
      showAlert.value = false
      if (alertMsg.value[0] === i18n(useLang.value).registerPage.regSuccess) {
        closeWindow()
      }
    }

    const isWindows10OrAfter = os.release().split('.')[2] > 15063

    return {
      closeWindow,
      formData,
      showAlert,
      register,
      closeAlert,
      alertMsg,
      isMac,
      i18n,
      useLang,
      isWindow,
      isWindows10OrAfter
    }
  },
  template: `
  <div class="main-area" :style="{backgroundColor: !isWindow() || !isWindows10OrAfter ? '#edd9b750' : ''}">
    <div class="close-button" @click="closeWindow" v-if="!isMac()">
      <img class="close-img" src="../img/close.png" alt="" srcset="">
    </div>
    <img src="../../../dist/logo.png" alt="" srcset="" class="logo">
    <div class="in">
      <span>{{ i18n(useLang).registerPage.account }}</span>
      <input type="text" autofocus="autofocus" v-model="formData.account">
    </div>
    <div class="in">
      <span>{{ i18n(useLang).registerPage.password }}</span>
      <input type="password" v-model="formData.password">
    </div>
    <div class="in">
      <span>{{ i18n(useLang).registerPage.rePass }}</span>
      <input type="password" v-model="formData.rePassword">
    </div>
    <button type="submit" @click="register">{{ i18n(useLang).registerPage.reg }}</button>
    <Alert 
      :title=i18n(useLang).alert.hint
      :body="alertMsg"
      :dialog-show="showAlert"
      :cancelButtonShow="false"
      @return="closeAlert"
      :lang="useLang"
    />
  </div>
  `
}).mount('#app')