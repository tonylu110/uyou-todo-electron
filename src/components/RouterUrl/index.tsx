import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    const routeUrl = ref('')
    const toUrl = () => {
      router.push(routeUrl.value)
      routeUrl.value = ''
    }

    const body = ref(null)

    onMounted(() => {
      const x = ref(0)
      const y = ref(0)

      const bodyDOM = body.value as unknown as HTMLElement

      const dragWindow = (ev: MouseEvent) => {
        bodyDOM.style.transform = 'translate(0px)'
        bodyDOM.style.top = ev.clientY - y.value + 'px'
        bodyDOM.style.left = ev.clientX - x.value + 'px'
      }

      const mouseMove = (ev: MouseEvent) => {
        x.value = ev.offsetX
        y.value = ev.offsetY
        bodyDOM.addEventListener('mousemove', dragWindow)
      }

      bodyDOM.addEventListener('mousedown', mouseMove)
      bodyDOM.addEventListener('mouseup', () => {
        bodyDOM.removeEventListener('mousemove', dragWindow)
      })
    })

    return () => (
      <div
        fixed top="50px" left="50%" translate="x-[-50%]"
        z-1000 bg-white p-x-20px p-y-10px shadow-item
        rounded-xl no-drag
        flex="~ col" items-center
        ref={body}
      >
        <div>{route.fullPath} - <span c-primary-d>[name: {route.name}]</span></div>
        <div flex mt-10px>
          <input 
            p-10px outline-primary-d mr-10px
            rounded-5px border-none bg="black/10"
            type="text" 
            v-model={routeUrl.value} 
          />
          <button
            bg="active:primary-a primary-d" c-white border-none
            rounded-5px p-10px cursor-pointer
            onClick={toUrl}
          >
            GO
          </button>
        </div>
      </div>
    )
  }
})