const Toast: SetupFC = () => {
  const props = withDefaults(defineProps<{
    msg: string
    center?: boolean
  }>(), {
    msg: 'toast',
  })

  const simpleMode = window.innerWidth < 800

  return () => (
      <div
        p-7px
        rounded-5px
        font-bold
        c="#996b3d" bg="#fff6dc" shadow="md black/20"
        animate-duration-300 animate-fill-mode-forwards animate-ease
        top={props.center ? '50%' : ''}
        left={props.center ? '50%' : (simpleMode ? '50%' : '[calc(50%+150px)]')}
        translate={props.center ? '[-50%]' : 'x-[-50%]'}
        position={props.center ? 'absolute' : 'fixed'}
        class={props.center ? '' : 'animate-toastShow'}
      >
        { props.msg }
      </div>
  )
}

export default Toast
