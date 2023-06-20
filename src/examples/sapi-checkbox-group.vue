<!--
 @Description: 
 @Author: liux
 @Date: 2023-06-14 14:59:39
 @LastEditTime: 2023-06-14 14:59:39
-->
<template>
  <div>
    <sapi-check-box-group v-model="hobby">
      <sapi-check-box label="抽烟"></sapi-check-box>
      <sapi-check-box label="喝酒"></sapi-check-box>
      <sapi-check-box label="烫头"></sapi-check-box>
    </sapi-check-box-group>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>

</style>