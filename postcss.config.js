
// vant等团队的是根据375px的设计稿去做的，理想视口宽度为375px。
// 但是如果我们的设计稿是750px的，就会有问题
const path = require('path');
module.exports = ({ webpack }) => {
  const designWidth = webpack.resourcePath.includes(path.join('node_modules', 'vant')) ? 375 : 750;
  return {
    plugins: {
      autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
      // 移动端适配
      "postcss-px-to-viewport": {
        unitToConvert: "px", // 要转化的单位
        viewportWidth: designWidth || 750, // UI设计稿的宽度
        unitPrecision: 6, // 转换后的精度，即小数点位数
        propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
        fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
        selectorBlackList: [], // 转换的黑名单，指定不转换为视窗单位的类名，例：["wrap"], 
        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
        replace: true, // 是否转换后直接更换属性值
        exclude: [], // 设置忽略文件，用正则做目录名匹配，例：[/node_modules/],
        landscape: false, // 是否处理横屏情况
        landscapeUnit: 'vw', //横屏时使用的单位
        landscapeWidth: 568  //横屏时使用的视口宽度
      }
    }
  }
};