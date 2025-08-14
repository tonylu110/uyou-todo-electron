import type { IChatItem } from '../ChatItem.interface'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import ChatItem from '../ChatItem/ChatItem.vine'

function ChatList() {
  const list = vineProp<IChatItem[]>()

  return vine`
    <PerfectScrollbar flex-1 w="[calc(100%-8px)]" justify-center overflow-x-auto p-4>
      <ChatItem v-for="(chat, index) in list" :isMe="chat.isMe" :msg="chat.msg" :key="index" />
    </PerfectScrollbar>
  `
}

export default ChatList
