import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import setSwitchFn from '../../util/setSwitchFn'
import Item from '../ItemBox/Item/Item.vue'
import ItemBox from '../ItemBox/ItemBox.vue'
import isNoteUI from './util/isNoteUI'

function ToDoSettings() {
  const { t } = useI18n()
  const router = useRouter()

  const enterAddState = ref(localStorage.getItem('enterAdd') === 'true')
  const textWrapState = ref(localStorage.getItem('textWrap') === 'true' || localStorage.getItem('textWrap') === null)
  const showToDoBtn = ref(localStorage.getItem('ToDoBtn') === 'true')
  const showStar = ref(localStorage.getItem('showStar') === 'true' || localStorage.getItem('showStar') === null)
  const showCompleted = ref(localStorage.getItem('showCompleted') === 'true' || localStorage.getItem('showCompleted') === null)

  return vine`
    <ItemBox>
      <Item
        icon="i-icon-park-outline:save-one"
        :title="t('anotherSettings.backup')"
        @item-fun="router.push('/backup?from=setting')"
      />
      <Item
        v-if="!isNoteUI"
        icon="i-icon-park-outline:enter-key"
        :title="t('anotherSettings.enterToAdd')"
        :show-switch="true"
        :switch-state="enterAddState"
        @switch-fun="
          setSwitchFn(
            'enterAdd',
            !enterAddState,
            () => (enterAddState = !enterAddState),
          )
        "
      />
      <Item
        v-if="!isNoteUI"
        icon="i-icon-park-outline:eyes"
        :title="t('anotherSettings.itemBtnShow')"
        :show-switch="true"
        :switch-state="showToDoBtn"
        @switch-fun="
          setSwitchFn('ToDoBtn', !showToDoBtn, () => (showToDoBtn = !showToDoBtn))
        "
      />
      <Item
        icon="i-icon-park-outline:reverse-operation-out"
        :title="t('anotherSettings.itemWrap')"
        :show-switch="true"
        :switch-state="textWrapState"
        @switch-fun="
          setSwitchFn(
            'textWrap',
            !textWrapState,
            () => (textWrapState = !textWrapState),
          )
        "
      />
      <Item
        v-if="isNoteUI"
        icon="i-icon-park-outline:star"
        :title="t('anotherSettings.star')"
        :show-switch="true"
        :switch-state="showStar"
        @switch-fun="
          setSwitchFn('showStar', !showStar, () => (showStar = !showStar))
        "
      />
      <Item
        v-if="isNoteUI"
        icon="i-icon-park-outline:check-one"
        :title="t('anotherSettings.ok')"
        :show-switch="true"
        :switch-state="showCompleted"
        @switch-fun="
          setSwitchFn(
            'showCompleted',
            !showCompleted,
            () => (showCompleted = !showCompleted),
          )
        "
      />
    </ItemBox>
  `
}

export default ToDoSettings
