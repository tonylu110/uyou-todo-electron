import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import i18n from '../../../i18n'
import Alert from '../../Alert/Alert.vue'

export default defineComponent({
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const ipcRenderer = require('electron').ipcRenderer

    const route = useRoute()

    const dialogShow = ref(false)

    return () => (
      <>
        <div
          flex no-drag absolute
          right-14px
        >
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
