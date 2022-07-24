<template>
  <div class="list">
    <div class="item">
      <span>{{ loginText }}</span>
    </div>
    <div v-if="!loginState" class="login-input">
      <input type="text" placeholder="账号" v-model="uname">
      <input type="password" placeholder="密码" v-model="passwd">
    </div>
    <div v-if="!loginState" class="item login" @click="login">
      <span>登录</span>
    </div>
    <div v-if="!loginState" class="item register" @click="openRegister">
      <span>注册</span>
    </div>
    <div v-if="loginState" class="item" style="background-color: white; color: black;">
      <span>自动同步</span>
      <Switch :swichState="swichState" @switch="setAutoSync" />
    </div>
    <div v-if="loginState" class="item logout" @click="logout">
      <span>退出登录</span>
    </div>
    <Alert
      title="提示"
      :body="alertMsg"
      :cancelButtonShow="false" 
      @return="closeAlert"
      v-if="alertShow"
    />
    <Toast v-if="showToast" :msg="toastMsg" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import i18n from '../../i18n';
import Alert from '../Alert/Alert.vue';
import Toast from '../Toast/Toast.vue';
import Switch from '../Switch/Switch.vue';

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
    alertMsg.value = ['请输入账号和密码']
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
        toastMsg.value = '同步数据'
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
                toastMsg.value = '同步成功'
                setTimeout(() => {
                  showToast.value = false
                }, 500)
              } else {
                toastMsg.value = '同步失败'
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
                toastMsg.value = '同步成功'
                setTimeout(() => {
                  showToast.value = false
                }, 500)
                localStorage.setItem('ToDo', res.data)
              } else {
                toastMsg.value = '同步失败'
                setTimeout(() => {
                  showToast.value = false
                }, 500)
              }
            })
          }
        })
      } else {
        alertMsg.value = ['登录失败']
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
@import './styel.scss';
</style>