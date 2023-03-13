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
      var mapOptions = {
      basemaps: [{ name: "天地图", type: "tdt", layer: "img_d", show: true }],
    }
    var map = new mars3d.Map("mars3dContainer", mapOptions);
    })
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
