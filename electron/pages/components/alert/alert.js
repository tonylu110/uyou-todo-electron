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
    }
  },
  emit: ['cancel', 'return'],
  setup(props, { emit }) {
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
      emits
    }
  },
  template: `
    <dialog :class="'alert ' + (dialogShow ? '' : 'hide')" ref="dialog">
      <div class="title">
        {{ title }}
      </div>
      <div class="body" :style="{alignItems: title === '提示' ? 'center' : ''}">
        <span v-for="(item, index) in body" :key="index">{{ item }}</span>
      </div>
      <div class="buttons">
        <div class="cancel" v-if="cancelButtonShow" @click="emits('cancel')">取消</div>
        <div class="return" :style="{width: cancelButtonShow ? '' : '100%'}" @click="emits('return')">
          确定
        </div>
      </div>
    </dialog>
  `
}