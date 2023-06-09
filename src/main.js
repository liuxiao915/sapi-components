import app from '@/hooks/index'
//导入路由配置
import router from './router'
import '@/hooks/polyfill.js' // 去除touch事件谷歌提示
import components from "@/components/index";
import { utils } from '@/utils/index'
// 全局样式
import '@/assets/styles/main.less'
// markdown样式
import 'github-markdown-css/github-markdown-light.css'
// 字体样式
import '@/assets/sapi-fonts/iconfont.css';
import '@/assets/sapi-fonts/iconfont.js';

import Message from '@/components/sapi-message/index.js'
import { showLoading, hiddenLoading } from '@/components/sapi-loading/index.js';

app.config.globalProperties.$utils = utils
app.config.globalProperties.$message = Message
app.config.globalProperties.$showLoading = showLoading
app.config.globalProperties.$hiddenLoading = hiddenLoading

app.use(components).use(router).mount('#app')