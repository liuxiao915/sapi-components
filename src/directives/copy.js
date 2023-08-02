// import { Message } from 'element-ui'
export default {
  name: 'copy',
  mounted (el, binding) {
    // 给el元素挂上2个自定义属性,$value用于存放要复制的文本 $handler 事件
    el.$value = binding.value
    el.$handler = () => {
      if(!el.$value) return; //如果文本为空不做任何操作
      // 动态创建 textarea 标签
      if (navigator.clipboard && window.isSecureContext) {
        // execCommand已弃用后的替代品
        navigator.clipboard.writeText(el.$value).then(() => {
          console.log('clipboard-复制成功')
          // Message()
        });
      }else {
        const textarea = document.createElement('textarea')
        textarea.readOnly = 'readonly' // 防止 iOS 下自动唤起键盘
        textarea.style.cssText = 'opacity:0;position:absolute;left:-999px'; //将 textarea 移出可视区域
        textarea.value = el.$value
        document.body.appendChild(textarea)
        textarea.select() //让文本全部选中
        const result = document.execCommand('Copy') //执行浏览器复制命令
        if (result) {
          console.log('textarea-复制成功')
          // Message()
        }
        document.body.removeChild(textarea)
      }
    }
    el.addEventListener('click', el.$handler)
  },
  beforeUpdate(el, { value }) {
    el.$value = value //数据变化后重新赋值
  },
  // 指令与元素解绑的时候，移除事件绑定
  unmounted(el) {
    el.removeEventListener('click', el.$handler)
  },
}