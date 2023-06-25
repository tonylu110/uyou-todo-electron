import { defineComponent, renderSlot } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

export default defineComponent({
  props: ['justify'],
  setup(props, { slots }) {
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
  },
})
