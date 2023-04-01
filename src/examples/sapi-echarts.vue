<template>
  <spaiEcharts type="pie" :option="state.option" />
</template>
<script>
import { reactive } from 'vue'
import { pieOption } from "./options.js";
export default {
  setup() {
    const seriesData = [
      {name: '学校', value: 100},
      {name: '工厂', value: 100},
    ]
    const state = reactive({
      option: pieOption('人', '人口调查', 200, seriesData)
    })
    return {
      state
    }
  }
}
</script>
<style lang="less" scoped>

</style>