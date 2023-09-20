<template>
  <div :id="domId" class="map-echart" :style="{ width: width + 'px', height: height + 'px' }" />
</template>
<script>
import * as echarts from 'echarts'
import 'echarts-gl'
import shenShan from './shenshan.json'
export default {
  name: 'ShenShanMapsGl',
  props: {
    width: {
      type: [Number, String],
      default: 80
    },
    height: {
      type: [Number, String],
      default: 60
    },
    option: {
      type: Object,
      required: true,
      default() {
        return {
          series: []
        }
      }
    }
  },
  data() {
    return {
      domId: `${new Date().getTime() + Math.floor(Math.random() * 1000)}Map`
    }
  },
  watch: {
    option: {
      handler() {
        this.drawChart()
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      echarts.registerMap('shenShan', shenShan)
      const chartDom = document.getElementById(this.domId)
      if (!chartDom) return
      const chart = echarts.init(chartDom)
      if (!chart) return
      chart.clear()
      const option = {
        backgroundColor: 'transparent',
        geo3D: {
          map: 'shenShan',
          shading: 'lambert',
          aspectScale: 1, // 长宽比
          regionHeight: 20, // 地图高度
          viewControl: {
            distance: 170,
            alpha: 30,
            minAlpha: 30, // 固定上下旋转角度
            maxAlpha: 45
          },
          scaleLimit: {
            min: 1,
            max: 5
          },
          label: {
            show: false,
            distance: 10,
            textStyle: {
              color: '#fff',
              backgroundColor: 'transparent',
              fontSize: 12
            }
          },
          itemStyle: {
            color: 'rgba(0,143,255,.5)', // 地图板块的颜色
            borderColor: '#008fff',
            borderWidth: 1
          },
          emphasis: {
            // show:false
            itemStyle: {
              color: 'rgba(250,248,0,.5)',
              borderColor: '#FFF800',
              borderWidth: 1
            }
          }
        }
      }
      chart.on('click', (params) => {
        this.$emit('shenshanClick', params)
      })
      chart.setOption(Object.assign(option, this.option))
      // 点击事件
      chart.resize()
    }
  }
}
</script>