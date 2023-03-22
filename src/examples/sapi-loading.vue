<template>
  <div @click="showLoading">点击加载showLoading</div>
</template>
<script>
import { $showLoading, $hiddenLoading } from "@/components/sapi-loading/index";
export default {
  setup() {
    const showLoading = () => {
      $showLoading();
      setTimeout(() => {
        // 卸载loading组件
        $hiddenLoading();
      }, 2000);
    }
    return {
      showLoading
    }
  }
}
</script>
<style lang="less" scoped>

</style>