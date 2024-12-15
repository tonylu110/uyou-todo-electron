import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'
import { presetMine } from './src/styles/presetsMine'

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
        include: [
          'src/**/*.{vue,html,jsx,tsx,vine.ts}',
          'electronWindows/**/*.{vue,html,jsx,tsx,vine.ts}',
        ],
        exclude: ['node_modules', '.git'],
      },
    }),
    presetMine,
  ],
  content: {
    pipeline: {
      include: [
        'src/**/*.vine.ts',
        'electronWindows/**/*.vine.ts',
        'src/**/*.vue',
        'electronWindows/**/*.vue',
        'src/**/*.tsx',
        'electronWindows/**/*.tsx',
      ],
    },
  },
  transformers: [
    transformerDirectives({
      applyVariable: ['--at-apply', '--uno-apply', '--uno'],
    }),
    transformerAttributifyJsx(),
  ],
})
