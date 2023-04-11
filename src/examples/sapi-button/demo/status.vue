<docs>
  <h2>不同状态的按钮</h2>
  <p>提供加载、禁用两种状态。</p>
</docs>
<template>
  <div class="sapi-demo-block-row">
    <sapi-button disabled>
      填充按钮
    </sapi-button>
    <sapi-button loading>
      加载中
    </sapi-button>
  </div>
</template>
<script>
export default {
  name: 'Status',
  setup() {
    return {}
  }
}
</script>
<style scoped lang="less">
  @import '../index.less';
</style>
