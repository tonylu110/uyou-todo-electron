import { ref } from 'vue'
import emitter from '../../util/bus'
import { isMac, isWindow } from '../../util/os'
import { topWindow } from '../../util/windowApi'
import firstLoad from './firstLoad'

const newTitleBar: SetupFC = () => {
  const topState = ref(firstLoad())
  const onTopWindow = () => {
    topState.value = !topState.value
    topWindow(topState.value)
    localStorage.setItem('alwaysOnTop', `${topState.value}`)
    emitter.emit('topWindow', topState.value)
  }
  emitter.on('topWindow', (data: unknown) => {
    topState.value = (data as boolean)
  })

  const isLight = ref(false)
  emitter.on('titleColor', (data) => {
    isLight.value = (data as boolean)
  })

  const listMenuColor = ref(false)
  if (isWindow() && (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null))
    listMenuColor.value = true

  const menuShort = ref(window.innerWidth < 750)
  emitter.on('menuClose', (data) => {
    menuShort.value = data as boolean
  })

  return () => (
    <div
      drag
      w={menuShort.value ? '58px' : '300px'}
      h-40px
      flex
      items-center
      z-200
      bg="transparent"
      transition-width-200
    >
      {isMac()
        ? null
        : (
          <div
            bg={topState.value
              ? 'error-d hover:error-h active:error-a dark:error-h dark:active:error-d dark:hover:error-a'
              : 'black/10 hover:black/20 active:black/30 dark:#999/10 dark:hover:#999/20 dark:active:#999/30'}
            w-13px
            h-13px
            rounded-full
            no-drag
            p-6px
            mt-12px
            flex
            items-center
            justify-center
            ml-16px
            cursor-pointer
            rounded-5px
            onClick={onTopWindow}
          >
            <div i-fluent:pin-12-filled text-13px c={topState.value ? 'white' : '#555 dark:#bbb'}></div>
          </div>
          )}
    </div>
  )
}

export default newTitleBar
