import { createApp, reactive } from 'vue'
import myLoad from './index.vue'
const options = reactive({
  show: false,
  label: '加载中...'
})
let instance = null;
export const showLoading = (label) => {
  options.show = true
  options.label = label
  if(!instance) {
    const app = createApp(myLoad, { options });
    const root = document.createElement('div');
    instance = app.mount(root);
    document.body.appendChild(instance.$el)
  }
}
export const hiddenLoading = () => {
  options.show = false
}
