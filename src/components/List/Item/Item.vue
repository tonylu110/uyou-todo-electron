<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, onBeforeUnmount, reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePreferredDark } from '@vueuse/core'
import getTime from '../../../util/getTime'
import ContextMenu from '../../ContextMenu/ContextMenu.vue'
import type { cateItem } from '../../ListMenu/ICateItem'
import emitter from '../../../util/bus'
import { createToast } from '../../Toast'
import type customContextMenuType from '../../ContextMenu/customContextMenu.type'

const props = defineProps<{
  time: number
  text: string
  isOk: boolean
  isStar: boolean | undefined
  index: number
}>()

const emits = defineEmits<{
  (e: 'setOk', id: number, isOk: boolean): void
  (e: 'deleteItem', id: number): void
  (e: 'setCate', id: number, cateId: number): void
  (e: 'setStar', id: number, star: boolean): void
  (e: 'dragenter', index: number): void
  (e: 'dragstart', index: number): void
  (e: 'dragend'): void
}>()

const { t } = useI18n()

const isDark = usePreferredDark()

const okState = ref(props.isOk)
const starState = ref(props.isStar)

const route = useRoute()
const listName = ref('')

watchEffect(() => {
  okState.value = props.isOk
  listName.value = route.query.listName as unknown as string
})

function setOk() {
  okState.value = !okState.value
  emits('setOk', props.time!, okState.value)
}

function deleteItem() {
  emits('deleteItem', props.time!)
}

function copyText() {
  navigator.clipboard.writeText(props.text!).then(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    createToast({ msg: t('copyToast'), center: true }, itemDom.value)
  })
}

const itemDom = ref(null) as unknown as Ref<HTMLElement>

const showContextMenu = ref(false)
const contextMenu = ref({
  top: 0,
  left: 0,
})

const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
const cateList: cateItem[] = reactive(JSON.parse(localCateList!).data)

const customContextMenu: Array<customContextMenuType> = reactive([{
  label: computed(() => okState.value ? t('contextMenu.undoTodo') : t('contextMenu.comToDo')),
  event: 'setOk',
  icon: computed(() => okState.value ? 'i-mdi:checkbox-blank-circle-outline' : 'i-mdi:checkbox-marked-circle-outline'),
}, {
  label: computed(() => starState.value ? t('contextMenu.unstarred') : t('contextMenu.star')),
  event: 'setStar',
  icon: computed(() => starState.value ? 'i-ph:star-bold' : 'i-ph:star-fill'),
  color: computed(() => isDark.value ? '#e6a400' : '#fcd901'),
}, {
  label: t('contextMenu.removeToDo'),
  event: 'remove',
  icon: 'i-mdi:close-circle-outline',
  color: isDark.value ? '#99362f' : '#d6010f',
}, {
  label: t('listMenu.to'),
  icon: 'i-ph:caret-circle-right-bold',
  children: computed(() => {
    return cateList.map((item) => {
      return {
        label: item.title,
        event: () => {
          moveCate(props.time, item.id)
          showContextMenu.value = false
        },
      }
    })
  }),
}])

watchEffect(() => {
  customContextMenu[0] = {
    label: okState.value ? t('contextMenu.undoTodo') : t('contextMenu.comToDo'),
    event: 'setOk',
    icon: okState.value ? 'i-mdi:checkbox-blank-circle-outline' : 'i-mdi:checkbox-marked-circle-outline',
  }
})

function contextmenuClick(e: MouseEvent) {
  e.preventDefault()

  showContextMenu.value = true

  contextMenu.value = {
    top: e.pageY,
    left: e.pageX,
  }
}

emitter.on('setCate', (data) => {
  cateList.length = 0
  JSON.parse((data as string)).data.forEach((item: cateItem) => {
    cateList.push(item)
  })
})

function moveCate(id: number, cateId: number) {
  emits('setCate', id, cateId)
}

