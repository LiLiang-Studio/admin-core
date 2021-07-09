import buble from '@rollup/plugin-buble'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import del from 'del'
import { version } from './package.json'

const pkgName = 'admin-core'
const minPkgName = pkgName + '.min'
const elPkgName = 'admin-core.element'
const minElPkgName = elPkgName + '.min'
const getBanner = pkgName =>
  '/*!\n' +
  ` * ${pkgName}.js v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} LiLiang\n` +
  ' * Released under the MIT License.\n' +
  ' */'

del.sync('dist/*')

export default [
  {
    input: './src/index.js',
    plugins: [
      resolve(),
      json(),
      buble({ objectAssign: true }),
      terser({ include: [/^.+\.min\.js$/] })
    ],
    output: [
      {
        banner: getBanner(minPkgName),
        format: 'umd',
        name: 'adminCore',
        file: `dist/${pkgName}.min.js`,
        exports: 'named',
        globals: {
          vue: 'vue'
        }
      },
      {
        banner: getBanner(pkgName),
        format: 'es',
        file: `dist/${pkgName}.js`
      }
    ],
    external: ['vue']
  },
  {
    input: './src/ui/element/index.js',
    plugins: [
      json(),
      vue({ css: false }),
      postcss({
        minimize: true,
        // extract: 'dist/ui/element.css'
      }),
      buble({ objectAssign: true }),
      terser({ include: [/^.+\.min\.js$/] })
    ],
    output: [
      {
        banner: getBanner(minElPkgName),
        format: 'umd',
        name: 'adminCoreUI',
        file: 'dist/ui/element.min.js',
        exports: 'named',
        globals: {
          vue: 'vue'
        }
      },
      {
        banner: getBanner(elPkgName),
        format: 'es',
        file: 'dist/ui/element.js'
      }
    ],
    external: ['vue']
  }
]
