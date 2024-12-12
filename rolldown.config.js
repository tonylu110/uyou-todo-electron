import { defineConfig } from 'rolldown'
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json'
import clear from 'rollup-plugin-clear';

export default defineConfig([
  {
    input: 'electron/main.ts',
    output: {
      dir: 'prebuild_electron',
      format: 'es',
    },
    external: [/node_modules/],
    plugins: [
      typescript({
        tsconfig: './tsconfig.rollup.json',
        exclude: ['src/**/*', 'node_modules/**/*']
      }),
      resolve(),
      json(),
      clear({ targets: ['prebuild_electron'] })
    ]
  },
  {
    input: 'electron/mac/mainMac.ts',
    output: {
      dir: 'prebuild_electron/mac',
      format: 'es'
    },
    external: [/node_modules/],
    plugins: [
      typescript({
        tsconfig: './tsconfig.rollup.json',
        exclude: ['src/**/*', 'node_modules/**/*']
      }),
      resolve(),
      json(),
    ]
  },
  {
    input: 'electron/preload.ts',
    output: {
      dir: 'prebuild_electron',
      format: 'es',
    },
  }
])