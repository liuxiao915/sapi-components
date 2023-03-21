<template>
  <div>
    <span class="icon iconfont">&#xe689;</span>
    <div class="name">关闭</div>
    <div class="code-name">&amp;#xe689;</div>
  </div>
</template>
<script>
import { $showLoading, $hiddenLoading } from "@/components/sapi-loading/index";
import { onMounted, getCurrentInstance } from 'vue'
import Message from '@/components/sapi-message/index.js'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    // $showLoading();
    // setTimeout(() => {
    //   // 卸载loading组件
    //   $hiddenLoading();
    // }, 3000);
    onMounted(() => {
      console.log('onMounted')
      // Message({ type: 'error', text: '登录失败' })
      proxy.$message({ type: 'success', text: '登录成功' })
    })
    return {}
  }
}
</script>
<style lang="less" scoped>

</style>