<template>
  <div class="wrapper">
    <!-- <spaiEcharts type="pie" :option="state.option" />
    <spaiEcharts type="pie" :option="state.option" /> -->
    <sapiEchartsGl cityVal="深圳市" :option="state.mapOption" :view-controls="state.viewControl" :ss-option="state.ssOption" left="0%" />
  </div>
</template>
<script>
import { reactive } from 'vue'
import { pieRightOption } from "./options.js";
export default {
  setup() {
    const seriesData = [
      { name: '学校', value: 100 },
      { name: '工厂', value: 100 },
    ]
    const state = reactive({
      option: pieRightOption('人', '人口调查', 200, seriesData),
      viewControl: {
        alpha: 100,
        minAlpha: 40, // 固定上下旋转角度
        maxAlpha: 40,
        distance: 150,
        rotateSensitivity: 0, // 设置为0无法旋转
        zoomSensitivity: 0, // 设置为0无法缩放
        panSensitivity: 0, // 设置为0无法平移
        autoRotate: false // 自动旋转
      },
      mapOption: {
        "tooltip": {
          "trigger": "item",
          "backgroundColor": "rgba(255, 255, 255, 0)",
          "axisPointer": {
            "type": "line", "lineStyle": { "color": "#54B5FF", "type": "dashed" }
          }
        },
        "legend": {
          "show": false,
          "bottom": "2%",
          "left": "1%", "itemWidth": 10,
          "itemHeight": 10, "orient": "vertical",
          "textStyle": {
            "color": "#fff", "fontSize": "16",
            "fontWeight": 400, "display": "flex"
          }
        },
        "series": [
          {
            "id": "a1", "name": "天然气高压管道长度", "type": "bar3D", "coordinateSystem": "geo3D", "barSize": 1.5, "shading": "color", "minHeight": 5, "barGap": 0,
            "itemStyle": { "color": "#00FFF9", "opacity": 0.5, "border": 1 },
            "emphasis": { "label": { "show": false } }, "label": { "show": false },
            "data": [
              { "name": "福田区", "value": [114.06054, 22.53291, 60] },
              { "name": "罗湖区", "value": [114.16766000000001, 22.55836, 60] },
              { "name": "南山区", "value": [113.98543000000001, 22.571221, 60] },
              { "name": "宝安区", "value": [113.88908, 22.65329, 60] },
              { "name": "龙岗区", "value": [114.222885, 22.695083, 60] },
              { "name": "光明区", "value": [113.95189500000001, 22.748816, 60] },
              { "name": "龙华区", "value": [114.049346, 22.671963, 60] },
              { "name": "盐田区", "value": [114.28536600000001, 22.585069, 60] },
              { "name": "坪山区", "value": [114.374441, 22.68423, 60] },
              { "name": "大鹏新区", "value": [114.514268, 22.578528, 60] }]
          },
          {
            "id": "a2", "name": "天然气次高压管道长度", "type": "bar3D", "coordinateSystem": "geo3D", "barSize": 1.5, "shading": "color", "minHeight": 5, "barGap": 0,
            "itemStyle": { "color": "#F9E900", "opacity": 0.5 },
            "emphasis": { "label": { "show": false } }, "label": { "show": false },
            "data": [
              { "name": "福田区", "value": [114.04454, 22.53291, 40] },
              { "name": "罗湖区", "value": [114.15166, 22.55836, 40] },
              { "name": "南山区", "value": [113.96943, 22.571221, 40] },
              { "name": "宝安区", "value": [113.87308, 22.65329, 40] },
              { "name": "龙岗区", "value": [114.206885, 22.695083, 40] },
              { "name": "光明区", "value": [113.935895, 22.748816, 40] },
              { "name": "龙华区", "value": [114.033346, 22.671963, 40] },
              { "name": "盐田区", "value": [114.269366, 22.585069, 40] },
              { "name": "坪山区", "value": [114.358441, 22.68423, 40] },
              { "name": "大鹏新区", "value": [114.498268, 22.578528, 40] }]
          },
          {
            "id": "a3", "name": "天然气中低压管道长度", "type": "bar3D", "barGap": 0,
            "coordinateSystem": "geo3D", "barSize": 1.5, "shading": "color", "minHeight": 5,
            "itemStyle": { "color": "#00FF92", "opacity": 0.5 },
            "emphasis": { "label": { "show": false } }, "label": { "show": false },
            "data": [{ "name": "福田区", "value": [114.02853999999999, 22.53291, 80] },
            { "name": "罗湖区", "value": [114.13566, 22.55836, 80] },
            { "name": "南山区", "value": [113.95343, 22.571221, 80] },
            { "name": "宝安区", "value": [113.85708, 22.65329, 80] },
            { "name": "龙岗区", "value": [114.190885, 22.695083, 80] },
            { "name": "光明区", "value": [113.919895, 22.748816, 80] },
            { "name": "龙华区", "value": [114.01734599999999, 22.671963, 80] },
            { "name": "盐田区", "value": [114.253366, 22.585069, 80] },
            { "name": "坪山区", "value": [114.342441, 22.68423, 80] },
            { "name": "大鹏新区", "value": [114.48226799999999, 22.578528, 80] }]
          }]
      },
      ssOption: {
        tooltip: {
          "trigger": "item",
          "backgroundColor": "rgba(255, 255, 255, 0)",
          "axisPointer": {
            "type": "line",
            "lineStyle": { "color": "#54B5FF", "type": "dashed" }
          }
        },
        "legend": {
          "show": false,
          "bottom": "2%",
          "left": "1%",
          "itemWidth": 10,
          "itemHeight": 10,
          "orient": "vertical",
          "textStyle": {
            "color": "#fff",
            "fontSize": "16",
            "fontWeight": 400,
            "display": "flex"
          }
        }, "series": [
          {
            "id": "a1", "name": "天然气高压管道长度", "type": "bar3D", "coordinateSystem": "geo3D", "barSize": 14, "shading": "color", "minHeight": 30, "barGap": 0,
            "itemStyle": { "color": "#00FFF9", "opacity": 0.5, "border": 1 },
            "emphasis": { "label": { "show": false } }, "label": { "show": false },
            "data": [{ "name": "深汕合作区", "value": [115.082275, 22.864112402018165, 20] }]
          },
          {
            "id": "a2", "name": "天然气次高压管道长度", "type": "bar3D", "coordinateSystem": "geo3D", "barSize": 14, "shading": "color", "minHeight": 30, "barGap": 0,
            "itemStyle": { "color": "#F9E900", "opacity": 0.5 }, "emphasis": { "label": { "show": false } }, "label": { "show": false },
            "data": [{ "name": "深汕合作区", "value": [115.037275, 22.864112402018165, 20] }]
          },
          {
            "id": "a3", "name": "天然气中低压管道长度", "type": "bar3D", "barGap": 0, "coordinateSystem": "geo3D", "barSize": 14, "shading": "color", "minHeight": 20,
            "itemStyle": { "color": "#00FF92", "opacity": 0.5 }, "emphasis": { "label": { "show": false } }, "label": { "show": false },
            "data": [{ "name": "深汕合作区", "value": [114.99227499999999, 22.864112402018165, 20] }]
          }]
      }
    })
    return {
      state
    }
  }
}
</script>
<style lang="less" scoped>.wrapper {
  display: grid;
  grid-gap: 30px 80px;
  grid-template-columns: repeat(auto-fill, 600px);
  grid-auto-rows: 400px;
}</style>