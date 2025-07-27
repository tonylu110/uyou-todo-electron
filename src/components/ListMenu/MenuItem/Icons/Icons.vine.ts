function Icons() {
  const emits = vineEmits<{
    setIcon: [icon: string]
  }>()

  const icon = vineProp.optional<string>()

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

  return vine`
    <div p-7px flex="~ gap-5px wrap" max-w-150px>
      <div
        v-for="(item, index) in icons"
        p-5px
        rounded-5px
        :bg="
          icon === undefined && index === 0
            ? 'primary-d dark:primary-a'
            : icon === item
              ? 'primary-d dark:primary-a'
              : 'black/10 active:black/20'
        "
        :key="index"
      @click="emits('setIcon', item)"
      >
        <div
          :class="item"
          block="!~"
          :c="icon === undefined && index === 0 ? '!white' : icon === item ? '!white' : ''"
        />
      </div>
    </div>
  `
}

export default Icons
