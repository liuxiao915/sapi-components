<template>
  <div class="legal-aid-statistics">
    <div class="query-box m-b-20">
      <div>
        <el-date-picker v-model="currentTime" type="daterange" align="right" unlink-panels range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']" @change="changeCurrentTime" />
        <el-button type="primary" class="m-l-15" @click="searchData()">查询</el-button>
        <el-button type="primary" class="m-l-15" @click="exportImg('echarts-wrap', '统计分析图表')">导出图片</el-button>
      </div>
      <div>
        <el-select v-model.trim="dataForm.queryPkOrg" placeholder="请选择" clearable class="m-r-10" @change="searchData()">
          <el-option v-for="item in orgList" :key="item.key" :label="item.val" :value="item.key" />
        </el-select>
        <el-select v-model.trim="dataForm.year" placeholder="年度" clearable class="w100 m-r-10" @change="changeDate($event, 'year')">
          <el-option v-for="item in yearList" :key="item.key" :label="item.val" :value="item.key" />
        </el-select>
        <el-select v-model.trim="dataForm.quarter" placeholder="季度" clearable class="w110 m-r-10" @change="changeDate($event, 'quarter')">
          <el-option v-for="item in $key.appeal.quarterList" :key="item.key" :label="item.val" :value="item.key" />
        </el-select>
        <el-select v-model.trim="dataForm.month" placeholder="月度" clearable class="w100 m-r-10" @change="changeDate($event, 'month')">
          <el-option v-for="item in $key.appeal.monthList" :key="item.key" :label="item.val" :value="item.key" />
        </el-select>
        <el-button :type="dataForm.day ? 'primary' : ''" @click="changeDate('day', 'day')">本日</el-button>
      </div>
    </div>
    <div ref="echarts-wrap" class="echart-wrap">
      <top-data :count-data="countData" />
      <div class="echarts-columns-3">
        <modal-card
          v-for="item in pieEchartList"
          :id="item.id"
          :key="item.id"
          :loading="item.loading"
          :remark="(item.remark + item.total + item.unit)"
          :show-remark="item.showRemark"
          :title="item.title"
          :echarts-option="item.echartsOption"
          :height="300"
          :show-back-btn="item.showBackBtn"
          :drill="item.drill"
          @echarts-click="echartsClick"
          @backData="backData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import html2canvas from 'html2canvas'
