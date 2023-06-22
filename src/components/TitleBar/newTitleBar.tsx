import { defineComponent, ref } from "vue";
import firstLoad from "./firstLoad";
import emitter from "../../util/bus";

export default defineComponent({
  setup() {
    const ipcRenderer = require('electron').ipcRenderer

    const topState = ref(firstLoad())
    const onTopWindow = () => {
      topState.value = !topState.value
      ipcRenderer.send('window-on-top', topState.value)
      localStorage.setItem('alwaysOnTop', topState.value + '')
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
        drag w-230px h-40px
        flex items-center
      >
        <div
          bg={topState.value ? 'error-d hover:error-h active:error-a' : 'hover:black/10 active:black/20'} 
          w-50px h-20px no-drag
          flex items-center justify-center
          ml-10px cursor-pointer rounded-5px
          border={topState.value ? '1px solid error-d hover:error-h active:error-a' : (isLight.value ? '1px solid #594b4230' : '1px solid #594b4230')} 
          onClick={onTopWindow}
        >
          <div i-fluent:pin-48-filled text-14px c={topState.value ? 'white' : '#555'}></div>
        </div>
      </div>
    )
  }
})