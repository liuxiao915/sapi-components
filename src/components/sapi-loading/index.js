import { createApp, reactive } from 'vue'
import myLoad from './index.vue'
const options = reactive({
  show: false,
  label: '加载中...'
})
const $loading = createApp(myLoad, { options }).mount(document.createElement('div'))
export const showLoading = (label) => {
  options.show = true
  options.label = label
  document.body.appendChild($loading.$el)
}
export const hiddenLoading = () => {
  options.show = false
}
