<template>
  <div>
    <button @click="onBindMapDemo">Map上直接弹出</button>
    <button @click="onBindMapDemo">跳转到指定点位</button>
    <sapiMars3d @onload="onMapload" />
  </div>
</template>  

<script>
import * as mars3d from "mars3d";
import sapiMars3d from "@/components/sapi-mars3d";
import { initOPenPopup, bindMapDom } from './popup.js'
import { flyToPoint } from './flyToPoint.js'
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
      initOPenPopup(map)
      // 添加散点数据
      const markLayer = addMarkLayer(map, dataList, clickCallback, {
        styleOptions: {
          scale: 0.5,
          highlightScale: 0.5,
        }}
      );
    }
    const onBindMapDemo = () => {
      bindMapDom()
      // flyToPoint(map)
    }

    const clickCallback = (e) => {
      proxy.$message({ type: 'success', text: e.graphic.options.name })
      map.flyToPoint(new mars3d.LngLatPoint(117,40), { duration: 0 })
    }
    
    
    return {
      onMapload,
      onBindMapDemo
    }
  }
};
</script>
	  
<style>

</style>