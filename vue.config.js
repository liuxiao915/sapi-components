const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const docsLoader = require.resolve('./src/utils/docs-loader.js')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false, /*关闭语法检查*/
  pages: {
    index: {
      entry: "src/main.js",
      template: 'public/index.html',
      filename: 'index.html'
    },
    // css: {
    //   extract: false // 打包时是否要生成单独的样式文件,
    //   // true 则项目打包后会生成单独的css文件，在引入的时候就必须同时引入这个css文件才可以
    //   // false 强制使用内联样式，这样打包出去的插件样式会内置在js中，不需要单独引入
    // }
  },
  devServer: {
    port: 8080,
    open: true,
    host: "localhost",
    historyApiFallback: true, //webpack5.0 开启热更新
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  
  configureWebpack: (config) => {
    const plugins = [
      new NodePolyfillPlugin(),
    ]
    return {
      module: { 
        rules: [
          {
            resourceQuery: /blockType=docs/,
            loader: docsLoader
          }
        ],
        unknownContextCritical: false // 配置加载的模块类型，cesium时必须配置
       },
      plugins: plugins
    }
  },
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true)
    // 配置别名
    config.resolve.alias.set('@', resolve('src'))
    // 设置svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    config.module.rule('less').oneOfs.store.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: (() => './src/assets/styles/STATIC_URL_LOCAL.less')()
        })
        .end()
      config.module
        .rule('md')
        .test(/\.md/)
        .use('vue-loader')
        .loader('vue-loader')
        .end()
        .use('vue-markdown-loader')
        .loader('vue-markdown-loader/lib/markdown-compiler')
        .options({
          raw: true
        })
        .end()
    })
    config.optimization
      .minimizer('terser')
      .tap((args) => {
        Object.assign(args[0].terserOptions.compress, {
          // 生产模式 console.log 去除
          pure_funcs: ['console.log']
        })
        return args
      })
      .end()
    config.output.chunkFilename('./js/[name].[chunkhash:16].js')
  }
})
