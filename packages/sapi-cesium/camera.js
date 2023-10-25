  /**
* @Description: 相机的一些配置
* @Author: liux
* @Date: 2023-10-16 18:38:53
* @LastEditTime: 2023-10-16 18:38:53
*/
import * as Cesium from "cesium";
// flyTo 飞视角
export const flyTo = (viewer) => {
  viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation : {
      heading : Cesium.Math.toRadians(0.0),
      pitch : Cesium.Math.toRadians(-15.0),
    }
  })
}

export const setView = (viewer) => {
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 1500.0), // 北京故宫坐标
    orientation: {
      heading: Cesium.Math.toRadians(90.0), // 控制左右摆头east, default value is 0.0 (north)
      pitch: Cesium.Math.toRadians(-90), // 上下摆头default value (looking down)
      roll: 0.0 // default value
    }
  })
}