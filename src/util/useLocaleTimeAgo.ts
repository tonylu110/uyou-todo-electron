import type { UseTimeAgoMessages, UseTimeAgoUnitNamesDefault } from '@vueuse/core'
import { useTimeAgo } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

export function useLocaleTimeAgo(date: Date) {
  const { t } = useI18n()

  const I18N_MESSAGES: UseTimeAgoMessages<UseTimeAgoUnitNamesDefault> = {
    justNow: t('timeAgo.just-now'),
    past: n => (n.match(/\d/) ? t('timeAgo.ago', [n]) : n),
    future: n => (n.match(/\d/) ? t('timeAgo.in', [n]) : n),
    month: (n, past) =>
      n === 1
        ? past
          ? t('timeAgo.last-month')
          : t('timeAgo.next-month')
        : `${n} ${t('timeAgo.month', n)}`,
    year: (n, past) =>
      n === 1
        ? past
          ? t('timeAgo.last-year')
          : t('timeAgo.next-year')
        : `${n} ${t('timeAgo.year', n)}`,
    day: (n, past) =>
      n === 1
        ? past
          ? t('timeAgo.yesterday')
          : t('timeAgo.tomorrow')
        : `${n} ${t('timeAgo.day', n)}`,
    week: (n, past) =>
      n === 1
        ? past
          ? t('timeAgo.last-week')
          : t('timeAgo.next-week')
        : `${n} ${t('timeAgo.week', n)}`,
    hour: n => `${n} ${t('timeAgo.hour', n)}`,
    minute: n => `${n} ${t('timeAgo.minute', n)}`,
    second: n => `${n} ${t('timeAgo.second', n)}`,
    invalid: '',
  }

  return useTimeAgo(date, {
    fullDateFormatter: (date: Date) => date.toLocaleDateString(),
    messages: I18N_MESSAGES,
  })
}
