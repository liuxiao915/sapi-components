import { defineConfig, loadEnv } from "vite";
//defineConfig是一个工具函数，不用 jsdoc 注解也可以获取类型提示
//加载环境变量（loadEnv）,loadEnv接收三个参数，第一个是.env后面的名字，第二个是绝对路径，第三个参数是你环境变量名的前缀，在vite中默认是VITE_。比如loadEnv(‘abc’, process.cwd(), 'ENV');
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue";//提供 Vue 3 单文件组件支持
// import postcssPxToViewport from 'postcss-px-to-viewport'//解决移动端布局
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";

const resolve = (dir) => path.resolve(__dirname, dir);

export default defineConfig(({ command, mode }) => {
  const envParams = loadEnv(mode, __dirname);//__dirname表示当前文件所处目录
  return {
    root: resolve('./src'), //  入口index.html，注意入口js应该与index.html 同一目录下（只能写到目录，不能写到具体文件）
    base: './',
    publicDir: resolve('static'),//静态资源文件夹
    plugins: [
      vue(),
      //页面自动引入vue 插件
      AutoImport({
        imports: ['vue', 'vue-router'], //自动引入vue的ref、toRefs、onmounted等，无需在页面中再次引入
        dts: "src/auto-import.d.ts", // 生成在src路径下名为auto-import.d.ts的声明文件
      }),
      //element plus按需自动引入
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      //element plus按需自动引入
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    css: {
      // postcss: {//内联的 PostCSS 配置 如果提供了该内联配置，Vite 将不会搜索其他 PostCSS 配置源
        // plugins: [
          // new postcssPxToViewport({
          //   unitToConvert: "px", // 要转化的单位
          //   viewportWidth: designWidth || 750, // UI设计稿的宽度, 基于750宽度为100vw
          //   unitPrecision: 6, // 转换后的精度，即小数点位数
          //   propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          //   viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
          //   fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
          //   selectorBlackList: [], // 转换的黑名单，指定不转换为视窗单位的类名，例：["wrap"], 
          //   minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          //   mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
          //   replace: true, // 是否转换后直接更换属性值
          //   exclude: [], // 设置忽略文件，用正则做目录名匹配，例：[/node_modules/],
          //   landscape: false, // 是否处理横屏情况
          //   landscapeUnit: 'vw', //横屏时使用的单位
          //   landscapeWidth: 568  //横屏时使用的视口宽度
          // })
        // ]
      // }
    },
    build: {//打包环境移除console.log，debugger
      minify: 'terser',// 必须开启：使用terserOptions才有效果
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      //打包文件按照类型分文件夹显示
      // rollupOptions: {
      //   input: {
      //     main: path.resolve(__dirname, 'src/index.html'),
      //   },
      //   output: {
      //     chunkFileNames: 'js/[name]-[hash].js',
      //     entryFileNames: 'js/[name]-[hash].js',
      //     assetFileNames: '[ext]/[name]-[hash].[ext]',
      //   }
      // }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "comp": resolve(__dirname, "src/components"),
        // 配置图片要这样引用也可以自定义方法引入静态资源
        "/assets": "./src/assets",
      },
      dedupe: [], // 强制 Vite 始终将列出的依赖项解析为同一副本
      conditions: [], // 解决程序包中 情景导出 时的其他允许条件
      mainFields: [], // 解析包入口点尝试的字段列表
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],// 导入时想要忽略的扩展名列表，例：index.vue简写为index
      preserveSymlinks: false, // 启用此选项会使 Vite 通过原始文件路径确定文件身份
    },
    envPrefix: ["VITE_", "MXL_"], //暴露环境变量配置别名
    // 反向代理
    server: {
      port: 8090, // 端口
      hmr: true,// 热更新
      open: true, // 是否自动在浏览器打开
      strictPort: false,//设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      fs: {
        strict: false, // 支持引用除入口目录的文件
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      //自定义代理规则
      proxy: {
        // 选项写法
        "/api": {
          target: "",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        }
      }
    }
  }
});
