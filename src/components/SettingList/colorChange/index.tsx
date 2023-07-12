import { ref } from 'vue'

const ColorChange: SetupFC = () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  const { ipcRenderer } = require('electron')

  const colorMode = ref(localStorage.getItem('colorMode') ? localStorage.getItem('colorMode') : 'system')

  const setColor = (color: string) => {
    ipcRenderer.send('colorMode', color)
    colorMode.value = color
    localStorage.setItem('colorMode', color)
  }

  const simpleMode = localStorage.getItem('simpleMode') === 'true'
  const minWidth = ref(window.innerWidth < 750)
  window.addEventListener('resize', () => {
    minWidth.value = window.innerWidth < 750
  })

  return () => (
    <div
      bg="white dark:#999/10" flex
      rounded-7px mb-10px p-15px max-w-550px
      w={simpleMode ? '[calc(100%-50px)]' : (minWidth.value ? '[calc(100vw-108px)]' : '[calc(100vw-450px)]')}
      border="1px solid #00000020"
    >
      <div
        bg={colorMode.value === 'system' ? 'primary-d dark:primary-a' : ''}
        w={simpleMode ? '98px' : '87px'} h={simpleMode ? '69px' : '59px'}
        border="1px solid #00000020" rounded-5px
        flex justify-center items-center cursor-pointer
        onClick={() => setColor('system')}
      >
        <div
          w={simpleMode ? '82px' : '72px'} h={simpleMode ? '54px' : '44px'}
          rounded-3px overflow-hidden bg-white
          border="1px solid #666"
        >
          <div w="50%" h="100%" bg="#333"/>
        </div>
      </div>
      <div
        bg={colorMode.value === 'light' ? 'primary-d dark:primary-a' : ''}
        w={simpleMode ? '98px' : '87px'} h={simpleMode ? '69px' : '59px'}
        border="1px solid #00000020" ml-10px rounded-5px
        flex justify-center items-center cursor-pointer
        onClick={() => setColor('light')}
      >
        <div
          w={simpleMode ? '82px' : '72px'} h={simpleMode ? '54px' : '44px'}
          rounded-3px overflow-hidden bg-white
          border="1px solid black/10"
        />
      </div>
      <div
        bg={colorMode.value === 'dark' ? 'primary-d dark:primary-a' : ''}
        w={simpleMode ? '98px' : '87px'} h={simpleMode ? '69px' : '59px'}
        border="1px solid #00000020" ml-10px rounded-5px
        flex justify-center items-center cursor-pointer
        onClick={() => setColor('dark')}
      >
        <div
          w={simpleMode ? '82px' : '72px'} h={simpleMode ? '54px' : '44px'}
          rounded-3px overflow-hidden bg="#333"
          border="1px solid black/10"
        />
      </div>
    </div>
  )
}

export default ColorChange
