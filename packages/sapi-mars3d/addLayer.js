import * as mars3d from "mars3d";

// 创建一个图层对象 ，并调用map.addLayer添加到地图上
//用工厂方法，指定type来创建图层对象
var layer = mars3d.LayerUtil.create({
  type: 'xyz',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.jpg',
  subdomains: 'abc', 
}) 
map.addLayer(layer)

//直接创建具体类型的图层对象
var  tileLayer = new mars3d.layer.XyzLayer({
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.jpg',
  subdomains: 'abc', 
})
map.addLayer(tileLayer)


// 图层主要分以下几大类

// 地形图层 TerrainLayer， 三维地图场景 的 基石和骨骼
// 栅格瓦片图层 BaseTileLayer，三维地图场景 的 皮肤
// 矢量数据图层 GraphicLayer，业务数据的叠加
// 三维模型图层 TilesetLayer，呈现更细节的三维
// 图层组 GroupLayer，方便组合管理
// 其他可视化图层