import { defineComponent, renderSlot } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { isWindows10OrAfter } from '../../util/os'

export default defineComponent({
  props: ['justify'],
  setup(props, { slots }) {
    const simpleMode = localStorage.getItem('simpleMode') === 'true'

    return () => (
      <PerfectScrollbar
        justify={props.justify}
        bg={simpleMode ? (isWindows10OrAfter() ? 'transparent' : '#eeeeee90') : '#eee'}
        w="100%" h="[calc(100%-65px)]" pt-10px
        flex="~ col" items-center overflow-y-scroll
      >
        { renderSlot(slots, 'default') }
      </PerfectScrollbar>
    )
  },
})
