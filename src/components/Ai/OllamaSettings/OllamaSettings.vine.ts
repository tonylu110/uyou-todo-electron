import { watchTriggerable } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import ItemButton from '../../ItemBox/ItemButton/ItemButton.vue'
import ItemSpace from '../../ItemBox/ItemSpace/ItemSpace.vine'
import ItemText from '../../ItemBox/ItemText/ItemText.vine'
import { createToast } from '../../Toast'
import { useI18n } from 'vue-i18n';

function OllamaSettings() {
  const { t } = useI18n()

  const ollamaApi = ref(localStorage.getItem('ollamaApi') || '')

  const models = ref([])
  const useModel = ref(localStorage.getItem('ollamaModel') || '')

  function setModel() {
    localStorage.setItem('ollamaModel', useModel.value)
    localStorage.setItem('ollamaApi', ollamaApi.value)
    createToast({ msg: 'saved successfully!' })
  }

  watchTriggerable(
    ollamaApi,
    (newValue) => {
      if (newValue !== '') {
        fetch(`${newValue}/api/tags`)
          .then(res => res.json())
          .then((data) => {
            models.value = data.models
          })
      }
    },
    { immediate: true },
  )

  function selectModel(model: string) {
    useModel.value = model
    localStorage.setItem('ollamaModel', model)
    createToast({ msg: 'Model selected successfully!' })
  }

  const simpleMode = ref(localStorage.getItem('simpleMode') === 'true')
  onMounted(() => {
    window.innerWidth < 750
      ? simpleMode.value = true
      : simpleMode.value = false
  })

  window.addEventListener('resize', () => {
    window.innerWidth < 750
      ? simpleMode.value = true
      : simpleMode.value = false
  })

  const isNoteUI = localStorage.getItem('newNoteUI') === 'true'

  vineStyle.scoped(scss`
    .item-box {
      margin-bottom: 10px;
      max-width: 550px;
      border: 1px solid rgba($color: #000000, $alpha: 0.2);
      border-radius: 7px;
    
      .box-radius {
        border-radius: 7px;
        overflow: hidden;
    
        .item {
          position: relative;
          max-width: 550px;
          width: calc(100% - 30px);
          min-height: 30px;
          height: 30px;
          padding: 10px 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #00000015;
    
          &:last-child {
            border: 0;
          }
        }
      }
    }  
  `)

  return vine`
    <ItemText> {{t('ai.ollamaLInk')}}</ItemText>
    <ItemSpace>
      <input
        type="text"
        :placeholder="t('ai.ollamaLInkPlaceholder')"
        class="p-2 border-none bg-black/10 outline-none"
        v-model="ollamaApi"
      />
    </ItemSpace>
    <template v-if="models.length > 0">
      <ItemText> {{t('ai.selectOllamaModel')}} </ItemText>
      <div
        class="item-box"
        :w="
          simpleMode
            ? isNoteUI
              ? '[calc(100vw-108px)]'
              : '[calc(100%-50px)]'
            : '[calc(100vw-450px)]'
        "
        shadow-md
      >
        <div class="box-radius">
          <div
            v-for="(model, index) in models"
            class="group item"
            :style="{ width: simpleMode ? 'calc(100% - 30px)' : '' }"
            bg="white dark:#999/10 active:primary-d dark:active:primary-a"
            :key="index"
            @click="selectModel(model.model)"
          >
            <div flex items-center>
              <span c="#333 dark:#bbb group-active:white">{{ model.model }}</span>
            </div>
            <div v-if="useModel === model.model" i-mdi:check text-24px c="primary-d dark:primary-a" />
          </div>
        </div>
      </div>
    </template>

    <ItemButton mode="primary" @click="setModel">{{t('save')}}</ItemButton>
  `
}

export default OllamaSettings

