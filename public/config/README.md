### mars3d类对象中获取原生Cesium对象

| mars3d类                                                     | 内部Cesium对象                                               | 说明                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------- |
| [mars3d.Map](http://mars3d.cn/api/Map.html#viewer)           | [map.viewer](http://mars3d.cn/api/cesium/Viewer.html)        | 地球主对象                                     |
| [mars3d.layer.BaseTileLayer](http://mars3d.cn/api/BaseTileLayer.html#layer) | [tileLayer.layer ](http://mars3d.cn/api/cesium/ImageryLayer.html)和 [tileLayer.imageryProvider](http://mars3d.cn/api/cesium/ImageryProvider.html) | 瓦片图层对象                                   |
| [mars3d.layer.TilesetLayer](http://mars3d.cn/api/TilesetLayer.html#tileset) | [tilesetLayer.tileset ](http://mars3d.cn/api/cesium/Cesium3DTileset.html)(在readyPromise异步获取使用) | 3dtiles三维模型图层                            |
| [mars3d.graphic.BaseGraphic](http://mars3d.cn/api/BaseGraphic.html#czmObject) | graphic.czmObject (不同子类实现)                             | 矢量数据对象，不同子类中实现，比如下面 Polygon |
| [mars3d.graphic.PolygonEntity](http://mars3d.cn/api/PolygonEntity.html#entity) | [graphic.czmObject ](http://mars3d.cn/api/cesium/Entity.html)或 [graphic.entity](http://mars3d.cn/api/cesium/Entity.html) | Entity矢量数据对象，其他类型使用相似           |
| [mars3d.graphic.PolygonPrimitive](http://mars3d.cn/api/PolygonPrimitive.html#primitive) | [graphic.czmObject ](http://mars3d.cn/api/cesium/Primitive.html)或 [graphic.primitive](http://mars3d.cn/api/cesium/Primitive.html) | Primitive矢量数据对象，其他类型使用相似        |



### mars3d.Map类 参数说明

| 参数名     | 类型                    | 参数解释                                  |
| ---------- | ----------------------- | ----------------------------------------- |
| id         | String 或 Cesium.Viewer | 地图容器的div的id或已经构造好的viewer对象 |
| mapOptions | Object                  | 创建地球的参数                            |

### mapOptions 参数包括：

| 参数名   | 类型   | 参数API                                                      | 说明     |
| -------- | ------ | ------------------------------------------------------------ | -------- |
| scene    | Object | [参数清单](http://mars3d.cn/api/Map.html#.sceneOptions) | 场景     |
| control  | Object | [参数清单](http://mars3d.cn/api/Map.html#.controlOptions) | 控件     |
| terrain  | Object | [参数清单](http://mars3d.cn/api/Map.html#.terrainOptions) | 地形     |
| basemaps | Array  | [参数清单](http://mars3d.cn/api/Map.html#.basemapOptions) | 底图图层 |
| layers   | Array  | [参数清单](http://mars3d.cn/api/Map.html#.layerOptionsmap) | 图层     |




```js
// 创建三维地球场景
var map = new mars3d.Map('mars3dContainer', {
  scene: { // 场景
    //默认视角参数
    // center: { "x": 114.17, "y": 22.65, "z": 100000, "pitch": -90, "roll": 0},
    center:{ lat: 30.054604, lng: 108.885436, alt: 17036414, heading: 0, pitch: -90 },
    shadows: false, //是否启用日照阴影
    removeDblClick: true, //是否移除Cesium默认的双击事件

    //以下是Cesium.Viewer所支持的options【控件相关的写在另外的control属性中】
    sceneMode: 3, //3等价于Cesium.SceneMode.SCENE3D,

    //以下是Cesium.Scene对象相关参数
    showSun: true, //是否显示太阳
    showMoon: true, //是否显示月亮
    showSkyBox: true, //是否显示天空盒
    showSkyAtmosphere: true, //是否显示地球大气层外光圈
    fog: true, //是否启用雾化效果
    fxaa: true, //是否启用抗锯齿

    //以下是Cesium.Globe对象相关参数
    globe: {
      depthTestAgainstTerrain: false, //是否启用深度监测
      baseColor: '#546a53', //地球默认背景色
      showGroundAtmosphere: true, //是否在地球上绘制的地面大气
      enableLighting: false //是否显示昼夜区域
    },
    //以下是Cesium.ScreenSpaceCameraController对象相关参数
    cameraController: {
      zoomFactor: 3.0, //鼠标滚轮放大的步长参数
      minimumZoomDistance: 1, //地球放大的最小值（以米为单位）
      maximumZoomDistance: 50000000, //地球缩小的最大值（以米为单位）
      enableRotate: true, //2D和3D视图下，是否允许用户旋转相机
      enableTranslate: true, //2D和哥伦布视图下，是否允许用户平移地图
      enableTilt: true, // 3D和哥伦布视图下，是否允许用户倾斜相机
      enableZoom: true, // 是否允许 用户放大和缩小视图
      enableCollisionDetection: true //是否允许 地形相机的碰撞检测
    }
  },
  control: { //控件
    baseLayerPicker: true, //basemaps底图切换按钮
    homeButton: true, //视角复位按钮
    sceneModePicker: true, //二三维切换按钮
    navigationHelpButton: true, //帮助按钮
    fullscreenButton: true, //全屏按钮 
  },
  terrain: { // 地形
    url: 'http://data.mars3d.cn/terrain',
    show: true
  },
  basemaps: [ // 底图图层
    {
      name: '天地图卫星',
      icon: 'img/basemaps/tdt_img.jpg',
      type: 'tdt',
      layer: 'img_d',
      key: ['9ae78c51a0a28f06444d541148496e36'],
      show: true
    }
  ]
})
```