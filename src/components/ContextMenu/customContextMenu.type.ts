interface customContextMenu {
  label?: string
  event?: string
  icon?: string
  color?: string
  children?: Array<{
    label?: string
    event?: () => void
    icon?: string
    color?: string
  }>
}

export default customContextMenu
