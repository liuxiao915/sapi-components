<!--
 @Description: 
 @Author: liux
 @Date: 2023-05-19 17:06:50
 @LastEditTime: 2023-05-19 17:06:50
-->
<template>
  <better-scroll class="wrapper" :data="state.data">
    <ul class="content">
      <li v-for="item in state.data">{{item}}</li>
    </ul>
  </better-scroll>
</template>
<script>
import { defineComponent, reactive, onMounted } from 'vue';
export default defineComponent({
  setup() {
    const state = reactive({
      data: []
    })
    onMounted(() => {
      state.data = ['开始',5,34,87,3,873,32,76,1,5,34,87,3,873,32,76,1,5,34,87,3,873,32,76,1,5,34,87,3,873,32,76,1,5,34,87,3,873,32,76,3,873,32,76,1,5,34,87,3,873,32,76,1,5,34,87,3,873,32,76,1,5,34,87,3,873,32,76,'结束']
    })
    return {state}
  }
})
</script>
<style lang="less" scoped>

</style>