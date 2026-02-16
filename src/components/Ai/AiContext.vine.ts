import type { IChatItem } from './ChatItem.interface'
import { Ollama } from 'ollama/dist/browser'
import OpenAI from 'openai'
import { ref } from 'vue'
import { useCateStore } from '../../store/cateStore'
import { useTodoStore } from '../../store/todoStore'
import Beta from '../Beta/Beta.vine'
import ChatList from './ChatList/ChatList.vine'
import { system } from './systemMsg'
import { useI18n } from 'vue-i18n'

function AiContext() {
  const { t } = useI18n()

  const useAI = ref(localStorage.getItem('useAI') === 'true')

  const useProvider = ref(localStorage.getItem('modelProvider') || '')

  const showBtn = vineProp.withDefault(true)

  const maxChat = vineProp.optional<boolean>()

  const emits = vineEmits<{
    close: []
    openSetting: []
    setMaxChat: [boolean]
  }>()

  function closeChat() {
    emits('close')
    list.value = []
  }

  const todoStore = useTodoStore()
  const cateStore = useCateStore()

  const list = ref<IChatItem[]>([])
  const pushList = ref<OpenAI.Chat.Completions.ChatCompletionMessageParam[]>([
    { role: 'system', content: system(JSON.stringify(todoStore.todoList), JSON.stringify(cateStore.cateList)) },
  ])

  const msg = ref('')
  async function chat() {
    list.value.push({
      isMe: true,
      msg: msg.value,
    })
    pushList.value.push({
      role: 'user',
      content: msg.value,
    })

    msg.value = ''

    const useMsg = ref('')

    if (useProvider.value === 'deepseek') {
      const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: localStorage.getItem('deepseekKey') || '',
        dangerouslyAllowBrowser: true,
      })

      const completion = await openai.chat.completions.create({
        messages: pushList.value,
        model: localStorage.getItem('deepseekModel') || 'deepseek-chat',
        stream: true,
      })

      list.value.push({ isMe: false, msg: '' })
      pushList.value.push({ role: 'assistant', content: '' })

      for await (const chunk of completion) {
        useMsg.value += chunk.choices[0].delta.content
        list.value[list.value.length - 1].msg = useMsg.value
        pushList.value[pushList.value.length - 1].content = useMsg.value
      }
    }

    if (useProvider.value === 'ollama') {
      const ollama = new Ollama({
        host: localStorage.getItem('ollamaApi') || 'http://localhost:11434',
      })

      const completion = await ollama.chat({
        messages: pushList.value,
        model: localStorage.getItem('ollamaModel') || '',
        stream: true,
      })

      list.value.push({ isMe: false, msg: '' })
      pushList.value.push({ role: 'assistant', content: '' })

      for await (const chunk of completion) {
        useMsg.value += chunk.message.content
        list.value[list.value.length - 1].msg = useMsg.value
        pushList.value[pushList.value.length - 1].content = useMsg.value
      }
    }
  }

  vineStyle.scoped(scss`
    $aibg: conic-gradient(
      from 225deg,
      #5fb3ff,
      #ffb347,
      #ff4d6d,
      #a855f7,
      #5fb3ff
    );
    
    .iconbg {
      background: $aibg;
    }
  `)
    
    return vine`
      <div w-full h-full flex="~ col gap-2" relative>
        <div v-if="showBtn" flex="~ gap-1.5" items-center absolute top-1 right-13px>
          <div
            p-2
            flex
            items-center
            justify-center
            rounded-full
            z-1
            bg="black/20 active:black/30"
            @click.stop="emits('openSetting')"
          >
            <div i-f7:gear c="dark:white #333" block />
          </div>
          <div
            p-2
            flex
            items-center
            justify-center
            rounded-full
            z-1
            bg="black/20 active:black/30"
            @click.stop="emits('setMaxChat', !maxChat)"
          >
            <div i-ph:app-window-bold c="dark:white #333" block />
          </div>
          <div
            p-2
            flex
            items-center
            justify-center
            rounded-full
            z-1
            bg="black/20 active:black/30"
            @click.stop="closeChat"
          >
            <div i-ph:caret-down-bold c="dark:white #333" block />
          </div>
        </div>
        <div w="[calc(100%-26px)]" h-36px flex items-center ml-13px>
          <div i-ph:star-four-bold text-5 mr-1.5 c="primary-d dark:primary-a" class="iconbg" />
          <span c="dark:white">uyou ToDo AI</span>
          <Beta :useAiBg="true" ml-1 />
        </div>
        <ChatList :list="list" />
        <div v-if="useAI" flex="~ row gap-2" broder-t-black mx-13px>
          <input
            type="text"
            flex-1
            p-2
            rounded-8px
            border-none
            outline-none
            bg="black/5"
            shadow="inner sm black/20"
            @keydown.enter="chat"
            c="dark:white"
            v-model="msg"
          />
          <button
            rounded-8px
            border-none
            outline-none
            p-3
            bg="primary-d active:primary-a"
            shadow="md primary-d/70 dark:primary-a/70"
            @click.stop="chat"
          >
            <div i-ph:paper-plane-tilt-bold text-4 c="white dark:black" />
          </button>
        </div>
        <button
          v-else
          @click.stop="emits('openSetting')"
          p-2
          rounded-8px
          border-none
          outline-none
          bg="primary-d active:primary-a"
          c-white
          mx-13px
        >
          {{ t('ai.setai') }}
        </button>
      </div>
    `
}

export default AiContext