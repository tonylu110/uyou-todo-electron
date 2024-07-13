<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ipcRenderer } from 'electron'
import Alert from '../../src/components/Alert/Alert.vue'
import CloseButton from '../../src/components/CloseButton/CloseButton.vine'
import { isMac } from '../../src/util/os'

const { t } = useI18n()

const formData = reactive({
  account: '',
  password: '',
  rePassword: '',
})

function closeWindow() {
  ipcRenderer.send('close-register')
}

const showAlert = ref(false)
const alertMsg = ref('')

function register() {
  if (formData.account === '' || formData.password === '' || formData.rePassword === '') {
    alertMsg.value = t('registerPage.plzAccAndPass')
    showAlert.value = true
  }
  else if (!((formData.account >= 'a' && formData.account <= 'z') || (formData.account >= '0' && formData.account <= '9') || (formData.account >= 'A' && formData.account <= 'Z') || formData.account.includes('_'))) {
    alertMsg.value = t('registerPage.onlyNum')
    showAlert.value = true
  }
  else if (formData.account.length > 10) {
    alertMsg.value = t('registerPage.accLen')
    showAlert.value = true
  }
  else if (formData.password !== formData.rePassword) {
    alertMsg.value = t('registerPage.rePassError')
    showAlert.value = true
  }
  else {
    fetch('https://api.todo.uyou.org.cn/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uname: formData.account,
        passwd: formData.password,
      }),
    }).then((res) => {
      return res.json()
    }).then((res) => {
      if (res.code === 200) {
        alertMsg.value = t('registerPage.regSuccess')
        showAlert.value = true
      }
      else {
        alertMsg.value = t('registerPage.regFail')
        showAlert.value = true
      }
    })
  }
}

function closeAlert() {
  showAlert.value = false
  if (alertMsg.value === t('registerPage.regSuccess'))
    closeWindow()
}
</script>

<template>
  <div

    flex="~ col"
    h-screen w-screen items-center justify-center bg-transparent drag
  >
    <img
      mb-20px h-150px w-150px
      src="/logo.png"
      alt=""
    >
    <div flex items-center p-7px>
      <span

        c="#555 dark:#bbb" w-100px flex whitespace-pre text-20px justify-content-right
      >
        {{ t('registerPage.account') }}
      </span>
      <input
        v-model="formData.account"
        v-focus

        rounded-5px p-10px outline-none no-drag
        bg="black/10 dark:#999/10"
        c="#555 dark:#bbb"
        border="2px solid #00000010"
        type="text"
      >
    </div>
    <div flex items-center p-7px>
      <span

        c="#555 dark:#bbb" w-100px flex whitespace-pre text-20px justify-content-right
      >
        {{ t('registerPage.password') }}
      </span>
      <input
        v-model="formData.password"

        rounded-5px p-10px outline-none no-drag
        bg="black/10 dark:#999/10"
        c="#555 dark:#bbb"
        border="2px solid #00000010"
        type="password"
      >
    </div>
    <div flex items-center p-7px>
      <span

        c="#555 dark:#bbb" w-100px flex whitespace-pre text-20px justify-content-right
      >
        {{ t('registerPage.rePass') }}
      </span>
      <input
        v-model="formData.rePassword"

        rounded-5px p-10px outline-none no-drag
        bg="black/10 dark:#999/10"
        c="#555 dark:#bbb"
        border="2px solid #00000010"
        type="password"
      >
    </div>
    <button

      p="x-20px y-5px"
      bg="primary-d active:primary-a dark:primary-a dark:active:primary-d"

      mt-10px cursor-pointer rounded-5px border-none text-18px c-white no-drag
      type="submit"
      @click="register"
    >
      {{ t('registerPage.reg') }}
    </button>
    <Alert
      :title="t('accountPage.alertTitle')"
      :dialog-show="showAlert"
      :cancel-button-show="false"
      @return="closeAlert"
    >
      {{ alertMsg }}
    </Alert>
    <CloseButton v-if="!isMac()" window-name="register" />
  </div>
</template>
