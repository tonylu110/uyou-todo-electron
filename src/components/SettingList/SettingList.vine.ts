import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useRoute } from 'vue-router'
import { isLinux, isMac, isWindows10OrAfter } from '../../util/os'

function SettingList() {
  const justify = vineProp.optional<string>()

  const emits = vineEmits<{
    getScroll: [scrollTop: number]
  }>()

  function onScroll(ev: Event) {
    emits('getScroll', ev.target!.scrollTop)
  }

  const route = useRoute()

  const isBlur = (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && (!isLinux() || isWindows10OrAfter())

  return vine`
    <PerfectScrollbar
      :swipe-wasing="true"
      :bg="
        isBlur
          ? isMac() && route.name === 'Home'
            ? 'white/00'
            : 'white/50 dark:#333/50'
          : 'white/80 dark:#333/80'
      "
      w="100%"
      h="[calc(100%-105px)]"
      :justify="justify"
      class="pt-10px items-center overflow-y-scroll"
      flex="~ col"
      @ps-scroll-y="onScroll"
    >
      <slot />
    </PerfectScrollbar>
  `
}

export default SettingList
