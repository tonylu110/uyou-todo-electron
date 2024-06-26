import { usePreferredDark } from '@vueuse/core'

export interface IProps {
  msg: string
  center?: boolean
}

const Toast: SetupFC = () => {
  const props = withDefaults(defineProps<{
    msg: string
    center?: boolean
  }>(), {
    msg: 'toast',
  })

  const simpleMode = window.innerWidth < 800

  const isNoteUI = localStorage.getItem('newNoteUI') === 'true'

  const isDark = usePreferredDark()

  return () => (
    <div
      p="y-7px x-21px"
      rounded-full
      font-bold
      border="1px solid #00000015"
      c="#777 dark:#bbb"
      bg={isDark.value ? '#333/80' : 'white/80'}
      shadow="md black/10"
      animate-duration-300
      animate-fill-mode-forwards
      animate-ease
      top={props.center ? '50%' : ''}
      left={props.center ? '50%' : (simpleMode || isNoteUI ? '50%' : '[calc(50%+150px)]')}
      transform={props.center ? 'translate--50%' : 'translate-x--50%'}
      position={props.center ? 'absolute' : 'fixed'}
      class={props.center ? '' : 'animate-toastShow'}
      z-999999999
    >
      { props.msg }
    </div>
  )
}

export default Toast
