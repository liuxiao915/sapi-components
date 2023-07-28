<template>
  <div id="cesiumContainer"></div>
</template>  

<script>
import * as Cesium from "cesium";
Cesium.Ion.defaultAccessToken ="xxxxxxxxxxxxxxx"
export default {
  setup() {
    const viewer = new Cesium.Viewer('cesiumContainer');
    return {
      viewer
    }
  }
};
</script>