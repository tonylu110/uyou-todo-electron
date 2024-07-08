import { usePreferredDark } from '@vueuse/core'

export interface IProps {
  msg: string
  center?: boolean
}

function Toast() {
  const msg = vineProp.withDefault('toast')
  const center = vineProp.withDefault(false)

  const simpleMode = window.innerWidth < 800

  const isNoteUI = localStorage.getItem('newNoteUI') === 'true'

  const isDark = usePreferredDark()

  return vine`
    <div
      p="y-7px x-21px" rounded-full font-bold border="1px solid #00000015"
      c="#777 dark:#bbb" :bg="isDark ? '#333/80' : 'white/80'" shadow="md black/10"
      animate-duration-300 animate-fill-mode-forwards animate-ease :top="center ? '50%' : ''"
      :left="center ? '50%' : (simpleMode || isNoteUI ? '50%' : '[calc(50%+150px)]')"
      :transform="center ? 'translate--50%' : 'translate-x--50%'"
      :position="center ? 'absolute' : 'fixed'" :class="center ? '' : 'animate-toastShow'" z-999999999
    >
      {{ msg }}
    </div>
  `
}

export default Toast
