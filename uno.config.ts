import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'
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
    })
  ],
  transformers: [
    transformerAttributifyJsx()
  ],
  rules: [
    ['no-drag', { '-webkit-app-region': "no-drag" }],
    ['drag', { '-webkit-app-region': "drag" }],
    ['shadow-item', { 'box-shadow': '0 2px 10px #00000030' }],
    [/^justify-content-(.+)$/, ([, name]) => ({'justify-content': name})]
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
        }`
      }
    },
    colors: {
      primary: '#5985eb',
      error: '#e5544b'
    }
  }
})