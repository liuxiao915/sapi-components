<template>
  <!-- 为 Mars3D 准备一个定义了宽高的 DOM -->
  <div id="mars3dContainer" class="mars3d-container"></div>
</template>

<script>
//导入mars3d主库
import "mars3d/dist/mars3d.css";
import * as mars3d from "mars3d";
import { onMounted, onBeforeUnmount } from 'vue'
export default {
  name: 'sapiMars3d',
  props: {
    // 地图唯一性标识
    mapKey: {
      type: String,
      default: ''
    },
    mapOptions: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props) {
    let map = null;
    const initMap = () => {
      mars3d.Util.fetchJson({ url: "config/mars3d-config.json" }).then(function (json) {
        // 创建三维地球场景
        const mapOptions = json.map3d
        map = new mars3d.Map("mars3dContainer", mapOptions)
      })
    }
    const destroyMap = () => {
      if (!map) {
        globalMsg("地图已销毁,无需重复销毁!")
        return
      }
      map.destroy()
      map = null
    }
    onMounted(() => {
      // 或者直接new mars3d.Map("mars3dContainer", {...一些选项})
      initMap()
    })
    onBeforeUnmount(() => {
      destroyMap()
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
