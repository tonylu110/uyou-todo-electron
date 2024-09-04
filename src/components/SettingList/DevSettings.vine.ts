import { onBeforeUnmount, ref } from "vue"
import isDev from "../../util/mode"
import emitter from "../../util/bus"
import ItemBox from "../ItemBox/ItemBox.vue"
import Item from "../ItemBox/Item/Item.vue"

function DevSettings() {
  function openUrl(url: string) {
    window.open(url)
  }

  const routerUrlState = ref((localStorage.getItem('routerUrl') === 'true' || !localStorage.getItem('routerUrl')) && isDev)

  function showRouterUrl() {
    routerUrlState.value = !routerUrlState.value
    emitter.emit('routerShow', routerUrlState.value)
    localStorage.setItem('routerShow', `${routerUrlState.value}`)
  }

  emitter.on('routerShow', (data: unknown) => {
    routerUrlState.value = (data as boolean)
  })

  onBeforeUnmount(() => {
    emitter.off('routerShow')
  })

  return vine`
    <ItemBox v-if="isDev">
      <Item
        title="UnoCss dev"
        @item-fun="openUrl('http://localhost:3000/__unocss')"
      />
      <Item
        title="Show router url"
        :show-switch="true"
        :switch-state="routerUrlState"
        @switch-fun="showRouterUrl"
      />
    </ItemBox>
  `
}

export default DevSettings