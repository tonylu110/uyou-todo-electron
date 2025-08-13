import { ref } from 'vue'
import ChatList from './ChatList/ChatList.vine'

function NoteAi() {
  const showChat = ref(false)

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
          @click.stop="showChat = false"
        >
          <div i-mdi:close-thick c="dark:white #333" block />
        </div>
        <div w-full h-30px flex items-center>
          uyou ToDo AI chat
        </div>
        <ChatList />
        <div flex="~ row gap-2">
          <input type="text" flex-1 p-2 rounded-8px border-none outline-none bg="black/10">
          <button rounded-8px border-none outline-none p-2 bg="primary-d active:primary-a">
            <div i-mdi:send-variant-outline text-6 c="white dark:black" />
          </button>
        </div>
      </div>
    </div>
  `
}

export default NoteAi
