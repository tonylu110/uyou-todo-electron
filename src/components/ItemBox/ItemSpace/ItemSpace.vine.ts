import { onMounted, ref } from 'vue'

function ItemSpace() {
  const simpleMode = ref(localStorage.getItem('simpleMode') === 'true')

  const isNoteUI = localStorage.getItem('newNoteUI') === 'true'

  window.addEventListener('resize', () => {
    window.innerWidth < 750
      ? simpleMode.value = true
      : simpleMode.value = false
  })

  onMounted(() => {
    window.innerWidth < 750
      ? simpleMode.value = true
      : simpleMode.value = false
  })

  return vine`
    <div
      p="x-15px y-10px"
      border="1px solid black/20"
      :w="
        simpleMode ? (isNoteUI ? '[calc(100vw-108px)]' : '[calc(100%-50px)]') : '[calc(100vw-450px)]'
      "
      bg="white dark:#999/10"
      flex="~ col"
      mb-10px
      rounded-7px
      shadow-md
      :max-w="simpleMode ? '750px' : '550px'"
    >
      <slot />
    </div>
  `
}

export default ItemSpace
