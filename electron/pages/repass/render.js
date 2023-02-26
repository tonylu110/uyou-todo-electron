import Alert from "../components/alert/alert.js";

const { createApp, reactive, ref } = require('vue')
const ipcRenderer = require('electron').ipcRenderer

createApp({
  components: {
    Alert
  },
  setup() {
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
        alertMsg.value = ['请输入旧密码']
        showAlert.value = true
      } else if (formData.newPass === '') {
        alertMsg.value = ['请输入新密码']
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
            alertMsg.value = ['修改密码成功！']
            showAlert.value = true
          } else {
            alertMsg.value = ['修改密码失败！']
            showAlert.value = true
          }
        })
      }
    }

    const closeAlert = () => {
      showAlert.value = false
      if (alertMsg.value[0] === '修改密码成功！') {
        closeWindow()
      }
    }

    return {
      closeWindow,
      formData,
      showAlert,
      repass,
      closeAlert,
      alertMsg
    }
  },
  template: `
  <div class="main-area">
    <div class="close-button" @click="closeWindow">
      <img class="close-img" src="../img/close.png" alt="" srcset="">
    </div>
    <img src="../../../dist/logo.png" alt="" srcset="" class="logo">
    <div class="in">
      <span>账号：</span>
      <input type="text" disabled v-model="formData.account">
    </div>
    <div class="in">
      <span>旧密码：</span>
      <input type="password" autofocus="autofocus" v-model="formData.oldPass">
    </div>
    <div class="in">
      <span>新密码：</span>
      <input type="password" v-model="formData.newPass">
    </div>
    <button type="submit" @click="repass">重设密码</button>
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