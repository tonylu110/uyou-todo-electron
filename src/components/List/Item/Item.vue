<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, onBeforeUnmount, reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
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
}>()

const emits = defineEmits<{
  (e: 'setOk', id: number, isOk: boolean): void
  (e: 'deleteItem', id: number): void
  (e: 'setCate', id: number, cateId: number): void
  (e: 'setStar', id: number, star: boolean): void
}>()

const { t } = useI18n()

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
  label: okState.value ? t('contextMenu.undoTodo') : t('contextMenu.comToDo'),
  event: 'setOk',
  icon: okState.value ? 'i-mdi:checkbox-blank-circle-outline' : 'i-mdi:checkbox-marked-circle-outline',
}, {
  label: t('contextMenu.removeToDo'),
  event: 'remove',
  icon: 'i-mdi:close-circle-outline',
  color: '#d6010f',
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
</script>

<template>
  <div ref="itemDom" class="item" @contextmenu="contextmenuClick" @click="showContextMenu = false">
    <div v-if="listName !== 'allDo'" class="button" @click="setOk">
      <div i-mdi:check-bold text-24px c-white />
    </div>
    <div class="delete" @click="deleteItem">
      <div i-mdi:close-thick text-24px c-white />
    </div>
    <div class="list-item" shadow="sm black/20">
      <div class="time-area">
        <div flex items-center>
          <span mr-7px>{{ getTime(time) }}</span>
          <div
            v-if="starState"
            i-ph:star-fill text-14px c="#6e492f" pointer-events-auto cursor-pointer
            @click="setStar"
          />
          <div
            v-else
            i-ph:star-bold text-14px c="#6e492f" cursor-pointer
            opacity-0 transition hover:opacity-100 pointer-events-auto
            @click="setStar"
          />
        </div>
        <div flex>
          <div class="c-button" @click="textWrap = !textWrap">
            <div v-if="textWrap" i-fluent:chevron-up-12-filled text-14px />
            <div v-else i-fluent:chevron-down-12-filled text-14px />
          </div>
          <div class="c-button" ml="8px" @click="copyText">
            <div i-ph:copy-bold text-14px />
          </div>
        </div>
      </div>
      <span
        block mt-10px :c="listName === 'allNotDo' ? '#6e492f' : (okState ? '#cebfae' : '#6e492f')"
        select-text pointer-events-auto
        transition-300 bg="selection:#dcc6a9"
        overflow-hidden text-ellipsis :whitespace="textWrap ? 'pre-wrap' : 'nowrap'"
        :line="listName === 'allNotDo' ? '' : (okState ? 'through' : '')"
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
    />
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
