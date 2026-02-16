import { usePreferredDark } from '@vueuse/core';
import NoteBox from '../../../src/components/NoteList/NoteBox/NoteBox.vue';
import { useI18n } from 'vue-i18n';
import { useTodoStore } from '../../../src/store/todoStore';
import { useCateStore } from '../../../src/store/cateStore';
import { computed, onMounted, ref } from 'vue';
import { ipcRenderer } from 'electron';
import CloseButton from '../../../src/components/CloseButton/CloseButton.vine';
import { isMac } from '../../../src/util/os';

function DesktopNote() {
  const isDark = usePreferredDark()

  const cateId = ref<number>(0)

  const { t } = useI18n()
  const cateStore = useCateStore()

  const cate = computed(() => cateStore.getCateById(cateId.value))

  ipcRenderer.invoke('getCateId').then((id) => {
    cateId.value = id
  })

  return vine`
    <div h-screen :class="isDark ? 'dark' : ''" flex justify-center items-center drag>
      <CloseButton v-if="!isMac()" window-name="desktopNote" />
      <NoteBox
        ref="noteBox"
        w="[calc(100%-20px)]" no-drag 
        :id="cate.id"
        :title="cate.title"
        :color="cate.color"
        :icon="cate.icon"
        :is-window="true"
        mt-18
      />
    </div>
  `
}

export default DesktopNote
