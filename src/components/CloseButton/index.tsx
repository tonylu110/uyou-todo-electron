import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const ipcRenderer = require('electron').ipcRenderer
    const route = useRoute()

    const close = () => {
      ipcRenderer.send(`close-${(route.name as unknown as string)}`)
    }

    return () => (
      <div
        fixed right="7.5px" top="7.5px"
        bg="error-d hover:error-h active:error-a"
        h-20px w-50px
        flex items-center justify-center
        rounded-5px
        no-drag
        cursor-pointer
        c-white
        z-1
        onclick={close}
      >
        <div i-mdi:close-thick c-white text-12px ml-1px></div>
      </div>
    )
  },
})
