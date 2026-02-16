import { ref } from 'vue'
import AiContext from './AiContext.vine';
import { useRouter } from 'vue-router';

function NoteAi() {
  const router = useRouter()

  const showChat = ref(false)
  const maxChat = ref(false)

  function closeChat() {
    showChat.value = false
  }

  function openSetting() {
    router.push('/ai?from=setting')
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
  `)

  return vine`
    <div
      flex
      items-center
      justify-center
      :p="showChat ? 'y-13px' : '13px'"
      overflow-hidden
      :bg="showChat ? '!white !dark:#333' : 'primary-d active:primary-a'"
      transition="duration-300 all"
      :rounded="showChat ? '10px' : '10px hover:30px'"
      :shadow="showChat ? 'lg' : 'md hover:lg primary-d/70 dark:primary-a/70'"
      :transform="showChat ? '' : 'active:scale-90 hover:scale-120'"
      :w="showChat ? (maxChat ? '[calc(100vw-30px)]' : '350px') : '22px'"
      :h="showChat ? (maxChat ? '[calc(100vh-100px)]' : '500px') : '22px'"
      :class="showChat ? '' : 'aibg'"
      @click="showChat = true"
    >
      <div v-if="!showChat" class="i-ph:star-four-bold text-22px !c-white"/>
      <AiContext v-else @close="closeChat" @setMaxChat="maxChat = $event" :maxChat="maxChat" />
    </div>
  `
}

export default NoteAi;