import API from '@/http/api/appeal/legalNew'
import { toThousands } from '@/utils/index.js'
import topData from './components/topData.vue'
import modalCard from './components/modal-card.vue'
import { yBarOption, pieOption } from './components/base-echarts/option'
export default {
  name: 'LegalAidStatistics',
  components: {
    topData,
    modalCard
  },
  data() {
    return {
      exportLoading: false,
      countData: {},
      pieEchartList: [
        { id: 'echarts-case', fn: 'getQueryApplyPlatform', loading: false, title: '来源渠道', echartsOption: {}, showRemark: true, remark: '统计工单数', total: '-', unit: '宗' },
        { id: 'echarts-report', fn: 'getQueryApplyWay', loading: false, title: '申报形式', echartsOption: {}, showRemark: true, remark: '统计工单数', total: '-', unit: '宗' },
        { id: 'echarts-accept', fn: 'getServiceModalityAccept', loading: false, title: '服务形式', echartsOption: {}, type: 'yBar', unit: '宗' },
        { id: 'echarts-age', fn: 'getQueryAge', loading: false, title: '职工年龄分布', echartsOption: {}, showRemark: true, remark: '服务人次：', total: '-', unit: '人次' },
        { id: 'echarts-gender', fn: 'getQueryGender', loading: false, title: '职工性别分布', echartsOption: {}, showRemark: true, remark: '服务人次：', total: '-', unit: '人次' },
        { id: 'echarts-education', fn: 'getQueryEdu', loading: false, title: '职工学历分布', echartsOption: {}, showRemark: true, remark: '服务人次：', total: '-', unit: '人次' },
        { id: 'echarts-domicile', fn: 'getQueryHouseholdType', loading: false, title: '户籍统计', echartsOption: {}, showRemark: true, remark: '服务人次：', total: '-', unit: '人次', drill: true, showBackBtn: false },
        { id: 'echarts-workers', fn: 'getQueryIndustry', loading: false, title: '职工行业分布', echartsOption: {}, showRemark: true, remark: '服务人次：', total: '-', unit: '人次', drill: true, showBackBtn: false },
        { id: 'echarts-social', fn: 'getQueryBuySocialSecurity', loading: false, title: '购买社保情况', echartsOption: {}, showRemark: true, remark: '服务人次：', total: '-', unit: '人次' },
        { id: 'echarts-contract', fn: 'getQuerySignContract', loading: false, title: '劳动合同签订情况', echartsOption: {}, showRemark: true, remark: '服务人次：', total: '-', unit: '人次' },
        { id: 'echarts-member', fn: 'getQueryUnionMember', loading: false, title: '工会会员情况', echartsOption: {}, showRemark: true, remark: '服务人次：', total: '-', unit: '人次' },
        { id: 'echarts-procedure', fn: 'getQueryApplicationProcedure', loading: false, title: '案件程序', echartsOption: {}, showRemark: true, remark: '统计工单数', total: '-', unit: '宗' },
        { id: 'echarts-dispute', fn: 'getQueryDisputesLocation', loading: false, title: '争议发生地区域分布', echartsOption: {}, showRemark: true, remark: '服务人次：', total: '-', unit: '人次' },
        { id: 'echarts-location', fn: 'getQueryUnitLocation', loading: false, title: '单位所在地分布', echartsOption: {}, showRemark: true, remark: '服务人次：', total: '-', unit: '人次' },
        { id: 'echarts-settlementWay', fn: 'getQuerySettlementWay', loading: false, title: '结案方式', echartsOption: {}, showRemark: true, remark: '统计已结案工单数', total: '-', unit: '宗' }
      ],
      currentTime: ['', ''],
      orgList: [], // 机构下拉
      yearList: [], // 年份下拉
      dataForm: {
        queryPkOrg: ''
      },
      dateArr: ['day', 'month', 'quarter', 'year']
    }
  },
  computed: {
    paramsData() { // 接口入参
      return {
        startTime: this.currentTime === null ? '' : this.currentTime[0],
        endTime: this.currentTime === null ? '' : this.currentTime[1],
        queryPkOrg: this.dataForm.queryPkOrg
      }
    }
  },
  created() {
    this.getYearList()
    this.getOrgList()
    this.searchData()
  },
  activated() {},
  methods: {
    searchData() {
      this.getTopData()
      this.getEchartsData(this.pieEchartList)
    },
    backData(id) {
      if (id === 'echarts-domicile') {
        // 饼图  户籍统计
        this.pieEchartList[6].loading = true
        API.getQueryHouseholdType(this.paramsData).then(res => {
          const seriesData = []
          if (res.code === 0 && res.data?.length) {
            res.data.forEach((val) => {
              seriesData.push({ name: val.label, value: val.count, child: val.child, percentage: val.percentage })
            })
            this.pieEchartList[6].echartsOption = pieOption('人', seriesData, 'circle', '户籍统计')
            this.pieEchartList[6].showBackBtn = false
            this.pieEchartList[6].remark = '服务人次：'
            this.pieEchartList[6].total = res.data.reduce((prev, curr) => {
              return prev + Number(curr.count)
            }, 0)
            this.pieEchartList[6].loading = false
          }
        })
      } else if (id === 'echarts-workers') {
        // 饼图  职工行业分布
        API.getQueryIndustry(this.paramsData).then(res => {
          const seriesData = []
          if (res.code === 0 && res.data?.length) {
            res.data.forEach((val) => {
              seriesData.push({ name: val.label, value: val.count, child: val.child, percentage: val.percentage })
            })
            this.pieEchartList[7].echartsOption = pieOption('人', seriesData, 'circle', '职工行业分布')
            this.pieEchartList[7].showBackBtn = false
          }
        })
      } else if (id === 'echarts-trend') {
        // 柱状图 申报/受理趋势(月)

      } else if (id === 'echarts-acceptance') {
        // 柱状图  各（市）区总受理情况

      }
    },
    echartsClick(params, id) {
      // 柱状图 申报/受理趋势(天)，数据量比较大，下钻需另外调用接口
      if (params.data.child?.length) {
        // 饼图  户籍统计 / 职工行业分布
        if (id === 'echarts-domicile' || id === 'echarts-workers') {
          const yAxisData = []
          const seriesData = []
          params.data.child.forEach((val) => {
            yAxisData.push(val.label)
            seriesData.push({ name: val.label, value: val.count, child: val.child, percentage: val.percentage })
          })
          if (id === 'echarts-domicile') {
            this.pieEchartList[6].echartsOption = pieOption('人', seriesData, 'circle', '户籍统计')
            this.pieEchartList[6].remark = params.data.name + '：'
            this.pieEchartList[6].total = params.data.value
            this.pieEchartList[6].showBackBtn = true
          } else {
            this.pieEchartList[7].echartsOption = pieOption('人', seriesData, 'circle', '职工行业分布')
            this.pieEchartList[7].showBackBtn = true
          }
        }
      }
    },
    exportImg(ref, title) {
      this.exportLoading = true
      const copyDom = this.$refs[ref]// 要保存的dom
      const width = copyDom.offsetWidth // dom宽
      const height = copyDom.offsetHeight // dom高
      const scale = 2 // 放大倍数
      html2canvas(this.$refs[ref], {
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
    },
    // 获取顶部的总数据
    getTopData() {
      API.getQueryCount(this.paramsData).then(res => {
        if (res.code === 0) {
          this.countData = res.data || {}
          for (var key in this.countData) {
            this.countData[key] = toThousands(this.countData[key])
          }
        }
      })
    },
    // 饼图数据/横向柱状图
    getEchartsData(arr) {
      arr.forEach(item => {
        item.loading = true
        API[item.fn](this.paramsData).then(res => {
          item.loading = false
          item.echartsOption = {}
          const yAxisData = []
          const seriesData = []
          if (res.code === 0 && res.data?.length) {
            if (item.remark) {
              item.total = res.data.reduce((prev, curr) => {
                return prev + Number(curr.count)
              }, 0)
            }
            res.data.forEach((val) => {
              if (item.type === 'yBar') {
                yAxisData.push(val.label)
              }
              seriesData.push({ name: val.label, value: val.count, child: val.child, percentage: val.percentage })
            })
            if (item.type === 'yBar') {
              item.echartsOption = yBarOption(item.unit, yAxisData.reverse(), item.title, seriesData.reverse(), '工单数')
            } else {
              item.echartsOption = pieOption(item.unit, seriesData, 'circle', item.title)
            }
          } else {
            item.total = '-'
            if (item.type === 'yBar') {
              item.echartsOption = yBarOption(item.unit, [], item.title, [])
            } else {
              item.echartsOption = pieOption(item.unit, [], 'circle', item.title)
            }
          }
        }).catch(() => {
          item.loading = false
        })
      })
    },
    // 左侧日期组件值修改
    changeCurrentTime() {
      this.dateArr.map(item => { // 清空其他选项
        this.dataForm[item] = ''
      })
    },
    // 月度、季度、年度下拉切换，给左侧日期组件赋值
    changeDate(val, type) {
      let startDate = ''
      let endDate = ''
      if (val !== '') {
        this.dateArr.map(item => { // 清空其他选项
          if (type !== item) {
            this.dataForm[item] = ''
          }
        })
        if (type === 'day') {
          startDate = moment().format('YYYY-MM-DD 00:00:00')
          endDate = moment().format('YYYY-MM-DD 23:59:59')
          this.dataForm.day = 'active' // 为了让按钮为选中状态
        } else {
          startDate = moment()[type](val).startOf(type).format('YYYY-MM-DD 00:00:00')
          endDate = moment()[type](val).endOf(type).format('YYYY-MM-DD 23:59:59')
        }
        this.currentTime = [startDate, endDate]
      } else {
        this.currentTime = []
        this.dateArr.map(item => { // 清空
          this.dataForm[item] = ''
        })
      }
      this.searchData() // 查询数据
    },
    // 年份 下拉
    getYearList() {
      API.legalAidQueryYearList().then(res => {
        if (res.code === 0) {
          this.yearList = res.data.map(item => {
            return {
              key: item.paramsKey,
              val: item.paramsValue
            }
          })
        }
      })
    },
    // 机构下拉
    getOrgList() {
      API.legalAidQueryOrgList().then(res => {
        if (res.code === 0) {
          this.orgList = res.data.map(item => {
            return {
              key: item.pkOrg,
              val: item.orgName
            }
          })
          this.dataForm.queryPkOrg = this.orgList[0]?.key
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.legal-aid-statistics {
  .query-box {
    display: flex;
    justify-content: space-between;

    .w110 {
      ::v-deep .el-input {
        width: 110px !important;
      }
    }

    .w100 {
      ::v-deep .el-input {
        width: 100px !important;
      }
    }
  }

  .echarts-columns-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0 20px;
  }

  .echarts-columns-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 20px;
  }

  .border-warp {
    border: 1px solid #eee;
  }
}
</style>
