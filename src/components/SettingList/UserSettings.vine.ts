import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Item from '../ItemBox/Item/Item.vue'
import ItemBox from '../ItemBox/ItemBox.vue'

function UserSettings() {
  const { t } = useI18n()
  const router = useRouter()

  const loginState = localStorage.getItem('uid') !== '' && localStorage.getItem('uid') !== null

  const isNoteUI = localStorage.getItem('newNoteUI') === 'true'

  return vine`
    <ItemBox>
      <Item
        icon="i-icon-park-outline:reduce-user"
        :title="loginState ? t('myAccount') : t('loginText')"
        @item-fun="() => router.push('/account?from=setting')"
      />
      <Item
        icon="i-icon-park-outline:lock-one"
        :title="t('anotherSettings.openPass')"
        @item-fun="router.push('/openPass?from=setting')"
      />
      <Item
        v-if="isNoteUI"
        icon="i-ph:star-four-bold"
        :useAIBg="true"
        :title="t('anotherSettings.ai')"
        :show-beta="true"
        @item-fun="router.push('/ai?from=setting')"
      />
    </ItemBox>
  `
}

export default UserSettings

