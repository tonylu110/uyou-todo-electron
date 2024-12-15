import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import setSwitchFn from '../../util/setSwitchFn'
import Item from '../ItemBox/Item/Item.vue'
import ItemBox from '../ItemBox/ItemBox.vue'

function UpdateSettings() {
  const { t } = useI18n()
  const router = useRouter()

  const autoUpdateState = ref(localStorage.getItem('autoUpdate') !== 'false')

  const simpleMode = localStorage.getItem('simpleMode') === 'true'

  return vine`
    <ItemBox>
      <Item
        v-if="!simpleMode"
        icon="i-icon-park:auto-focus"
        :title="t('update.autoUpdate')"
        :show-switch="true"
        :switch-state="autoUpdateState"
        @switch-fun="
          setSwitchFn(
            'autoUpdate',
            !autoUpdateState,
            () => (autoUpdateState = !autoUpdateState),
          )
        "
      />
      <Item
        icon="i-icon-park:update-rotation"
        :title="t('update.updateTitle')"
        @item-fun="router.push('/update?from=setting')"
      />
    </ItemBox>
  `
}

export default UpdateSettings
