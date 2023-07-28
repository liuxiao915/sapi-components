<template>
  <div class="wrapper">
    <!-- <spaiEcharts type="pie" :option="state.option" />
    <spaiEcharts type="pie" :option="state.option" /> -->
    <select v-model="active" size="mini" class="map-selector" placeholder="深圳市" @change="change">
      <option v-for="item in state.areaList" :key="item" :label="item" :value="item" />
    </select>
    <ShenZhenMap id="map" :option="state.mapOption" :cityVal="active" />
  </div>
</template>
<script>
import { ref, reactive } from 'vue'
import { pieRightOption, mapOption } from "./options.js";
export default {
  setup() {
    // const seriesData = [
    //   { name: '学校', value: 100 },
    //   { name: '工厂', value: 100 },
    // ]
    const legendData = [
      { name: '交易套数', type: 0, color: '#00fff9'},
      { name: '交易面积', type: 1, color: "#ffe000"},
      { name: '交易均价', type: 2, color: "#33D7FF"}
    ]
    const active = ref('深圳市')
    const seriesData = [
      [
        { "name": "福田区", "value": 10 },
        { "name": "罗湖区", "value": 100 },
        { "name": "南山区", "value": 20 },
        { "name": "宝安区", "value": 99 },
        { "name": "龙岗区", "value": 52 },
        { "name": "光明区", "value": 45 },
        { "name": "龙华区", "value": 22 },
        { "name": "盐田区", "value": 67 },
        { "name": "坪山区", "value": 66 },
        { "name": "大鹏新区", "value": 83 },
        { "name": "前海合作区", "value": 83 },
        { "name": "深汕合作区", "value": 120 }
      ],
      [
        { "name": "福田区", "value": 12 },
        { "name": "罗湖区", "value": 120 },
        { "name": "南山区", "value": 23 },
        { "name": "宝安区", "value": 65 },
        { "name": "龙岗区", "value": 76 },
        { "name": "光明区", "value": 12 },
        { "name": "龙华区", "value": 76 },
        { "name": "盐田区", "value": 45 },
        { "name": "坪山区", "value": 18 },
        { "name": "大鹏新区", "value": 69 },
        { "name": "前海合作区", "value": 69 },
        { "name": "深汕合作区", "value": 34 }
      ],
      [
        { "name": "福田区", "value": 21 },
        { "name": "罗湖区", "value": 87 },
        { "name": "南山区", "value": 43 },
        { "name": "宝安区", "value": 65 },
        { "name": "龙岗区", "value": 98 },
        { "name": "光明区", "value": 122 },
        { "name": "龙华区", "value": 43 },
        { "name": "盐田区", "value": 73 },
        { "name": "坪山区", "value": 78 },
        { "name": "大鹏新区", "value": 23 },
        { "name": "前海合作区", "value": 23 },
        { "name": "深汕合作区", "value": 125 }
      ]
    ]
    const seriesNames = legendData.map(item => item.name)
    const state = reactive({
      areaList: ['深圳市', '福田区','罗湖区','南山区','宝安区','龙岗区','盐田区','龙华区','坪山区','光明区','大鹏新区','前海合作区','深汕合作区'],
      option: pieRightOption('人', '人口调查', 200, seriesData),
      mapOption: mapOption(legendData, seriesNames, seriesData)
    })
    const change = (e) => {
      if(active.value === '深圳市') {
        state.mapOption = mapOption(legendData, seriesNames, seriesData)
      } else {
        let seriesDatas = seriesData.map(arr => {
          return arr.filter(item => item.name === active.value)
        })
        state.mapOption = mapOption(legendData, seriesNames, seriesDatas)
      }
    }
    return {
      state,
      active,
      change
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
}
</style>