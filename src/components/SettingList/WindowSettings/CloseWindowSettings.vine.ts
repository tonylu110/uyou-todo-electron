import Item from "../../ItemBox/Item/Item.vue";
import { ElRadioGroup, ElRadio } from "element-plus/es"
import { useI18n } from "vue-i18n";
import setSwitchFn from "../../../util/setSwitchFn";
import { onBeforeUnmount, ref, watch } from "vue";
import emitter from "../../../util/bus";

function CloseWindowSettings() {
  const { t } = useI18n()

  const remember = ref(localStorage.getItem('rememberClose') === 'true')
  const closeMsgBox = ref(localStorage.getItem('closeMsgBox') === 'true')
  
  const localCloseState = localStorage.getItem('closeState') === 'true'
  const closeState = ref(remember.value ? localCloseState : false)
  watch(closeState, (newValue) => {
    localStorage.setItem('closeState', `${newValue}`)
    emitter.emit('changeCloseState', newValue)
  })

  const minWidth = ref(window.innerWidth < 750)
  window.addEventListener('resize', () => {
    minWidth.value = window.innerWidth < 750
  })

  onBeforeUnmount(() => {
    emitter.off('changeRemember')
  })

  return vine`
    <Item
      :title="t('quit.closeMsgBox')"
      :show-switch="true"
      :switch-state="closeMsgBox"
      @switch-fun="setSwitchFn('closeMsgBox', !closeMsgBox, () => {
        closeMsgBox = !closeMsgBox
        emitter.emit('changeCloseMsgBox', closeMsgBox)
      })"
    />
    <Item
      :title="t('anotherSettings.rememberQuit')"
      :show-switch="true"
      :switch-state="remember"
      @switch-fun="setSwitchFn('rememberClose', !remember, () => {
        remember = !remember
        emitter.emit('changeRemember', remember)
      })"
    />
    <div
      v-if="remember"
      class="item"
      :max-w="minWidth ? '[calc(100vw-450px)]' : '550px'"
      bg="white dark:#999/10"

      h-30px min-h-30px flex items-center justify-center p="x-15px y-10px"
    >
      <ElRadioGroup
        v-model="closeState"
        flex="~ row"
      >
        <ElRadio :value="false">
          {{ t('quit.tray') }}
        </ElRadio>
        <ElRadio :value="true">
          {{ t('quit.quit') }}
        </ElRadio>
      </ElRadioGroup>
    </div>
  `
}

export default CloseWindowSettings