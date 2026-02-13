import type { IChatItem } from '../ChatItem.interface'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import ChatItem from '../ChatItem/ChatItem.vine'

function ChatList() {
  const list = vineProp<IChatItem[]>()

  return vine`
    <PerfectScrollbar w-full flex-1 justify-center overflow-x-auto pt-2>
      <ChatItem v-for="(chat, index) in list" :isMe="chat.isMe" :msg="chat.msg" :key="index" />
    </PerfectScrollbar>
  `
}

export default ChatList
