<template>
  <div class="sapi-echarts-gl" :style="{ width: width + 'px', height: height + 'px' }">
    <div :id="mapKeyId" class="shenzhen-map" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import 'echarts-gl'
import shenZhen from './ShenZhen.json'
import { ref, computed, reactive } from 'vue'
import { utils } from '@/utils/index.js'

export default {
  name: 'ShenZhenMap',
  props: {
    id: {
      type: String,
      default: 'map'
    },
    cityVal: {
      type: String,
      default: '深圳市'
    },
    viewControls: {
      type: Object,
      default() {
        return {
          // 视角控制
          alpha: 100,
          minAlpha: 40, // 固定上下旋转角度
          maxAlpha: 40,
          distance: 150,
          rotateSensitivity: 0, // 设置为0无法旋转
          zoomSensitivity: 0, // 设置为0无法缩放
          panSensitivity: 0, // 设置为0无法平移
          autoRotate: false // 自动旋转
        }
      }
    },
    width: {
      type: [Number, String],
      default: 700
    },
    height: {
      type: [Number, String],
      default: 410
    },
    option: {
      type: Object,
      required: false,
      default() {
        return {
          series: []
        }
      }
    },
    geo3DProps: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props) {
    const mapKeyId = computed(() => props.id ? props.id : `echarts-container-${utils.guid(8)}`)
    const map = ref({})
    const chart = ref(null)
    const state = reactive({
      showList: [
        { name: '交易套数', type: 0},
        { name: '交易面积', type: 1},
        { name: '交易均价', type: 2}
      ],
      viewControl: {...props.viewControls}
    })
    return {
      map,
      chart,
      state,
      mapKeyId
    }
  },
  watch: {
    option: {
      handler() {
        this.drawChart()
      },
      immediate: true,
      deep: true
    },
    cityVal: {
      handler(newVal) {
        this.drawChart()
      },
      deep: true,
      immediate: true
    }
  },
  beforeDestroy() {
    const chartDom = document.getElementById(this.mapKeyId)
    chartDom.dispose()
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      this.map = this.initMapJsonData()
      const regionHeight = this.cityVal === '深圳市' ? 3 : 25
      const distance = this.cityVal === '深圳市' ? 85 : 150
      this.state.viewControl.distance = distance
      echarts.registerMap('shen_zhen', this.map, {
        "深汕合作区": {
          left: 114.62129310182767,
          top: 22.803532128731168,
          width: 0.3
        }
      })
      const chartDom = document.getElementById(this.mapKeyId)
      if (!chartDom) return
      const chart = echarts.init(chartDom, null, { devicePixelRatio: 2.5 })
      this.chart = chart
      if (!chart) return
      chart.clear()
      const option = {
        backgroundColor: 'transparent',
        geo3D: {
          map: 'shen_zhen',
          left: 0,
          top: 0,
          shading: 'lambert',
          aspectScale: 0.8,
          regionHeight, // 地图高度
          viewControl: this.state.viewControl,
          scaleLimit: {
            min: 1,
            max: 5
          },
          label: {
            show: true,
            distance: 20,
            textStyle: {
              color: '#fff',
              backgroundColor: 'transparent',
              fontSize: 12,
              textShadowColor: '#000000',
              textShadowBlur: 2,
              textShadowOffsetY: 3,
              fontWeight: 600
            }
          },
          itemStyle: {
            color: 'rgba(0,143,255,.5)', // 地图板块的颜色
            borderColor: '#0b94ff',
            borderWidth: 1
          },
          emphasis: {
            // 板块高亮状态
            itemStyle: {
              color: 'rgba(250,248,0,.5)',
              borderColor: '#FFF800',
              borderWidth: 1
            }
          }
        }
      }
      option.geo3D = { ...option.geo3D, ...this.geo3DProps }
      chart.setOption(Object.assign(option, this.option))
      // 点击事件
      chart.resize()
    },

    initMapJsonData() {
      const area = JSON.parse(JSON.stringify(shenZhen))
      if (this.cityVal !== '深圳市') {
        const data = shenZhen.features.filter((item) => {
          return item.properties.name === this.cityVal
        })
        area.features = data
      }
      return area
    }
  }
}
</script>
<style lang="less" scoped>
.sapi-echarts-gl {
  position: relative;
  .shenzhen-map {
    width: 100%;
    height: 100%;
  }
}
</style>
