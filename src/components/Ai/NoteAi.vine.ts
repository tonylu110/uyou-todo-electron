import type { IChatItem } from './ChatItem.interface'
import { Ollama } from 'ollama/dist/browser'
import OpenAI from 'openai'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCateStore } from '../../store/cateStore'
import { useTodoStore } from '../../store/todoStore'
import Beta from '../Beta/Beta.vine'
import ChatList from './ChatList/ChatList.vine'
import { system } from './systemMsg'

function NoteAi() {
  const router = useRouter()

  const useAI = ref(localStorage.getItem('useAI') === 'true')

  const useProvider = ref(localStorage.getItem('modelProvider') || '')

  const showChat = ref(false)
  function closeChat() {
    showChat.value = false
    list.value = []
  }

  const maxChat = ref(false)

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
    
    .aibg{
      box-shadow: none;
      &:hover {
        background: $aibg;
        &::before {
          content: '';
          position: absolute;
          inset: 0;
          backdrop-filter: blur(10px);
        }
      }
    }
    
    .iconbg {
      background: $aibg;
    }
  `)

  return vine`
    <div
      flex
      items-center
      justify-center
      p-13px
      overflow-hidden
      :bg="showChat ? '!white !dark:#333' : 'primary-d active:primary-a'"
      transition="duration-300 all"
      :rounded="showChat ? '10px' : '10px hover:30px'"
      :shadow="showChat ? 'lg' : 'md hover:lg primary-d/70 dark:primary-a/70'"
      :transform="showChat ? '' : 'active:scale-90 hover:scale-120'"
      :w="showChat ? (maxChat ? '[calc(100vw-56px)]' : '300px') : '22px'"
      :h="showChat ? (maxChat ? '[calc(100vh-100px)]' : '500px') : '22px'"
      :class="showChat ? '' : 'aibg'"
      @click="showChat = true"
    >
      <div v-if="!showChat" class="i-ph:star-four-bold text-22px c-white" />
      <div v-else w-full h-full flex="~ col gap-2" relative>
        <div
          absolute
          top-1
          right-21
          p-2
          flex
          items-center
          justify-center
          rounded-full
          z-1
          bg="black/20 active:black/30"
          @click.stop="router.push('/ai?from=setting')"
        >
          <div i-f7:gear c="dark:white #333" block />
        </div>
        <div
          absolute
          top-1
          right-11
          p-2
          flex
          items-center
          justify-center
          rounded-full
          z-1
          bg="black/20 active:black/30"
          @click.stop="maxChat = !maxChat"
        >
          <div i-ph:app-window-bold c="dark:white #333" block />
        </div>
        <div
          absolute
          top-1
          right-1
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
        <div w-full h-36px flex items-center>
          <div i-ph:star-four-bold text-5 mr-1.5 c="primary-d dark:primary-a" class="iconbg" />
          <span>uyou ToDo AI</span>
          <Beta ml-1 />
        </div>
        <ChatList :list="list" />
        <div v-if="useAI" flex="~ row gap-2" broder-t-black>
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
            v-model="msg"
          />
          <button
            rounded-8px
            border-none
            outline-none
            p-2
            bg="primary-d active:primary-a"
            shadow="md primary-d/70 dark:primary-a/70"
            @click.stop="chat"
          >
            <div i-mdi:send-variant-outline text-6 c="white dark:black" />
          </button>
        </div>
        <button
          v-else
          @click.stop="router.push('/ai?from=setting')"
          p-2
          rounded-8px
          border-none
          outline-none
          bg="primary-d active:primary-a"
          c-white
        >
          {{ t('ai.setai') }}
        </button>
      </div>
    </div>
  `
}

export default NoteAi
