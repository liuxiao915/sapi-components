<template>
  <div>点击加载showLoading</div>
</template>
<script>
import { showLoading, hiddenLoading } from '/packages/sapi-loading/index.js';
export default {
  setup() {
    // 在需要使用时调用show方法
    // 例如在指定api调用，或者其他耗时操作时打开loading
    // 不传参默认为 加载中...
    showLoading('登录中...');
    setTimeout(() => {
      hiddenLoading();
    },2000)
    return {}
  }
}
</script>
<style lang="less" scoped>

</style>