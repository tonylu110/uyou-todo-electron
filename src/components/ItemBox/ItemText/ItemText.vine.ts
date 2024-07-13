import { ref } from 'vue'

function ItemText() {
  const isBold = vineProp.optional<boolean>()

  const simpleMode = ref(localStorage.getItem('simpleMode') === 'true')

  window.addEventListener('resize', () => {
    window.innerWidth < 750
      ? simpleMode.value = true
      : simpleMode.value = false
  })

  return vine`
    <div
      c="#333 dark:#bbb" :font="isBold ? 'bold' : 'normal'"
      :max-w="simpleMode ? '750px' : '550px'" mb-10px select-text
      :w="simpleMode ? '[calc(100%-50px)]' : '[calc(100vw-450px)]'"
    >
      <slot />
    </div>
  `
}

export default ItemText