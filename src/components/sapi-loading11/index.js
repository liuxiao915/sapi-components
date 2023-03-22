import { createApp } from "vue";
import Loading from "./index.vue";
let instance = null, unmount = null;
const mountComponent = (RootComponent, {show, label}) => {
    const app = createApp(RootComponent, {show, label});
    const root = document.createElement('div');
    document.body.appendChild(root);
    return {
        instance: app.mount(root),
        unmount() {
            show = false
            // document.body.removeChild(root);
        },
    };
}
// 创建一个loading组件
export const $showLoading = ({show = true, label}) => {
    ({ instance, unmount } = mountComponent(Loading, {show, label}));
}
// 销毁loading组件
export const $hiddenLoading = () => {
    instance && unmount();
}