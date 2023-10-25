/**
* @Description: 图层
* @Author: liux
* @Date: 2023-10-16 18:38:53
* @LastEditTime: 2023-10-16 18:38:53
*/
import * as Cesium from "cesium";

export const addImageryLayers = (viewer) => {
  // 去掉默认的基本图层
  viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
  // 添加图层Sentinel-2
  viewer.imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({ assetId : 3954 }));
}

// 添加百度地图图层
export const addBaiduImageryLayer = (viewer) => {
  // 在<head>标签内添加以下代码
  // <script src="http://api.map.baidu.com/api?v=2.0&ak=你的百度地图API密钥"></script>

  const baiduImageryProvider = new Cesium.UrlTemplateImageryProvider({
    url: 'http://api0.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20181121'
  })
  this.viewer.imageryLayers.addImageryProvider(baiduImageryProvider)
}