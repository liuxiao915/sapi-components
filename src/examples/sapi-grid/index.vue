<!--
 @Description: 
 @Author: liux
 @Date: 2023-05-12 17:53:30
 @LastEditTime: 2023-05-12 17:53:30
-->
<template>
  <div>
    <sapi-grid :width="200">
      <sapi-grid-item v-for="(item, index) in state.data" :key="index" :type="item.type">
        {{ item.label }}
      </sapi-grid-item>
    </sapi-grid>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const state = reactive({
      data: [
        {label: '北京',type: 'large'},
        {label: '上海'},
        {label: '广州'},
        {label: '深圳'},
        {label: '北京'}
      ]
    })
    return {
      state
    }
  }
})
</script>
<style lang="less" scoped>

</style>