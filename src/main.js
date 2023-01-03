import { createApp } from 'vue'
import App from './App.vue'
import components from "/packages/index";
createApp(App).use(components).mount('#app')
