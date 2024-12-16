import { ipcRenderer } from 'electron'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import openUrlInBrowser from '../../util/openUrlInBrowser'
import Item from '../ItemBox/Item/Item.vue'
import ItemBox from '../ItemBox/ItemBox.vue'

function LinkList() {
  const { t } = useI18n()
  const router = useRouter()

  function openAboutWindow() {
    ipcRenderer.send('open-about')
  }

  return vine`
    <ItemBox>
      <Item
        :title="t('otherList.toFind')"
        icon="i-icon-park-outline:message"
        @item-fun="
          openUrlInBrowser(
            'https://github.com/tonylu110/uyou-todo-electron/discussions/6',
          )
        "
      />
      <Item
        :title="t('otherList.toGithub')"
        icon="i-icon-park-outline:github"
        @item-fun="
          openUrlInBrowser('https://github.com/tonylu110/uyou-todo-electron')
        "
      />
      <Item
        :title="t('otherList.toDonate')"
        icon="i-icon-park-outline:coffee-machine"
        @item-fun="router.push('/donate?from=setting')"
      />
    </ItemBox>
    <ItemBox>
      <Item
        :title="t('anotherSettings.openSource')"
        icon="i-icon-park-outline:heart-ballon"
        @item-fun="router.push('/open?from=setting')"
      />
      <Item
        :title="t('anotherSettings.about')"
        icon="i-icon-park-outline:info"
        @item-fun="openAboutWindow"
      />
    </ItemBox>
  `
}

export default LinkList
