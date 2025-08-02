import { onBeforeUnmount, ref } from 'vue'
import { useModeStore } from '../../store/modeStore'
import emitter from '../../util/bus'
import Item from '../ItemBox/Item/Item.vue'
import ItemBox from '../ItemBox/ItemBox.vue'

function DevSettings() {
  const modeStore = useModeStore()

  function openUrl(url: string) {
    window.open(url)
  }

  const routerUrlState = ref((localStorage.getItem('routerUrl') === 'true' || !localStorage.getItem('routerUrl')) && modeStore.isDev)

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
    <ItemBox v-if="modeStore.isDev">
      <Item title="UnoCss dev" @item-fun="openUrl('http://localhost:3000/__unocss')" />
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
