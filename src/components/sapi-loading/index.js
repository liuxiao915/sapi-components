import { createApp } from "vue";
import Loading from "./index.vue";
let instance = null, unmount = null;
function mountComponent(RootComponent) {
    const app = createApp(RootComponent);
    const root = document.createElement('div');
    document.body.appendChild(root);
    return {
        instance: app.mount(root),
        unmount() {
          document.body.removeChild(root);
        },
    };
}
// 创建一个loading组件
export function $showLoading() {
    ({ instance, unmount } = mountComponent(Loading));
    console.log(instance);
}
// 销毁loading组件
export function $hiddenLoading() {
    instance && unmount();
}