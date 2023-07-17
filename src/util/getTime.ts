import moment from 'moment'
import { useLocaleTimeAgo } from './useLocaleTimeAgo'

function getTime(time: number): string {
  const nowTime = moment().format('YYYY-MM-DD')
  const useTime = moment(time).format('YYYY-MM-DD')

  const selectedDate = new Date(time)
  const halfYearAgo = new Date()
  halfYearAgo.setMonth(halfYearAgo.getMonth() - 6)

  if (nowTime === useTime)
    return moment(time).format('hh:mm A')
  else if (selectedDate > halfYearAgo)
    return useLocaleTimeAgo(new Date(time)).value
  else
    return moment(time).format('YYYY-MM-DD hh:mm A')
}

export default getTime
