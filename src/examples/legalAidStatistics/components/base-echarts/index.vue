<template>
  <div :id="id" v-echartsResize="resize" class="base-echart" :style="[styleComputed]" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'BaseEcharts',
  props: {
    id: {
      type: [String],
      default: 'echartsId',
      required: true
    },
    width: {
      type: [String, Number],
      default: 0
    },
    height: {
      type: [String, Number],
      default: 0
    },
    // 是否支持下钻
    drill: {
      type: Boolean,
      default: false
    },
    option: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  computed: {
    styleComputed() {
      return {
        width: this.width ? this.width + 'px' : '100%',
        height: this.height ? this.height + 'px' : '100%'
      }
    }
  },
  watch: {
    option: {
      handler() {
        this.initEcharts()
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.initEcharts()
  },
  beforeDestroy() {
    if (!this.myChart) return
    this.myChart.dispose()
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    initEcharts() {
      const chartDom = document.getElementById(this.id)
      if (!chartDom) return
      this.myChart = echarts.init(chartDom, null, { devicePixelRatio: 2.5 })
      this.myChart.setOption(this.option, true)
      if (this.drill) {
        this.myChart.on('click', (params) => {
          this.$emit('echarts-click', params, this.id)
        })
      }
    },
    resize() {
      if (!this.myChart) return
      this.myChart.resize()
      // 随着屏幕大小调节图表
    }
  }
}
</script>

<style lang="scss" scoped>
.base-echart {
  width: 100%;
  height: 100%;
  min-height: 50px;
}
</style>
