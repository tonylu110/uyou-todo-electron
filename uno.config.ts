import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetAttributify(),
    presetUno({
      extract: {
        include: ['src/**/*.{vue,html,jsx,tsx}'],
        exclude: ['node_modules', '.git'],
      },
    }),
  ],
  transformers: [
    transformerDirectives({
      applyVariable: ['--at-apply', '--uno-apply', '--uno'],
    }),
    transformerAttributifyJsx(),
  ],
  rules: [
    ['no-drag', { '-webkit-app-region': 'no-drag' }],
    ['drag', { '-webkit-app-region': 'drag' }],
    ['shadow-item', { 'box-shadow': '0 2px 10px #00000030' }],
    ['shadow-inner', { 'box-shadow': 'inset 0px 5px 10px -5px #00000030' }],
    ['shadow-switch-in', { 'box-shadow': 'inset 1px 1px 5px #00000030' }],
    ['shadow-switch-out', { 'box-shadow': '1px 1px 3px #00000050' }],
    [/^justify-content-(.+)$/, ([, name]) => ({ 'justify-content': name })],
    [/^col-count-(.+)$/, ([, number]) => ({ 'column-count': number })],
    [/^col-gap-(.+)$/, ([, number]) => ({ 'column-gap': number })],
    [/^col-width-(.+)$/, ([, number]) => ({ 'column-width': number })],
    [/^col-fill-(.+)$/, ([, name]) => ({ 'column-fill': name })],
  ],
  theme: {
    animation: {
      keyframes: {
        toastShow: `{
          0% {
            bottom: calc(-1rem - 20px);
          }
          100% {
            bottom: 50px;
          }
        }`,
      },
    },
    colors: {
      primary: {
        d: '#5985eb',
        a: '#4e6fbb',
      },
      error: {
        d: '#e5544b',
        h: '#c95047',
        a: '#99362f',
      },
      success: {
        d: '#00b600',
        a: '#00a600',
      },
      warn: {
        d: '#fcd901',
        a: '#e6a400',
      },
    },
  },
})
