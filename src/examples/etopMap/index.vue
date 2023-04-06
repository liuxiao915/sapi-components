<template>
  <div id="etop_box">
    <div class="etop-box-wrapper">
      <div
        :id="`mars3d-container${mapKey}`"
        :class="[
          'mars3d-container',
          customClass,
          { 'mars3d-container-compare-rh': compare },
          { 'today-mars3d-container': scaleType === 'today' }
        ]"
        :style="styleObject"
      />
    </div>
    <!-- 地图蒙板 -->
    <img class="mapMask" :src="maskUrl" />
    <!-- 深汕小地图 -->
    <div
      v-if="isSSMap && controlTools?.SSMap?.enable !== false"
      class="shenshan_box"
      @click="flySSorSZ"
      :class="[hiddenSSMap ? 'hide' : '', disabledSSMap ? 'disabled' : '']"
    >
      <img :src="ssImgUrl" />
    </div>

    <div :class="[searchStatus ? 'activeTools' : 'tools']" :style="isMenuBoxHeight">
      <!-- 区域选择三级菜单组件 -->
      <region-switcher
        v-if="isRegionSwitcher && controlTools?.regionSwitcher?.enable !== false"
        :reset-flag="resetFlag"
        :showMenuGrade="showRegionSwitcherMenuGrade"
        @isMenuBoxFun="isMenuBoxFun"
        @clickRegionSwitcher="clickRegionSwitcher"
        :regionSwitcherSelect="regionSwitcherSelect"
        ref="regionSwitcherRef"
      />
    </div>

    <!-- 工具栏组件 -->
    <tool-bar
      v-if="isToolBar && controlTools?.toolBar?.enable !== false"
      @fullScreen="fullScreen"
      @threeDim="threeDim"
      @resetLocation="resetLocation"
      @reset="reset"
      @toggleSearchStatus="toggleSearchStatus"
      @setPitch="setPitch"
      :config="controlTools.toolBar"
      @updateRegionSwitcher="updateRegionSwitcher"
    />

    <!-- 底图切换组件 -->
    <base-layer-switcher
      :curLayerName="curLayerName"
      v-if="isBaseLayer && controlTools?.baseLayer?.enable !== false"
      @changeLayers="filterChange"
      :isTerrainOn="isTerrainOn"
      :baseLayerArr="baseLayerArr"
    />

    <!-- 缩放组件 -->
    <zoom-tool v-if="controlTools?.zoomTool?.enable !== false" />
    <!-- 比例尺 -->
    <DistanceLegendTool v-if="controlTools?.distanceLegendTool?.enable !== false" ref="DistanceLegendToolRef" />
  </div>
</template>

<script>
// 使用免费开源版本
import 'mars3d/dist/mars3d.css'
import * as mars3d from 'mars3d'

import echarts from 'echarts'
//引入mars3d-echarts
import './lib/echarts.min.js'
import './lib/mars3d-echarts.js'

import EtopMap from './index.js'
import RegionSwitcher from './components/RegionSwitcher.vue'

import BaseLayerSwitcher from './components/BaseLayerSwitcher.vue'
import ToolBar from './components/ToolBar.vue'
import ZoomTool from './components/ZoomTool.vue'
import DistanceLegendTool from './components/DistanceLegendTool.vue'

