<docs>
  <h2>镂空按钮</h2>
  <p>镂空按钮将按钮的内容反色，背景变为透明，一般是底色透明。常用于有色背景上，例如 banner 图等。</p>
</docs>
<template>
  <div class="wrapper">
    <sapi-button ghost variant="outline">镂空按钮</sapi-button>
    <sapi-button ghost variant="dashed">镂空按钮</sapi-button>
    <sapi-button ghost variant="text">镂空按钮</sapi-button>
  </div>
  <div class="wrapper">
    <sapi-button ghost theme="primary" variant="outline">镂空按钮</sapi-button>
    <sapi-button ghost theme="primary" variant="dashed">镂空按钮</sapi-button>
    <sapi-button ghost theme="primary" variant="text">镂空按钮</sapi-button>
  </div>
  <div class="wrapper">
    <sapi-button ghost theme="success" variant="outline">镂空按钮</sapi-button>
    <sapi-button ghost theme="success" variant="dashed">镂空按钮</sapi-button>
    <sapi-button ghost theme="success" variant="text">镂空按钮</sapi-button>
  </div>
  <div class="wrapper">
    <sapi-button ghost theme="warning" variant="outline">镂空按钮</sapi-button>
    <sapi-button ghost theme="warning" variant="dashed">镂空按钮</sapi-button>
    <sapi-button ghost theme="warning" variant="text">镂空按钮</sapi-button>
  </div>
  <div class="wrapper">
    <sapi-button ghost theme="danger" variant="outline">镂空按钮</sapi-button>
    <sapi-button ghost theme="danger" variant="dashed">镂空按钮</sapi-button>
    <sapi-button ghost theme="danger" variant="text">镂空按钮</sapi-button>
  </div>
</template>
<script>
export default {
  name: 'Ghost',
  setup() {
    return {}
  }
}
</script>
<style scoped lang="less">
  @import '../index.less';
</style>
