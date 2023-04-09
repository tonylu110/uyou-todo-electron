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
        <div @click="copyText">{{ i18n().copyText }}</div>
      </div>
      <span class="item-text" :style="listName === 'allNotDo' ? '' : okStyle">
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
import {onMounted, reactive, Ref, ref, watchEffect} from 'vue';
import getTime from '../../../util/getTime';
import i18n from '../../../i18n';
import getOkStyle from '../../../data/getOkStyle';
import Toast from '../../Toast/Toast.vue';
import { useRoute } from 'vue-router';
import ContextMenu from "../../ContextMenu/ContextMenu.vue";

const props = defineProps<{
  time: number,
  text: string,
  isOk: boolean
}>()

const emits = defineEmits<{
  (e: 'setOk', id: number, isOk: boolean): void,
  (e: 'deleteItem', id: number): void
}>()

const okState = ref(props.isOk)
const okStyle = ref(getOkStyle(okState.value))

const route = useRoute()
const listName = ref('')

watchEffect(() => {
  okState.value = props.isOk
  okStyle.value = getOkStyle(props.isOk)
  listName.value = route.query.listName as unknown as string
})

const setOk = () => {
  okState.value = !okState.value
  okStyle.value = getOkStyle(okState.value)
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

const itemDom = ref(null) as unknown as Ref<HTMLElement>

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
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>