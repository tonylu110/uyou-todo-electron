import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import i18n from '../../../i18n'
import { isMac } from '../../../util/os'
import Alert from '../../Alert/Alert.vue'
import firstLoad from '../../TitleBar/firstLoad'

export default defineComponent({
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const ipcRenderer = require('electron').ipcRenderer

    const route = useRoute()

    const dialogShow = ref(false)

    const topState = ref(firstLoad())
    const onTopWindow = () => {
      topState.value = !topState.value
      ipcRenderer.send('window-on-top', topState.value)
      localStorage.setItem('alwaysOnTop', `${topState.value}`)
    }

    return () => (
      <>
        <div
          flex no-drag absolute
          right-14px
        >
          {isMac()
            ? <div
                cursor-pointer p-6px
                w-13px h-13px rounded-full
                bg={topState.value ? 'error-d hover:error-h active:error-a' : 'black/10 hover:black/20 active:black/30'}
                flex justify-center items-center
                class="group"
                onClick={onTopWindow}
              >
                <div
                  i-fluent:pin-48-filled
                  c={route.name === 'Home' || route.name === 'other' ? 'white' : topState.value ? 'group-hover:white group-active:white white' : '#555'}
                  text-13px text-center
                ></div>
              </div>
            : <>
              <div
                cursor-pointer p-6px mr-7px
                w-13px h-13px rounded-full
                bg="black/10 hover:black/20 active:black/30"
                class="group"
                onClick={() => ipcRenderer.send('window-min')}
              >
                <div
                  i-mdi:minus-thick block
                  c={route.name === 'Home' || route.name === 'other' ? 'white' : '#555'}
                  text-13px text-center
                />
              </div>
              <div
                cursor-pointer p-6px
                w-13px h-13px rounded-full
                bg="black/10 hover:error-d active:error-a"
                class="group"
                onClick={() => dialogShow.value = true}
              >
                <div
                  i-mdi:close-thick block
                  c={route.name === 'Home' || route.name === 'other' ? 'white' : '#555 group-hover:white group-active:white'}
                  text-13px text-center
                />
              </div>
            </>}
        </div>
        <Alert
          dialogShow={dialogShow.value}
          title={i18n().accountPage.alertTitle}
          onCancel={() => dialogShow.value = false}
          onReturn={() => ipcRenderer.send('window-close')}
        >
          <span>{i18n().closeWindow}</span>
        </Alert>
      </>
    )
  },
})
