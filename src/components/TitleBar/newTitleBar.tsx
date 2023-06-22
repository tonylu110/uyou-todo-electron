import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import emitter from '../../util/bus'
import { isMac } from '../../util/os'
import firstLoad from './firstLoad'

export default defineComponent({
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const ipcRenderer = require('electron').ipcRenderer

    const route = useRoute()

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

    return () => (
      <div
        drag w-300px h-40px
        flex items-center
        bg={isMac() ? '#fff6dcaa' : ''}
      >
        {isMac() ? 
        <div
          no-drag
          cursor-pointer p-6px
          w-13px h-13px rounded-full
          bg={topState.value ? 'error-d hover:error-h active:error-a' : 'black/10 hover:black/20 active:black/30'}
          fixed right-14px top-15px z-100
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
        : 
        <div
          bg={topState.value ? 'error-d hover:error-h active:error-a' : 'hover:black/10 active:black/20'}
          w-50px h-20px no-drag
          flex items-center justify-center
          ml-10px cursor-pointer rounded-5px
          border={topState.value ? '1px solid error-d hover:error-h active:error-a' : (isLight.value ? '1px solid #594b4230' : '1px solid #594b4230')}
          onClick={onTopWindow}
        >
          <div i-fluent:pin-48-filled text-14px c={topState.value ? 'white' : '#555'}></div>
        </div>}
      </div>
    )
  },
})
