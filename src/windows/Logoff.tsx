import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import CloseButton from '../components/CloseButton'
import Alert from '../components/Alert/Alert.vue'
import { isMac } from '../util/os'
import i18n from '../i18n'
import { closeWindow } from '../util/windowApi'

const Logoff: SetupFC = () => {
  // const ipcRenderer = require('electron').ipcRenderer
  const route = useRoute()

  const formData = reactive({
    account: route.query.account,
    passwd: '',
  })

  const showDialog = ref(false)
  const dialogText = ref('')

  const logoff = () => {
    if (!formData.passwd) {
      dialogText.value = i18n().registerPage.plzAccAndPass
      showDialog.value = true
      return
    }
    fetch('https://api.todo.uyou.org.cn/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uname: formData.account,
        passwd: formData.passwd,
      }),
    }).then((res) => {
      return res.json()
    }).then((res) => {
      if (res._id) {
        fetch('https://api.todo.uyou.org.cn/admin/deluser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id: res._id,
          }),
        }).then((res) => {
          return res.json()
        }).then((res) => {
          if (res.code === 200) {
            fetch('https://api.todo.uyou.org.cn/deltodo', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                uid: res.data._id,
              }),
            }).then((res) => {
              return res.json()
            }).then((res) => {
              if (res.code === 200) {
                fetch('https://api.todo.uyou.org.cn/deltodocate', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    uid: res.data.uid,
                  }),
                }).then((res) => {
                  return res.json()
                }).then((res) => {
                  if (res.code === 200) {
                    dialogText.value = i18n().logoffPage.success
                    showDialog.value = true
                  }
                  else {
                    dialogText.value = i18n().logoffPage.fail
                    showDialog.value = true
                  }
                })
              }
              else {
                dialogText.value = i18n().logoffPage.fail
                showDialog.value = true
              }
            })
          }
          else {
            dialogText.value = i18n().logoffPage.fail
            showDialog.value = true
          }
        })
      }
      else {
        dialogText.value = i18n().logoffPage.passNotTrue
        showDialog.value = true
      }
    })
  }

  const closeDialog = () => {
    showDialog.value = false
    if (dialogText.value === i18n().logoffPage.success)
      closeWindow('logoff')
  }

  return () => (
    <div
      drag
      flex justify-center items-center
      h-screen w-screen
    >
      <div
        flex="~ col" justify-center items-center
      >
        <div flex="~ row" items-center justify-center>
          <span w-25 flex justify-content-right>{i18n().registerPage.account}</span>
          <input
            no-drag outline-primary-d
            mb-10px p-10px rounded-5px border="2px solid black/10"
            type="text"
            disabled
            v-model={formData.account}
          />
        </div>
        <div flex="~ row" items-center justify-center>
          <span w-25 flex justify-content-right>{i18n().registerPage.password}</span>
          <input
            no-drag outline-primary-d
            mb-10px p-10px rounded-5px border="2px solid black/10"
            type="password"
            v-model={formData.passwd}
          />
        </div>
        <button
          no-drag cursor-pointer
          bg="primary-d active:primary-a" c-white
          border-none p-10px rounded-5px
          onClick={logoff}
        >
          {i18n().logoffPage.logoff}
        </button>
      </div>
      <Alert
        dialogShow={showDialog.value}
        cancelButtonShow={false}
        onReturn={closeDialog}
        title={i18n().accountPage.alertTitle}
      >
        <span>{dialogText.value}</span>
      </Alert>
      {isMac() ? null : <CloseButton />}
    </div>
  )
}

export default Logoff
