<template>
  <!-- 为 Mars3D 准备一个定义了宽高的 DOM -->
  <div id="mars3dContainer" class="mars3d-container"></div>
</template>

<script>
//导入mars3d主库
import "mars3d/dist/mars3d.css";
import * as mars3d from "mars3d";
import { onMounted } from 'vue'
export default {
  name: 'sapiMars3d',
  setup() {
    onMounted(() => {
      const option = {
        scene: {
          center: { lat: 30.054604, lng: 108.885436, alt: 17036414, heading: 0, pitch: -90 },
          showSun: true,
          showMoon: true,
          showSkyBox: true,
          showSkyAtmosphere: false, // 关闭球周边的白色轮廓 map.scene.skyAtmosphere = false
          fog: true,
          fxaa: true,
          globe: {
            showGroundAtmosphere: false, // 关闭大气（球表面白蒙蒙的效果）
            depthTestAgainstTerrain: false,
            baseColor: "#546a53"
          },
          cameraController: {
            zoomFactor: 3.0,
            minimumZoomDistance: 1,
            maximumZoomDistance: 50000000,
            enableRotate: true,
            enableZoom: true
          }
        },
        control: {
          baseLayerPicker: true, // basemaps底图切换按钮
          homeButton: true, // 视角复位按钮
          sceneModePicker: true, // 二三维切换按钮
          navigationHelpButton: true, // 帮助按钮
          fullscreenButton: true, // 全屏按钮
          contextmenu: { hasDefault: true } // 右键菜单
        },
        terrain: {
          url: "//data.mars3d.cn/terrain",
          show: true
        },
        basemaps: [
          {
            name: "天地图影像",
            icon: "img/tdt_img.png",
            type: "tdt",
            layer: "img_d",
            show: true
          }
        ]
      }
      // const map = new mars3d.Map("mars3dContainer", option)
      initMap()
    })


    const initMap = () => {
      mars3d.Util.fetchJson({ url: "config/mars3d-config.json" }).then(function (json) {
        console.log("读取 config.json 配置文件完成", json) // 打印测试信息
        // 创建三维地球场景
        const mapOptions = json.map3d
        let map = new mars3d.Map("mars3dContainer", mapOptions)
        // 打印测试信息
        console.log("mars3d的Map主对象构造完成", map)
        console.log("其中Cesium原生的Cesium.Viewer为", map.viewer)
      })
    }
    
    return {}
  }
}
</script>
<style lang="less" scoped>
.mars3d-container {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  overflow: hidden;
}
</style>
