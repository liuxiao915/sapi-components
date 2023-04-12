<template>
  <div class="wrapper">
    <spaiEcharts type="pie" :option="state.option" />
    <spaiEcharts type="pie" :option="state.option" />
  </div>
</template>
<script>
import { reactive } from 'vue'
import { pieRightOption } from "./options.js";
export default {
  setup() {
    const seriesData = [
      {name: '学校', value: 100},
      {name: '工厂', value: 100},
    ]
    const state = reactive({
      option: pieRightOption('人', '人口调查', 200, seriesData)
    })
    return {
      state
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  display: grid;
  grid-gap: 30px 80px;
  grid-template-columns: repeat(auto-fill, 400px);
  grid-auto-rows: 200px;
}
</style>