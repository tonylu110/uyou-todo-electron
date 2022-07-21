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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import i18n from '../../i18n';
import Alert from '../Alert/Alert.vue';

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