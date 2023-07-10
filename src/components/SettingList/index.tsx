import { renderSlot } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const SettingList: SetupFC = () => {
  const slots = defineSlots<{}>()
  const props = defineProps<{
    justify?: string
  }>()

  return () => (
    <PerfectScrollbar
      justify={props.justify}
      bg="#eee"
      w="100%" h="[calc(100%-65px)]" pt-10px
      flex="~ col" items-center overflow-y-scroll
    >
      { renderSlot(slots, 'default') }
    </PerfectScrollbar>
  )
}

export default SettingList
