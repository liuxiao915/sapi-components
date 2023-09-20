// 如下的方法需要渲染一个提示效果
import { createVNode, render } from 'vue'
import sapiMessage from './index.vue'

// 动态创建一个DOM容器
const div = document.createElement('div')
div.setAttribute('class', 'sapi-meassage-container')
document.body.appendChild(div)
export default ({ message, type, style, time = 2000 }) => {
  let timer = null
  // createVNode 用于创建一个虚拟节点
  // 参数一支持组件
  // 参数二表示传递给组件的选项
  const vnode = createVNode(sapiMessage, { message, type, style, time })
  // 把虚拟的节点渲染到页面的DOM中即可
  // render函数的参数
  // 参数一：表示需要渲染的内容（虚拟节点）
  // 参数二：表示渲染的目标位置（DOM元素）
  render(vnode, div)
  // 希望提示信息显示1秒后消失
  clearTimeout(timer)
  timer = setTimeout(() => {
    // 清空div中的内容
    render(null, div)
  }, time)
}
// $message({ message: '登录失败', type: 'error'})