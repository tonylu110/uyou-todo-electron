import { ref, renderSlot, useSlots } from 'vue'

const ItemText: SetupFC = () => {
  defineSlots<{
    default: () => any
  }>()

  const props = defineProps<{
    isBold?: boolean
  }>()

  const slots = useSlots()

  const simpleMode = ref(localStorage.getItem('simpleMode') === 'true')

  window.addEventListener('resize', () => {
    window.innerWidth < 750
      ? simpleMode.value = true
      : simpleMode.value = false
  })

  return () => (
    <div
      c="#333 dark:#bbb"
      font={props.isBold ? 'bold' : 'normal'}
      max-w={simpleMode.value ? '750px' : '550px'}
      mb-10px
      select-text
      w={simpleMode.value ? '[calc(100%-50px)]' : '[calc(100vw-450px)]'}
    >
      { renderSlot(slots, 'default') }
    </div>
  )
}

export default ItemText
