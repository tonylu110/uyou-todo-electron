import { useRoute } from 'vue-router'
import { closeWindow } from '../../util/windowApi'

function CloseButton() {
  const windowName = vineProp.optional<string>()

  const route = useRoute()

  return vine`
    <div
      fixed
      right-12px
      top-12px
      flex
      items-center
      justify-center
      class="group"
      bg="black/10 hover:error-d active:error-a dark:#999/10 dark:active:error-d dark:hover:error-h"
      no-drag
      cursor-pointer
      c-white
      z-1
      w-13px
      h-13px
      p-6px
      rounded-full
      @click="closeWindow(windowName ? windowName : route.name as unknown as string)"
    >
      <div
        i-mdi:close-thick
        text-13px
        c="#555 dark:#bbb group-hover:white group-active:white"
      />
    </div>
  `
}

export default CloseButton
