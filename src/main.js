import '@/assets/styles/main.less'
// markdown样式
import 'github-markdown-css/github-markdown-light.css'
import '@/assets/sapi-fonts/iconfont.css';
import '@/assets/sapi-fonts/iconfont.js';
//导入路由配置
import router from './router'
import components from "@/components/index";
import { utils } from '@/utils/index'
import app from '@/hooks/index'
app.config.globalProperties.$utils = utils
app.use(components).use(router).mount('#app')