const textWrap = ref(localStorage.getItem('textWrap') === 'true')

function setStar() {
  starState.value = !starState.value
  emits('setStar', props.time, starState.value)
}

emitter.on('showWrap', () => {
  textWrap.value = !textWrap.value
})
onBeforeUnmount(() => {
  emitter.off('showWrap')
})

function dragenter(e: MouseEvent, index: number) {
  e.preventDefault()
  emits('dragenter', index)
}
function dragover(e: MouseEvent) {
  e.preventDefault()
}
function dragstart(index: number) {
  emits('dragstart', index)
}
</script>

<template>
  <div
    ref="itemDom"
    class="item"
    draggable="true"
    @dragenter="dragenter($event, index)"
    @dragover="dragover($event)"
    @dragstart="dragstart(index)"
    @dragend="emits('dragend')"
    @contextmenu="contextmenuClick"
    @click="showContextMenu = false"
  >
    <div
      v-if="listName !== 'allDo'"
      class="button"
      bg="success-d dark:success-a active:success-a active:dark:success-a"
      border="3px solid white dark:#444"
      @click="setOk"
    >
      <div i-mdi:check-bold text-24px c="white dark:#444" />
    </div>
    <div
      class="delete"
      bg="error-d dark:error-a active:error-a active:dark:error-d"
      border="3px solid white dark:#444"
      @click="deleteItem"
    >
      <div i-mdi:close-thick text-24px c="white dark:#444" />
    </div>
    <div
      class="list-item"
      shadow="sm black/20"
      bg="#eee/80 dark:#222/50"
    >
      <div absolute right-10px top-5px flex items-center>
        <div
          class="c-button"
          bg="black/10 dark:#bbb/10"
          :opacity="starState ? '100' : '!0 hover:!100'"
          @click="setStar"
        >
          <div
            v-if="starState"
            i-ph:star-fill text-14px c="#fcd901 dark:#e6a400" pointer-events-auto cursor-pointer
          />
          <div
            v-else
            i-ph:star-bold text-14px c="#fcd901 dark:#e6a400" cursor-pointer
            transition hover:opacity-100 pointer-events-auto
          />
        </div>
        <div flex ml-10px>
          <div class="c-button" bg="black/10 dark:#bbb/10" @click="textWrap = !textWrap">
            <div v-if="textWrap" i-fluent:chevron-up-12-filled text-14px c="#777 dark:#bbb" />
            <div v-else i-fluent:chevron-down-12-filled text-14px c="#777 dark:#bbb" />
          </div>
          <div class="c-button" bg="black/10 dark:#bbb/10" ml="8px" @click="copyText">
            <div i-ph:copy-bold text-14px c="#777 dark:#bbb" />
          </div>
        </div>
      </div>
      <div class="time-area">
        <div flex items-center mb-3px mt-5px>
          <span mr-7px c="#555/40 dark:#bbb/40" text-12px>{{ getTime(time) }}</span>
        </div>
      </div>
      <span
        block mb-5px select-text pointer-events-auto
        :c="listName === 'allNotDo'
          ? '#555 dark:#bbb selection:white'
          : (okState
            ? '#555/25 dark:#bbb/25 selection:white'
            : '#555 dark:#bbb selection:white')"
        transition-300 bg="selection:primary-d selection:dark:primary-a"
        overflow-hidden text-ellipsis :whitespace="textWrap ? 'pre-wrap' : 'nowrap'"
        :line="listName === 'allNotDo' ? '' : (okState ? 'through' : '')"
        max-w="[calc(100%-100px)]"
      >
        {{ text }}
      </span>
    </div>
    <ContextMenu
      v-if="showContextMenu"
      :pos="contextMenu"
      :show-paste="false"
      :custom="customContextMenu"
      :text="props.text"
      @set-ok="setOk"
      @remove="deleteItem"
      @close-context="showContextMenu = false"
      @set-star="setStar"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
