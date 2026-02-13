import type { IChatItem } from '../ChatItem.interface'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import ChatItem from '../ChatItem/ChatItem.vine'

function ChatList() {
  const list = vineProp<IChatItem[]>()

  vineStyle.scoped(scss`
    .list {
      padding-inline-start: 1rem !important;
    }
  `)

  return vine`
    <PerfectScrollbar class="list" w='[calc(100%-26px)]' px-13px flex-1 justify-center overflow-x-auto pt-2 padding-inline-start>
      <ChatItem v-for="(chat, index) in list" :isMe="chat.isMe" :msg="chat.msg" :key="index" />
    </PerfectScrollbar>
  `
}

export default ChatList
