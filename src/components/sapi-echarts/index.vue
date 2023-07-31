<!--
 @Description: 
 @Author: liux
 @Date: 2023-04-01 14:03:11
 @LastEditTime: 2023-04-01 14:03:11
-->
<template>
  <div :id="keyId" v-chart-resize class="sapi-echarts-container"></div>
</template>

<script>
// 按需引入基本模板
import * as echarts from 'echarts'
import { ref, computed, toRefs, reactive, onMounted } from 'vue'
import {utils} from "@/utils"
import { isEmpty, merge } from 'lodash'
import { baseOption } from './options'

export default {
  name: 'spaiEcharts',
  props: {
    type: {
      type: String,
      default: 'bar'
    },
    // 接口加载状态 0：正常；1：加载中；2：加载失败；
    status: { 
      type: Number,
      default: 0
    },
    domId: {
      type: [String],
      default: '',
      required: false
    },
    width: {
      type: [String, Number],
      default: 0
    },
    height: {
      type: [String, Number],
      default: 300
    },
    option: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const keyId = computed(() => `echarts-container-${utils.guid(8)}`)
    const echart = ref(null)
    const { option, width, height, status } = toRefs(props)
    const showEchart = computed(() => {
      // 如果数据有多个系列，所有的系列都没有数据的时候不显示图表
      const flag = option.value?.series?.some(item => !isEmpty(item.data))
      return !isEmpty(option.value) ? !isEmpty(option.value.series) ? flag : false : false
    })
    const styleComputed = computed(() => {
      return {
        width: width.value ? (width.value + 'px') : '100%',
        height: height.value ? (height.value + 'px') : '100%'
      }
    })
    return {
      keyId,
      echart,
      showEchart,
      styleComputed
    }
  },
  watch: {
    option: {
      handler() {
        this.mergeOption()
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.mergeOption()
  },
  unmounted() {
    if (this.echart) {
      this.echart.dispose()
    }
  },
  methods: {
    mergeOption() {
      const option = merge(baseOption(), this.option)
      option.legend.data = option.series.map((item) => {
        return {
          name: item.name,
          icon: item.type === 'bar' ? 'rect' : 'path://M63.6 489.6h896.7v150H63.6z'
        }
      })
      for (const [key, value] of Object.entries(option.grid)) {
        option.grid[key] = value
      }
      this.drawChart(option)
    },
    drawChart(option) {
      if (!this.keyId) {
        this.keyId = `${new Date().getTime() + Math.floor(Math.random() * 1000)}BaseBarEchart`
      }

      this.$nextTick(() => {
        const chartDom = document.getElementById(this.keyId)
        if (!chartDom) return
        this.echart = echarts.init(chartDom, 'chalk')
        this.echart.clear()
        this.echart.setOption(option || this.option)
        this.$nextTick(() => {
          this.resize()
        })
      })
    },
    resize() {
      this.echart.resize({
        width: 'auto',
        height: 'auto'
      })
    },
    hiddenToolTips() {
      this.echart.dispatchAction({
        type: 'hideTip'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .sapi-echarts-container {
    height: 100%;
    width: 100%;
  }
</style>
