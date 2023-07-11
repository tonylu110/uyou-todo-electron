import { renderSlot, useSlots } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const SettingList: SetupFC = () => {
  defineSlots<{
    default: () => any
  }>()

  const props = defineProps<{
    justify?: string
  }>()

  const slots = useSlots()

  return () => (
    <PerfectScrollbar
      justify={props.justify}
      bg="white/60"
      w="100%" h="[calc(100%-95px)]" pt-10px
      flex="~ col" items-center overflow-y-scroll
    >
      { renderSlot(slots, 'default') }
    </PerfectScrollbar>
  )
}

export default SettingList
