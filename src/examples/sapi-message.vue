<template>
  <div></div>
</template>
<script>
import { onMounted, getCurrentInstance } from 'vue'
import Message from '/packages/sapi-message/index.js'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    onMounted(() => {
      Message({ type: 'error', message: '失败' })
      setTimeout(() => {
        proxy.$message({ type: 'success', message: '成功成功', style: { top: '200px' }, tiem: 20000 })
      }, 2000);
    })
    return {}
  }
}
</script>
<style lang="less" scoped>

</style>