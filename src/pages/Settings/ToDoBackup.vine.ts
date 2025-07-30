import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ItemButton from '../../components/ItemBox/ItemButton/ItemButton.vue'
import ItemSpace from '../../components/ItemBox/ItemSpace/ItemSpace.vine'
import ItemText from '../../components/ItemBox/ItemText/ItemText.vine'
import SettingList from '../../components/SettingList/SettingList.vine'
import NoteTabBar from '../../components/TabBar/NoteTabBar.vue'
import TabBar from '../../components/TabBar/TabBar.vue'
import { createToast } from '../../components/Toast'
import emitter from '../../util/bus'
import { readFile, writeFile } from '../../util/rnwFile'

type ExtType = 'uut' | 'uuc'

function ToDoBackup() {
  const { t } = useI18n()
  const router = useRouter()
  const isNoteUI = localStorage.getItem('newNoteUI') === 'true'

  // eslint-disable-next-line unused-imports/no-unused-vars
  const todoData = localStorage.getItem('ToDo')
  // eslint-disable-next-line unused-imports/no-unused-vars
  const cateData = localStorage.getItem('cate')

  // eslint-disable-next-line unused-imports/no-unused-vars
  function exportFile(name: string, text: string, ext: ExtType) {
    writeFile<ExtType>(
      { name, text, ext },
      (data) => {
        if (data) {
          createToast({ msg: t('backupT.exportSuccess') })
        }
      },
    )
  }
  function importFile(ext: ExtType) {
    readFile<ExtType>(ext, (data) => {
      if (data) {
        if (ext === 'uut') {
          localStorage.setItem('ToDo', `${data}`)
          emitter.emit('changeList')
        }
        else if (ext === 'uuc') {
          localStorage.setItem('cate', `${data}`)
          emitter.emit('lisCateChange', data)
        }
        createToast({ msg: t('backupT.importSuccess') })
      }
    })
  }

  return vine`
    <NoteTabBar v-if="isNoteUI" :title="t('anotherSettings.backup')" />
    <TabBar
      v-else
      :title="t('anotherSettings.backup')"
      :right-img-show="false"
      :left-img-show="true"
      @left-click="router.back()"
    />
    <SettingList :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'">
      <ItemSpace items-center c="dark:#bbb">
        <div text-18 mb-2 c="primary-d dark:primary-a" i-icon-park-outline:save-one />
        <span text-center font-bold>{{ t('backup') }}</span>
      </ItemSpace>
      <ItemText>{{ t('backupT.export') }}</ItemText>
      <ItemButton @click="exportFile(t('backupT.todo'), todoData!, 'uut')">{{
        t('backupT.exportToDo')
      }}</ItemButton>
      <ItemButton @click="exportFile(t('backupT.cate'), cateData!, 'uuc')">{{
      t('backupT.exportCate')
      }}</ItemButton>
      <ItemText>{{ t('backupT.import') }}</ItemText>
      <ItemButton mode="primary" @click="importFile('uut')">{{ t('backupT.importToDo') }}</ItemButton>
      <ItemButton mode="primary" @click="importFile('uuc')">{{ t('backupT.importCate') }}</ItemButton>
      <ItemText>
        <div i-emojione-v1:warning mr-2 />
        <span font-bold>{{ t('backupT.warn') }}</span>
      </ItemText>
      <ItemText>
        <div i-emojione-v1:warning mr-2 />
        <span font-bold>{{ t('backupT.warn2') }}</span>
      </ItemText>
    </SettingList>
  `
}

export default ToDoBackup
