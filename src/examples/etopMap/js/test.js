
import tiandituUtils from '@/components/etopMap/js/tiandituUtils.js'
import terrainUtils from '@/components/etopMap/js/terrainUtils.js'
import flyToUtils from '@/components/etopMap/js/flyToUtils.js'
//使用示例, 上述js已挂载到etopMap上, 使用时无需再引入

//test 天地图影像
window.etopMap.tiandituUtils.addTiandituLayers({
  type:'img'
})

//地形服务
window.etopMap.terrainUtils.toggleTerrainProvider('ion')

//test 飞行至点(经纬度)
window.etopMap.flyToUtils.flyToPoint({
  lng:117,
  lat:40,
})
//飞行至矢量对象
const graphicLayer = new mars3d.layer.GraphicLayer()
this.etopMap.map.addLayer(graphicLayer)
const primitive = new mars3d.graphic.BoxPrimitive({
  position: [116.244399, 30.920459, 573.6],
  style: {
    dimensions: new Cesium.Cartesian3(800.0, 600.0, 1000.0),
    color: "#99FFFF",
    opacity: 0.4
  },
  attr: { remark: "示例3" }
})
graphicLayer.addGraphic(primitive)
window.etopMap.flyToUtils.flyToGraphic(primitive)
//飞行至坐标数组
const positions = [
[117.220337, 31.832987, 42.8],
[117.220242, 31.835234, 45.6],
[117.216263, 31.835251, 39.3],
[117.217219, 31.819929, 35.8],
[117.223096, 31.818342, 29.8],
[117.249686, 31.818964, 40.1],
[117.263171, 31.816664, 35.2],
[117.278695, 31.816107, 35.5],
[117.279826, 31.804185, 34.5],
[117.286308, 31.804112, 29.2],
[117.28621, 31.801059, 24.6]
]
window.etopMap.flyToUtils.flyToPositions(Cesium.Cartesian3.fromDegreesArrayHeights(positions.flat()))
