<template>
  <div id="reg_swi_box">
    <!-- 当前位置 -->
    <div class="header" style="display: none">
      <span class="sz_text" :class="{ text_hl: curXzq == '' }" @click="clickSzText">深圳市</span>
      <span class="xzq_text" :class="{ text_hl: curJd == '' }" @click="clickXzqText">{{
        curXzq ? ' > ' + curXzq : ''
      }}</span>
      <span class="jd_text" :class="{ text_hl: curSq == '' }" @click="clickJdText">{{
        curJd ? ' > ' + curJd : ''
      }}</span>
      <span class="sq_text" :class="{ text_hl: curSq != '' }" @click="clickSqText">{{
        curSq ? ' > ' + curSq : ''
      }}</span>
    </div>
    <div style="display: none">&nbsp;</div>
    <!-- 下拉切换按钮 -->
    <div class="swi_btn" @click="switchBtn">
      {{ curSq ? curSq : '' || curJd || curXzq || curRegion }}
      <div class="down_arrow" />
    </div>
    <div v-if="isMenuBox" class="menu_box">
      <div v-if="jdList.length === 0" class="xzq_box">
        <div
          v-for="(item, index) in xzqData"
          :key="index"
          class="menu_item"
          :class="{ item_active: curXzq == item.properties.qu_name }"
          @click="clickXzq(item)"
        >
          {{ item.properties.qu_name }}
          <span v-if="item.properties.qu_name != '深圳市' && showMenuGrade > 1" class="right_arrow"
            >&nbsp;</span
          >
        </div>
      </div>
      <div v-if="sqList.length === 0 && jdList.length > 0 && showMenuGrade > 1" class="jd_box">
        <div class="menu_item" @click="() => getBack('jd')">
          <span class="return_item"></span>
          <span style="color: #fff">{{ curXzq }}</span>
        </div>
        <div
          v-for="(item, index) in jdList"
          :key="index"
          class="menu_item"
          :class="{ item_active: curJd == item.properties.jd_name }"
          @click="clickJd(item)"
        >
          {{ item.properties.jd_name
          }}<span class="right_arrow" v-if="showMenuGrade > 2">&nbsp;</span>
        </div>
      </div>
      <div v-if="sqList.length > 0 && showMenuGrade > 2" class="sq_box">
        <div class="menu_item" @click="() => getBack('sq')">
          <span class="return_item"></span>
          <span style="color: #fff">{{ curJd }}</span>
        </div>
        <div
          v-for="(item, index) in sqList"
          :key="index"
          class="menu_item"
          :class="{ item_active: curSq == item.properties.sq_name }"
          @click="clickSq(item)"
        >
          {{ item.properties.sq_name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRegionData, getStreetData, getCommunityData } from '@/api/modules/map/region.js'
import axios from '@/hooks/axios'

export default {
  props: {
    resetFlag: Boolean,
    showMenuGrade: {
      type: Number,
      default: 3
    },
    regionSwitcherSelect: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 是否显示三级菜单
      isMenuBox: false,
      // 控件收起时显示的区域
      curRegion: '深圳市',
      // 用户最新点击的位置
      lastRegion: '深圳市',
      // 保存行政区数据
      xzqData: [],
      // 当前选中的行政区
      curXzq: '',
      // 保存街道数据
      jdData: [],
      // 当前选中的街道
      curJd: '',
      // 保存当前被选择的行政区所属的街道列表数据
      jdList: [],
      // 保存社区数据
      sqData: [],
      // 当前选中的社区
      curSq: '',
      // 保存当前被选择的街道所属的社区列表数据
      sqList: []
    }
  },
  watch: {
    resetFlag() {
      this.reset()
    },
    regionSwitcherSelect: {
      handler(value) {
        this.retrieveData(value)
      },
      deep: true
    }
  },
  async created() {
    let that = this
    //将常用的geojson数据存到geodata全局空间里
    if (window.geodata === undefined) {
      window.geodata = {}

      // 获取行政区数据
      const p1 = this.getRegionDataFn()

      // 获取街道数据
      const p2 = this.getStreetDataFn()

      // 获取社区数据
      const p3 = this.getCommunityDataFn()

      await Promise.all([p1, p2, p3])

      this.retrieveData(this.regionSwitcherSelect)
    } else {
      this.xzqData = geodata.xzqData
      this.jdData = geodata.jdData
      this.sqData = geodata.sqData
    }
  },
  methods: {
    async getRegionDataFn() {
      let res
      if (process?.env?.VUE_APP_ETOPMAP_DEVELOPER)
        res = await axios.get('/jsons/keyAreas/map/szxzq5.geojson')
      else res = await getRegionData()

      const { data } = res

      this.xzqData = data.features.filter(
        (team) => team.properties.qu_code || team.properties.qu_name
      )

      this.xzqData.unshift({
        properties: {
          qu_name: '深圳市'
        }
      })

      geodata.xzqData = this.xzqData
    },
    async getStreetDataFn() {
      let res

      if (process?.env?.VUE_APP_ETOPMAP_DEVELOPER)
        res = await axios.get('/jsons/keyAreas/map/gzj_jd3.geojson')
      else res = await getStreetData()

      const { data } = res

      this.jdData = data.features.filter(
        (team) => team.properties.jd_code || team.properties.jd_name
      )

      geodata.jdData = this.jdData
    },
    async getCommunityDataFn() {
      let res
      //console.log(typeof process.env.VUE_APP_ETOPMAP_DEVELOPER, process.env.VUE_APP_ETOPMAP_DEVELOPER)
      if (process?.env?.VUE_APP_ETOPMAP_DEVELOPER)
        res = await axios.get('/jsons/keyAreas/map/gjz_sq2.geojson')
      else res = await getCommunityData()

      const { data } = res

      this.sqData = data.features.filter(
        (team) => team.properties.sq_code || team.properties.sq_name
      )

      geodata.sqData = this.sqData
    },
    // 三级菜单展开和收起时触发
    switchBtn() {
      this.isMenuBox = !this.isMenuBox
      this.$emit('isMenuBoxFun', this.isMenuBox)
      if (this.isMenuBox) {
        this.curRegion = '深圳市'
      } else {
        this.curRegion = this.lastRegion
        if (this.lastRegion === '') {
          this.curRegion = '深圳市'
        }
      }
    },
    // 点击行政区时触发
    clickXzq(xzqItem) {
      // 先清空当前的街道列表和社区列表
      this.jdList = []
      this.sqList = []
      this.curJd = ''
      this.curSq = ''
      window.etopMap.rmSheQu() // 移除所有社区Entity
      // 移除街道Entity
      window.etopMap.rmJieDao()
      const qu_name = xzqItem.properties.qu_name
      // 移除之前添加的行政区高亮边界线
      if (qu_name === this.curXzq) {
        window.etopMap.rmXZQ()
        this.curXzq = ''
        this.lastRegion = ''
        return
      }
      // 根据当前选中的行政区筛选出所属街道
      this.jdData.forEach((item) => {
        if (qu_name && qu_name === item.properties.qu_name) this.jdList.push(item)
      })
      if (qu_name === '深圳市') {
        // window.etopMap.map.flyHome({
        //   duration: 1
        // })
        window.etopMap.resizeViewPort(true)

        // 标识当前选中的行政区
        this.curXzq = '深圳市'
        this.lastRegion = '深圳市'
        window.etopMap.rmXZQ()
        return
      }
      // 标识当前选中的行政区
      this.curXzq = qu_name
      this.lastRegion = qu_name
      // 添加行政区高亮边界线
      window.etopMap.addXZQ(qu_name, xzqItem.geometry.coordinates, xzqItem.geometry.type)
      this.$emit('clickRegionSwitcher', xzqItem)
    },
    // 点击街道时触发
    clickJd(jdItem) {
      // 先做一些清空复原操作
      this.sqList = []
      this.curSq = ''
      window.etopMap.rmSheQu() // 移除所有社区Entity
      // 标识当前选中的街道
      const jd_name = jdItem.properties.jd_name
      // 移除之前添加的街道高亮边界线
      if (jd_name === this.curJd) {
        window.etopMap.rmJieDao()
        this.curJd = ''
        this.lastRegion = ''
        // 将行政区高亮边界线恢复为深色
        window.etopMap.deepColorXZQ()
        return
      }
      // 将行政区高亮边界线设置为浅色
      window.etopMap.lightColorXZQ()
      // 根据当前选中的街道筛选出所属的社区
      this.sqData.forEach((item) => {
        if (jd_name && jd_name === item.properties.jd_name) this.sqList.push(item)
      })
      this.curJd = jd_name
      this.lastRegion = jd_name
      // 地图展示对应的街道
      window.etopMap.addJieDao(jd_name, jdItem.geometry.coordinates, jdItem.geometry.type)
      this.$emit('clickRegionSwitcher', jdItem)
    },
    // 点击社区时触发
    clickSq(sqItem) {
      const sq_name = sqItem.properties.sq_name
      const jd_name = sqItem.properties.jd_name
      // 移除之前添加的社区高亮边界线, 并且返回上级街道
      if (sq_name === this.curSq) {
        window.etopMap.rmSheQu()
        this.curSq = ''
        this.lastRegion = this.curJd
        // 将街道高亮边界线恢复为深色
        window.etopMap.deepColorJieDao()
        const jdItem = this.jdList.find((item) => item.properties.jd_name === jd_name)

        window.etopMap.addJieDao(jd_name, jdItem.geometry.coordinates, jdItem.geometry.type)
        return
      }
      // 将街道高亮边界线设置为浅色
      window.etopMap.lightColorJieDao()
      this.curSq = sqItem.properties.sq_name
      this.lastRegion = this.curSq
      window.etopMap.addSheQu(sq_name, sqItem.geometry.coordinates)
      this.$emit('clickRegionSwitcher', sqItem)
    },
    // 点击面包屑中的深圳市文本
    clickSzText() {
      this.lastRegion = '深圳市'
      this.curRegion = this.lastRegion
      // 移除存在的社区高亮边界线
      window.etopMap.rmSheQu()
      this.curSq = ''
      // 不显示社区列表
      this.sqList = []
      // 移除存在的街道高亮边界线
      window.etopMap.rmJieDao()
      this.curJd = ''
      // 不显示街道列表
      this.jdList = []
      // 移除存在的行政区高亮边界线
      window.etopMap.rmXZQ()
      this.curXzq = ''
      // 不显示三级菜单
      this.isMenuBox = false
      // 地图回到初始化视图
      window.etopMap.map.flyHome({
        duration: 1
      })
    },
    // 点击面包屑中的行政区文本
    clickXzqText() {
      this.lastRegion = this.curXzq
      this.curRegion = this.lastRegion
      // 移除存在的社区高亮边界线
      window.etopMap.rmSheQu()
      this.curSq = ''
      // 移除存在的街道高亮边界线
      window.etopMap.rmJieDao()
      this.curJd = ''
      // 不显示社区列表
      this.sqList = []
      // 重新添加对应的行政区
      this.xzqData.forEach((item) => {
        if (this.curXzq === item.properties.qu_name) {
          window.etopMap.addXZQ(this.curXzq, item.geometry.coordinates, item.geometry.type)
        }
      })
    },
    // 点击面包屑中的街道文本
    clickJdText() {
      this.lastRegion = this.curJd
      this.curRegion = this.lastRegion
      // 移除存在的社区高亮边界线
      window.etopMap.rmSheQu()
      this.curSq = ''
      // 重新添加对应的街道
      this.jdData.forEach((item) => {
        if (this.curJd === item.properties.jd_name) {
          // 地图展示对应的街道
          window.etopMap.addJieDao(this.curJd, item.geometry.coordinates, item.geometry.type)
        }
      })
    },
    // 点击面包屑中的社区文本
    clickSqText() {
      // 重新添加对应的社区边界线
      this.sqData.forEach((item) => {
        if (this.curSq === item.properties.sq_name) {
          // 添加高亮社区边界线
          window.etopMap.addSheQu(this.curSq, item.geometry.coordinates)
        }
      })
    },
    // 返回上一级
    getBack(type) {
      switch (type) {
        case 'jd': {
          // 先清空当前的街道列表和社区列表
          this.jdList = []
          this.sqList = []
          this.curJd = ''
          this.curSq = ''
          this.curXzq = ''
          this.lastRegion = '深圳市'
          window.etopMap.rmSheQu() // 移除所有社区Entity
          // 移除街道Entity
          window.etopMap.rmJieDao()
          window.etopMap.rmXZQ()
          // 地图回到初始化视图
          // window.etopMap.map.flyHome({
          //   duration: 1
          // })

          //回到全深圳市视角
          window.etopMap.resizeViewPort(true)
          break
        }
        case 'sq': {
          this.sqList = []
          this.curSq = ''
          this.curJd = ''
          this.lastRegion = ''
          window.etopMap.rmSheQu()
          // 移除街道Entity
          window.etopMap.rmJieDao()

          this.xzqData.forEach((item) => {
            if (this.curXzq === item.properties.qu_name) {
              window.etopMap.addXZQ(this.curXzq, item.geometry.coordinates, item.geometry.type)
            }
          })
          break
        }
      }
    },
    // 重置
    reset() {
      this.curXzq = ''
      this.curJd = ''
      this.jdList = []
      this.curSq = ''
      this.sqList = []
      this.lastRegion = '深圳市'
      this.isMenuBox = false
      // 移除社区高亮边界线
      window.etopMap.rmSheQu()
      // 移除街道高亮边界线
      window.etopMap.rmJieDao()
      // 移除行政区高亮边界线
      window.etopMap.rmXZQ()
    },
    // 检索数据
    retrieveData(value) {
      if (!value) return
      if (value === '深圳市') this.clickSzText()

      // value = value.split('社区').shift()
      // value = value.split('街道').shift()
      // value = value.split('区').shift()

      const item = this.xzqData.find((team) => team?.properties?.qu_name === value)
      if (item) {
        // 行政区
        this.clickXzq(item)
      } else {
        const item = this.jdData.find((team) => team?.properties?.jd_name === value)
        if (item) {
          const qu_name = item?.properties?.qu_name
          const xzqTeam = this.xzqData.find(
            (team) => qu_name && team?.properties?.qu_name === qu_name
          )
          this.curXzq = xzqTeam?.properties?.qu_name

          // 街道
          this.jdList = this.jdData.filter(
            (team) => qu_name && team?.properties?.qu_name === qu_name
          )
          this.clickJd(item)
        } else {
          // 社区
          const item = this.sqData.find((team) => team?.properties?.sq_name === value)

          if (item) {
            const jd_name = item?.properties?.jd_name
            const qu_name = item?.properties?.qu_name
            const xzqTeam = this.xzqData.find(
              (team) => qu_name && team?.properties?.qu_name === qu_name
            )
            const jdTeam = this.jdData.find(
              (team) => jd_name && team?.properties?.jd_name === jd_name
            )

            this.curXzq = xzqTeam?.properties?.qu_name
            this.curJd = jdTeam?.properties?.jd_name

            this.jdList = this.jdData.filter(
              (team) => qu_name && team?.properties?.qu_name === qu_name
            )
            this.sqList = this.sqData.filter(
              (team) => jd_name && team?.properties?.jd_name === jd_name
            )

            this.clickSq(item)
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
#reg_swi_box {
  //position: absolute;
  // top: 20px;
  // left: 19px;
  margin-right: 12px;
  z-index: 99;
  .header {
    font-size: 16px;
    color: rgba(84, 181, 255, 0.5);

    .sz_text {
      cursor: pointer;
    }

    .xzq_text {
      cursor: pointer;
    }

    .jd_text {
      cursor: pointer;
    }

    .sq_text {
      cursor: pointer;
    }

    .text_hl {
      color: rgba(84, 181, 255, 1);
    }
  }

  .swi_btn {
    position: relative;
    width: 200px;
    height: 32px;
    line-height: 32px;
    padding-left: 20px;
    border: 1px solid rgba(84, 181, 255, 0.8);
    font-size: 16px;
    color: #54b5ff;
    background-color: rgba(84, 181, 255, 0.3);
    cursor: pointer;

    .down_arrow {
      position: absolute;
      right: 13px;
      top: 12px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid #54b5ff;
    }
  }

  .menu_box {
    height: 100%;
    overflow-y: auto;
    .xzq_box {
      // width: 200px;
      // height: 392px;
      // max-height:386px;
      // height: 100%;
      // overflow-y: auto;
      border: 1px solid rgba(84, 181, 255, 0.3);
      background-color: rgba(11, 11, 43, 0.9);
      padding-bottom: 8px;
      box-sizing: content-box;
    }

    .jd_box {
      // width: 200px;
      // height: 392px;
      // max-height:386px;
      // height: 100%;
      // overflow-y: auto;
      border: 1px solid rgba(84, 181, 255, 0.3);
      background-color: rgba(11, 11, 43, 0.9);
      padding-bottom: 8px;
      box-sizing: content-box;
    }

    .sq_box {
      // width: 200px;
      // height: 392px;
      // max-height:386px;
      // height: 100%;
      // overflow-y: auto;
      border: 1px solid rgba(84, 181, 255, 0.3);
      background-color: rgba(11, 11, 43, 0.9);
      padding-bottom: 8px;
      box-sizing: content-box;
    }

    .menu_item {
      position: relative;
      height: 32px;
      line-height: 32px;
      padding: 0 13px 0 20px;
      font-size: 16px;
      opacity: 0.8;
      font-family: PingFangSC-Regular;
      color: #54b5ff;
      font-weight: 400;
      //background-color: rgba(11, 11, 43, 0.9);
      cursor: pointer;

      .right_arrow {
        position: absolute;
        right: 6%;
        //top: 50%;
        //transform: translateY(-50%);
        // width: 13px;
        // height: 13px;
        // background-image: url(../images/etop/arrowRight.svg);
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        top: 41%;
        width: 8.05px;
        height: 8.05px;
        border-top: 1.5px solid rgba(70, 149, 216, 1);
        border-right: 1.5px solid rgba(70, 149, 216, 1);
        transform: rotate(45deg);
      }

      .return_item {
        position: absolute;
        left: 5px;
        top: 11px;
        display: inline-block;
        width: 12px;
        height: 12px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        font-weight: 400;
        background-image: url(../images/etop/icon_back.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }

    .menu_item:hover {
      background: rgba(90, 177, 250, 0.5);
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #fff;
      font-weight: 400;
      .right_arrow {
        border-top: 1.5px solid #ffffff;
        border-right: 1.5px solid #ffffff;
      }
    }

    .item_active {
      // color: #54b5ff;
      // background-color: #1f4a7c;
      color: #fff;
      opacity: 1;
      background: rgba(90, 177, 250, 0.5);
    }
  }
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 4px;
}
// ::-webkit-scrollbar-button {
//     height:100px;
// }
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(64, 123, 218, 0.7);
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(64, 123, 218, 0.7);
}
</style>
