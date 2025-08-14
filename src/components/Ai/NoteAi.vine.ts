import { ref } from 'vue'
import ChatList from './ChatList/ChatList.vine'
import { IChatItem } from './ChatItem.interface';
import { useRouter } from 'vue-router';
import OpenAI from "openai";
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';
import { system } from './systemMsg';
import { Ollama } from 'ollama/browser'
import { url } from 'inspector';

function NoteAi() {
  const router = useRouter()

  const useAI = ref(localStorage.getItem('useAI') === 'true')

  const useProvider = ref(localStorage.getItem('modelProvider') || '')

  const showChat = ref(false)
  function closeChat() {
    showChat.value = false
    list.value = []
  }

  const list = ref<IChatItem[]>([])
  const pushList = ref<ChatCompletionCreateParamsBase.messages>([
    { role: "system", content: system }
  ])

  const msg = ref('')
  async function chat() {
    list.value.push({
      isMe: true,
      msg: msg.value
    })
    pushList.value.push({
      role: 'user',
      content: msg.value
    })

    msg.value = ''

    const useMsg = ref('')

    if (useProvider.value === 'deepseek') {
      const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: localStorage.getItem('deepseekKey') || '',
        dangerouslyAllowBrowser: true
      });

      const completion = await openai.chat.completions.create({
        messages: pushList.value,
        model: localStorage.getItem('deepseekModel') || 'deepseek-chat',
        stream: true
      });

      list.value.push({isMe: false, msg: ''});
      pushList.value.push({role: 'assistant', content: ''})

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
        model: localStorage.getItem('ollamaModel') || 'deepseek-r1:1.5b',
        stream: true
      });

      list.value.push({isMe: false, msg: ''});
      pushList.value.push({role: 'assistant', content: ''})

      for await (const chunk of completion) {
        useMsg.value += chunk.message.content
        list.value[list.value.length - 1].msg = useMsg.value
        pushList.value[pushList.value.length - 1].content = useMsg.value
      }
    }
  }

  return vine`
    <div
      flex
      items-center
      justify-center
      p-13px
      overflow-hidden
      :bg="showChat ? 'white dark:#333' : 'primary-d active:primary-a'"
      transition="duration-300 all"
      :rounded="showChat ? '10px' : '10px hover:30px'"
      :shadow="showChat ? 'lg' : 'md hover:lg primary-d/70 dark:primary-a/70'"
      :transform="showChat ? '' : 'active:scale-90 hover:scale-120'"
      :w="showChat ? '300px' : '22px'"
      :h="showChat ? '500px' : '22px'"
      @click="showChat = true"
    >
      <div v-if="!showChat" class="i-ph:chat-circle-dots-bold text-22px c-white" />
      <div v-else w-full h-full flex="~ col gap-2" relative>
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
          <div i-mdi:close-thick c="dark:white #333" block />
        </div>
        <div w-full h-36px flex items-center>
          uyou ToDo AI chat
        </div>
        <ChatList :list="list" />
        <div v-if="useAI" flex="~ row gap-2">
          <input type="text" flex-1 p-2 rounded-8px border-none outline-none bg="black/10" v-model="msg">
          <button rounded-8px border-none outline-none p-2 bg="primary-d active:primary-a" @click.stop="chat">
            <div i-mdi:send-variant-outline text-6 c="white dark:black" />
          </button>
        </div>
        <button v-else @click.stop="router.push('/ai?from=setting')" p-2 rounded-8px border-none outline-none bg="primary-d active:primary-a" c-white>
          set AI
        </button>
      </div>
    </div>
  `
}

export default NoteAi
