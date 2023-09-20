// import ElementPlus from 'element-plus';
import sapiMessage from './index.vue';
import { h, ref, createApp } from "vue";

export function myMsgBox(text, title, options) {
  return new Promise((resolve, reject) => {
    // 保存组件实例
    let messageRef = ref();
    // 创建容器
    const div = document.createElement('div');
    // 将容器插入到body内
    document.body.appendChild(div);
    // 创建节点
    const app = createApp({
      render() {
        // 这里使用了h()函数,等价于
        // <sapiMessage :title="title" :text="text" :options="options" @submit="..." @onClosed="..."></sapiMessage>
        return h(sapiMessage, {
          ref: messageRef,
          // 参数
          title: title,
          text: text,
          // 配置项
          options: options,
          // 事件
          onSubmit: (data) => {
            resolve(data);
          },
          onClosed: () => {
            // 这里将容器给清除掉( 至于是否还存在其他内存泄漏，就不太清楚了 )
            setTimeout(() => {
              div.remove();
            }, 500);
            reject();
          }
        })
      }
    });
    // 由于内部使用了el-dialog所以必须挂载否则解析错误
    // app.use(ElementPlus);
    // 挂载容器，instance就是容器的实例
    let instance = app.mount(div);
    // 打开弹窗
    messageRef.value.showDialog();
  })
}
