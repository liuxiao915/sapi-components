import app from '@/hooks/index'
//导入路由配置
import router from './router'
import '@/hooks/polyfill.js' // 去除touch事件谷歌提示
import components from "../packages/index";
import { utils } from '@/utils/index'
import directives from '@/directives/index'
// 全局样式
import '@/assets/styles/main.less'
// markdown样式
import 'github-markdown-css/github-markdown-light.css'
// 字体样式
import '@/assets/sapi-fonts/iconfont.css';
import '@/assets/sapi-fonts/iconfont.js';

import Message from '/packages/sapi-message/index.js'
import { showLoading, hiddenLoading } from '/packages/sapi-loading/index.js';

app.config.globalProperties.$utils = utils
app.config.globalProperties.$message = Message
app.config.globalProperties.$showLoading = showLoading
app.config.globalProperties.$hiddenLoading = hiddenLoading
app.config.errorHandler = (err, vm, info) => {
  console.log('异常:::', err, vm , info)
}
app.use(directives).use(components).use(router).mount('#app')