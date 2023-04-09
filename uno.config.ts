import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetAttributify(), 
    presetUno()
  ],
  rules: [
    ['no-drag', { '-webkit-app-region': "no-drag" }],
    ['drag', { '-webkit-app-region': "drag" }]
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
    }
  }
})