import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElCheckbox, ElRadio, ElRadioGroup } from 'element-plus'
import { isMac } from '../../../util/os'
import Alert from '../../Alert/Alert.vue'
import firstLoad from '../../TitleBar/firstLoad'
import { closeWindow, maxWindow, minWindow, topWindow } from '../../../util/windowApi'
import emitter from '../../../util/bus'

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

  const localRememberClose = localStorage.getItem('rememberClose') === 'true'
  const localCloseMsgBox = localStorage.getItem('closeMsgBox') === 'true'
  const localCloseState = localStorage.getItem('closeState') === 'true'

  const closeState = ref(localRememberClose ? localCloseState : false)

  const close = () => {
    closeWindow(undefined, closeState.value)
    dialogShow.value = false
  }

  watch(closeState, (newValue) => {
    localStorage.setItem('closeState', `${newValue}`)
  })

  const remember = ref(localRememberClose)
  watch(remember, (newValue) => {
    localStorage.setItem('rememberClose', `${newValue}`)
  })

  const closeMsgBox = ref(localCloseMsgBox)
  watch(closeMsgBox, (newValue) => {
    localStorage.setItem('closeMsgBox', `${newValue}`)
  })

  const closeFn = () => {
    if (closeMsgBox.value)
      close()
    else
      dialogShow.value = true
  }

  emitter.on('changeCloseMsgBox', (data) => {
    closeMsgBox.value = data as boolean
  })

  emitter.on('changeRemember', (data) => {
    remember.value = data as boolean
  })

  emitter.on('changeCloseState', (data) => {
    closeState.value = data as boolean
  })

  return () => (
    <>
      <div flex no-drag>
        {isMac()
          ? (
            <div
              cursor-pointer
              p-6px
              w-13px
              h-13px
              rounded-full
              bg={topState.value
                ? 'error-d hover:error-h active:error-a dark:error-h dark:hover:error-a dark:active:error-d'
                : 'black/10 hover:black/20 active:black/30 dark:#999/10 dark:hover:#999/20 dark:active:#999/30'}
              flex
              justify-center
              items-center
              class="group"
              onClick={onTopWindow}
            >
              <div
                i-fluent:pin-48-filled
                c={topState.value
                  ? 'group-hover:white group-active:white white'
                  : '#555 dark:#bbb'}
                text-13px
                text-center
              >
              </div>
            </div>
            )
          : (
            <>
              {simpleMode && !systemBarShow
                ? (
                  <div
                    cursor-pointer
                    p-6px
                    mr-7px
                    w-13px
                    h-13px
                    rounded-full
                    bg={topState.value
                      ? 'error-d hover:error-h active:error-a dark:error-h dark:hover:error-a dark:active:error-d'
                      : 'black/10 hover:black/20 active:black/30 dark:#999/10 dark:hover:#999/20 dark:active:#999/30'}
                    flex
                    justify-center
                    items-center
                    class="group"
                    onClick={onTopWindow}
                  >
                    <div
                      i-fluent:pin-48-filled
                      c={topState.value ? 'group-hover:white group-active:white white' : '#555 dark:#bbb'}
                      text-13px
                      text-center
                    >
                    </div>
                  </div>
                  )
                : null}
              <div
                cursor-pointer
                p-6px
                mr-7px
                w-13px
                h-13px
                rounded-full
                bg="black/10 hover:black/20 active:black/30 dark:#999/10 dark:hover:#999/20 dark:active:#999/30"
                class="group"
                onClick={() => minWindow()}
              >
                <div
                  i-mdi:minus-thick
                  block
                  c="#555 dark:#bbb"
                  text-13px
                  text-center
                />
              </div>
              {
                simpleMode
                  ? null
                  : (
                    <div
                      cursor-pointer
                      p-6px
                      mr-7px
                      w-13px
                      h-13px
                      rounded-full
                      bg="black/10 hover:black/20 active:black/30 dark:#999/10 dark:hover:#999/20 dark:active:#999/30"
                      class="group"
                      onClick={() => maxWindow()}
                    >
                      <div
                        i-fluent:checkbox-unchecked-12-filled
                        block
                        c="#555 dark:#bbb"
                        text-13px
                        text-center
                      />
                    </div>
                    )
              }
              <div
                cursor-pointer
                p-6px
                w-13px
                h-13px
                rounded-full
                bg="black/10 hover:error-d active:error-a dark:#999/10 dark:active:error-d dark:hover:error-h"
                class="group"
                onClick={closeFn}
              >
                <div
                  i-mdi:close-thick
                  block
                  c="#555 group-hover:white group-active:white dark:#bbb"
                  text-13px
                  text-center
                />
              </div>
            </>
            )}
      </div>
      <Alert
        dialogShow={dialogShow.value}
        title={t('accountPage.alertTitle')}
        onCancel={() => dialogShow.value = false}
        onReturn={() => close()}
      >
        <span text-16px font-bold>{t('closeWindow')}</span>
        <div
          mt-20px
          w="[calc(100%-30px)]"
          bg="black/5"
          rounded-5px
          p="x-15px y-5px"
          flex="~ col"
        >
          <ElRadioGroup
            class="flex flex-col !items-start"
            v-model={closeState.value}
          >
            <ElRadio value={false}>{t('quit.tray')}</ElRadio>
            <ElRadio value={true}>{t('quit.quit')}</ElRadio>
          </ElRadioGroup>
          <ElCheckbox
            label={t('quit.remember')}
            v-model={remember.value}
          />
          <ElCheckbox
            label={t('quit.closeMsgBox')}
            v-model={closeMsgBox.value}
          />
        </div>
      </Alert>
    </>
  )
}

export default WindowButtons
