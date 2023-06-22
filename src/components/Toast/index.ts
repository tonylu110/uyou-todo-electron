import { createVNode, render } from 'vue'
import type { IProps } from './Toast'
import Toast from './Toast'

export function createToast({ msg, center }: IProps, node?: Element) {
  const vm = createVNode(Toast, { msg, center })
  const container = document.createElement('div')
  render(vm, container)

  if (node)
    node.append(container)
  else
    document.body.append(container)

  setTimeout(() => {
    if (node)
      node.removeChild(container)
    else
      document.body.removeChild(container)
  }, 1000)
}
