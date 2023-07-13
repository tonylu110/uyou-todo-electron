import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { isMac } from '../../../util/os'
import Alert from '../../Alert/Alert.vue'
import firstLoad from '../../TitleBar/firstLoad'
import { closeWindow, maxWindow, minWindow, topWindow } from '../../../util/windowApi'

const WindowButtons: SetupFC = () => {
  const { t } = useI18n()

  const dialogShow = ref(false)

  const topState = ref(firstLoad())
  const onTopWindow = () => {
    topState.value = !topState.value
    topWindow(topState.value)
    localStorage.setItem('alwaysOnTop', `${topState.value}`)
  }

  const simpleMode = localStorage.getItem('simpleMode') === 'true'
  const systemBarShow = localStorage.getItem('systemTitle') === 'true'

  return () => (
    <>
      <div flex no-drag>
        {isMac()
          ? <div
              cursor-pointer p-6px
              w-13px h-13px rounded-full
              bg={topState.value
                ? 'error-d hover:error-h active:error-a dark:error-h dark:hover:error-a dark:active:error-d'
                : 'black/10 hover:black/20 active:black/30 dark:#999/10 dark:hover:#999/20 dark:active:#999/30'
              }
              flex justify-center items-center
              class="group"
              onClick={onTopWindow}
            >
              <div
                i-fluent:pin-48-filled
                c={topState.value
                  ? 'group-hover:white group-active:white white'
                  : '#555 dark:#bbb'
                }
                text-13px text-center
              ></div>
            </div>
          : <>
              {simpleMode && !systemBarShow
                ? <div
                    cursor-pointer p-6px mr-7px
                    w-13px h-13px rounded-full
                    bg={topState.value
                      ? 'error-d hover:error-h active:error-a dark:error-h dark:hover:error-a dark:active:error-d'
                      : 'black/10 hover:black/20 active:black/30 dark:#999/10 dark:hover:#999/20 dark:active:#999/30'
                    }
                    flex justify-center items-center
                    class="group"
                    onClick={onTopWindow}
                  >
                    <div
                      i-fluent:pin-48-filled
                      c={topState.value ? 'group-hover:white group-active:white white' : '#555 dark:#bbb'}
                      text-13px text-center
                    ></div>
                  </div>
                : null}
              <div
                cursor-pointer p-6px mr-7px
                w-13px h-13px rounded-full
                bg="black/10 hover:black/20 active:black/30 dark:#999/10 dark:hover:#999/20 dark:active:#999/30"
                class="group"
                onClick={() => minWindow()}
              >
                <div
                  i-mdi:minus-thick block
                  c="#555 dark:#bbb"
                  text-13px text-center
                />
              </div>
              {
                simpleMode
                  ? null
                  : <div
                      cursor-pointer p-6px mr-7px
                      w-13px h-13px rounded-full
                      bg="black/10 hover:black/20 active:black/30 dark:#999/10 dark:hover:#999/20 dark:active:#999/30"
                      class="group"
                      onClick={() => maxWindow()}
                    >
                      <div
                        i-fluent:checkbox-unchecked-12-filled block
                        c="#555 dark:#bbb"
                        text-13px text-center
                      />
                    </div>
              }
              <div
                cursor-pointer p-6px
                w-13px h-13px rounded-full
                bg="black/10 hover:error-d active:error-a dark:#999/10 dark:active:error-d dark:hover:error-h"
                class="group"
                onClick={() => dialogShow.value = true}
              >
                <div
                  i-mdi:close-thick block
                  c="#555 group-hover:white group-active:white dark:#bbb"
                  text-13px text-center
                />
              </div>
          </>}
      </div>
      <Alert
        dialogShow={dialogShow.value}
        title={t('accountPage.alertTitle')}
        onCancel={() => dialogShow.value = false}
        onReturn={() => closeWindow()}
      >
        <span>{t('closeWindow')}</span>
      </Alert>
    </>
  )
}

export default WindowButtons
