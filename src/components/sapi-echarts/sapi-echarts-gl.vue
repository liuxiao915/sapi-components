<template>
  <div style="position: relative">
    <div :id="mapKeyId" class="map-echart" :style="{ width: width + 'px', height: height + 'px' }" />
    <div v-show="flags" :class="['shenzhen-area', { 'shenshan-areas': !flags }]">
      <map-shenshan-ecahrts-gl :option="ssOption" @shenshanClick="regionClick" />
      <div class="shenshan-title">深汕合作区</div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import 'echarts-gl'
import shenZhen from './newShenZhen.json'
import shenShan from './shenshan.json'
import { computed } from 'vue'

export default {
  name: 'sapiEchartsGl',
  props: {
    cityVal: {
      type: String,
      default: 'shenzhen'
    },
    viewControls: {
      type: Object,
      default() {
        return {
          // 视角控制
          alpha: 30,
          minAlpha: 30, // 固定上下旋转角度
          maxAlpha: 45
        }
      }
    },
    width: {
      type: [Number, String],
      default: 800
    },
    height: {
      type: [Number, String],
      default: 400
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
    },
    ssOption: {
      // 深汕合作区配置
      type: Object,
      required: true,
      default() {
        return {
          series: []
        }
      }
    },
    flags: {
      type: Boolean,
      default: true
    },
    left: {
      type: String,
      default: '-7%'
    },
    top: {
      type: String,
      default: 'auto'
    }
  },
  setup(props) {
    const mapKeyId = computed(() => `echarts-container-${props.mapKey}`)
    return {
      mapKeyId
    }
  },
  data() {
    return {
      map: {},
      alpha: 45, // 自定义3d的数据
      chart: null, // 定义图表对象
      timer: null, // 定时器
      flagMouse: false,
      viewControl: this.viewControls
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
    drawChart(opt) {
      this.map = this.initMapJsonData()
      const regionHeight = this.cityVal === '深圳市' ? 3 : 25
      const distance = this.cityVal === '深圳市' ? 80 : 180
      this.viewControl.distance = distance
      if (!this.flags) {
        this.viewControl.distance = 150
      }
      echarts.registerMap('shen_zhen', this.map)
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
          left: this.left,
          top: this.top,
          shading: 'lambert',
          aspectScale: 0.8,
          regionHeight, // 地图高度
          viewControl: this.viewControl,
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
              fontSize: 14,
              textShadowColor: '#000000',
              textShadowBlur: 2,
              textShadowOffsetY: 3,
              fontWeight: 600
            }
          },
          regions: [
            {
              name: '南海诸岛',
              itemStyle: {
                // 隐藏地图
                normal: {
                  opacity: 0 // 为 0 时不绘制该图形
                }
              },
              label: {
                show: false // 隐藏文字
              }
            }
          ],
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
      chart.setOption(Object.assign(option, opt || this.option))
      // 点击事件
      chart.resize()
      // chart.getZr().off('click')
      chart.getZr().on('click', (params) => {
        this.$emit('handleMapClick', params)
      })

      chart.on('click', (params) => {
        this.regionClick(params)
      })
      chart.on('legendselectchanged', (params) => {
        this.$emit('legendselectchanged', params)
      })
    },

    // 点击地图区域
    regionClick(params) {
      this.$emit('regionClick', params)
    },

    initMapJsonData() {
      const area = JSON.parse(JSON.stringify(shenZhen))
      if (this.cityVal === '深圳市') {
        return area
      } else if (this.cityVal === '深汕合作区') {
        return shenShan
      } else {
        const data = area.features.filter((item) => {
          return item.properties.name === this.cityVal
        })
        area.features = data
        return area
      }
    },
    // 定义3d地图的鼠标滚动事件
    monitorDom() {
      // 获取canvas的区域id信息
      const chartDom = document.getElementById(this.mapKeyId)
      // 兼容性处理，给滚轮绑定事件
      chartDom.addEventListener('mousewheel', this.onMouseWheel, false)
      // chartDom.onmousewheel=this.onMouseWheel;
      // chartDom.addEventListener('DomMouseWheel', this.onMouseWheel, false)
    },
    //  定义鼠标回调事件
    onMouseWheel(ev) {
      /* 当鼠标滚轮事件发生时，执行一些操作 */
      if (this.flagMouse) return
      if (ev.preventDefault) {
        /* FF 和 Chrome */
        ev.preventDefault() // 阻止默认事件
      }
      this.anphaUpdate()
    },
    // 定义需要更新角度的函数,同时禁止平移和放大缩小
    anphaUpdate() {
      const AsyncUpdate = new Promise((resolve, reject) => {
        this.flagMouse = true
        this.alpha += 180
        const option = this.chart.getOption()
        option.geo3D[0].viewControl.animationDurationUpdate = 10000
        option.geo3D[0].viewControl.alpha = this.alpha
        this.chart.setOption(option)
        this.chart.resize()
        setTimeout(resolve, 1000)
      })
      AsyncUpdate.then((res) => {
        this.$emit('changeFlag', !this.flags)
      })
      // setTimeout(() => {
      //   this.$emit('changeFlag', !this.flags)
      // }, 6000)

      // if (this.alpha >= 180) {
      //    let option = this.chart.getOption()
      //   option.geo3D[0].viewControl.minBeta = 0
      //   option.geo3D[0].viewControl.maxBeta = 0
      //   option.geo3D[0].viewControl.minAlpha = 90
      //   option.geo3D[0].viewControl.maxAlpha = 90
      //   this.chart.setOption(option)
      //   this.chart.resize()
      //   clearTimeout(this.timer);
      //   return
      // } else {
      //   this.alpha += 180
      //   let option = this.chart.getOption()
      //    option.geo3D[0].viewControl.animationDurationUpdate = 500;
      //   option.geo3D[0].viewControl.alpha = this.alpha
      //   this.chart.setOption(option)
      //   this.chart.resize()
      // }
      // this.timer = setTimeout(() => {
      //   this.anphaUpdate()
      // }, 0)
    },
    disabledMouse() {
      const option = this.chart.getOption()
      // option.geo3D[0].viewControl.alpha = this.alpha
      option.geo3D[0].viewControl.maxDistance = 70
      option.geo3D[0].viewControl.minDistance = 70
      // option.geo3D[0].viewControl.minBeta = 0
      // option.geo3D[0].viewControl.maxBeta = 0
      // option.geo3D[0].viewControl.minAlpha = 90
      // option.geo3D[0].viewControl.maxAlpha = 90
      this.chart.setOption(option)
      this.chart.resize()
    }
  }
}
</script>
<style lang="less" scoped>
.shenzhen-area {
  position: absolute;
  right: 25px;
  bottom: 0;
  border: 1px dashed #00a3e9;
  border-radius: 5px;

  .shenshan-title {
    text-align: center;
    color: #fff;
    padding-bottom: 10px;
    font-size: 15px;
    font-weight: 600;
  }
}
.shenshan-areas {
  position: absolute;
  right: 25px;
  bottom: -150px;
  border: 1px dashed #00a3e9;
  border-radius: 5px;
}
</style>
