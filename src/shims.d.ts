import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}

declare module 'vue' {
  interface HTMLAttributes {
    [key: string]: any
  }
}

export {}
