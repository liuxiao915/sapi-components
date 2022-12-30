const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
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
  }
})
