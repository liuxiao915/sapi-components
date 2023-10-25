/**
* @Description: 
* @Author: liux
* @Date: 2023-10-16 18:38:53
* @LastEditTime: 2023-10-16 18:38:53
*/
import * as Cesium from "cesium";

// 添加地形
export const addTerrain = (viewer) => {
  viewer.terrainProvider = Cesium.createWorldTerrain({
    requestWaterMask : true, // required for water effects
    requestVertexNormals : true // required for terrain lighting
  });
}