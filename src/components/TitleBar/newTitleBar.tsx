import { defineComponent, ref } from 'vue'
import emitter from '../../util/bus'
import { isMac, isWindow } from '../../util/os'
import firstLoad from './firstLoad'

export default defineComponent({
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const ipcRenderer = require('electron').ipcRenderer
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const os = require('node:os')

    const topState = ref(firstLoad())
    const onTopWindow = () => {
      topState.value = !topState.value
      ipcRenderer.send('window-on-top', topState.value)
      localStorage.setItem('alwaysOnTop', `${topState.value}`)
      emitter.emit('topWindow', topState.value)
    }
    emitter.on('topWindow', (data: unknown) => {
      topState.value = (data as boolean)
    })

    const isLight = ref(false)
    emitter.on('titleColor', (data) => {
      isLight.value = (data as boolean)
    })

    const isWindows10OrAfter = os.release().split('.')[2] > 15063
    const listMenuColor = ref(false)
    if (isWindow() && (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && isWindows10OrAfter)
      listMenuColor.value = true

    return () => (
      <div
        drag w-300px h-40px
        flex items-center z-200
        bg={isMac() ? '#fff6dc00' : listMenuColor.value ? 'transparent' : '#fff6dcaa'}
      >
        {isMac()
          ? null
          : <div
          bg={topState.value ? 'error-d hover:error-h active:error-a' : 'black/10 hover:black/20 active:black/30'}
          w-13px h-13px rounded-full
          no-drag p-6px mt-12px
          flex items-center justify-center
          ml-16px cursor-pointer rounded-5px
          onClick={onTopWindow}
        >
          <div i-fluent:pin-12-filled text-13px c={topState.value ? 'white' : '#555'}></div>
        </div>}
      </div>
    )
  },
})
