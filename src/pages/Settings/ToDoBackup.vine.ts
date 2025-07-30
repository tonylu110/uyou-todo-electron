import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ItemButton from '../../components/ItemBox/ItemButton/ItemButton.vue'
import ItemSpace from '../../components/ItemBox/ItemSpace/ItemSpace.vine'
import ItemText from '../../components/ItemBox/ItemText/ItemText.vine'
import SettingList from '../../components/SettingList/SettingList.vine'
import NoteTabBar from '../../components/TabBar/NoteTabBar.vue'
import TabBar from '../../components/TabBar/TabBar.vue'
import { createToast } from '../../components/Toast'
import { useCateStore } from '../../store/cateStore'
import { useTodoStore } from '../../store/todoStore'
import emitter from '../../util/bus'
import { readFile, writeFile } from '../../util/rnwFile'

type ExtType = 'uut' | 'uuc'

function ToDoBackup() {
  const { t } = useI18n()
  const router = useRouter()
  const todoStore = useTodoStore()
  const cateStore = useCateStore()
  const isNoteUI = localStorage.getItem('newNoteUI') === 'true'

  function handleExport(name: string, ext: ExtType) {
    const text = ext === 'uut'
      ? JSON.stringify(todoStore.todoList)
      : JSON.stringify({ data: cateStore.cateList })

    writeFile<ExtType>(
      { name, text, ext },
      (data) => {
        if (data) {
          createToast({ msg: t('backupT.exportSuccess') })
        }
      },
    )
  }

  async function handleImport(ext: ExtType) {
    readFile<ExtType>(ext, async (data) => {
      if (typeof data === 'string') {
        try {
          if (ext === 'uut') {
            const todoData = JSON.parse(data)
            todoStore.todoList = todoData
            await todoStore.saveAndSync()
            emitter.emit('changeList')
          }
          else if (ext === 'uuc') {
            const cateData = JSON.parse(data)
            cateStore.cateList = cateData.data
            await cateStore.saveAndSync()
            emitter.emit('lisCateChange', data)
          }
          createToast({ msg: t('backupT.importSuccess') })
        }
        catch (error) {
          console.error('Import failed:', error)
          createToast({ msg: t('backupT.importError') })
        }
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
    <SettingList
      :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'"
      @get-scroll="() => {}"
    >
      <ItemSpace items-center c="dark:#bbb">
        <div text-18 mb-2 c="primary-d dark:primary-a" i-icon-park-outline:save-one />
        <span text-center font-bold>{{ t('backup') }}</span>
      </ItemSpace>
      <ItemText>{{ t('backupT.export') }}</ItemText>
      <ItemButton @click="handleExport(t('backupT.todo'), 'uut')">{{
        t('backupT.exportToDo')
      }}</ItemButton>
      <ItemButton @click="handleExport(t('backupT.cate'), 'uuc')">{{
      t('backupT.exportCate')
      }}</ItemButton>
      <ItemText>{{ t('backupT.import') }}</ItemText>
      <ItemButton mode="primary" @click="handleImport('uut')">{{ t('backupT.importToDo') }}</ItemButton>
      <ItemButton mode="primary" @click="handleImport('uuc')">{{ t('backupT.importCate') }}</ItemButton>
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
