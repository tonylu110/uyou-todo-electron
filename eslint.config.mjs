import antfu from '@antfu/eslint-config'
import VueVine from '@vue-vine/eslint-config'
import * as VueVineESLintParser from '@vue-vine/eslint-parser'

export default antfu(
  {
    stylistic: {
      indent: 2,
      quotes: 'single',
    },

    typescript: true,
    vue: true,

    jsonc: false,
    yaml: false,

    ignores: [
      '**/fixtures',
      'electronWindows/**/*.vine.ts',
      'src/**/*.vine.ts',
    ],
    unocss: true,
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
  },
  {
    rules: {
      'curly': 'off',
      'prefer-const': 'off',
    },
  },
  {
    files: [
      'electronWindows/**/*.vine.ts',
      'src/**/*.vine.ts',
    ],
    languageOptions: {
      parser: VueVineESLintParser,
    },
    rules: {
      'no-console': 'off',
    },
  },
  ...VueVine(),
)
