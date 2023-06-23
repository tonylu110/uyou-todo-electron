import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const ipcRenderer = require('electron').ipcRenderer
    const route = useRoute()

    const close = () => {
      ipcRenderer.send(`close-${(route.name as unknown as string)}`)
    }

    return () => (
      <div
        fixed right-12px top-12px
        bg="black/10 hover:error-d active:error-a"
        flex items-center justify-center
        no-drag cursor-pointer c-white z-1
        w-13px h-13px p-6px rounded-full
        className="group"
        onclick={close}
      >
        <div i-mdi:close-thick c="#555 group-hover:white group-active:white" text-13px></div>
      </div>
    )
  },
})
