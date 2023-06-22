import { defineComponent } from 'vue'

interface IProps {
  swichState: boolean
}

export default defineComponent({
  props: {
    swichState: {
      default: true,
    },
  },
  emits: ['switch'],
  setup(props: IProps, { emit }) {
    return () => (
      <div
        h="1.75em" w="3.45em" right-10px rounded="1em"
        bg-white shadow-switch-in absolute
        flex items-center overflow-hidden
        border="1px solid #00000030" cursor-pointer
        onClick={() => emit('switch')}
      >
        <div
          flex items-center justify-between
          ml=".575em"
        >
          <div
            translate={props.swichState ? '' : 'x-[-1.75em]'}
            w-8px h-8px rounded-5px
            bg-primary-d border="1px solid primary-d"
            transition-transform-300
          ></div>
          <div
            translate={props.swichState ? '' : 'x-[-1.75em]'}
            w="1.55em" h="1.55em" rounded-1em
            bg-white shadow-switch-out
            border="1px solid #00000020"
            transition-transform-300
            ml=".55em" mt="-.05em"
          ></div>
          <div
            translate={props.swichState ? '' : 'x-[-1.75em]'}
            w-8px h-8px rounded-5px
            bg="#eee" border="1px solid #ccc"
            transition-transform-300 ml=".65em"
          ></div>
        </div>
      </div>
    )
  },
})
