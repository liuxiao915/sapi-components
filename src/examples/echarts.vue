<template>
  <div>
    <span class="icon iconfont">&#xe689;</span>
    <div class="name">关闭</div>
    <div class="code-name">&amp;#xe689;</div>
  </div>
</template>
<script>
import { $showLoading, $hiddenLoading } from "@/components/sapi-loading/index";
export default {
  setup() {
    $showLoading();
    setTimeout(() => {
      // 卸载loading组件
      $hiddenLoading();
    }, 3000);
    return {}
  }
}
</script>
<style lang="less" scoped>

</style>