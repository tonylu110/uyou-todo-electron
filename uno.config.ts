import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), 
    presetUno()
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