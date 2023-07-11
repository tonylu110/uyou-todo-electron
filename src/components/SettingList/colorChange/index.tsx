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
      rounded-7px mb-10px p-15px
      w={simpleMode ? '[calc(100%-50px)]' : (minWidth.value ? '[calc(100vw-108px)]' : '[calc(100vw-450px)]')}
      border="1px solid #00000020"
    >
      <div
        bg={colorMode.value === 'system' ? 'primary-d dark:primary-a' : ''}
        w-50px h-50px border="1px solid #00000020"
        onClick={() => setColor('system')}
      >

      </div>
      <div
        bg={colorMode.value === 'light' ? 'primary-d dark:primary-a' : ''}
        w-50px h-50px border="1px solid #00000020"
        onClick={() => setColor('light')}
      >

      </div>
      <div
        bg={colorMode.value === 'dark' ? 'primary-d dark:primary-a' : ''}
        w-50px h-50px border="1px solid #00000020"
        onClick={() => setColor('dark')}
      >

      </div>
    </div>
  )
}

export default ColorChange
