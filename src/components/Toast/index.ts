import { createVNode, render } from "vue"
import Toast, { IProps } from "./Toast"

export const createToast = ({ msg, center }: IProps, node?: Element) => {
  const vm = createVNode(Toast, {msg, center})
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
  }, 1000);

  console.log(node);
}