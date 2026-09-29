import { defineConfig, type UserConfigExport } from '@tarojs/cli'

export default defineConfig<'webpack5'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'nongjianzhen-miniapp',
    date: '2026-9-28',
    designWidth: 750,
    deviceRatio: {
      640: 2.34,
      750: 1,
      828: 1.81
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-framework-react'],
    defineConstants: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env.TARO_APP_API_MODE': JSON.stringify(process.env.TARO_APP_API_MODE || ''),
      'process.env.TARO_APP_API_BASE_URL': JSON.stringify(process.env.TARO_APP_API_BASE_URL || ''),
      'process.env.TARO_APP_SUBSCRIBE_TEMPLATE_IDS': JSON.stringify(process.env.TARO_APP_SUBSCRIBE_TEMPLATE_IDS || '')
    },
    copy: { patterns: [], options: {} },
    framework: 'react',
    compiler: 'webpack5',
    cache: { enable: true },
    mini: {
      compile: {
        // 工作区包直接暴露 TypeScript 源码，需要纳入 Taro 的 Babel 编译范围。
        include: [require('node:path').resolve(__dirname, '..', 'packages')]
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true
      },
      postcss: {
        pxtransform: { enable: true, config: {} },
        cssModules: { enable: false, config: { namingPattern: 'module', generateScopedName: '[name]__[local]___[hash:base64:5]' } }
      },
      webpackChain(chain) {
        chain.resolve.alias.set('@', require('node:path').resolve(__dirname, '..', 'src'))
      }
    }
  }

  if (process.env.NODE_ENV === 'development') {
    return merge({}, baseConfig, { mini: {} })
  }

  return merge({}, baseConfig, { mini: {} })
})
