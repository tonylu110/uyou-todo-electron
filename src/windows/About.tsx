import { defineComponent } from "vue"
import { isWindow, isMac } from "../util/os"
import CloseButton from '../components/CloseButton'
import { versionText } from "../util/appVersionCode"

export default defineComponent({
  setup() {
    const os = require("os")

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
        <span c="#7a695c" font-bold text-24px>uyou ToDo v{versionText}</span>
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