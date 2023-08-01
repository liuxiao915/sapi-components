<template>
  <div :id="keyId" class="chart-container"></div>
</template>
<script>
import * as echarts from 'echarts'
import { ref, computed, toRefs, reactive, onMounted } from 'vue'
import ResizeObserver from 'resize-observer-polyfill';
import { throttle, utils } from '@/utils/index'
let resizeObserver = null;
export default { 
  name: 'VEchart',
  props: { 
    options: { 
      type: Object,
      default() { 
        return null;
      },
      isLoading: { 
        type: Boolean,
        default: false,
      },
    },
  },
  data() { 
    return { 
      instance: null,
      keyId: '',
      chartDom: null
    };
  },
  watch: { 
    options(val) { 
      if (val) { 
        this.refresh(val);
      }
    },
    isLoading(val) { 
      this.initChart();
      if (val) { 
        this.instance.showLoading();
      } else { 
        this.instance.hideLoading();
      }
    }
  },
  methods: { 
    initChart() { 
      this.keyId = `echarts-container-${utils.guid(8)}`
      this.chartDom = document.getElementById(this.keyId)
      this.instance = this.instance || echarts.init(chartDom);
    },
    // 获取chart 实例
    getInstance() { 
      this.initChart();
      return this.instance;
    },
    // 刷新chart
    refresh(options, notMerge = false) { 
      this.initChart();
      this.instance.setOption(options || this.options, notMerge);
    }
  },
  mounted() { 
    resizeObserver = new ResizeObserver(throttle((entries, observer) => { 
      this.instance && this.instance.resize();
    }),500);
    resizeObserver.observe(this.chartDom);
  },
  beforeDestroy() { 
    // 销毁组件时，解绑 reszie
    resizeObserver.unobserve(this.chartDom);
    if (this.instance) {
      this.instance.dispose()
    }
  },
};
</script>
<style scoped></style>