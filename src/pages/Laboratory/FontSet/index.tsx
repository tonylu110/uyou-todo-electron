import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Item from '../../../components/ItemBox/Item/Item.vue'
import SettingList from '../../../components/SettingList'
import TabBar from '../../../components/TabBar/TabBar.vue'
import setSwitchFn from '../../../util/setSwitchFn'

const FontSet: SetupFC = () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  const { dialog } = require('@electron/remote')
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  const path = require('node:path')
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  const fs = require('node:fs')

  const router = useRouter()

  const useCustomFont = ref(localStorage.getItem('useCustomFont') === 'true')
  const customFont = ref(localStorage.getItem('customFont'))
  const fontName = computed(() => path.basename(customFont.value).slice(0, -4))

  const selectFont = () => {
    dialog.showOpenDialog({
      title: 'please select a font file',
      defaultPath: 'cus.ttf',
      filters: [{
        name: 'font',
        extensions: ['ttf'],
      }],
      buttonLabel: 'select font',
    }).then((result: {
      canceled: boolean
      filePaths: string[]
    }) => {
      if (result.canceled)
        return
      customFont.value = result.filePaths[0]
      localStorage.setItem('customFont', result.filePaths[0])
      fs.readFile(result.filePaths[0], (_err: boolean, data: string) => {
        fs.writeFile('./cus-font.tff', data)
      })
    })
  }

  return () => (
    <>
      <TabBar
        title="Set Font"
        onLeftClick={() => router.back()}
      />
      <SettingList>
        <Item
          title='use custom font'
          showSwitch={true}
          switchState={useCustomFont.value}
          onSwitchFun={() => setSwitchFn('useCustomFont', !useCustomFont.value, () => useCustomFont.value = !useCustomFont.value)}
        />
        <Item
          title={customFont.value ? fontName.value : 'don\'t select font'}
          onItemFun={selectFont}
        />
      </SettingList>
    </>
  )
}

export default FontSet
