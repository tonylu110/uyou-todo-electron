const Icons: SetupFC = () => {
  const emit = defineEmits<{
    setIcon: [icon: string]
  }>()

  return (
    <div p-10px flex="~ gap-5px wrap" max-w-150px>
      <div
        p-5px rounded-5px bg="black/10 active:black/20"
        onClick={() => emit('setIcon', 'i-ph:radio-button-bold')}
      >
        <div i-ph:radio-button-bold block />
      </div>
      <div
        p-5px rounded-5px bg="black/10 active:black/20"
        onClick={() => emit('setIcon', 'i-ph:alien-bold')}
      >
        <div i-ph:alien-bold block />
      </div>
      <div
        p-5px rounded-5px bg="black/10 active:black/20"
        onClick={() => emit('setIcon', 'i-ph:baby-bold')}
      >
        <div i-ph:baby-bold block />
      </div>
      <div
        p-5px rounded-5px bg="black/10 active:black/20"
        onClick={() => emit('setIcon', 'i-ph:backpack-bold')}
      >
        <div i-ph:backpack-bold block />
      </div>
      <div
        p-5px rounded-5px bg="black/10 active:black/20"
        onClick={() => emit('setIcon', 'i-ph:basketball-bold')}
      >
        <div i-ph:basketball-bold block />
      </div>
      <div
        p-5px rounded-5px bg="black/10 active:black/20"
        onClick={() => emit('setIcon', 'i-ph:buildings-bold')}
      >
        <div i-ph:buildings-bold block />
      </div>
      <div
        p-5px rounded-5px bg="black/10 active:black/20"
        onClick={() => emit('setIcon', 'i-ph:currency-circle-dollar-bold')}
      >
        <div i-ph:currency-circle-dollar-bold block />
      </div>
      <div
        p-5px rounded-5px bg="black/10 active:black/20"
        onClick={() => emit('setIcon', 'i-ph:hamburger-bold')}
      >
        <div i-ph:hamburger-bold block />
      </div>
      <div
        p-5px rounded-5px bg="black/10 active:black/20"
        onClick={() => emit('setIcon', 'i-ph:house-bold')}
      >
        <div i-ph:house-bold block />
      </div>
      <div
        p-5px rounded-5px bg="black/10 active:black/20"
        onClick={() => emit('setIcon', 'i-ph:nut-bold')}
      >
        <div i-ph:nut-bold block />
      </div>
    </div>
  )
}

export default Icons
