<!-- eslint-disable ts/no-require-imports -->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Alert from '../components/Alert/Alert.vue'
import { isMac } from '../util/os'
import CloseButton from '../components/CloseButton'

const { t } = useI18n()

// eslint-disable-next-line ts/no-var-requires
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

        bg="black/5 dark:#999/5"
        border="2px solid #00000010"
        c="#555/50 dark:#bbb/50"
        type="text"
        disabled rounded-5px p-10px outline-none no-drag
      >
    </div>
    <div flex items-center p-7px>
      <span

        c="#555 dark:#bbb" w-100px flex whitespace-pre text-20px justify-content-right
      >
        {{ t('rePassPage.oldPass') }}
      </span>
      <input
        v-model="formData.oldPass"
        v-focus

        rounded-5px p-10px outline-none no-drag
        bg="black/10 dark:#999/10"
        border="2px solid #00000010"
        c="#555 dark:#bbb"
        type="password"
      >
    </div>
    <div flex items-center p-7px>
      <span

        c="#555 dark:#bbb" w-100px flex whitespace-pre text-20px justify-content-right
      >
        {{ t('rePassPage.newPass') }}
      </span>
      <input
        v-model="formData.newPass"

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
