import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Item from '../../../components/ItemBox/Item/Item.vue'
import SettingList from '../../../components/SettingList'
import TabBar from '../../../components/TabBar/TabBar.vue'
import setSwitchFn from '../../../util/setSwitchFn'
import { useI18n } from 'vue-i18n'
import { createToast } from '../../../components/Toast'
import ItemText from '../../../components/ItemBox/ItemText'
import ItemSpace from '../../../components/ItemBox/ItemSpace'
import { ElSlider } from 'element-plus'

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

  const fontSize = ref(Number(localStorage.getItem('fontSize') ? localStorage.getItem('fontSize') : '33'))
  
  watch(fontSize, (newValue) => {
    localStorage.setItem('fontSize', newValue + '')
    ipcRenderer.send('setFontSize', newValue)
  })

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
              <ItemText>{t('setFont.setFontSize')}</ItemText>
              <ItemSpace items-center>
                <div w="90%">
                  <ElSlider
                    v-model={fontSize.value}
                    step={33}
                    show-stops
                    show-tooltip={false}
                  />
                </div>
                <div flex justify-between w="95%">
                  <span>{t('setFont.small')}</span>
                  <span>{t('setFont.normal')}</span>
                  <span>{t('setFont.big')}</span>
                  <span>{t('setFont.large')}</span>
                </div>
              </ItemSpace>
              <ItemText>{t('setFont.setFont')}</ItemText>
              <ItemText isBold={true}>
                {t('setFont.regular')}
              </ItemText>
              <Item
                title={fontName.value ? t('setFont.select') + ' ' + fontName.value : t('setFont.donnotSelect')}
                onItemFun={selectFont}
              />
              <ItemText isBold={true}>
                {t('setFont.bold')}
              </ItemText>
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
