<template>
  <div id="cesiumContainer" class="cesiumContainer"></div>
</template>
<script>

// # 这里至少有一行注释，否则插件不生效
import { onMounted, ref } from "vue";
import { addAir, addSimplestyles, addWyoming, addEntities } from "./entities";
// import { addImageryLayers } from "./Imagery";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css"
Cesium.Ion.defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMTc4MzliMy04YzgyLTQ5ZDUtOWY3My03MzM4MTQ0N2ZkZDkiLCJpZCI6MTcxNjQ1LCJpYXQiOjE2OTcxODQ2MzV9.ouFFg35_Whx8mkO5C2uyOMyyf8rwPyJJc_w99Kh0ZPE`
export default {
  name: 'sapiCesium',
  setup(props, { emit }) {
    const id = ref('cesiumContainer-'+ Math.random()*1000000)
    onMounted(() => {
      const viewer = new Cesium.Viewer('cesiumContainer', {
        geocoder: true, //右上角 搜索
        homeButton: true, //右上角 Home
        sceneModePicker: false, //右上角 2D/3D切换
        baseLayerPicker: true, //右上角 地形
        navigationHelpButton: true, //右上角 Help
        animation: false, // 左下角 圆盘动画控件
        timeline: false, //时间轴
        fullscreenButton: true, //右下角 全屏控件
        vrButton: false, // 如果设置为true，将创建VRButton小部件。
        scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
        infoBox: false, //隐藏点击要素后的提示信息
        terrain: Cesium.Terrain.fromWorldTerrain({
          requestWaterMask: true,
          requestVertexNormals: true
        }),//地形
        shouldAnimate: true,
        infoBox: true,
      });
      viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏版本信息
      
      
      // addAir(viewer, "../assets/models/CesiumAir/Cesium_Air.glb", 130.0)
      // addSimplestyles(viewer, "../assets/models/simplestyles.geojson")
      // addWyoming(viewer, 5000.0)
      addEntities(viewer, '../assets/models/ne_10m_us_states.topojson')
      emit('onload', viewer)
    })
    return {
      id
    }
  }
};
</script>

<style scoped>
.cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
