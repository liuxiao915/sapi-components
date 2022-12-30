/**
* @Description: 
* @Author: liux
* @Date: 2022-12-30 11:28:25
* @LastEditTime: 2022-12-30 11:28:25
*/

// 加载svg
const req = require.context('@/assets/icons', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)

// 批量注册组件
// export default (Vue) => {}
export default {
  install (Vue) {
    // 获取components目录下的.vue文件
    const requireComponent = require.context('.', true, /(\.vue)$/)
    requireComponent.keys().forEach((fileName) => {
      // fileName：components里所有的.vue文件
      const config = requireComponent(fileName)
      // 获取到的文件名替换掉不需要的字符==>容易出现多个index
      // const componentName = fileName.replace('./', '').replace('.vue', '');
      // 接收到的实例进行全局组件的挂载
      Vue.component(config.default.name, config.default || config)
    })
  }
}
