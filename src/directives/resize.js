import {resizeObserver, observe, unobserve} from '@/utils/resizeObserver.js';
// 自定义指令：v-resize 示例：v-resize="fn"

export default {
  name: 'resize',
  mounted(el,binding) {
    console.log('v-resize::::', el,binding)
    resizeObserver(el, binding.value)
    observe(el)
  },//卸载时清楚定时任务
  unmounted(el) {
    unobserve(el)
  }
};