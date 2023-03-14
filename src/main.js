import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/main.less'
//导入路由配置
import router from './router'
import components from "@/components/index";
const app = createApp(App)
app.use(components).use(router).mount('#app')