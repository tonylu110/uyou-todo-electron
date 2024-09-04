const Switch: SetupFC = () => {
  const { swichState = true } = defineProps<{
    swichState: boolean
  }>()

  const emit = defineEmits<{
    switch: []
  }>()

  return () => (
    <div
      h="1.75em"
      w="3.45em"
      right-10px
      rounded="1em"
      bg="white dark:#999/20"
      absolute
      flex
      items-center
      overflow-hidden
      border="1px solid #00000030"
      cursor-pointer
      onClick={() => emit('switch')}
    >
      <div
        flex
        items-center
        justify-between
        ml=".575em"
      >
        <div
          transform={swichState ? '' : 'translate-x-[-1.75em]'}
          w-8px
          h-8px
          rounded-5px
          bg="primary-d dark:primary-a"
          border="1px solid primary-d dark:primary-a"
          transition-transform-300
        >
        </div>
        <div
          transform={swichState ? '' : 'translate-x-[-1.85em]'}
          w="1.6em"
          h="1.6em"
          rounded-1em
          bg="white dark:#999/20"
          border="1px solid #00000020"
          transition-transform-300
          ml=".6em"
        >
        </div>
        <div
          transform={swichState ? '' : 'translate-x-[-1.78em]'}
          w-8px
          h-8px
          rounded-5px
          bg="#eee dark:#999/30"
          border="1px solid #ccc dark:#999/30"
          transition-transform-300
          ml=".65em"
        >
        </div>
      </div>
    </div>
  )
}

export default Switch
