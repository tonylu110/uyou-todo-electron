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
    <div v-if="loginState" class="item logout" @click="openRegister">
      <span>退出登录</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import i18n from '../../i18n';

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
const login = () => {
  console.log(`${uname.value}+${passwd.value}`)
}
</script>

<style scoped lang="scss">
@import './styel.scss';
</style>