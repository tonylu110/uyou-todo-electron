import Alert from "../components/alert/alert.js";
import { isMac } from "../util/os.js";

const { createApp, reactive, ref } = require('vue')
const ipcRenderer = require('electron').ipcRenderer

createApp({
  components: {
    Alert
  },
  setup() {
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
        alertMsg.value = ['请输入账号和密码']
        showAlert.value = true
      } else if (!((formData.account >= 'a' && formData.account <= 'z') || (formData.account >= '0' && formData.account <= '9') || (formData.account >= 'A' && formData.account <= 'Z') || formData.account.indexOf('_') !== -1)) {
        alertMsg.value = ['仅支持字母、数字、下划线']
        showAlert.value = true
      } else if (formData.account.length > 10) {
        alertMsg.value = ['账号长度不能超过10位']
        showAlert.value = true
      } else if (formData.password !== formData.rePassword) {
        alertMsg.value = ['重复密码与秘密不一致']
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
            alertMsg.value = ['注册成功！']
            showAlert.value = true
          } else {
            alertMsg.value = ['注册失败！']
            showAlert.value = true
          }
        })
      }
    }

    const closeAlert = () => {
      showAlert.value = false
      if (alertMsg.value[0] === '注册成功！') {
        closeWindow()
      }
    }

    return {
      closeWindow,
      formData,
      showAlert,
      register,
      closeAlert,
      alertMsg,
      isMac
    }
  },
  template: `
  <div class="main-area" :style="{backgroundColor: isMac() ? '#edd9b750' : ''}">
    <div class="close-button" @click="closeWindow" v-if="!isMac()">
      <img class="close-img" src="../img/close.png" alt="" srcset="">
    </div>
    <img src="../../../dist/logo.png" alt="" srcset="" class="logo">
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
      :body="alertMsg"
      :dialog-show="showAlert"
      :cancelButtonShow="false"
      @return="closeAlert"
    />
  </div>
  `
}).mount('#app')