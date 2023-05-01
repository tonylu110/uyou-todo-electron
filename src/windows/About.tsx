import { defineComponent, ref } from "vue"
import { isWindow, isMac } from "../util/os"
import CloseButton from '../components/CloseButton'

export default defineComponent({
  setup() {
    const { ipcRenderer, IpcRendererEvent } = require('electron')
    const os = require("os")

    const versionShow = ref('')

    ipcRenderer.send('get-app-version')
    ipcRenderer.on('version', (_event: typeof IpcRendererEvent, version: string) => {
      versionShow.value = version
    })

    const isWindows10OrAfter = isWindow() && os.release().split('.')[2] > 15063

    return () => (
      <div
        drag bg={isWindows10OrAfter ? 'transparent' : '#edd9b750'}
        flex="~ col" justify-center items-center
        w-screen h-screen
      >
        <img 
          w-130px h-130px
          mb-30px
          src="./logo.png" 
          alt="" 
        />
        <span c="#7a695c" font-bold text-24px>uyou ToDo v{versionShow.value}</span>
        <span 
          block mt-15px 
          text-14px c="#7a695c" font-bold
        >
          Copyright (c) 2022-2023, Anthony Lu
        </span>
        {!isMac() ? <CloseButton/> : null}
      </div>
    )
  }
})