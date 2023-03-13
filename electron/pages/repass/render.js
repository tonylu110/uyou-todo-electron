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
      ipcRenderer.send('close-repass')
    }

    const formData = reactive({
      account: '',
      oldPass: '',
      newPass: ''
    })

    ipcRenderer.on('account', (ev, account) => {
      formData.account = account
    })

    const showAlert = ref(false)
    const alertMsg = ref([''])

    const repass = () => {
      if (formData.oldPass === '') {
        alertMsg.value = [i18n(useLang.value).rePassPage.plzInOldPass]
        showAlert.value = true
      } else if (formData.newPass === '') {
        alertMsg.value = [i18n(useLang.value).rePassPage.plzInNewPass]
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
            alertMsg.value = [i18n(useLang.value).rePassPage.setPassSuccess]
            showAlert.value = true
          } else {
            alertMsg.value = [i18n(useLang.value).rePassPage.setPassFail]
            showAlert.value = true
          }
        })
      }
    }

    const closeAlert = () => {
      showAlert.value = false
      if (alertMsg.value[0] === i18n(useLang.value).rePassPage.setPassSuccess) {
        closeWindow()
      }
    }

    const isWindows10OrAfter = os.release().split('.')[2] > 15063

    return {
      closeWindow,
      formData,
      showAlert,
      repass,
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
      <input type="text" disabled v-model="formData.account">
    </div>
    <div class="in">
      <span>{{ i18n(useLang).rePassPage.oldPass }}</span>
      <input type="password" autofocus="autofocus" v-model="formData.oldPass">
    </div>
    <div class="in">
      <span>{{ i18n(useLang).rePassPage.newPass }}</span>
      <input type="password" v-model="formData.newPass">
    </div>
    <button type="submit" @click="repass">{{ i18n(useLang).rePassPage.setPass }}</button>
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