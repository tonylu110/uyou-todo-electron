import { useRoute } from 'vue-router'
import { closeWindow } from '../../util/windowApi'

const CloseButton: SetupFC = () => {
  const route = useRoute()

  return () => (
    <div
      fixed
      right-12px
      top-12px
      bg="black/10 hover:error-d active:error-a dark:#999/10 dark:active:error-d dark:hover:error-h"
      flex
      items-center
      justify-center
      no-drag
      cursor-pointer
      c-white
      z-1
      w-13px
      h-13px
      p-6px
      rounded-full
      className="group"
      onclick={() => closeWindow(route.name as unknown as string)}
    >
      <div i-mdi:close-thick c="#555 group-hover:white group-active:white dark:#bbb" text-13px></div>
    </div>
  )
}

export default CloseButton
