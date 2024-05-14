import { ref, renderSlot, useSlots } from 'vue'

const ItemSpace: SetupFC<{ flex?: string }> = () => {
  defineSlots<{
    default: () => any
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
      p="x-15px y-10px"
      border="1px solid #00000020"
      w={simpleMode.value ? '[calc(100%-50px)]' : '[calc(100vw-450px)]'}
      bg="white dark:#999/10"
      flex="~ col"
      max-w={simpleMode.value ? '750px' : '550px'}
      mb-10px
      rounded-7px
    >
      {renderSlot(slots, 'default')}
    </div>
  )
}

export default ItemSpace
