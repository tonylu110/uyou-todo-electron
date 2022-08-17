<template>
  <div class="item">
    <div class="button" @click="setOk" v-if="listName !== 'allDo'">
      <span class="material-icons">check</span>
    </div>
    <div class="delete" @click="deleteItem">
      <span class="material-icons">close</span>
    </div>
    <div class="list-item">
      <div class="time-area">
        <span>{{ getTime(time!) }}</span>
        <div @click="copyText">{{ i18n().copyText }}</div>
      </div>
      <span class="item-text" :style="listName === 'allNotDo' ? '' : okStyle">
        {{ text }}
      </span>
      <!-- <div class="close-button" @click="deleteItem">
        <span class="material-icons">close</span>
      </div>
      <div class="ok-button" @click="setOk">
        <span class="material-icons">check</span>
      </div> -->
      <Toast
        v-if="showToast"
        :msg="i18n().copyToast"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import getTime from '../../../util/getTime';
import i18n from '../../../i18n';
import getOkStyle from '../../../data/getOkStyle';
import Toast from '../../Toast/Toast.vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  time: Number,
  text: String,
  isOk: Boolean,
})

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
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>