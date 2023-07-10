<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import router from '../router'
import TabBar from '../components/TabBar/TabBar.vue'
import SettingList from '../components/SettingList'
import Alert from '../components/Alert/Alert.vue'
import Item from '../components/ItemBox/Item/Item.vue'
import ItemButton from '../components/ItemBox/ItemButton/ItemButton.vue'
import emitter from '../util/bus'
import { createToast } from '../components/Toast'

const { t } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const ipcRenderer = require('electron').ipcRenderer

const simpleMode = localStorage.getItem('simpleMode') === 'true'

const form = ref('')
const route = useRoute()

watchEffect(() => {
  form.value = route.query.from as unknown as string
})

const swichState = ref(localStorage.getItem('autoSync') === 'true' || localStorage.getItem('autoSync') === null)

function setAutoSync() {
  swichState.value = !swichState.value
  localStorage.setItem('autoSync', `${swichState.value}`)
}

const loginText = ref('')

const loginState = ref(localStorage.getItem('uid') !== '' && localStorage.getItem('uid') !== null)

onMounted(() => {
  if (!loginState.value)
    loginText.value = t('loginText')
  else
    loginText.value = localStorage.getItem('uname')!
})

function changPass() {
  // window.open(`https://register.todo.uyou.org.cn/#/setpassword/${localStorage.getItem('uname')}`)
  ipcRenderer.send('open-repass', localStorage.getItem('uname'))
}

function openRegister() {
  // window.open('https://register.todo.uyou.org.cn')
  ipcRenderer.send('open-register')
}

const uname = ref('')
const passwd = ref('')
const alertMsg = ref([''])
const alertShow = ref(false)
function login() {
  if (uname.value === '' || passwd.value === '') {
    alertMsg.value = [t('accountPage.alertNoAnP')]
    alertShow.value = true
  }
  else {
    fetch('https://api.todo.uyou.org.cn/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uname: uname.value,
        passwd: passwd.value,
      }),
    }).then((res) => {
      return res.json()
    }).then((res) => {
      if (res._id) {
        loginText.value = uname.value
        localStorage.setItem('uname', uname.value)
        localStorage.setItem('uid', res._id)
        loginState.value = true
        createToast({ msg: t('accountPage.syncData') })
        fetch(`https://api.todo.uyou.org.cn/todoexist?uid=${res._id}`).then((res) => {
          return res.json()
        }).then((res) => {
          const uid = localStorage.getItem('uid')
          const data = localStorage.getItem('ToDo')
          if (res.code === 200) {
            fetch('https://api.todo.uyou.org.cn/addtodo', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                uid,
                data,
              }),
            }).then((res) => {
              return res.json()
            }).then((res) => {
              if (res.code === 200)
                createToast({ msg: t('accountPage.syncSuccess') })
              else
                createToast({ msg: t('accountPage.syncFail') })
            })
          }
          else {
            const uid = localStorage.getItem('uid')
            fetch('https://api.todo.uyou.org.cn/gettodo', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                uid,
              }),
            }).then((res) => {
              return res.json()
            }).then((res) => {
              if (res._id) {
                createToast({ msg: t('accountPage.syncSuccess') })
                localStorage.setItem('ToDo', res.data)
              }
              else {
                createToast({ msg: t('accountPage.syncFail') })
              }
            })
          }
        })
        fetch(`https://api.todo.uyou.org.cn/todocateexist?uid=${res._id}`).then((res) => {
          return res.json()
        }).then((res) => {
          const uid = localStorage.getItem('uid')
          const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
          if (res.code === 200) {
            fetch('https://api.todo.uyou.org.cn/addtodocate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                uid,
                data: localCateList,
              }),
            }).then((res) => {
              return res.json()
            }).then((res) => {
              if (res.code === 200)
                createToast({ msg: t('accountPage.syncSuccess') })
              else
                createToast({ msg: t('accountPage.syncFail') })
            })
          }
          else {
            fetch('https://api.todo.uyou.org.cn/gettodocate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                uid,
              }),
            }).then((res) => {
              return res.json()
            }).then((res) => {
              if (res._id) {
                createToast({ msg: t('accountPage.syncSuccess') })
                localStorage.setItem('cate', res.data)
                emitter.emit('setCate', res.data)
              }
              else {
                createToast({ msg: t('accountPage.syncFail') })
              }
            })
          }
        })
      }
      else {
        alertMsg.value = [t('accountPage.loginError')]
        alertShow.value = true
      }
    })
  }
}

const isLogoutClick = ref(false)

function logout() {
  alertShow.value = true
  isLogoutClick.value = true
  alertMsg.value = [t('accountPage.logoutMsg')]
}

function returnAlert() {
  if (isLogoutClick.value) {
    loginText.value = t('loginText')
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

function closeAlert() {
  alertShow.value = false
  isLogoutClick.value = false
}

function openLogoff() {
  ipcRenderer.send('open-logoff', localStorage.getItem('uname'))
}
</script>

<template>
  <TabBar
    :title="t('accountPage.account')"
    :right-img-show="false"
    :left-img-show="form === 'setting'"
    bg-color="light"
    @left-click="() => router.back()"
  />
  <SettingList>
    <Item :title="loginText" :show-arrow="false" />
    <div
      v-if="!loginState" mb-10px rounded-7px shadow-item
      p="x-15px y-10px"
      :w="simpleMode ? '[calc(100%-50px)]' : '[calc(100vw-450px)]'"
      bg-white flex="~ col"
      max-w-550px
    >
      <input
        v-model="uname" p-15px
        m="x-0 y-5px"
        border="1.5px solid #00000020" bg="#00000010" rounded-5px
        outline-primary-d
        type="text"
        :placeholder="t('accountPage.account')"
      >
      <input
        v-model="passwd" p-15px
        m="x-0 y-5px"
        border="1.5px solid #00000020" bg="#00000010" rounded-5px
        outline-primary-d
        type="password"
        :placeholder="t('accountPage.passwd')"
        @keydown.enter="login"
      >
    </div>
    <ItemButton v-if="!loginState" mode="primary" @click="login">
      {{ t('accountPage.login') }}
    </ItemButton>
    <ItemButton v-if="!loginState" @click="openRegister">
      {{ t('accountPage.register') }}
    </ItemButton>
    <Item
      v-if="loginState"
      :title="t('accountPage.autoSync')"
      :show-switch="true"
      :switch-state="swichState"
      @switch-fun="setAutoSync"
    />
    <ItemButton v-if="loginState" @click="changPass">
      {{ t('accountPage.changPass') }}
    </ItemButton>
    <ItemButton v-if="loginState" @click="openLogoff">
      {{ t('logoffPage.logoff') }}
    </ItemButton>
    <ItemButton v-if="loginState" mode="error" @click="logout">
      {{ t('accountPage.logout') }}
    </ItemButton>
    <Alert
      :title="t('accountPage.alertTitle')"
      :cancel-button-show="isLogoutClick"
      :dialog-show="alertShow"
      @return="returnAlert"
      @cancel="closeAlert"
    >
      <span>{{ alertMsg[0] }}</span>
    </Alert>
  </SettingList>
</template>
