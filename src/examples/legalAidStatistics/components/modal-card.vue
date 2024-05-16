<template>
  <div :ref="id" v-loading="loading" class="modal-card">
    <div class="modal-card--top">
      <div class="title">{{ title }}</div>
      <div v-if="showRemark" class="remark">{{ remark }}</div>
      <el-button v-if="showBackBtn" type="primary" @click="$emit('backData', id)">返回</el-button>
      <div v-if="isAuth('appeal:legalaid:statistics:exportImg')" class="download-btn" :data-html2canvas-ignore="true" @click="exportImg(id, title)">
        <img class="down-icon" src="../../legalAidNew/img/down-icon.png" alt="">
      </div>
    </div>
    <div class="modal-card--main">
      <BaseEcharts :id="id" :option="echartsOption" :height="height" :drill="drill" @echarts-click="echartsClick" />
    </div>
  </div>
</template>

<script>
import BaseEcharts from './base-echarts/index.vue'
import html2canvas from 'html2canvas'
export default {
  name: 'PieEcharts',
  components: {
    BaseEcharts
  },
  props: {
    id: { // 必传，避免同页面多次使用该组件，出现id重复，init报错
      type: String,
      default: 'echartsId'
    },
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    },
    height: {
      type: [String, Number],
      default: 0
    },
    remark: {
      type: [String, Number],
      default: ''
    },
    // 是否支持下钻
    drill: {
      type: Boolean,
      default: false
    },
    showRemark: {
      type: Boolean,
      default: false
    },
    showBackBtn: {
      type: Boolean,
      default: false
    },
    echartsOption: {
      type: Object,
      required: true,
      default: () => {
        return {
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [],
              type: 'line'
            }
          ]
        }
      }
    }
  },
  methods: {
    echartsClick(params, id) {
      this.$emit('echarts-click', params, id)
    },
    exportImg(ref, title) {
      this.exportLoading = true
      const copyDom = this.$refs[ref]// 要保存的dom
      const width = copyDom.offsetWidth // dom宽
      const height = copyDom.offsetHeight // dom高
      const scale = 2 // 放大倍数
      html2canvas(copyDom, {
        dpi: window.devicePixelRatio * 2,
        scale: scale,
        width: width,
        heigth: height,
        useCORS: true, // 【重要】开启跨域配置
        backgroundColor: '#fff'
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg')
        this.fileDownload(imgData, title)
        this.exportLoading = false
      }).finally(() => {
        this.exportLoading = false
      })
    },
    fileDownload(downloadUrl, title) {
      const aLink = document.createElement('a')
      aLink.style.display = 'none'
      aLink.href = downloadUrl
      aLink.download = title + '.png'
      // 触发点击-然后移除
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-card {
  border: 1px solid #eee;
  margin-top: 20px;

  .modal-card--top {
    display: flex;
    padding: 0 15px;
    height: 60px;
    align-items: center;
    border-bottom: 1px solid #eee;
    vertical-align: middle;
    position: relative;
    .title {
      margin-right: 8px;
      color: #000;
      font-size: 18px;
      font-weight: 600;
    }
    .remark {
      background: #F0F4FF;
      border-radius: 3px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 14px;
      color: #1966FE;
      letter-spacing: 0;
      line-height: 22px;
      padding: 5px 12px;
      margin-right: 5px;
    }
    .download-btn {
      position: absolute;
      right: 15px;
      cursor: pointer;
      height: 34px;
      background: $--color-primary;
      border-radius: 4px;
      color: #ffffff;
      display: inline-block;
      line-height: 30px;
      padding: 2px 10px;
      .down-icon {
        width: 18px;
        height: 18px;
        vertical-align: middle;
      }
    }
    .el-button {
      position: absolute;
      right: 65px;
    }
  }
  .modal-card--main {
    padding: 16px;
  }
}
</style>
