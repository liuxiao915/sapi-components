<template>
  <div></div>
</template>
<script>
import { onMounted, getCurrentInstance } from 'vue'
import Message from '@/components/sapi-message/index.js'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    onMounted(() => {
      Message({ type: 'error', text: '失败' })
      setTimeout(() => {
        proxy.$message({ type: 'success', text: '成功成功' })
      }, 2000);
    })
    return {}
  }
}
</script>
<style lang="less" scoped>

</style>