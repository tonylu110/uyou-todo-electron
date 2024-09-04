<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import CheckBox from '../../../List/Item/CheckBox/CheckBox.vue'
import { createToast } from '../../../Toast'
import emitter from '../../../../util/bus'
import Edit from './Edit/Edit.vue'

const props = defineProps<{
  title: string
  id: number
  isOk: boolean
  star?: boolean
  color?: string | null
  cateId?: string | number
}>()

const emits = defineEmits<{
  del: [id: number]
  setOk: [id: number, ok: boolean]
  edit: [id: number, title: string, cateId: number | string]
  setStar: [id: number, star: boolean]
}>()

const { t } = useI18n()

const okState = ref(props.isOk)
const starState = ref(props.star)

watch(okState, (newValue) => {
  emits('setOk', props.id, newValue)
})

const itemDom = ref()
function copy() {
  navigator.clipboard.writeText(props.title!).then(() => {
    createToast({ msg: t('copyToast'), center: true }, itemDom.value)
  })
}

const showStar = localStorage.getItem('showStar') === 'true' || localStorage.getItem('showStar') === null
const showCompleted = localStorage.getItem('showCompleted') === 'true' || localStorage.getItem('showCompleted') === null

const textWrapState = ref(localStorage.getItem('textWrap') === 'true' || localStorage.getItem('textWrap') === null)

onMounted(() => {
  emitter.on('textOpen', (data) => {
    textWrapState.value = data as boolean
    localStorage.setItem('textWrap', `${data}`)
  })
})

onUnmounted(() => {
  emitter.off('textOpen')
})
</script>

<template>
  <div ref="itemDom" relative flex items-center justify-between p-5px>
    <CheckBox v-if="showCompleted" v-model="okState" left="4px!" :num="id" :color="color ? color : 'primary-d'" />
    <div
      :ml="showCompleted
        ? showStar ? '25px' : '30px'
        : '0'"
      flex items-center
      :line="okState ? 'through' : ''"
      :c="okState
        ? '#333/25 dark:#bbb/25 selection:white'
        : '#333 dark:#bbb selection:white'"
    >
      <div
        v-if="showStar"
        i-ph:star-fill mr-5px :c="star ? '#e6a400' : '#555/20 dark:#bbb/20'"
        scale="active:85" transition="all duration-300" min-w-4
        @click="() => {
          starState = !starState
          emits('setStar', id, starState)
        }"
      />
      <span
        :whitespace="!textWrapState ? 'nowrap' : 'pre-wrap'"
        :overflow="!textWrapState ? 'hidden' : 'auto'"
        :text="!textWrapState ? 'ellipsis' : ''"
        :max-w="`
          [calc(75vw-70px)]
          sm:[calc(37.5vw-80px)]
          md:[calc(25vw-85px)]
          lg:[calc(18.75vw-85px)]
          xl:[calc(15vw-90px)]
          ${''}
          `
        "
      >{{ title }}</span>
    </div>
    <div
      flex="~ gap-5px"
      absolute right--10px overflow-hidden pr-10px
      w="15px hover:95px" transition="all 300"
      opacity="0 hover:100"
    >
      <div
        bg="success-d active:success-a" transition="all 300"
        w-16px flex items-center justify-center rounded-7px p-6px
        @click="copy"
      >
        <div i-ph:copy-bold c-white />
      </div>
      <Edit :title :cate-id @edit="(title, cateId) => emits('edit', id, title, cateId)" />
      <div
        bg="error-d active:error-a" transition="all 300"
        w-16px flex items-center justify-center rounded-7px p-6px
        @click="emits('del', id)"
      >
        <div i-ph:trash-bold c-white />
      </div>
    </div>
  </div>
</template>
