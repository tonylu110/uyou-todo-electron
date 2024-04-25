import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'vue' {
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
