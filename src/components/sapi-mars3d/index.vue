<template>
  <!-- 为 Mars3D 准备一个定义了宽高的 DOM -->
  <div :id="mapKeyId" class="mars3d-container" @onMapload="onMapload"></div>
</template>

<script>

//依赖的cesium库本身css
import "mars3d-cesium/Build/Cesium/Widgets/widgets.css"
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
.mars3d-container {
  width: 100%;
  height: 100%;
  :deep(canvas) {
    width: 100%;
    height: 100%;
  }
}
</style>
