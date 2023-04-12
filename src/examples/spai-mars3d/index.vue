<template>
  <div>
    <button @click="onBindMapPopup">Map上弹出Popup</button>
    <button @click="onBindMapTooltip">Map上弹出Tooltip</button>
    <sapiMars3d @onload="onMapload" />
  </div>
</template>  

<script>
import * as mars3d from "mars3d";
import sapiMars3d from "@/components/sapi-mars3d";
import { initOPenPopup, bindMapPopup, bindMapTooltip } from './popup.js'
import { dataList, addMarkLayer } from './scatterData.js'
import { getCurrentInstance } from 'vue'
export default {
  components: {
    sapiMars3d
  },
  setup() {
    let map = null
    const { proxy } = getCurrentInstance()
    const onMapload = (mapInstance) => {
      map = mapInstance
      // map上的弹窗
      // initOPenPopup(map)
      // 添加散点数据
      const markLayer = addMarkLayer(map, dataList, clickCallback, {
        styleOptions: {
          scale: 0.5,
          highlightScale: 0.5,
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
      proxy.$message({ type: 'success', text: e.graphic.options.name })
      // 跳转到指定位置
      // map.flyToPoint(new mars3d.LngLatPoint(117,40), { duration: 0 })
    }
    
    return {
      onMapload,
      onBindMapPopup,
      onBindMapTooltip
    }
  }
};
</script>
	  
<style>

</style>