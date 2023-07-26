import moment from 'moment'
import { useI18n } from 'vue-i18n'
import { useLocaleTimeAgo } from './useLocaleTimeAgo'

function getTime(time: number): string {
  const { t } = useI18n()

  const nowTime = moment().format('YYYY-MM-DD')
  const useTime = moment(time).format('YYYY-MM-DD')

  const selectedDate = new Date(time)
  const halfYearAgo = new Date()
  halfYearAgo.setMonth(halfYearAgo.getMonth() - 6)

  if (nowTime === useTime)
    return t('today') + moment(time).format('hh:mm A')
  else if (selectedDate > halfYearAgo)
    return useLocaleTimeAgo(new Date(time)).value
  else
    return moment(time).format('YYYY-MM-DD hh:mm A')
}

export default getTime
