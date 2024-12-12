import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json'
import clear from 'rollup-plugin-clear';

export default [
  {
    input: 'electron/main.ts',
    output: {
      dir: 'prebuild-electron',
      format: 'es',
    },
    external: [/node_modules/],
    plugins: [
      typescript({
        tsconfig: './tsconfig.rollup.json',
        exclude: ['src/**/*', 'node_modules/**/*']
      }),
      resolve(),
      commonjs(),
      json(),
      clear({ targets: ['prebuild-electron'] })
    ]
  },
  {
    input: 'electron/mac/mainMac.ts',
    output: {
      dir: 'prebuild-electron/mac',
      format: 'es'
    },
    external: [/node_modules/],
    plugins: [
      typescript({
        tsconfig: './tsconfig.rollup.json',
        exclude: ['src/**/*', 'node_modules/**/*']
      }),
      resolve(),
      commonjs(),
      json(),
    ]
  },
  {
    input: 'electron/preload.ts',
    output: {
      file: 'prebuild-electron/preload.js',
      format: 'es',
    },
  }
]