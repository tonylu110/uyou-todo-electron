import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

function ChatList() {
  return vine`
    <PerfectScrollbar flex-1 w-full overflow-x-auto>
      <div>ai chat msg</div>
    </PerfectScrollbar>
  `
}

export default ChatList
