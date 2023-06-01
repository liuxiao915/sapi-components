<template>
  <div>
    <button @click="onBindMapPopup">Map上弹出Popup</button>
    <button @click="onBindMapTooltip">Map上弹出Tooltip</button>
    <sapiMars3d @onload="onMapload" :controlOption="state.controlOption" />
  </div>
</template>  

<script>
import sapiMars3d from "@/components/sapi-mars3d";
import { initOPenPopup, bindMapPopup, bindMapTooltip } from './popup.js'
import { dataList, addMarkLayer } from './scatterData.js'
import { flyToPoint } from './flyToPoint.js'
import { getCurrentInstance, reactive } from 'vue'
export default {
  components: {
    sapiMars3d
  },
  setup() {
    let map = null
    const state = reactive({
      controlOption: {
        basemap: {
          name: "天地图电子",
          type: "group",
          layers: [
            { name: "底图", type: "tdt", layer: "vec_d" },
            { name: "注记", type: "tdt", layer: "vec_z" }
          ]
        },
        rectangle: {
          color: "#fecd78",
          opacity: 0.2,
          outline: 1,
          outlineColor: "#ff7800"
        },
        style: {
          right: "5px",
          top: "5px",
          width: "200px",
          height: "150px"
        }
      }
    })
    const { proxy } = getCurrentInstance()
    const onMapload = (mapInstance) => {
      map = mapInstance
      // map上的弹窗
      // initOPenPopup(map)
      // 添加散点数据
      const markLayer = addMarkLayer(map, dataList, clickCallback, {
        styleOptions: {
          scale: 0.5,
          highlightScale: 0.7
        },
        // 设置聚合相关参数（仅对Entity点数据有效）
        clustering: {
          enabled: true, // 是否开启聚合
          pixelRange: 18, // 多少像素矩形范围内聚合
          opacity:0.5
        }}
      );
    }
    const onBindMapPopup = () => {
      bindMapPopup(map)
    }
    const onBindMapTooltip = () => {
      bindMapTooltip(map)
    }

    const clickCallback = (e) => {
      proxy.$message({ type: 'success', message: e.graphic.options.name })
      // 跳转到指定位置
      flyToPoint(map)
      setTimeout(() => {
        const position = e.graphic.options.position
        flyToPoint(map, [position[0], position[1], 100000])
      }, 1000)
    }
    
    return {
      state,
      onMapload,
      onBindMapPopup,
      onBindMapTooltip
    }
  }
};
</script>
	  
<style>

</style>