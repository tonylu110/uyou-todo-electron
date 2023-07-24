<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Alert from '../components/Alert/Alert.vue'
import { isMac } from '../util/os'
import CloseButton from '../components/CloseButton'

const { t } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const { ipcRenderer } = require('electron')

const route = useRoute()

function closeWindow() {
  ipcRenderer.send('close-repass')
}

const formData = reactive({
  account: route.query.account,
  oldPass: '',
  newPass: '',
})

const showAlert = ref(false)
const alertMsg = ref('')

function repass() {
  if (formData.oldPass === '') {
    alertMsg.value = t('rePassPage.plzInOldPass')
    showAlert.value = true
  }
  else if (formData.newPass === '') {
    alertMsg.value = t('rePassPage.plzInNewPass')
    showAlert.value = true
  }
  else {
    fetch('https://api.todo.uyou.org.cn/editpasswd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uname: formData.account,
        passwd: formData.oldPass,
        newPass: formData.newPass,
      }),
    }).then((res) => {
      return res.json()
    }).then((res) => {
      if (res.code === 200) {
        alertMsg.value = t('rePassPage.setPassSuccess')
        showAlert.value = true
      }
      else {
        alertMsg.value = t('rePassPage.setPassFail')
        showAlert.value = true
      }
    })
  }
}

function closeAlert() {
  showAlert.value = false
  if (alertMsg.value === t('rePassPage.setPassSuccess'))
    closeWindow()
}
</script>

<template>
  <div
    bg-transparent
    flex="~ col" justify-center items-center
    w-screen h-screen drag
  >
    <img
      w-150px h-150px mb-20px
      src="/logo.png"
      alt=""
    >
    <div p-7px flex items-center>
      <span
        flex justify-content-right w-100px
        text-20px c="#555 dark:#bbb" whitespace-pre
      >
        {{ t('registerPage.account') }}
      </span>
      <input
        v-model="formData.account"
        no-drag
        p-10px outline-none rounded-5px
        bg="black/5 dark:#999/5"
        border="2px solid #00000010"
        c="#555/50 dark:#bbb/50"
        type="text"
        disabled
      >
    </div>
    <div p-7px flex items-center>
      <span
        flex justify-content-right w-100px
        text-20px c="#555 dark:#bbb" whitespace-pre
      >
        {{ t('rePassPage.oldPass') }}
      </span>
      <input
        v-model="formData.oldPass"
        v-focus
        no-drag
        p-10px outline-none rounded-5px
        bg="black/10 dark:#999/10"
        border="2px solid #00000010"
        c="#555 dark:#bbb"
        type="password"
      >
    </div>
    <div p-7px flex items-center>
      <span
        flex justify-content-right w-100px
        text-20px c="#555 dark:#bbb" whitespace-pre
      >
        {{ t('rePassPage.newPass') }}
      </span>
      <input
        v-model="formData.newPass"
        no-drag
        p-10px outline-none rounded-5px
        bg="black/10 dark:#999/10"
        c="#555 dark:#bbb"
        border="2px solid #00000010"
        type="password"
      >
    </div>
    <button
      no-drag
      mt-10px p="x-20px y-5px" rounded-5px
      bg="primary-d active:primary-a dark:primary-a dark:active:primary-d"
      c-white border-none
      text-18px cursor-pointer
      type="submit"
      @click="repass"
    >
      {{ t('rePassPage.setPass') }}
    </button>
    <Alert
      :title="t('accountPage.alertTitle')"
      :dialog-show="showAlert"
      :cancel-button-show="false"
      @return="closeAlert"
    >
      {{ alertMsg }}
    </Alert>
    <CloseButton v-if="!isMac()" />
  </div>
</template>
