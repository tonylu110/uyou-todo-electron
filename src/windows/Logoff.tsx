import { defineComponent, reactive } from "vue";
import { useRoute } from "vue-router";
import CloseButton from "../components/CloseButton";
import { isMac } from "../util/os";

export default defineComponent({
  setup() {
    const route = useRoute()

    const formDate = reactive({
      account: route.query.account,
      passwd: ''
    })

    return () => (
      <div
        drag
        flex justify-center items-center
        h-screen w-screen
      >
        <div
          flex="~ col" justify-center items-center
        >
          <div flex items-center>
            <span w-25 flex justify-content-right>Account: </span>
            <input
              no-drag outline-primary-d
              mb-10px p-10px rounded-5px border="2px solid black/10"
              type="text"
              disabled
              v-model={formDate.account}
            />
          </div>
          <div flex items-center>
            <span w-25 flex justify-content-right>password: </span>
            <input
              no-drag outline-primary-d
              mb-10px p-10px rounded-5px border="2px solid black/10"
              type="password"
              v-model={formDate.passwd}
            />
          </div>
          <button
            no-drag cursor-pointer
            bg="primary-d active:primary-a" c-white
            border-none p-10px rounded-5px
          >
            log Off
          </button>
        </div>
        {isMac() ? null : <CloseButton />}
      </div>
    )
  }
})