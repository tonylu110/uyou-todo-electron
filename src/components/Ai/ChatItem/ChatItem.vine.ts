function ChatItem() {
  const isMe = vineProp.optional<boolean>()
  const msg = vineProp.withDefault('msg')

  return vine`
    <div w-full flex :justify="isMe ? 'end' : 'start'" mb-2>
      <div v-if="isMe" bg-primary-d p-2 c-white rounded-8px rounded-tr-4px w-auto>{{ msg }}</div>
      <div v-else bg="black/10" p-2 rounded-8px rounded-tl-4px>{{ msg }}</div>
    </div>
  `
}

export default ChatItem
