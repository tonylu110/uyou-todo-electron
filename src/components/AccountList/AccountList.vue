<template>
  <perfect-scrollbar class="list">
    <Item :title="loginText" :showArrow="false" />
    <div v-if="!loginState" class="login-input">
      <input type="text" :placeholder="i18n().accountPage.account" v-model="uname">
      <input type="password" :placeholder="i18n().accountPage.passwd" v-model="passwd">
    </div>
    <ItemButton v-if="!loginState" @click="login" mode="primary">{{ i18n().accountPage.login }}</ItemButton>
    <ItemButton v-if="!loginState" @click="openRegister">{{ i18n().accountPage.register }}</ItemButton>
    <Item
      v-if="loginState"
      :title="i18n().accountPage.autoSync"
      :showSwitch="true"
      :switchState="swichState"
      @switchFun="setAutoSync"
    />
    <ItemButton v-if="loginState" @click="changPass">修改密码</ItemButton>
    <ItemButton v-if="loginState" mode="error" @click="logout">{{ i18n().accountPage.logout }}</ItemButton>
    <Alert
      :title="i18n().accountPage.alertTitle"
      :body="alertMsg"
      :cancelButtonShow="false"
      :dialogShow="alertShow"
      @return="closeAlert"
    />
    <Toast v-if="showToast" :msg="toastMsg" />
  </perfect-scrollbar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import i18n from '../../i18n';
import Alert from '../Alert/Alert.vue';
import Toast from '../Toast/Toast.vue';
import Item from '../ItemBox/Item/Item.vue';
import ItemButton from '../ItemBox/ItemButton/ItemButton.vue';

const swichState = ref(localStorage.getItem('autoSync') === 'true' || localStorage.getItem('autoSync') === null)

const setAutoSync = () => {
  swichState.value = !swichState.value
  localStorage.setItem('autoSync', swichState.value + '')
}

const loginText = ref('')

const loginState = ref(localStorage.getItem('uid') !== '' && localStorage.getItem('uid') !== null)

onMounted(() => {
  if (!loginState.value) {
    loginText.value = i18n().loginText 
  } else {
    loginText.value = localStorage.getItem('uname')!
  }
})

const changPass = () => {
  window.open(`https://register.todo.uyou.org.cn/#/setpassword/${localStorage.getItem('uname')}`)
}

const openRegister = () => {
  window.open('https://register.todo.uyou.org.cn')
}

const uname = ref('')
const passwd = ref('')
const alertMsg = ref([''])
const alertShow = ref(false)
const showToast = ref(false)
const toastMsg = ref('')
const login = () => {
  if (uname.value === '' || passwd.value === '') {
    alertMsg.value = [i18n().accountPage.alertNoAnP]
    alertShow.value = true
  } else {
    fetch('https://api.todo.uyou.org.cn/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uname: uname.value,
        passwd: passwd.value
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res._id) {
        loginText.value = uname.value
        localStorage.setItem('uname', uname.value)
        localStorage.setItem('uid', res._id)
        loginState.value = true
        toastMsg.value = i18n().accountPage.syncData
        showToast.value = true
        fetch(`https://api.todo.uyou.org.cn/todoexist?uid=${res._id}`).then(res => {
          return res.json()
        }).then(res => {
          const uid = localStorage.getItem('uid')
          const data = localStorage.getItem('ToDo')
          if (res.code === 200) {
            fetch('https://api.todo.uyou.org.cn/addtodo', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                uid: uid,
                data: data
              })
            }).then(res => {
              return res.json()
            }).then(res => {
              if (res.code === 200) {
                toastMsg.value = i18n().accountPage.syncSuccess
                setTimeout(() => {
                  showToast.value = false
                }, 500)
              } else {
                toastMsg.value = i18n().accountPage.syncFail
                setTimeout(() => {
                  showToast.value = false
                }, 500)
              }
            })
          } else {
            const uid = localStorage.getItem('uid')
            fetch('https://api.todo.uyou.org.cn/gettodo', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                uid: uid
              })
            }).then(res => {
              return res.json()
            }).then(res => {
              if (res._id) {
                toastMsg.value = i18n().accountPage.syncSuccess
                setTimeout(() => {
                  showToast.value = false
                }, 500)
                localStorage.setItem('ToDo', res.data)
              } else {
                toastMsg.value = i18n().accountPage.syncFail
                setTimeout(() => {
                  showToast.value = false
                }, 500)
              }
            })
          }
        })
      } else {
        alertMsg.value = [i18n().accountPage.loginError]
        alertShow.value = true
      }
    })
  }
}

const logout = () => {
  loginText.value = i18n().loginText
  localStorage.setItem('uname', '')
  localStorage.setItem('uid', '')
  loginState.value = false
}

const closeAlert = () => {
  alertShow.value = false
}
</script>

<style scoped lang="scss">
.list {
  background-color: #eee;
  width: calc(100vw - 300px);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding-top: 10px;

  .login-input {
    margin-bottom: 10px;
    background-color: white;
    border-radius: 7px;
    box-shadow: 0 2px 10px #00000030;
    width: calc(100vw - 450px);
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    max-width: 550px;

    input {
      padding: 15px;
      margin: 5px 0px;
      border: 1.5px solid #00000020;
      background-color: #00000010;
      border-radius: 5px;
    }
  }
}
</style>