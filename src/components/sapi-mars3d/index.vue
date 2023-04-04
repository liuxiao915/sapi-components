<template>
  <!-- 为 Mars3D 准备一个定义了宽高的 DOM -->
  <div :id="mapKeyId" class="mars3d-container" @onMapload="onMapload"></div>
</template>

<script>
//导入mars3d主库
import "mars3d/dist/mars3d.css";
import * as mars3d from "mars3d";
import { computed, onMounted, onUnmounted } from 'vue'
export default {
  name: 'sapiMars3d',
  props: {
    // 地图唯一性标识
    mapKey: {
      type: String,
      default: 'default'
    },
    options: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props, { emit }) {
    let map = null;
    const mapKeyId = computed(() => `mars3d-container-${props.mapKey}`)
    const initMap = () => {
      mars3d.Util.fetchJson({ url: "config/mars3d-config.json" }).then((data) => {
        // 创建三维地球场景
        map = new mars3d.Map(mapKeyId.value, {...data.map3d, ...props.options})
        // //如果有xyz传参，进行定位
        // const lat = getQueryString("lat")
        // const lng = getQueryString("lng")
        // if (lat && lng) {
        //   map.flyToPoint(new mars3d.LngLatPoint(lng, lat), { duration: 0 })
        // }
        // 开场动画
        // map.openFlyAnimation();

        // 针对不同终端的优化配置
        if (mars3d.Util.isPCBroswer()) {
          map.zoomFactor = 2.0 // 鼠标滚轮放大的步长参数
          // IE浏览器优化
          if (window.navigator.userAgent.toLowerCase().indexOf("msie") >= 0) {
            map.viewer.targetFrameRate = 20 // 限制帧率
            map.scene.requestRenderMode = false // 取消实时渲染
          }
        } else {
          map.zoomFactor = 5.0 // 鼠标滚轮放大的步长参数
          // 移动设备上禁掉以下几个选项，可以相对更加流畅
          map.scene.requestRenderMode = false // 取消实时渲染
          map.scene.fog.enabled = false
          map.scene.skyAtmosphere.show = false
          map.scene.globe.showGroundAtmosphere = false
        }
        // //二三维切换不用动画
        if (map.viewer.sceneModePicker) {
          map.viewer.sceneModePicker.viewModel.duration = 0.0
        }
        // 删除火星logo，可能存在删不掉的情况，
        // 通过设置窗体高度将logo挤出去，但是截图时会带上
        map.viewer.scene.primitives.remove(map.viewer.scene.primitives.get(0))
        // webgl渲染失败后，刷新页面
        // map.on(mars3d.EventType.renderError, async () => {
        //   await $alert("程序内存消耗过大，请重启浏览器")
        //   window.location.reload()
        // })
        // map构造完成后的一些处理
        onMapLoad()
        emit("onload", map)
      })
    }
    // map构造完成后的一些处理
    const onMapLoad = () => {
      // // Mars3D地图内部使用，如右键菜单弹窗
      // // @ts-ignore
      // window.globalAlert = $alert
      // // @ts-ignore
      // window.globalMsg = $message
      // // 用于 config.json 中 西藏垭口 图层的详情按钮 演示
      // // @ts-ignore
      // window.showPopupDetails = (item: any) => {
      //   $alert(item.NAME)
      // }
    }
    const destroyMap = () => {
      if (map) {
        map.destroy()
        map = null
      }
      // if(this.tilesetPlanClip){
      //   this.map.removeThing(this.tilesetPlanClip, true); //移除并销毁
      //   this.tilesetPlanClip = null
      // }
      // if(this.graphicLayer){
      //   this.graphicLayer.destroy(); //销毁
      //   this.graphicLayer = null
      // }
    }
    onMounted(() => {
      initMap() // 或者直接 new mars3d.Map("mars3dContainer", {//...一些选项})
    })
    onUnmounted(() => {
      destroyMap()
    })
    return {
      mapKeyId
    }
  }
}
</script>
<style lang="less" scoped> 
/**cesium 工具按钮栏*/
.cesium-viewer-toolbar {
  top: auto !important;
  bottom: 35px !important;
  left: 12px !important;
  right: auto !important;
}
.cesium-toolbar-button img {
  height: 100%;
}
.cesium-viewer-toolbar > .cesium-toolbar-button,
.cesium-navigationHelpButton-wrapper,
.cesium-viewer-geocoderContainer {
  margin-bottom: 5px;
  float: left;
  clear: both;
  text-align: center;
}
.cesium-button {
  background-color: rgba(23, 49, 71, 0.8);
  color: #e6e6e6;
  fill: #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  line-height: 32px;
}
.cesium-button:hover {
  background: #3ea6ff;
}
/**cesium 底图切换面板*/
.cesium-baseLayerPicker-dropDown {
  bottom: 0;
  left: 40px;
  max-height: 700px;
  margin-bottom: 5px;
  background-color: rgba(23, 49, 71, 0.8);
}
/**cesium 帮助面板*/
.cesium-navigation-help {
  top: auto;
  bottom: 0;
  left: 40px;
  transform-origin: left bottom;
  background: none;
  background-color: rgba(23, 49, 71, 0.8);
  .cesium-navigation-help-instructions {
    background: none;
  }
  .cesium-navigation-button {
    background: none;
  }
  .cesium-navigation-button-selected,
  .cesium-navigation-button-unselected:hover {
    background: rgba(0, 138, 255, 0.2);
  }
}
/**cesium 二维三维切换*/
.cesium-sceneModePicker-wrapper {
  width: auto;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-dropDown-icon {
  float: right;
  margin: 0 3px;
}
/**cesium POI查询输入框*/
.cesium-viewer-geocoderContainer .search-results {
  left: 0;
  right: 40px;
  width: auto;
  z-index: 9999;
}
.cesium-geocoder-searchButton {
  background-color: rgba(23, 49, 71, 0.8);
}
.cesium-viewer-geocoderContainer .cesium-geocoder-input {
  background-color: rgba(63, 72, 84, 0.7);
}
.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus {
  background-color: rgba(63, 72, 84, 0.9);
}
.cesium-viewer-geocoderContainer .search-results {
  background-color: rgba(23, 49, 71, 0.8);
}
/**cesium info信息框*/
.cesium-infoBox {
  top: 50px;
  background-color: rgba(23, 49, 71, 0.8);
}
.cesium-infoBox-title {
  background-color: rgba(23, 49, 71, 0.8);
}
/**cesium 任务栏的FPS信息*/
.cesium-performanceDisplay-defaultContainer {
  top: auto;
  bottom: 35px;
  right: 50px;
}
.cesium-performanceDisplay-ms,
.cesium-performanceDisplay-fps {
  color: #fff;
}
/**cesium tileset调试信息面板*/
.cesium-viewer-cesiumInspectorContainer {
  top: 10px;
  left: 10px;
  right: auto;
}
.cesium-cesiumInspector {
  background-color: rgba(23, 49, 71, 0.8);
}
/**覆盖mars3d内部控件的颜色等样式*/
.mars3d-compass .mars3d-compass-outer {
  fill: rgba(23, 49, 71, 0.8);
}
.mars3d-contextmenu-ul,
.mars3d-sub-menu {
  background-color: rgba(23, 49, 71, 0.8);
  > li > a:hover,
  > li > a:focus,
  > li > .active {
    background-color: #3ea6ff;
  }
  > .active > a,
  > .active > a:hover,
  > .active > a:focus {
    background-color: #3ea6ff;
  }
}
/* Popup样式*/
.mars3d-popup-color {
  color: #ffffff;
}
.mars3d-popup-background {
  background: rgba(23, 49, 71, 0.8);
}
.mars3d-popup-content {
  margin: 15px;
}
.mars3d-template-content label {
  padding-right: 6px;
}
.mars3d-template-titile {
  border-bottom: 1px solid #3ea6ff;
}
.mars3d-template-titile a {
  font-size: 16px;
}
.mars3d-tooltip {
  background: rgba(23, 49, 71, 0.8);
  border: 1px solid rgba(23, 49, 71, 0.8);
}
.mars3d-popup-btn-custom {
  padding: 3px 10px;
  border: 1px solid #209ffd;
  background: #209ffd1c;
}
</style>
