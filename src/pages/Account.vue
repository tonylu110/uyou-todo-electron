<template>
  <TabBar 
    :title="i18n().accountPage.account"
    :rightImgShow="false"
    @leftClick="() => router.back()"
    :leftImgShow="form === 'setting'"
    bg-color="light"
  />
  <SettingList>
    <Item :title="loginText" :showArrow="false" />
    <div 
      mb-10px rounded-7px shadow-item p="x-15px y-10px"
      :w="simpleMode ? '[calc(100%-50px)]' : '[calc(100vw-450px)]'"
      bg-white
      flex="~ col" max-w-550px
      v-if="!loginState" 
    >
      <input 
        p-15px m="x-0 y-5px"
        border="1.5px solid #00000020"
        bg="#00000010" rounded-5px outline-primary-d
        type="text" 
        :placeholder="i18n().accountPage.account" 
        v-model="uname"
      >
      <input 
        p-15px m="x-0 y-5px"
        border="1.5px solid #00000020"
        bg="#00000010" rounded-5px outline-primary-d
        type="password" 
        :placeholder="i18n().accountPage.passwd" 
        v-model="passwd" 
        @keydown.enter="login"
      >
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
    <ItemButton v-if="loginState" @click="changPass">{{ i18n().accountPage.changPass }}</ItemButton>
    <ItemButton v-if="loginState" @click="openLogoff">{{ i18n().logoffPage.logoff }}</ItemButton>
    <ItemButton v-if="loginState" mode="error" @click="logout">{{ i18n().accountPage.logout }}</ItemButton>
    <Alert
        :title="i18n().accountPage.alertTitle"
        :cancelButtonShow="isLogoutClick"
        :dialogShow="alertShow"
        @return="returnAlert"
        @cancel="closeAlert"
    >
      <span>{{ alertMsg[0] }}</span>
    </Alert>
  </SettingList>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';
import router from '../router';
import TabBar from '../components/TabBar/TabBar.vue';
import i18n from '../i18n';
import { useRoute } from 'vue-router';
import SettingList from "../components/SettingList";
import Alert from "../components/Alert/Alert.vue";
import Item from "../components/ItemBox/Item/Item.vue";
import ItemButton from "../components/ItemBox/ItemButton/ItemButton.vue";
import emitter from '../util/bus';
import { createToast } from '../components/Toast';

const ipcRenderer = require('electron').ipcRenderer

const simpleMode = localStorage.getItem('simpleMode') === 'true'

const form = ref('')
const route = useRoute()

watchEffect(() => {
  form.value = route.query.from as unknown as string
})

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
  // window.open(`https://register.todo.uyou.org.cn/#/setpassword/${localStorage.getItem('uname')}`)
  ipcRenderer.send('open-repass', localStorage.getItem('uname'))
}

const openRegister = () => {
  // window.open('https://register.todo.uyou.org.cn')
  ipcRenderer.send('open-register')
}

const uname = ref('')
const passwd = ref('')
const alertMsg = ref([''])
const alertShow = ref(false)
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
        createToast({msg: i18n().accountPage.syncData})
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
                createToast({msg: i18n().accountPage.syncSuccess})
              } else {
                createToast({msg: i18n().accountPage.syncFail})
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
                createToast({msg: i18n().accountPage.syncSuccess})
                localStorage.setItem('ToDo', res.data)
              } else {
                createToast({msg: i18n().accountPage.syncFail})
              }
            })
          }
        })
        fetch(`https://api.todo.uyou.org.cn/todocateexist?uid=${res._id}`).then(res => {
          return res.json()
        }).then(res => {
          const uid = localStorage.getItem('uid')
          const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
          if (res.code === 200) {
            fetch('https://api.todo.uyou.org.cn/addtodocate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                uid: uid,
                data: localCateList
              })
            }).then(res => {
              return res.json()
            }).then(res => {
              if (res.code === 200) {
                createToast({msg: i18n().accountPage.syncSuccess})
              } else {
                createToast({msg: i18n().accountPage.syncFail})
              }
            })
          } else {
            fetch('https://api.todo.uyou.org.cn/gettodocate', {
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
                createToast({msg: i18n().accountPage.syncSuccess})
                localStorage.setItem('cate', res.data)
                emitter.emit('setCate', res.data)
              } else {
                createToast({msg: i18n().accountPage.syncFail})
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

const isLogoutClick = ref(false)

const logout = () => {
  alertShow.value = true
  isLogoutClick.value = true
  alertMsg.value = [i18n().accountPage.logoutMsg]
}

const returnAlert = () => {
  if (isLogoutClick.value) {
    loginText.value = i18n().loginText
    localStorage.setItem('uname', '')
    localStorage.setItem('uid', '')
    loginState.value = false
    alertShow.value = false
    isLogoutClick.value = false
    return
  }
  alertShow.value = false
  isLogoutClick.value = false
}

const closeAlert = () => {
  alertShow.value = false
  isLogoutClick.value = false
}

const openLogoff = () => {
  ipcRenderer.send('open-logoff', localStorage.getItem('uname'))
}
</script>