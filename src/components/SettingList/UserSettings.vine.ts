import ItemBox from "../ItemBox/ItemBox.vue"
import Item from "../ItemBox/Item/Item.vue"
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

function UserSettings() {
  const { t } = useI18n()
  const router = useRouter()

  const loginState = localStorage.getItem('uid') !== '' && localStorage.getItem('uid') !== null
  
  return vine`
    <ItemBox>
      <Item
        icon="i-icon-park:reduce-user"
        :title="loginState ? t('myAccount') : t('loginText')"
        @item-fun="() => router.push('/account?from=setting')"
      />
      <Item
        icon="i-icon-park:lock-one"
        :title="t('anotherSettings.openPass')"
        @item-fun="router.push('/openPass?from=setting')"
      />
    </ItemBox>
  `
}

export default UserSettings