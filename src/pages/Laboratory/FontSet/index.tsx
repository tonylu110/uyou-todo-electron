import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Item from '../../../components/ItemBox/Item/Item.vue'
import SettingList from '../../../components/SettingList'
import TabBar from '../../../components/TabBar/TabBar.vue'
import setSwitchFn from '../../../util/setSwitchFn'
import { useI18n } from 'vue-i18n'
import { createToast } from '../../../components/Toast'

const FontSet: SetupFC = () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  const ipcRenderer = require('electron').ipcRenderer

  const { t } = useI18n()

  const router = useRouter()

  const useCustomFont = ref(localStorage.getItem('useCustomFont') === 'true')
  const fontName = ref(localStorage.getItem('customFontName'))
  ipcRenderer.on('getFontName', (_event: unknown, font: string) => {
    fontName.value = font
    localStorage.setItem('customFontName', fontName.value)
  });

  const fontNameBold = ref(localStorage.getItem('customFontNameBold'))
  ipcRenderer.on('getFontNameBold', (_event: unknown, font: string) => {
    fontNameBold.value = font
    localStorage.setItem('customFontNameBold', fontNameBold.value)
  });

  const selectFont = () => {
    ipcRenderer.send('setFont')
  }

  const selectBoldFont = () => {
    ipcRenderer.send('setBoldFont')
  }

  const simpleMode = localStorage.getItem('simpleMode') === 'true'

  return () => (
    <>
      <TabBar
        title={t('vip.setCustFont')}
        onLeftClick={() => router.back()}
        rightImgShow={false}
      />
      <SettingList>
        <Item
          title={t('setFont.useCustomFont')}
          showSwitch={true}
          switchState={useCustomFont.value}
          onSwitchFun={() => setSwitchFn('useCustomFont', !useCustomFont.value, () => {
            useCustomFont.value = !useCustomFont.value
            createToast({msg: t('restartApp')})
          })}
        />
        {useCustomFont.value 
          ? (
            <>
              <div 
                c="#333 dark:#bbb" font-bold
                max-w-550px mb-10px select-text
                w={simpleMode ? '[calc(100%-50px)]' : '[calc(100vw-450px)]'}
              >
                {t('setFont.regular')}
              </div>
              <Item
                title={fontName.value ? t('setFont.select') + ' ' + fontName.value : t('setFont.donnotSelect')}
                onItemFun={selectFont}
              />
              <div 
                c="#333 dark:#bbb" font-bold
                max-w-550px mb-10px select-text
                w={simpleMode ? '[calc(100%-50px)]' : '[calc(100vw-450px)]'}
              >
                {t('setFont.bold')}
              </div>
              <Item
                title={fontNameBold.value ? t('setFont.select') + ' ' + fontNameBold.value : t('setFont.donnotSelect')}
                onItemFun={selectBoldFont}
              />
            </>
          )
          : null
        }
      </SettingList>
    </>
  )
}

export default FontSet
