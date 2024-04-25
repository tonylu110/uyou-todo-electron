const Icons: SetupFC = () => {
  const emit = defineEmits<{
    setIcon: [icon: string]
  }>()

  const props = defineProps<{
    icon?: string
  }>()

  const icons = [
    'i-ph:radio-button-bold',
    'i-ph:alien-bold',
    'i-ph:baby-bold',
    'i-ph:backpack-bold',
    'i-ph:basketball-bold',
    'i-ph:buildings-bold',
    'i-ph:currency-circle-dollar-bold',
    'i-ph:hamburger-bold',
    'i-ph:house-bold',
    'i-ph:nut-bold',
  ]

  return (
    <div p-7px flex="~ gap-5px wrap" max-w-150px>
      {icons.map((item, index) => (
        <div
          p-5px
          rounded-5px
          bg={
            props.icon === undefined && index === 0
              ? 'primary-d dark:primary-a'
              : props.icon === item
                ? 'primary-d dark:primary-a'
                : 'black/10 active:black/20'
          }
          key={index}
          onClick={() => emit('setIcon', item)}
        >
          <div
            className={item}
            block
            c={
              props.icon === undefined && index === 0
                ? 'white'
                : props.icon === item
                  ? 'white'
                  : ''
            }
          />
        </div>
      ))}
    </div>
  )
}

export default Icons
