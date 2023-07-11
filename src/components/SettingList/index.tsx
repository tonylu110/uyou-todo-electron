import { renderSlot, useSlots } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { isLinux, isWindows10OrAfter } from '../../util/os'

const SettingList: SetupFC = () => {
  defineSlots<{
    default: () => any
  }>()

  const props = defineProps<{
    justify?: string
  }>()

  const slots = useSlots()

  const isBlur = (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && (!isLinux() || isWindows10OrAfter())

  return () => (
    <PerfectScrollbar
      justify={props.justify}
      bg={isBlur ? 'white/50 dark:#333/50' : 'white/80 dark:#333/80'}
      w="100%" h="[calc(100%-105px)]" pt-10px
      flex="~ col" items-center overflow-y-scroll
    >
      { renderSlot(slots, 'default') }
    </PerfectScrollbar>
  )
}

export default SettingList
