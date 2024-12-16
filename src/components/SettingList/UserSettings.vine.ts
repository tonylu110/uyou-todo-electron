import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Item from '../ItemBox/Item/Item.vue'
import ItemBox from '../ItemBox/ItemBox.vue'

function UserSettings() {
  const { t } = useI18n()
  const router = useRouter()

  const loginState = localStorage.getItem('uid') !== '' && localStorage.getItem('uid') !== null

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
    </ItemBox>
  `
}

export default UserSettings