// import axios from '@/hooks/axios'
window.mars3d = mars3d
window.Cesium = mars3d.Cesium
export default {
  name: 'Mars3dViewer',
  components: {
    RegionSwitcher,
    BaseLayerSwitcher,
    ToolBar,
    ZoomTool,
    DistanceLegendTool
  },
  props: {
    // 初始化配置参数
    url: {
      type: String,
      default: ''
    },
    // 地图唯一性标识
    mapKey: {
      type: String,
      default: ''
    },
    // 自定义参数
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否分屏显示
    compare: {
      type: Boolean,
      default: false
    },
    // 是否插入到body元素上
    appendToBody: {
      type: Boolean,
      default: false
    },
    // 自定义css类名
    customClass: {
      type: String,
      default: ''
    },
    // 蒙版颜色
    maskOptions: {
      type: Object,
      default: () => {
        return {
          isShowWark: true,
          isAddPrimitives: true
        }
      }
    },
    // 是否显示深圳外部蒙版
    isOuterMask: {
      type: Boolean,
      default: true
    },
    // 是否显示蓝色遮盖层
    isXZQMask: {
      type: Boolean,
      default: true
    },
    // 是否显示深汕小地图
    isSSMap: {
      type: Boolean,
      default: true
    },
    // 是否显示区域选择三级菜单控件
    isRegionSwitcher: {
      type: Boolean,
      default: true
    },
    // 是否显示底图切换控件
    isBaseLayer: {
      type: Boolean,
      default: true
    },
    // 是否显示工具条控件
    isToolBar: {
      type: Boolean,
      default: true
    },
    // 是否显示
    controlTools: {
      type: Object,
      default: () => ({
        SSMap: { enable: true },
        regionSwitcher: { enable: true },
        baseLayer: { enable: true },
        toolBar: {
          enable: true,
          isGeoCoderSearchEnable: true,
          isFullScreenEnable: true,
          isResetLocationEnable: true,
          isHomeEnable: true,
          is3DEnable: true,
          isPitchFixed: false
        },
        distanceLegendTool: { enable: true }, // 是否显示比例尺
        zoomTool: { enable: true }
      })
    },
    showRegionSwitcherMenuGrade: {
      type: Number,
      default: 3
    },
    //是否禁用深汕底图点击切换
    disabledSSMap: {
      type: Boolean,
      default: false //默认不禁用
    },
    //是否隐藏深山小地图
    hiddenSSMap: {
      type: Boolean,
      default: false //默认不隐藏
    },
    // 行政区默认选中区域
    regionSwitcherSelect: {
      type: String,
      default: '深圳市'
    },
    // 当前使用的底图
    curLayerName: {
      type: String,
      default: '电子地图'
    },
    //是否开启地形
    isTerrainOn: {
      type: Boolean,
      default: false
    },
    // 是否切换默认显示全深圳、深汕视角
    isInitFullView: {
      type: Boolean,
      default: true
    },
    //default适配专题页面，today 适配今日深圳
    scaleType: {
      type: String,
      default: 'default'
    },
    baseLayerArr: {
      type: Array,
      default: () => ['电子地图', '卫星影像', '三维白模', '倾斜摄影']
    }
  },
  data() {
    const ssImgUrl =
      {
        电子地图: require('@/assets/images/etop/btn_shenshan_electric.png'),
        卫星影像: require('@/assets/images/etop/btn_shenshan_satellite.png'),
        三维白模: require('@/assets/images/etop/btn_shenshan_Whitemold.png'),
        倾斜摄影: require('@/assets/images/etop/btn_shenshan_photography.png')
      }[this.curLayerName] || require('@/assets/images/etop/btn_shenshan_electric.png')

    return {
      searchStatus: false,
      // 地图蒙版图片地址
      maskUrl: require('./images/etop/mask.png'),
      // 深汕图片地址
      ssImgUrl,
      // 监听重置
      resetFlag: false,
      // 标识是否在深圳
      isSZ: true,
      // 当前使用的底图名
      baseLayerName: '蓝色版',
      styleObject: {},
      scale: 1,
      isMenuBox: false
      // isInitFullView: true,  //是否切换默认显示全深圳、深汕视角
    }
  },
  computed: {
    filterClassObj: function () {
      return {
        blue_filter: this.baseLayerName === '蓝色版',
        white_filter: this.baseLayerName === '白色版',
        imagery_filter: this.baseLayerName === '航空影像',
        white_model_filter: this.baseLayerName === '全市白模',
        photography_filter: this.baseLayerName === '实景三维'
      }
    },
    isMenuBoxHeight() {
      return this.isMenuBox
        ? {
            height: 'calc(100% - 40px - 60px - 170px)',
            minHeight: '186px',
            maxHeight: '436px',
            zIndex: '99999999999'
          }
        : 'height: auto'
    }
  },
  watch: {
    // curLayerName: {
    //   handler(n, o) {
    //     console.log("curLayerName---",n , o)
    //     // this.curLayerName = n
    //     this.loadBaseLayer(n)
    //   },
    // },
    // baseLayerArr: {
    //   handler(newValue, oldValue) {
    //     this.baseLayerArr1 = newValue
    //   },
    //   deep: true,
    // },
  },
  beforeMount() {
    window.isSZ = true
    if (this.appendToBody) {
      document.body.appendChild(this.$el)
    }

    if (process.env.NODE_ENV === 'production') {
      this.setScale()
    }

    if (this.mapKey) {
      this.initMars3d(this.options)
    } else {
      mars3d.Resource.fetchJson({ url: this.url }).then((data) => {
        this.initMars3d(data.map3d) // 构建地图
      })
    }
  },

  beforeUnmount() {
    // console.log("---------销毁前");
    document.getElementById('etop_box').style.display = 'none'
    if (this[`map${this.mapKey}`]) {
      let gl = etopMap.map.viewer.scene.context._originalGLContext
      this[`map${this.mapKey}`].destroy()
      gl.getExtension('WEBGL_lose_context').loseContext()
      gl = null
    }
  },

  /* unmounted() {
    const canvas = document.getElementsByClassName('cesium-viewer');
    let bool1=typeof (canvas) != 'undefined';
    let bool2=canvas.length>0&&canvas.length<5
    if ( bool1&&bool2) {
      const gl = canvas[0].canvas[0].children[0].children[0].children[0].getContext('webgl');
      canvas.addEventListener('webglcontextlost', (event) => {
        console.log(event);
      });
      //用于模拟canvas丢失
      //gl.getExtension('WEBGL_lose_context').loseContext();
    } else {
       console.log('地图组件没有准备或者地图组件重复！！！！！！！！！查找document.getElementsByClassName("cesium-viewer")')
    }
  }, */

  methods: {
    isMenuBoxFun(val) {
      this.isMenuBox = val
    },
    toggleSearchStatus(val) {
      this.searchStatus = val
    },
    setScale() {
      this.scale = this.getScale()
      this.styleObject = this.mapStyleObj()
    },
    getScale() {
      const clientWidth = window.document.documentElement.clientWidth
      const clientHeight = window.document.documentElement.clientHeight
      const ww = clientWidth / 6400
      const wh = clientHeight / 1080
      return ww < wh ? ww : wh
    },
    mapStyleObj() {
      let obj
      switch (this.scaleType) {
        case 'today':
          obj = this.getTodayScale()
          break
        default:
          obj = this.getDefaultScale()
          break
      }
      console.log('---this.scaleType00000--', this.scaleType, obj)

      return obj
    },
    //今日深圳版适配
    getTodayScale() {
      let obj = {}
      obj = {
        transform: `scale(${1 / this.scale})`,
        WebkitTransform: `scale(${1 / this.scale})`,
        transformOrigin: '0 0',
        width: `${100 * this.scale}%`,
        height: `${100 * this.scale}%`
      }
      console.log('---今日深圳版适配--', obj)
      return obj
    },
    // 陈辉版适配
    getDefaultScale() {
      let obj = {}
      if (this.scale > 1) {
        obj = {
          transform: 'scale(0.5) translate(-50%, 50%)',
          WebkitTransform: 'scale(0.5) translate(-50%, -50%)',
          width: '200%',
          height: '200%'
        }
      } else {
        obj = {}
      }
      console.log('---陈辉版适配--', obj)
      return process.env.NODE_ENV === 'production' ? obj : {}
    },
    initMars3d(options) {
      // 如果已存在地图则先销毁
      if (this[`map${this.mapKey}`]) {
        let gl = etopMap.map.viewer.scene.context._originalGLContext
        this[`map${this.mapKey}`].destroy()
        gl.getExtension('WEBGL_lose_context').loseContext()
        gl = null
      }

      const mapOptions = {
        ...options,
        ...this.options
      }

      // 创建三维地球场景
      var map = new mars3d.Map(`mars3d-container${this.mapKey}`, mapOptions)
      this.map = map

      //设置滚轴
      if (this.scale > 1) {
        this.map.scene.screenSpaceCameraController.zoomFactor = 3 * this.scale
      }

      let bigScale = this.scale > 1 ? this.scale : 1
      if (this.scaleType === 'today') {
        bigScale = this.scale
      }

      console.log('-----bigScale--', bigScale)
      const etopMap = new EtopMap(map, {
        bigScale: bigScale,
        scaleType: this.scaleType
      })
      window.etopMap = etopMap
      this.etopMap = etopMap
      // 删除火星logo，可能存在删不掉的情况，
      // 通过设置窗体高度将logo挤出去，但是截图时会带上
      map.viewer.scene.primitives.remove(map.viewer.scene.primitives.get(0))
      // 设置固定光照，避免因时间导致模型明暗不一
      map.fixedLight = true
      // 设置相机最大缩放距离
      //map.viewer.scene.screenSpaceCameraController.maximumZoomDistance = 100000
      // 设置地球背景色，因为加载了百度地图，所以没必要再设置了
      // etopMap.setGlobeBaseColor('#01041A', 0.8)

      // // 单张全球影像图片
      //  const globeImage = new mars3d.layer.ImageLayer({
      //    //url: this.$STATIC_URL + '/images/etop/singleBlue.jpg',
      //    url: require('./images/etop/night.jpg'),
      //    rectangle: { xmin: -180, xmax: 180, ymin: -90, ymax: 90 },
      //    alpha: 0.7
      //   })
      //  map.addLayer(globeImage)

      // 单张广东范围影像图片
      const gdImage = new mars3d.layer.ImageLayer({
        url: require('./images/etop/gdImage.jpg'),
        rectangle: {
          xmin: 108.28125,
          xmax: 120.9375,
          ymin: 18.051733095556166,
          ymax: 27.132125784374054
        }
      })
      map.addLayer(gdImage)

      // 初始化比例尺
      if (this?.controlTools?.distanceLegendTool?.enable !== false) this.$refs.DistanceLegendToolRef?.init(map)

      // // 单张深圳范围影像图片
      // const szImage = new mars3d.layer.ImageLayer({
      // url: this.$STATIC_URL + '/images/etop/szImage.jpg',
      //   rectangle: {
      //     xmin: 113.291015625,
      //     xmax: 115.6640625,
      //     ymin: 21.943045533438177,
      //     ymax: 23.402764905407945
      //   },
      //   alpha: 0.7
      // })
      // map.addLayer(szImage)

      this.loadBaseLayer()
      // // 添加百度地图
      // etopMap.layer.addBaiduLayer({
      //   id: 'baiduLayer',
      //   layer: 'img_d',
      //   brightness: 0.6,
      // })
      // 设置蒙版(深圳范围外)
      // if (this.isOuterMask) {
      //   etopMap.setMask();
      // }
      // 添加行政区图层用于遮罩
      if (this.isXZQMask) {
        this.etopMap.addXzqLayer(this.maskOptions)
        //this.etopMap.addXzqLayerNew(this.maskOptions)
      }
      this.etopMap.terrainUtils.enableTerrain(false)
      // 抛出加载完成事件
      this.$emit('onload', etopMap)
    },

    loadBaseLayer() {
      // 默认添加规自局的深圳市蓝色版电子地图
      switch (this.curLayerName) {
        case '电子地图':
          this.etopMap.addGzBlueLayer()
          break
        case '白色版':
          this.etopMap.addGzWhiteLayer()
          break
        case '卫星影像':
          this.etopMap.addGzSatellite()
          // etopMap.tiandituUtils.addTiandituLayers({
          //   type: "img",
          // });
          break
        case '三维白模':
          this.etopMap.addGzBlueLayer()
          this.etopMap.addWhiteModel()
          break
        case '倾斜摄影':
          this.etopMap.addPhotography()
          break

        default:
          this.etopMap.addGzBlueLayer()
      }
    },

    // 在深圳和深汕区域切换
    flySSorSZ() {
      if (this.disabledSSMap) {
        return
      }
      if (this.isSZ) {
        this.toogleSZ()
      } else {
        this.toogleSS()
      }
      this.isSZ = !this.isSZ
      window.isSZ = this.isSZ
      //根据视口大小显示
      if (this.isInitFullView) {
        this.etopMap.resizeViewPort(this.isSZ)
      }
      this.$emit('flySSorSZ', { etopMap: this.etopMap, isSZ: this.isSZ })
    },
    //切换深圳小底图
    toogleSZ() {
      if (this.baseLayerName === '卫星影像') {
        this.ssImgUrl = require('@/assets/images/etop/btn_shenzhen_satellite.png')
      } else if (this.baseLayerName === '三维白模') {
        this.ssImgUrl = require('@/assets/images/etop/btn_shenzhen_whitemold.png')
      } else if (this.baseLayerName === '倾斜摄影') {
        this.ssImgUrl = require('@/assets/images/etop/btn_shenzhen_photography.png')
      } else {
        this.ssImgUrl = require('@/assets/images/etop/btn_shenzhen_electric.png')
      }
    },
    //深汕小地图底图切换
    toogleSS() {
      if (this.baseLayerName === '卫星影像') {
        this.ssImgUrl = require('@/assets/images/etop/btn_shenshan_satellite.png')
      } else if (this.baseLayerName === '三维白模') {
        this.ssImgUrl = require('@/assets/images/etop/btn_shenshan_Whitemold.png')
      } else if (this.baseLayerName === '倾斜摄影') {
        this.ssImgUrl = require('@/assets/images/etop/btn_shenshan_photography.png')
      } else {
        this.ssImgUrl = require('@/assets/images/etop/btn_shenshan_electric.png')
      }
    },
    // 全屏操作
    fullScreen() {
      this.$emit('fullScreen')
    },
    // 转换到外部3D地图
    threeDim() {
      this.$emit('threeDim')
    },
    // 回到当前位置
    resetLocation() {
      this.$emit('resetLocation')
    },
    filterChange(layerName) {
      this.$emit('filterChange', layerName)

      this.baseLayerName = layerName
      if (this.isSZ) {
        this.toogleSS()
      } else {
        this.toogleSZ()
      }
    },
    // 重置
    reset() {
      this.$emit('reset')
      if (this.isInitFullView) {
        this.isSZ = true
        this.etopMap.resizeViewPort(this.isSZ)
      } else {
        //options  配置的初始化视角
        this.map.flyHome({
          duration: 1
        })
      }
      //还原深汕小图
      this.toogleSS()
      this.resetFlag = !this.resetFlag
    },
    clickRegionSwitcher(e) {
      this.$emit('clickRegionSwitcher', e)
    },
    updateRegionSwitcher(res) {
      this.$refs.regionSwitcherRef?.retrieveData(res?.properties?.sq_name)
    },
    setPitch(val) {
      //设置垂直视角
      this.etopMap.map.setPitch(-90)
      //垂直视角是否可用
      this.etopMap.scene.screenSpaceCameraController.enableTilt = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#etop_box {
  position: relative;
  height: 100%;
  // overflow: hidden;

  .etop-box-wrapper {
    position: relative;
    height: 100%;
    overflow: hidden;

    .mars3d-container {
      height: 104%;
      position: static;
    }

    //今日深圳加
    .today-mars3d-container {
      :deep(.mars3d-divGraphic) {
        pointer-events: none !important;
      }
    }
  }

  .tools {
    position: absolute;
    top: 0;
    right: 124px;
    // right: 164px;
    display: flex;
    justify-content: center;
    // width:464px;
  }

  .activeTools {
    position: absolute;
    top: 0;
    right: 330px;
    // right: 370px;
    display: flex;
    justify-content: center;
    // width: 838px;
  }

  .mapMask {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: none;
  }

  .blue_filter {
    -webkit-filter: contrast(119%) brightness(102%) saturate(79%) hue-rotate(10deg);
    filter: contrast(119%) brightness(102%) saturate(79%) hue-rotate(10deg);
  }

  .white_filter {
    -webkit-filter: contrast(106%) brightness(73%) saturate(82%) hue-rotate(10deg);
    filter: contrast(106%) brightness(73%) saturate(82%) hue-rotate(10deg);
  }

  .imagery_filter {
    -webkit-filter: contrast(130%) brightness(95%) saturate(105%) hue-rotate(5deg);
    filter: contrast(130%) brightness(95%) saturate(105%) hue-rotate(5deg);
  }

  .imagery_filter::before {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
    opacity: 0.2;
    background: rgba(1, 35, 65, 0.5);
  }

  .white_model_filter {
    -webkit-filter: contrast(119%) brightness(105%) saturate(79%) hue-rotate(10deg);
    filter: contrast(119%) brightness(105%) saturate(79%) hue-rotate(10deg);
  }

  .white_model_filter::before {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
    opacity: 0.5;
    background: rgba(1, 35, 65, 0.5);
  }

  .photography_filter {
    -webkit-filter: contrast(130%) brightness(105%) saturate(75%) hue-rotate(5deg);
    filter: contrast(130%) brightness(105%) saturate(75%) hue-rotate(5deg);
  }

  .photography_filter::before {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
    opacity: 0.2;
    background: rgba(1, 35, 65, 0.5);
  }

  .shenshan_box {
    position: absolute;
    z-index: 99;
    right: 0;
    bottom: 0;
    width: 153px;
    height: 153px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .shenshan_box.hide {
    display: none;
  }

  .shenshan_box.disabled {
    cursor: no-drop;
  }

  .mars3d-container {
    > :deep(.mars3d-overviewMap > .cesium-viewer) {
      // 为了解决鹰眼控件 水印问题
      height: 115%;
    }

    // 修改默认比例尺样式
    :deep(.mars3d-distance-legend) {
      opacity: 0;
    }

    /deep/.cesium-viewer-geocoderContainer {
      position: absolute;
      right: 180px;
      height: 30px;
      z-index: 100;
      top: 14px;
      background-color: rgba(11, 36, 68, 0.8);
      border: 1px solid rgba(84, 181, 255, 0.3);
      box-sizing: border-box;

      svg {
        width: 28px;
        height: 28px;
        fill: rgb(84 181 255);
        background-color: rgba(11, 36, 68, 0.8);
      }
    }

    /deep/.cesium-geocoder-searchButton {
      width: 28px;
      height: 28px;
      top: 0;
      right: 0;
    }

    /deep/.cesium-geocoder-input {
      background-color: rgba(11, 36, 68, 0.8);
      border: none;
      min-width: 28px;
      height: 27px;
      padding-right: 27px;
    }
  }
}

/* 重写Cesium的css */

/**cesium按钮背景色*/
.cesium-button {
  background-color: #3f4854;
  color: #e6e6e6;
  fill: #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  line-height: 32px;
}

.cesium-viewer-geocoderContainer .cesium-geocoder-input {
  background-color: rgba(63, 72, 84, 0.7);
}

.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus {
  background-color: rgba(63, 72, 84, 0.9);
}

.cesium-viewer-geocoderContainer .search-results {
  background-color: #3f4854;
}

.cesium-geocoder-searchButton {
  background-color: #3f4854;
}

.cesium-infoBox-title {
  background-color: #3f4854;
}

.cesium-infoBox {
  background: rgba(63, 72, 84, 0.9);
}

.cesium-toolbar-button img {
  height: 100%;
}

.cesium-performanceDisplay-defaultContainer {
  top: auto;
  bottom: 35px;
  right: 50px;
}

.cesium-performanceDisplay-ms,
.cesium-performanceDisplay-fps {
  color: #fff;
}

/**cesium工具栏位置*/
.cesium-viewer-toolbar {
  top: auto;
  left: auto;
  right: 12px;
  bottom: 35px;
}

.cesium-viewer-toolbar > .cesium-toolbar-button,
.cesium-navigationHelpButton-wrapper,
.cesium-viewer-geocoderContainer {
  margin-bottom: 5px;
  float: right;
  clear: both;
  text-align: center;
}

.cesium-baseLayerPicker-dropDown {
  bottom: 0;
  right: 40px;
  max-height: 700px;
  margin-bottom: 5px;
}

.cesium-navigation-help {
  top: auto;
  bottom: 0;
  right: 40px;
  transform-origin: right bottom;
}

.cesium-sceneModePicker-wrapper {
  width: auto;
}

.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-dropDown-icon {
  float: left;
  margin: 0 3px;
}

.cesium-viewer-geocoderContainer .search-results {
  left: 0;
  right: 40px;
  width: auto;
  z-index: 9999;
}

.cesium-infoBox-title {
  background-color: #3f4854;
}

.cesium-infoBox {
  top: 50px;
  background: rgba(63, 72, 84, 0.9);
}

/**左下工具栏菜单*/
.toolbar-dropdown-menu-div {
  background: rgba(43, 44, 47, 0.8);
  border: 1px solid #2b2c2f;
  z-index: 991;
  position: absolute;
  right: 60px;
  bottom: 40px;
  display: none;
}

.toolbar-dropdown-menu {
  min-width: 110px;
  padding: 0;
}

.toolbar-dropdown-menu > li {
  padding: 0 3px;
  margin: 2px 0;
}

.toolbar-dropdown-menu > li > a {
  color: #edffff;
  display: block;
  padding: 4px 10px;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  white-space: nowrap;
  text-decoration: none;
}

.toolbar-dropdown-menu > li > a:hover,
.dropdown-menu > li > a:focus {
  color: #fff;
  background-color: #444d59;
}

.toolbar-dropdown-menu > .active > a,
.dropdown-menu > .active > a:hover,
.dropdown-menu > .active > a:focus {
  color: #fff;
  background-color: #444d59;
}

.toolbar-dropdown-menu i {
  padding-right: 5px;
}

.layoutTools {
  display: block;
  clear: both;
  position: absolute;
  top: 0;
  right: 0;
}

.float {
  float: right;
}
</style>
