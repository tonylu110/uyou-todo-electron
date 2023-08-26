import icons from './icons'

const Icons: SetupFC = () => {
  const emit = defineEmits<{
    setIcon: [icon: string]
  }>()

  return (
    <div p-7px flex="~ gap-5px wrap" max-w-150px>
      {icons.map((item, index) => (
        <div
          p-5px rounded-5px bg="black/10 active:black/20"
          key={index}
          onClick={() => emit('setIcon', item)}
        >
          <div className={item} block />
        </div>
      ))}
    </div>
  )
}

export default Icons
