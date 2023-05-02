<template>
  <div class="item" ref="itemDom">
    <div class="button" @click="setOk" v-if="listName !== 'allDo'">
      <div i-mdi:check-bold text-24px c-white></div>
    </div>
    <div class="delete" @click="deleteItem">
      <div i-mdi:close-thick text-24px c-white></div>
    </div>
    <div class="list-item">
      <div class="time-area">
        <span>{{ getTime(time) }}</span>
        <div flex>
          <div @click="textWrap = !textWrap" class="c-button">
            <div i-fluent:chevron-up-12-filled text-14px v-if="textWrap"></div>
            <div i-fluent:chevron-down-12-filled text-14px v-else></div>
          </div>
          <div @click="showMore(false)" class="c-button" ml="8px">
            <div i-fluent:more-28-filled text-14px></div>
          </div>
        </div>
        <div
          absolute right-0 text-14px
          :top="moreMenuIsBottom ? '' : '0'" :bottom="moreMenuIsBottom ? '0' : ''"
          bg="white/50" backdrop-blur-10px p-10px
          rounded-5px z-1 shadow-item cursor-pointer
          pointer-events-auto
          v-if="moreShow"
          @click="showMore(true)"
          ref="moreDom"
        >
          <div 
            p-5px c="black/70" 
            bg="hover:black/5 active:black/10" rounded-5px 
            @click="copyText"
          >
            {{ i18n().copyText }}
          </div>
          <div h-1px bg="black/10" my-5px></div>
          <div 
            p-5px flex items-center 
            c="black/70" bg="hover:black/5 active:black/10" 
            rounded-5px 
            v-for="cate in cateList" :key="cate.id"
            @click="moveCate(time, cate.id)"
          >
            {{ cate.title }}
            <div i-mdi:chevron-right c="black/70"></div>
          </div>
          <div h-1px bg="black/10" my-5px></div>
          <div 
            p-5px c="black/70" 
            bg="hover:black/5 active:black/10" rounded-5px 
          >
            {{ i18n().cancelText }}
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
      <Toast
        v-if="showToast"
        :msg="i18n().copyToast"
        :center="true"
      />
    </div>
    <ContextMenu
      :pos="contextMenu"
      v-if="showContextMenu"
      :show-paste="false"
      :custom="customContextMenu"
      @setOk="setOk"
      @remove="deleteItem"
      :text="props.text"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, Ref, ref, watchEffect } from 'vue';
import getTime from '../../../util/getTime';
import i18n from '../../../i18n';
import Toast from '../../Toast';
import { useRoute } from 'vue-router';
import ContextMenu from "../../ContextMenu/ContextMenu.vue";
import { cateItem } from '../../ListMenu/ICateItem';
import emitter from '../../../util/bus';

const props = defineProps<{
  time: number,
  text: string,
  isOk: boolean
}>()

const emits = defineEmits<{
  (e: 'setOk', id: number, isOk: boolean): void,
  (e: 'deleteItem', id: number): void,
  (e: 'setCate', id: number, cateId: number): void
}>()

const okState = ref(props.isOk)

const route = useRoute()
const listName = ref('')

watchEffect(() => {
  okState.value = props.isOk
  listName.value = route.query.listName as unknown as string
})

const setOk = () => {
  okState.value = !okState.value
  emits('setOk', props.time!, okState.value)
}

const deleteItem = () => {
  emits('deleteItem', props.time!)
}

const showToast = ref(false)
const copyText = () => {
  navigator.clipboard.writeText(props.text!).then(() => {
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 1000)
  })
}
const moreShow = ref(false)

const itemDom = ref(null) as unknown as Ref<HTMLElement>
const moreDom = ref(null) as unknown as Ref<HTMLElement>

const showContextMenu = ref(false)
const contextMenu = ref({
  top: 0,
  left: 0
})

const customContextMenu = reactive([{
  label: okState.value ? i18n().contextMenu.undoTodo : i18n().contextMenu.comToDo,
  event: 'setOk',
  icon: okState.value ? 'i-mdi:checkbox-blank-circle-outline' : 'i-mdi:checkbox-marked-circle-outline'
}, {
  label: i18n().contextMenu.removeToDo,
  event: 'remove',
  icon: 'i-mdi:close-circle-outline',
  color: '#d6010f'
}])

watchEffect(() => {
  customContextMenu[0] = {
    label: okState.value ? i18n().contextMenu.undoTodo : i18n().contextMenu.comToDo,
    event: 'setOk',
    icon: okState.value ? 'i-mdi:checkbox-blank-circle-outline' : 'i-mdi:checkbox-marked-circle-outline'
  }
})

onMounted(() => {
  itemDom.value.addEventListener('contextmenu', e => {
    e.preventDefault()

    showContextMenu.value = true

    contextMenu.value = {
      top: e.pageY,
      left: e.pageX
    }
  })

  document.addEventListener('click', () => {
    showContextMenu.value = false
  })
})

const localCateList = localStorage.getItem('cate') ? localStorage.getItem('cate') : '{"data": []}'
const cateList: cateItem[] = reactive(JSON.parse(localCateList!).data)

emitter.on('setCate', (data) => {
  cateList.length = 0
  JSON.parse((data as string)).data.forEach((item: cateItem) => {
    cateList.push(item)
  })
})

const moveCate = (id: number, cateId: number) => {
  emits('setCate', id, cateId)
}

const moreMenuIsBottom = ref(false)
const showMore = (isCancel: boolean) => {
  moreShow.value = !moreShow.value
  setTimeout(() => {
    if (!isCancel) {
      const itemTopHeight = itemDom.value.offsetTop
      const windowHeight = window.innerHeight
      const itemHeight = itemDom.value.offsetHeight
      const moreHeight = moreDom.value.offsetHeight
      moreMenuIsBottom.value = (windowHeight - itemTopHeight - itemHeight) < moreHeight
    }
  }, 0);
}

const textWrap = ref(localStorage.getItem('textWrap') === 'true')

emitter.on('showWrap', () => {
  textWrap.value = !textWrap.value
})
onBeforeUnmount(() => {
  emitter.off('showWrap')
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>