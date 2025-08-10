import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
import { defineConfig, presetAttributify, presetIcons, presetWind3, transformerDirectives } from 'unocss'
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
    presetWind3({
      extract: {
        include: [
          'src/**/*.{vue,html,jsx,tsx,vine.ts}',
          'electron_windows/**/*.{vue,html,jsx,tsx,vine.ts}',
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
        'electron_windows/**/*.vine.ts',
        'src/**/*.vue',
        'electron_windows/**/*.vue',
        'src/**/*.tsx',
        'electron_windows/**/*.tsx',
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
