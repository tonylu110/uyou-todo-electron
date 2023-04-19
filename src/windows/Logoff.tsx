import { defineComponent, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import CloseButton from "../components/CloseButton";
import Alert from "../components/Alert/Alert.vue";
import { isMac } from "../util/os";

export default defineComponent({
  setup() {
    const ipcRenderer = require('electron').ipcRenderer
    const route = useRoute()

    const formData = reactive({
      account: route.query.account,
      passwd: ''
    })

    const showDialog = ref(false)
    const dialogText = ref('')

    const logoff = () => {
      if (!formData.passwd) {
        dialogText.value = 'plz input password'
        showDialog.value = true
        return
      }
      fetch('https://api.todo.uyou.org.cn/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uname: formData.account,
          passwd: formData.passwd
        })
      }).then(res => {
        return res.json()
      }).then(res => {
        if (res._id) {
          fetch('https://api.todo.uyou.org.cn/admin/deluser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              _id: res._id
            })
          }).then(res => {
            return res.json()
          }).then(res => {
            if (res.code === 200) {
              fetch('https://api.todo.uyou.org.cn/deltodo', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  uid: res.data._id
                })
              }).then(res => {
                return res.json()
              }).then(res => {
                if (res.code === 200) {
                  dialogText.value = 'log off success'
                  showDialog.value = true
                } else {
                  dialogText.value = 'log off fail'
                  showDialog.value = true
                }
              })
            } else {
              dialogText.value = 'log off fail'
              showDialog.value = true
            }
          })
        } else {
          dialogText.value = 'password donn\'t ture'
          showDialog.value = true
        }
      })
    }

    const closeDialog = () => {
      showDialog.value = false
      if (dialogText.value === 'log off success') {
        ipcRenderer.send('close-logoff')
      }
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
            <span w-25 flex justify-content-right>Account: </span>
            <input
              no-drag outline-primary-d
              mb-10px p-10px rounded-5px border="2px solid black/10"
              type="text"
              disabled
              v-model={formData.account}
            />
          </div>
          <div flex="~ row" items-center justify-center>
            <span w-25 flex justify-content-right>password: </span>
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
            log Off
          </button>
        </div>
        <Alert
          dialogShow={showDialog.value}
          cancelButtonShow={false}
          onReturn={closeDialog}
        >
          <span>{dialogText.value}</span>
        </Alert>
        {isMac() ? null : <CloseButton />}
      </div>
    )
  }
})