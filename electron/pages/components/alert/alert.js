import i18n from "../../i18n/index.js";

const { onMounted, ref, watchEffect } = require('vue')

export default {
  props: {
    title: {
      default: 'title',
      type: String
    },
    body: {
      default: ['1', '2'],
      type: Array
    },
    cancelButtonShow: {
      default: true,
      type: Boolean
    },
    dialogShow: {
      default: false,
      type: Boolean
    },
    lang: String
  },
  emit: ['cancel', 'return'],
  setup(props, { emit }) {
    const useLang = ref()

    watchEffect(() => {
      useLang.value = props.lang
    })

    const dialog = ref(null)

    onMounted(() => {
      const closeAlert = () => {
        dialog.value.close()
      }

      watchEffect(() => {
        if (props.dialogShow) {
          dialog.value.removeEventListener('animationend', closeAlert)
          dialog.value.showModal()
        } else {
          dialog.value.addEventListener('animationend', closeAlert)
        }
      })
    })

    const emits = (emitsName) => {
      emit(emitsName)
    }

    return {
      dialog,
      emits,
      i18n,
      useLang
    }
  },
  template: `
    <dialog :class="'alert ' + (dialogShow ? '' : 'hide')" ref="dialog">
      <div class="title">
        {{ title }}
      </div>
      <div class="body" :style="{alignItems: title === i18n(useLang).alert.hint ? 'center' : ''}">
        <span v-for="(item, index) in body" :key="index">{{ item }}</span>
      </div>
      <div class="buttons">
        <div class="cancel" v-if="cancelButtonShow" @click="emits('cancel')">{{ i18n(useLang).alert.cancel }}</div>
        <div class="return" :style="{width: cancelButtonShow ? '' : '100%'}" @click="emits('return')">
          {{ i18n(useLang).alert.return }}
        </div>
      </div>
    </dialog>
  `
}