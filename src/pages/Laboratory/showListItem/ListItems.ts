export default interface ListItems {
  today: item
  star: item
  allDo: item
  allNotDo: item
}

interface item {
  name: string
  show: boolean
}
