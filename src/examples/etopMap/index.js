/* eslint-disable */
import Layer from './layer' // 图层管理
import * as turf from '@turf/turf'
import axios from '@/hooks/axios'
import { showStandColumn } from './js/landForeducation3D'
import { showStandColumn2D } from './js/landForeducation2D'
import { addEmergencyFun } from './js/emergency'
import { getBorderFeatureByPoint } from './js/borderFeature'
import yqMixin from './js/yqMixin.js'
import regionMask from './js/regionMask.js'
import mapDraw from './js/mapDraw'
import { addGeojsonLayer, addEtopGeojsonLayer } from './layer/geoJsonLayer'
import polylineUtils from './js/polylineUtils'
import etopMapUtils from './js/etopMapUtils'
import educationLayerUtils from './layer/educationLayerUtils'
import ControlUtils from './js/ControlUtils'
import BaseBoxEntityUtils from './js/BaseBoxEntityUtils'
import flyToUtils from './js/flyToUtils.js'
import tiandituUtils from './js/tiandituUtils.js'
import terrainUtils from './js/terrainUtils.js'
import BaseRoamLineUtils from './js/BaseRoamLineUtils'
import TilesetUtils from './js/TilesetUtils'
import * as mars3d from 'mars3d'

class EtopMap {
  constructor(map, options) {
    this.map = map
    //开启显式渲染
    map.scene.requestRenderMode = true
    //将turf绑定全局
    map.turf = turf
    // 滤镜
    // const fs = "uniform sampler2D colorTexture;\n" +
    //            "varying vec2 v_textureCoordinates;\n" +
    //            "void main() {\n" +
    //              "vec4 color = texture2D(colorTexture, v_textureCoordinates);\n" +
    //              "color = vec4(color.rgb + 0.1, 1.0);\n" +
    //              "gl_FragColor = vec4(color.r * 0.85, color.g, color.b + 0.1, 1.0);\n" +
    //             "}\n";
    // this.map.viewer.scene.postProcessStages.add(new Cesium.PostProcessStage({
    //   fragmentShader: fs
    // }));
    // 绑定相机移动事件
    this.bigScale = (options && options.bigScale) || 1
    this.scaleType = options.scaleType

    const camera = this.map.viewer.camera
    camera.percentageChanged = 0.2
    camera.changed.addEventListener(() => {
      // 根据相机高度控制行政区遮罩和标注的显隐
      const coor = Cesium.Cartographic.fromCartesian(camera.position)
      const height = coor.height
      const xzqLayer = this.layer.getLayerById('xzqMask')
      const szwall = this.layer.getLayerById('szwall')
      if (height < 50000) {
        if (xzqLayer) {
          xzqLayer.show = false
        }
        if (this.xzqLabels) {
          this.xzqLabels.show = false
        }
        if (szwall) {
          szwall.show = false
        }
        // 显示深圳市倾斜摄影
        if (this.photography) {
          this.photography.show = true
        }
        // 显示规自局蓝色底图
        if (this.gzBlueLayer) {
          this.gzBlueLayer.show = true
        }
        // 显示规自局白色底图
        if (this.gzWhiteLayer) {
          this.gzWhiteLayer.show = true
        }
        // 显示规自局影像底图
        if (this.gzSatellite) {
          this.gzSatellite.show = true
        }
        //显示深汕规自局影像底图
        if (this.gzSatelliteST) {
          this.gzSatelliteST.show = true
        }
        // 显示全市白模
        // if (this.whiteModel) {
        //   this.whiteModel.show = true
        // }
      } else {
        if (xzqLayer) {
          xzqLayer.show = true
        }
        if (this.xzqLabels) {
          this.xzqLabels.show = true
        }
        if (szwall) {
          szwall.show = true
        }
        // 隐藏深圳市倾斜摄影
        if (this.photography) {
          this.photography.show = false
        }
        // 隐藏规自局蓝色底图
        if (this.gzBlueLayer) {
          this.gzBlueLayer.show = false
        }
        // 隐藏规自局白色底图
        if (this.gzWhiteLayer) {
          this.gzWhiteLayer.show = false
        }
        // 隐藏规自局影像底图
        if (this.gzSatellite) {
          this.gzSatellite.show = false
        }
        // 隐藏深汕规自局影像底图
        if (this.gzSatelliteST) {
          this.gzSatelliteST.show = false
        }
        // 隐藏全市白模
        // if (this.whiteModel) {
        //   this.whiteModel.show = true
        // }
      }

      if (this.whiteModel) {
        if (this.map.level < 14) {
          //隐藏全市白模
          this.whiteModel.show = false
        } else {
          //显示全市白模
          this.whiteModel.show = true
          this.whiteModel.style = new Cesium.Cesium3DTileStyle({
            color: 'color("#fff",0.4)'
          })
        }
      }
      // // 地图视口限制在一定范围
      // const rect = camera.computeViewRectangle()
      // const range = new Cesium.Rectangle(
      //   Cesium.Math.toRadians(113.57),
      //   Cesium.Math.toRadians(22.221698),
      //   Cesium.Math.toRadians(115.477587),
      //   Cesium.Math.toRadians(23.1)
      // )
      // if (rect.west < range.west) {
      //   rect.west = range.west
      //   camera.setView({
      //     destination: rect
      //   })
      // }
      // if (rect.south < range.south) {
      //   rect.south = range.south
      //   camera.setView({
      //     destination: rect
      //   })
      // }
      // if (rect.east > range.east) {
      //   rect.east = range.east
      //   camera.setView({
      //     destination: rect
      //   })
      // }
      // if (rect.north > range.north) {
      //   rect.north = range.north
      //   camera.setView({
      //     destination: rect
      //   })
      // }
    })
    this.layer = new Layer(map, { bigScale: this.bigScale })
    this.mapDraw = mapDraw
    this.polylineUtils = polylineUtils
    this.etopMapUtils = etopMapUtils
    this.controlUtils = new ControlUtils(map)
    this.baseBoxEntityUtils = new BaseBoxEntityUtils(map)
    this.baseRoamLineUtils = new BaseRoamLineUtils(map)
    this.tilesetUtils = new TilesetUtils(map)
    this.educationLayerUtils = educationLayerUtils
    this.flyToUtils = flyToUtils
    this.terrainUtils = terrainUtils
    this.tiandituUtils = tiandituUtils

    //监听浏览器视口变化
    // window.addEventListener('resize', () => {
    //   this.resizeViewPort(window.isSZ)
    // })
  }

  get viewer() {
    return this.map.viewer
  }

  get scene() {
    return this.map.viewer.scene
  }

  get camera() {
    return this.map.viewer.camera
  }

  get canvas() {
    return this.map.viewer.scene.canvas
  }

  get dataSources() {
    return this.map.viewer.dataSources
  }

  get imageryLayers() {
    return this.map.viewer.imageryLayers
  }

  get terrainProvider() {
    return this.map.viewer.terrainProvider
  }

  get entities() {
    return this.map.viewer.entities
  }

  //变焦时相机位置的最大值（以米为单位）。该值是相机与地表(含地形)的相对距离。
  initMaximumZoomDistance(value) {
    this.map.viewer.scene.screenSpaceCameraController.maximumZoomDistance = value
  }

  resizeViewPort(isSZ) {
    axios.get('/jsons/keyAreas/map/szxzq4.geojson').then((res) => {
      res.data.features = res.data.features.filter((item) => {
        if (isSZ) {
          return item.properties.QUNAME !== '深汕合作区'
        } else {
          return item.properties.QUNAME == '深汕合作区'
        }
      })
      const bbox = turf.bbox(res.data)
      this.map.viewer.camera.flyTo({
        destination: new Cesium.Rectangle(
          Cesium.Math.toRadians(bbox[0] - 0.25),
          Cesium.Math.toRadians(bbox[1] - 0.25),
          Cesium.Math.toRadians(bbox[2] + 0.25),
          Cesium.Math.toRadians(bbox[3] + 0.25)
        ),
        duration: 0.5
      })
    })
  }

  // 添加规自局的深圳市蓝色版电子地图
  addGzBlueLayer() {
    this.rmGzBlueLayer()
    const option = {
      name: '深圳市电子地图蓝色版（4490）',
      url: 'http://10.253.102.69/gw/OGC/Map/YWTG_SZ_VEC/rest/YWTG:YWTG/EPSG:4490/EPSG:4490:{sz}/{y}/{x}?format=image/png',
      headers: {
        'szvsud-license-key': 'yO+ChHjBx7FZmtGQnUVVCVe8JcKfj0ggEmqjUkBrTOEk9EF+j3Nk65pqSo5W8+Qz'
      }
    }
    this.gzBlueLayer = this.addGzXyzLayer(option)
  }

  // 移除规自局的深圳市蓝色版电子地图
  rmGzBlueLayer() {
    if (!this.gzBlueLayer) {
      return
    }
    this.map.viewer.imageryLayers.remove(this.gzBlueLayer)
    this.gzBlueLayer = null
  }

  // 添加规自局的深圳市白色版电子地图
  addGzWhiteLayer() {
    this.rmGzWhiteLayer()
    const option = {
      name: '深圳市电子地图底图淡白色版(4490)',
      url: 'http://10.253.102.69/gw/OGC/Map/SZ_VEC_W4490/rest/w_shenzhen/EPSG:4490/EPSG:4490:{sz}/{y}/{x}?format=image/png',
      headers: {
        'szvsud-license-key': 'yO+ChHjBx7FZmtGQnUVVCVe8JcKfj0ggEmqjUkBrTOEk9EF+j3Nk65pqSo5W8+Qz'
      }
    }
    this.gzWhiteLayer = this.addGzXyzLayer(option)
  }

  // 移除规自局的深圳市白色版电子地图
  rmGzWhiteLayer() {
    if (!this.gzWhiteLayer) {
      return
    }
    this.map.viewer.imageryLayers.remove(this.gzWhiteLayer)
    this.gzWhiteLayer = null
  }

  /**
   * @name: addGzXyzLayer
   * @msg: 通过xyz方式加载规自地图，其它数据可能不适用
   * @param {*} option
   * @return {*}
   */
  addGzXyzLayer(option) {
    const res = new Cesium.Resource({
      url: option.url,
      headers: option.headers
    })
    const imageryProvider = new Cesium.UrlTemplateImageryProvider({
      url: res,
      name: option.name,
      tilingScheme: new Cesium.GeographicTilingScheme(),
      minimumLevel: 0,
      maximumLevel: 17,
      customTags: {
        sz: function (imageryProvider, x, y, level) {
          return level - 9
        }
      }
    })
    const imageryLayer = this.map.viewer.imageryLayers.addImageryProvider(imageryProvider)
    const height = Cesium.Cartographic.fromCartesian(this.map.viewer.camera.position).height
    if (height >= 60000) {
      imageryLayer.show = false
    }
    return imageryLayer
  }

  // 添加规自局的深圳市航空影像
  addGzSatellite() {
    this.rmGzSatellite()
    const option = {
      id: 'gzSatellite',
      name: '深圳市航空影像(2020年)',
      url: 'http://10.253.102.69/gw/OGC/Map/SZ_IMG_2020/{z}/{x}/{y}',
      minimumLevel: 0, //瓦片所支持的最低层级，如果数据没有第0层，该参数必须配置,当地图小于该级别时，平台不去请求服务数据
      maximumLevel: 17, // 瓦片所支持的最大层级,大于该层级时会显示上一层拉伸后的瓦片，当地图大于该级别时，平台不去请求服务数据。
      // minimumTerrainLevel: 0, //展示影像图层的最小地形细节级别，小于该级别时，平台不显示影像数据。
      // maximumTerrainLevel: 18 //展示影像图层的最大地形细节级别，大于该级别时，平台不显示影像数据。
      subdomains: '1234',
      headers: {
        'szvsud-license-key': 'yO+ChHjBx7FZmtGQnUVVCVe8JcKfj0ggEmqjUkBrTOEk9EF+j3Nk65pqSo5W8+Qz'
      }
    }
    this.gzSatellite = new mars3d.layer.XyzLayer(option)
    const height = Cesium.Cartographic.fromCartesian(this.map.viewer.camera.position).height
    if (height > 50000) {
      this.gzSatellite.show = false
    }
    this.map.addLayer(this.gzSatellite)
    this.addGzSatelliteST()
  }

  // 移除规自局的深圳市航空影像
  rmGzSatellite() {
    if (!this.gzSatellite) {
      return
    }
    this.map.removeLayer(this.gzSatellite)
    this.gzSatellite = null
  }

  // 添加规自局的深汕区航空影像
  addGzSatelliteST() {
    this.rmGzSatelliteST()
    const option = {
      id: 'gzSatelliteST',
      name: '深汕区航空影像(2019年)',
      url: 'http://10.253.102.69/gw/OGC/Map/SS_IMG_2019/{z}/{x}/{y}',
      minimumLevel: 0, //瓦片所支持的最低层级，如果数据没有第0层，该参数必须配置,当地图小于该级别时，平台不去请求服务数据
      maximumLevel: 17, // 瓦片所支持的最大层级,大于该层级时会显示上一层拉伸后的瓦片，当地图大于该级别时，平台不去请求服务数据。
      // minimumTerrainLevel: 0, //展示影像图层的最小地形细节级别，小于该级别时，平台不显示影像数据。
      // maximumTerrainLevel: 18 //展示影像图层的最大地形细节级别，大于该级别时，平台不显示影像数据。
      subdomains: '1234',
      headers: {
        'szvsud-license-key': 'yO+ChHjBx7FZmtGQnUVVCVe8JcKfj0ggEmqjUkBrTOEk9EF+j3Nk65pqSo5W8+Qz'
      }
    }
    this.gzSatelliteST = new mars3d.layer.XyzLayer(option)
    const height = Cesium.Cartographic.fromCartesian(this.map.viewer.camera.position).height
    if (height > 50000) {
      this.gzSatelliteST.show = false
    }
    this.map.addLayer(this.gzSatelliteST)
  }

  // 移除规自局的深汕区航空影像
  rmGzSatelliteST() {
    if (!this.gzSatelliteST) {
      return
    }
    this.map.removeLayer(this.gzSatelliteST)
    this.gzSatelliteST = null
  }

  // 添加全市白模
  addWhiteModel(options = {}) {
    this.rmWhiteModel()
    const resource = new Cesium.Resource({
      url: 'http://10.253.102.69/gw/TILE_3D_MODEL/sz/shenzhenBM/tileset.json',
      headers: {
        'szvsud-license-key': 'yO+ChHjBx7FZmtGQnUVVCVe8JcKfj0ggEmqjUkBrTOEk9EF+j3Nk65pqSo5W8+Qz'
      }
    })
    this.whiteModel = new Cesium.Cesium3DTileset({
      url: resource
    })
    this.whiteModel.style = new Cesium.Cesium3DTileStyle({
      color: 'color("#fff",0.4)'
    })

    if (options?.clickCallback) {
      const eventHandler = new Cesium.ScreenSpaceEventHandler(this.map.viewer.canvas)
      eventHandler.setInputAction((event) => {
        const pick = this.map.viewer.scene.pick(event.position)

        if (pick && pick.pickId) {
          options.clickCallback(pick, {})
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }

    if (options?.mouseCallback) {
      const eventHandler = new Cesium.ScreenSpaceEventHandler(this.map.viewer.canvas)
      eventHandler.setInputAction((event) => {
        const pick = this.map.viewer.scene.pick(event.endPosition)
        const position = this.map.viewer.scene.pickPosition(event.endPosition)
        const cartographic = new Cesium.Cartographic.fromCartesian(position)
        const longitude = Cesium.Math.toDegrees(cartographic.longitude)
        const latitude = Cesium.Math.toDegrees(cartographic.latitude)

        options.mouseCallback(pick, {
          longitude,
          latitude
        })
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    }

    if (this.map.level < 14) {
      //隐藏全市白模
      this.whiteModel.show = false
    }
    this.map.viewer.scene.primitives.add(this.whiteModel)
    return this.whiteModel
  }

  // 移除全市白模
  rmWhiteModel() {
    if (!this.whiteModel) {
      return
    }
    this.map.viewer.scene.primitives.remove(this.whiteModel)
    this.whiteModel = null
  }

  // 添加深圳市倾斜摄影模型(2020年)
  addPhotography() {
    this.rmPhotography()
    const resource = new Cesium.Resource({
      url: 'http://10.253.102.69/gw/TILE_3D_MODEL/sz/shenzhen/tileset.json',
      headers: {
        'szvsud-license-key': 'yO+ChHjBx7FZmtGQnUVVCVe8JcKfj0ggEmqjUkBrTOEk9EF+j3Nk65pqSo5W8+Qz'
      }
    })
    this.photography = new Cesium.Cesium3DTileset({
      url: resource,
      maximumScreenSpaceError: 16,
      preferLeaves: true,
      skipLevelOfDetail: true,
      skipLevels: 1,
      skipScreenSpaceErrorFactor: 16,
      loadSiblings: true,
      cullRequestsWhileMovingMultiplier: 0.01,
      preloadWhenHidden: true,
      progressiveResolutionHeightFraction: 0.1,
      dynamicScreenSpaceErrorDensity: 500,
      dynamicScreenSpaceErrorFactor: 1,
      dynamicScreenSpaceError: true
    })
    const height = Cesium.Cartographic.fromCartesian(this.map.viewer.camera.position).height
    if (height >= 60000) {
      this.photography.show = false
    }
    this.map.viewer.scene.primitives.add(this.photography)
  }

  // 移除深圳市倾斜摄影模型(2020年)
  rmPhotography() {
    if (!this.photography) {
      return
    }
    this.map.viewer.scene.primitives.remove(this.photography)
    this.photography = null
  }

  /**
   * @name: setMask
   * @msg: 设置蒙版图层，用于遮罩深圳和深汕合作区以外的区域
   * @param {*} geojson geojson格式的数据，与url二选一
   * @param {*} url 与geojson二选一
   * @return {*}
   */
  setMask() {
    axios.get('/jsons/keyAreas/map/outerMask.geojson').then((res) => {
      const features = res.data.features
      const holes = []
      features.forEach((feature, index) => {
        const coors = feature.geometry.coordinates[0][0]
        const hole = {
          positions: []
        }
        coors.forEach((coor) => {
          hole.positions.push(Cesium.Cartesian3.fromDegrees(coor[0], coor[1]))
        })
        holes.push(hole)
      })
      this.map.viewer.entities.add({
        polygon: {
          height: 50,
          hierarchy: {
            positions: Cesium.Cartesian3.fromDegreesArray([80, 0, 80, 40, 150, 40, 150, 0]),
            holes: holes
          },
          material: new Cesium.Color(0.0, 0.0, 0.0, 0.8)
        }
      })
    })
  }

  /**
   * @name: addXzqLayer
   * @msg: 添加行政区遮罩和行政区注记
   */
  addXzqLayer({ isShowWark = true, isAddPrimitives = true }) {
    // 创建行政区遮罩图层
    const layer = new mars3d.layer.GeoJsonLayer({
      id: 'xzqMask'
    })
    const height = Cesium.Cartographic.fromCartesian(this.map.viewer.camera.position).height
    if (height < 50000) {
      layer.show = false
    }
    this.map.addLayer(layer)
    // 添加每个行政区的遮罩
    axios.get('/jsons/keyAreas/map/szxzq4.geojson').then((res) => {
      isShowWark && this.addDeafaultWall(res.data)
      //通过primitives加载边界，2s后移除，提升初始化加载速度
      if (isAddPrimitives) {
        this.addXzqPrimitivesLayer(res)
      }
      //-
      setTimeout(function () {
        const graphics = mars3d.Util.geoJsonToGraphics(res.data, {
          symbol: {
            type: 'polygon',
            styleOptions: {
              fill: true,
              color: '#005AAC',
              opacity: 0.95,
              outline: true,
              outlineStyle: {
                color: '#0092FF',
                width: 3,
                opacity: 1
              },
              arcType: Cesium.ArcType.GEODESIC,
              clampToGround: false
            }
          }
        })
        graphics.forEach((g) => {
          layer.addGraphic(g)
        })
      }, 1000)
    })
    // 添加行政区注记
    axios.get('/jsons/keyAreas/map/qu_centroids.geojson').then((res) => {
      const features = res.data.features
      this.xzqLabels = this.map.viewer.scene.primitives.add(new Cesium.LabelCollection())
      const scale = 0.6 * this.bigScale
      features.forEach((item) => {
        const coordinates = item.geometry.coordinates
        const quName = item.properties.QNAME
        this.xzqLabels.add({
          position: Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], 800),
          text: quName,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10.0, 700000),
          //  scaleByDistance: new Cesium.NearFarScalar(0, 1.0, 700000, 0.1),
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.HorizontalOrigin.Bottom,
          scale,
          showBackground: true,
          backgroundColor: new Cesium.Color(0, 0.35, 0.674, 0)
        })
      })
    })
  }

  /**
   * @name: addXzqLayerNew
   * @msg: 添加行政区遮罩和行政区注记的新方法
   */
  addXzqLayerNew({ isShowWark = true, isAddPrimitives = true }) {
    // 创建行政区遮罩图层
    const layer = new mars3d.layer.GeoJsonLayer({
      id: 'xzqMask'
    })
    const height = Cesium.Cartographic.fromCartesian(this.map.viewer.camera.position).height
    if (height < 60000) {
      layer.show = false
    }
    this.map.addLayer(layer)
    // 添加每个行政区的遮罩
    axios.get('/jsons/keyAreas/map/szxzq4.geojson').then((res) => {
      //isShowWark && this.addDeafaultWall(res.data)
      //通过primitives加载边界，2s后移除，提升初始化加载速度
      if (isAddPrimitives) {
        //this.addXzqPrimitivesLayer(res)
        addXzqPolygon(res.data.features, this.map.viewer.scene)
      }
      //-
      /* setTimeout(function () {
        const graphics = mars3d.Util.geoJsonToGraphics(res.data, {
          symbol: {
            type: 'polygon',
            styleOptions: {
              fill: true,
              color: '#005AAC',
              opacity: 0.95,
              outline: true,
              outlineStyle: {
                color: '#0092FF',
                width: 3,
                opacity: 1
              },
              arcType: Cesium.ArcType.GEODESIC,
              clampToGround: false
            }
          }
        })
        graphics.forEach((g) => {
          layer.addGraphic(g)
        })
      }, 1000) */
    })
    // 添加行政区注记
    axios.get('/jsons/keyAreas/map/qu_centroids.geojson').then((res) => {
      const features = res.data.features
      this.xzqLabels = this.map.viewer.scene.primitives.add(new Cesium.LabelCollection())
      const scale = 0.6 * this.bigScale
      features.forEach((item) => {
        const coordinates = item.geometry.coordinates
        const quName = item.properties.QNAME
        this.xzqLabels.add({
          position: Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], 800),
          text: quName,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10.0, 700000),
          //  scaleByDistance: new Cesium.NearFarScalar(0, 1.0, 700000, 0.1),
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.HorizontalOrigin.Bottom,
          scale,
          showBackground: true,
          backgroundColor: new Cesium.Color(0, 0.35, 0.674, 0)
        })
      })
    })
    // 创建材质，在MaterialAppearance中若不添加基础材质，模型将会透明
    let material = new Cesium.Material.fromType('Color')
    material.uniforms.color = Cesium.Color.WHITE
    // 自定义材质
    const aper = new Cesium.MaterialAppearance({
      flat: true,
      material: material,
      translucent: true,
      closed: false,
      vertexShaderSource: `
            attribute vec3 position3DHigh;
            attribute vec3 position3DLow;
            attribute vec3 normal;
            attribute vec2 st;
            attribute float batchId;
            varying vec3 vNormal;
            void main() {
                vec3 positionWC = position3DHigh + position3DLow;
                vec4 positionMC = czm_inverseModel * vec4(positionWC, 1);
                //将attributes的normal通过varying赋值给了向量vNormal
                vNormal = normal;
                //projectionMatrix是投影变换矩阵 modelViewMatrix是相机坐标系的变换矩阵
                vec4 p = czm_computePosition();
                gl_Position = czm_modelViewProjectionRelativeToEye * p;
            }
        `,
      fragmentShaderSource: `         
            //片元着色器同样需要定义varying vec3 vNormal；
            varying vec3 vNormal;
            void main() {
            //vNormal是一个已经归一化的三维向量
                //float pr = (vNormal.x + 1.0) / 3.0; //pr红色通道值范围为0~1
                //float pg = (vNormal.y + 1.0) / 7.0; //pg绿色通道值范围为0~1
                float pb = (vNormal.z + 1.0) / 4.0; //pb蓝色通道值范围为0~1
                gl_FragColor=vec4(pr, pg, pb, 0.9); //最后设置顶点颜色，点与点之间会自动插值
            }
    `
    })

    //面
    function addXzqPolygon(features, scene) {
      const instances = []
      for (let i = 0; i < features.length; i++) {
        for (let j = 0; j < features[i].geometry.coordinates.length; j++) {
          const polygonArr = features[i].geometry.coordinates[j].toString().split(',')
          const polygon = new Cesium.PolygonGeometry({
            closeTop: false,
            closeBottom: true,
            extrudedHeight: 3500,
            polygonHierarchy: new Cesium.PolygonHierarchy(
              Cesium.Cartesian3.fromDegreesArray(polygonArr)
            ),
            vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
          })
          const geometry = Cesium.PolygonGeometry.createGeometry(polygon)
          instances.push(
            new Cesium.GeometryInstance({
              geometry: geometry,
              attributes: {
                /* color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  new Cesium.Color(0, 0.35, 0.674, 1.0)
                ) */
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  Cesium.Color.fromCssColorString('#005AAC').withAlpha(0.9)
                )
              }
            })
          )
        }
      }

      const primitive = new Cesium.Primitive({
        geometryInstances: instances,
        appearance: new Cesium.PerInstanceColorAppearance({
          flat: true,
          // 为每个instance着色
          translucent: true,
          closed: false
        }),
        //appearance:aper,
        asynchronous: false // 确定基元是异步创建还是阻塞直到准备就绪
      })

      scene.primitives.add(primitive)
      return primitive
    }
  }

  addDeafaultWall(geojson) {
    const wall = new mars3d.layer.GeoJsonLayer({
      data: geojson,
      id: 'szwall',
      symbol: {
        type: 'wallP',
        styleOptions: {
          setHeight: -3000,
          diffHeight: 3000, // 墙高
          materialType: mars3d.MaterialType.Color,
          color: 'rgba(0,146,255,1)',
          opacity: 0.6
        }
      }
    })
    const height = Cesium.Cartographic.fromCartesian(this.map.viewer.camera.position).height
    if (height < 50000) {
      wall.show = false
    }
    this.map.addLayer(wall)
  }

  addWall(geojson) {
    const wall = new mars3d.layer.GeoJsonLayer({
      data: geojson,
      id: 'szwall',
      symbol: {
        type: 'wallP',
        styleOptions: {
          setHeight: -3000,
          diffHeight: 3000, // 墙高
          materialType: mars3d.MaterialType.Color,
          color: 'rgba(0,146,255,1)',
          opacity: 0.6
        }
      }
    })
    this.map.addLayer(wall)
  }

  /**
   * @name: addXzqPrimitivesLayer
   * @msg: 预加载行政区边界
   * @param {*} xzqGeojson 参数 行政区geojson，
   * @return {*}
   */
  addXzqPrimitivesLayer(xzqGeojson) {
    const josnN = xzqGeojson
    const features = xzqGeojson.data.features
    let prim = addXzqPolygon(features, this.map.viewer.scene)
    // let graphicLayer = new mars3d.layer.GraphicLayer()
    // this.map.addLayer(graphicLayer)
    //addXzqPolyline(graphicLayer, features)
    //console.log(graphicLayer)
    setTimeout(function () {
      prim.destroy()
      // graphicLayer.remove(true)
    }, 2500)

    //线边界
    function addXzqPolyline(graphicLayer, features) {
      for (let i = 0; i < features.length; i++) {
        for (let j = 0; j < features[i].geometry.coordinates.length; j++) {
          let coords = features[i].geometry.coordinates
          let coords2 = []
          coords2 = coords[j][0].concat([coords[j][0][0]])
          const polygonArr = coords2.toString().split(',')
          const graphic = new mars3d.graphic.PolylinePrimitive({
            positions: Cesium.Cartesian3.fromDegreesArray(polygonArr),
            style: {
              width: 3,
              color: '#0092FF',
              alpha: 1
            },
            attr: {
              remark: '示例9'
            }
          })
          graphicLayer.addGraphic(graphic)
        }
      }
    }
    //面
    function addXzqPolygon(features, scene) {
      const instances = []
      for (let i = 0; i < features.length; i++) {
        for (let j = 0; j < features[i].geometry.coordinates.length; j++) {
          const polygonArr = features[i].geometry.coordinates[j].toString().split(',')
          const polygon = new Cesium.PolygonGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(
              Cesium.Cartesian3.fromDegreesArray(polygonArr)
            ),
            vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
          })
          const geometry = Cesium.PolygonGeometry.createGeometry(polygon)
          instances.push(
            new Cesium.GeometryInstance({
              geometry: geometry,
              attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  new Cesium.Color(0, 0.35, 0.674, 1.0)
                )
              }
            })
          )
        }
      }

      const primitive = new Cesium.Primitive({
        geometryInstances: instances,
        appearance: new Cesium.PerInstanceColorAppearance({
          // 为每个instance着色
          translucent: true,
          closed: false
        }),
        asynchronous: false // 确定基元是异步创建还是阻塞直到准备就绪
      })

      scene.primitives.add(primitive)
      return primitive
    }
  }
  /**
   * @name: showXZQ
   * @msg: 展示对应的行政区
   * @param {*} options 参数 quname 行政区名称  setMask 是否需要设置蒙版，
   * @return {*}
   */
  showXZQ(options) {
    const xzqLayer = this.layer.getLayerById('xzqMask')
    // 展示整个深圳市
    if (options.quName === '深圳市') {
      // this.map.flyHome({
      //   duration: 1
      // })
      // 将行政区蒙版隐藏
      xzqLayer.show = false
      // 隐藏或显示行政区标注
      for (let i = 0, len = this.xzqLabels.length; i < len; i++) {
        const label = this.xzqLabels.get(i)
        label.show = false
      }
    } else {
      // 将行政区蒙版显示
      xzqLayer.show = true
      // 遍历每个行政区的蒙版
      xzqLayer.eachGraphic((g) => {
        if (g.attr.QUNAME === options.quName) {
          if (options.setMask) {
            // 隐藏对应行政区的蒙版
            g.show = false
          }
          // 地图视口飞到对应的行政区
          this.map.flyToGraphic(g, {
            scale: 1.8,
            heading: options.heading || 0,
            pitch: options.pitch || -90,
            roll: 0, // 相机翻滚角，默认0即可
            duration: 1 // 飞行时间
          })
        } else {
          // 显示对应行政区的蒙版
          g.show = true
        }
      })
      // 隐藏或显示行政区标注
      for (let i = 0, len = this.xzqLabels.length; i < len; i++) {
        const label = this.xzqLabels.get(i)
        if (label.text === options.quName) {
          label.show = false
        } else {
          label.show = true
        }
      }
    }
  }

  // 展示行政区遮罩
  showXZQLayer() {
    // 将行政区蒙版显示
    const xzqLayer = this.layer.getLayerById('xzqMask')
    xzqLayer.show = true
    // 显示每个行政区的蒙版
    xzqLayer.eachGraphic((g) => {
      g.show = true
    })
    this.map.flyHome({
      duration: 1
    })
    // 显示行政区标注
    for (let i = 0, len = this.xzqLabels.length; i < len; i++) {
      const label = this.xzqLabels.get(i)
      label.show = true
    }
  }

  // 添加行政区高亮边界线
  addXZQ(quName, coordinates, type = 'MultiPolygon') {
    // 移除可能已存在的行政区边界线
    this.rmXZQ()
    this.xzqEnts = []
    let rectangle = null
    coordinates.forEach((coor, index) => {
      // 遍历每一个几何部件
      const positions = []
      // 将大地坐标转为空间直角坐标
      if (type === 'MultiPolygon') {
        coor[0].forEach((item) => {
          positions.push(Cesium.Cartesian3.fromDegrees(item[0], item[1]))
        })
      } else if (type === 'Polygon') {
        coor.forEach((item) => {
          positions.push(Cesium.Cartesian3.fromDegrees(item[0], item[1]))
        })
      }

      // 计算BBOX
      if (index == 0) {
        rectangle = Cesium.Rectangle.fromCartesianArray(positions)
      } else {
        const newRect = Cesium.Rectangle.fromCartesianArray(positions)
        rectangle = Cesium.Rectangle.union(rectangle, newRect)
      }

      // 添加每个几何部件构成的边界线Entity
      const xzqEnt = this.map.viewer.entities.add({
        id: '行政区' + quName + index,
        polyline: {
          positions: positions,
          material: Cesium.Color.fromCssColorString('#00FFF9'),
          width: 2,
          // 贴地
          clampToGround: true
        }
      })
      this.xzqEnts.push(xzqEnt)
    })
    // 地图视口飞到对应行政区范围
    this.map.flyToExtent(rectangle, {
      scale: 1.0,
      duration: 1,
      pitch: -90
    })
  }

  // 将行政区高亮边界线设置为深色
  deepColorXZQ() {
    if (!this.xzqEnts || this.xzqEnts.length == 0) {
      return
    }
    for (let i = 0, len = this.xzqEnts.length; i < len; i++) {
      this.xzqEnts[i].polyline.material = Cesium.Color.fromCssColorString('#00FFF9')
    }
  }

  // 将行政区高亮边界线设置为浅色
  lightColorXZQ() {
    if (!this.xzqEnts || this.xzqEnts.length == 0) {
      return
    }
    for (let i = 0, len = this.xzqEnts.length; i < len; i++) {
      this.xzqEnts[i].polyline.material = Cesium.Color.fromCssColorString('rgba(0, 255, 249, 0.3)')
    }
  }

  // 移除行政区高亮边界线
  rmXZQ() {
    // 移除可能已存在的光墙
    this.rmLightWall()
    if (!this.xzqEnts || this.xzqEnts.length == 0) {
      return
    }
    for (let i = 0, len = this.xzqEnts.length; i < len; i++) {
      this.map.viewer.entities.remove(this.xzqEnts[i])
    }
    this.xzqEnts = []
  }

  // 添加街道高亮边界线
  addJieDao(jdName, coordinates, type = 'MultiPolygon') {
    // 移除可能已存在的街道边界线
    this.rmJieDao()
    this.jdEnts = []
    let rectangle = null
    coordinates.forEach((coor, index) => {
      // 遍历每一个几何部件
      const positions = []
      // 将大地坐标转为空间直角坐标
      if (type === 'MultiPolygon') {
        coor[0].forEach((item) => {
          positions.push(Cesium.Cartesian3.fromDegrees(item[0], item[1]))
        })
      } else if (type === 'Polygon') {
        coor.forEach((item) => {
          positions.push(Cesium.Cartesian3.fromDegrees(item[0], item[1]))
        })
      }
      // 计算BBOX
      if (index == 0) {
        rectangle = Cesium.Rectangle.fromCartesianArray(positions)
      } else {
        const newRect = Cesium.Rectangle.fromCartesianArray(positions)
        rectangle = Cesium.Rectangle.union(rectangle, newRect)
      }
      // 添加每个几何部件构成的边界线Entity
      const jdEnt = this.map.viewer.entities.add({
        id: '街道' + jdName + index,
        polyline: {
          positions: positions,
          material: Cesium.Color.fromCssColorString('#00FFF9'),
          width: 2,
          // 贴地
          clampToGround: true
        }
      })
      this.jdEnts.push(jdEnt)
    })
    // 地图视口飞到对应街道范围
    this.map.flyToExtent(rectangle, {
      scale: 1.5,
      duration: 1,
      pitch: -90
    })
  }

  // 将街道高亮边界线设置为深色
  deepColorJieDao() {
    if (!this.jdEnts || this.jdEnts.length == 0) {
      return
    }
    for (let i = 0, len = this.jdEnts.length; i < len; i++) {
      this.jdEnts[i].polyline.material = Cesium.Color.fromCssColorString('#00FFF9')
    }
  }

  // 将街道高亮边界线设置为浅色
  lightColorJieDao() {
    if (!this.jdEnts || this.jdEnts.length == 0) {
      return
    }
    for (let i = 0, len = this.jdEnts.length; i < len; i++) {
      this.jdEnts[i].polyline.material = Cesium.Color.fromCssColorString('rgba(0, 255, 249, 0.3)')
    }
  }

  // 移除街道高亮边界线
  rmJieDao() {
    // 移除可能已存在的光墙
    this.rmLightWall()
    if (!this.jdEnts || this.jdEnts.length == 0) {
      return
    }
    for (let i = 0, len = this.jdEnts.length; i < len; i++) {
      this.map.viewer.entities.remove(this.jdEnts[i])
    }
    this.jdEnts = []
  }

  // 添加高亮社区边界线
  addSheQu(sqName, coordinates) {
    // 移除可能已存在的社区
    this.rmSheQu()
    this.sqEnts = []
    let rectangle = null
    coordinates.forEach((item, index) => {
      // 遍历每一个几何部件
      const positions = []
      if (item[0][0] instanceof Array) {
        item.forEach((el) => {
          el.forEach((ite) => {
            positions.push(Cesium.Cartesian3.fromDegrees(ite[0], ite[1]))
          })
        })
      } else {
        item.forEach((ite) => {
          positions.push(Cesium.Cartesian3.fromDegrees(ite[0], ite[1]))
        })
      }
      // 将大地坐标转为空间直角坐标
      // if (coor.length == 1) {
      //   coor = coor[0]
      // }

      // 计算BBOX
      if (index == 0) {
        rectangle = Cesium.Rectangle.fromCartesianArray(positions)
      } else {
        const newRect = Cesium.Rectangle.fromCartesianArray(positions)
        rectangle = Cesium.Rectangle.union(rectangle, newRect)
      }
      // 添加光墙
      this.addLightWall(positions)
      // 添加每个几何部件构成的边界线Entity
      const sqEnt = this.map.viewer.entities.add({
        id: '社区' + sqName + index,
        polyline: {
          positions: positions,
          material: Cesium.Color.fromCssColorString('#00FFF9'),
          width: 2,
          // 贴地
          clampToGround: true
        }
      })
      this.sqEnts.push(sqEnt)
    })
    // 地图视口飞到对应社区范围
    this.map.flyToExtent(rectangle, {
      scale: 1.5,
      duration: 1,
      pitch: -90
    })
  }

  // 移除社区Entity
  rmSheQu() {
    // 移除可能已存在的光墙
    this.rmLightWall()
    if (!this.sqEnts || this.sqEnts.length == 0) {
      return
    }
    for (let i = 0, len = this.sqEnts.length; i < len; i++) {
      this.map.viewer.entities.remove(this.sqEnts[i])
    }
    this.sqEnts = []
  }

  // 添加光墙
  addLightWall(positions) {
    if (!this.lightWallLayer) {
      this.lightWallLayer = new mars3d.layer.GraphicLayer()
      this.map.addLayer(this.lightWallLayer)
    }
    const wallEntity = new mars3d.graphic.WallEntity({
      positions: positions,
      style: {
        diffHeight: 150,
        material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
          image: require('./images/etop/fence7.png'),
          color: '#00FFF9',
          repeat: new Cesium.Cartesian2(5, 2),
          axisY: true, //方向，true时上下，false左右
          // count: 5,
          speed: 15 //速度，建议取值范围1-100
        })
      }
    })
    this.lightWallLayer.addGraphic(wallEntity)
  }

  // 移除光墙
  rmLightWall() {
    if (!this.lightWallLayer) {
      return
    }
    this.map.removeLayer(this.lightWallLayer, true)
    this.lightWallLayer = null
  }

  /**
   * @name: add3DTiles
   * @msg: 添加3DTiles
   * @param {*} options
   * id: 图层id, url: 3DTiles地址
   * @return {*}
   */
  add3DTiles(option) {
    const tilesetLayer = new mars3d.layer.TilesetLayer({
      id: option.id,
      url: option.url
    })
    this.map.addLayer(tilesetLayer)
  }

  /**
   * @name: rm3DTilesById
   * @msg: 根据id移除对应的3DTile
   * @param {*} id
   * @returns
   */
  rm3DTilesById(id) {
    const tilesetLayer = this.map.getLayerById(id)
    if (!tilesetLayer) {
      return
    }
    this.map.removeLayer(tilesetLayer)
  }

  /**
   * @name: addHeatMap
   * @msg: 添加热力图
   * @param {*} option
   * positions: 带有经纬度、属性值的元素构成的数组
   */
  /**
   *
   * @param {object} option 热力图层参数对象, 包括id, positions(数组对象), radius, blur, gradient(Object), opacity, classificationType, clampGround(Boolean)
   * @param {*} moveCallback 鼠标移动事件的回调, 可以在这里更改绑定的弹框
   * @param {*} clickCallback 鼠标点击事件的回调
   * @returns
   */
  addHeatMap(option, moveCallback, clickCallback) {
    // 热力图 图层
    const heatLayer = new mars3d.layer.HeatLayer({
      id: option.id,
      positions: option.positions,
      // 以下为热力图本身的样式参数，可参阅api：https://www.patrick-wied.at/static/heatmapjs/docs.html
      heatStyle: {
        radius: option.radius || 100,
        blur: option.blur || 0.87,
        gradient: option.gradient || {
          0.7: '#67CC40',
          0.752: '#FDDF05',
          0.8: '#FB7003',
          0.9: '#FC0A00'
        }
      },
      // 以下为矩形矢量对象的样式参数
      style: {
        height: option.height,
        opacity: option.opacity || 0.6,
        classificationType: option.classificationType || Cesium.ClassificationType.BOTH,
        clampToGround: option.clampToGround || false
      }
    })
    // let resetOptions = false
    // this.map.viewer.camera.changed.addEventListener(() => {
    //   const height = Cesium.Cartographic.fromCartesian(
    //     this.map.viewer.camera.position
    //   ).height
    //   if (height < 50000) {
    //     if (resetOptions) return
    //     resetOptions = true
    //     heatLayer.setOptions({ style: { clampToGround: true } })
    //   } else {
    //     if (!resetOptions) return
    //     resetOptions = false
    //     heatLayer.setOptions({ style: { clampToGround: false } })
    //   }
    // })
    this.map.addLayer(heatLayer)

    moveCallback && this.map.on(mars3d.EventType.mouseMove, moveCallback)

    clickCallback && this.map.on(mars3d.EventType.click, clickCallback)

    return heatLayer
  }

  /**
   * @name: rmHeatMapById
   * @msg: 根据id移除热力图
   * @param {*} id
   */
  rmHeatMapById(id) {
    const heatLayer = this.map.getLayerById(id)
    if (!heatLayer) {
      return
    }
    this.map.removeLayer(heatLayer)
  }

  /**
   * @name: setView
   * @msg: 设置相机视角
   * @param {*} options
   * lon 经度， lat 纬度，h 相机高度，heading 相机朝向，pitch 相机俯仰角，roll 相机翻转角（默认0即可）
   * @return {*}
   */
  setView(options) {
    this.map.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(options.lon, options.lat, options.h),
      orientation: {
        heading: Cesium.Math.toRadians(options.heading || 0), // east, default value is 0.0 (north)
        pitch: Cesium.Math.toRadians(options.pitch || -90), // default value (looking down)
        roll: Cesium.Math.toRadians(options.roll || 0) // default value
      }
    })
  }

  // 截图，filename可不传，默认 '场景出图_' + width + 'x' + height
  screenshot(filename) {
    const options = {
      download: true
    }
    if (filename) {
      options.filename = filename
    }
    this.map.expImage(options)
  }

  /**
   * @name: flyToSS
   * @msg: 地图视口飞到深汕合作区
   */
  flyToSS(options) {
    const xzqLayer = this.layer.getLayerById('xzqMask')
    if (!xzqLayer) {
      this.map.setCameraView(
        { lat: 22.86077, lng: 115.051968, alt: 65487, heading: 0, pitch: -90 },
        { duration: 1 }
      )
      return
    }
    xzqLayer.eachGraphic((g) => {
      if (g.attr.QUNAME === '深汕合作区') {
        this.map.flyToGraphic(g, {
          scale: 1.8,
          heading: (options && options.heading) || 0,
          pitch: (options && options.pitch) || -90,
          roll: 0, // 相机翻滚角，默认0即可
          duration: 1 // 飞行时间
        })
      }
    })
  }

  /**
   * @name: setGlobeBaseColor
   * @msg: 设置地球背景色
   * @param {*} colorString 颜色字符串
   * @param {*} opacity 透明度
   * @return {*}
   */
  setGlobeBaseColor(colorString, opacity) {
    this.viewer.scene.globe.baseColor =
      Cesium.Color.fromCssColorString(colorString).withAlpha(opacity)
  }

  /**
   * @name: zoomToXzq
   * @msg: 地图视口缩放到对应行政区
   * @param {*} quName  行政区名
   * @return {*}
   */
  zoomToXzq(quName) {
    if (quName === '深圳市') {
      // 地图回到初始化视图
      this.map.flyHome({
        duration: 1
      })
    } else {
      axios.get('/jsons/keyAreas/map/szxzq4.geojson').then((res) => {
        res.data.features.forEach((item) => {
          if (quName === item.properties.QUNAME) {
            const bbox = turf.bbox(item.geometry)
            this.map.viewer.camera.flyTo({
              destination: new Cesium.Rectangle(
                Cesium.Math.toRadians(bbox[0]),
                Cesium.Math.toRadians(bbox[1]),
                Cesium.Math.toRadians(bbox[2]),
                Cesium.Math.toRadians(bbox[3])
              )
            })
          }
        })
      })
    }
  }

  /**
   * @name: zoomToFeature
   * @msg: 地图视口缩放到指定要素
   * @param {*} column 字段名
   * @param {*} value 字段值
   * @return {*}
   */
  zoomToFeature(column, value) {
    const wfsUrl =
      '/topMapServer/geoserver/wfs?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature' +
      '&TYPENAME=gxj_20:eduland&OUTPUTFORMAT=application/json&' +
      'cql_filter=' +
      column +
      "='" +
      value +
      "'"
    axios.get(wfsUrl).then((res) => {
      const geometry = res.data.features[0].geometry
      const bbox = turf.bbox(geometry)
      this.map.viewer.camera.flyTo({
        destination: new Cesium.Rectangle(
          Cesium.Math.toRadians(bbox[0]),
          Cesium.Math.toRadians(bbox[1]),
          Cesium.Math.toRadians(bbox[2]),
          Cesium.Math.toRadians(bbox[3])
        )
      })
    })
  }

  /**
   * @name: addWmsLayer
   * @msg: 添加wms图层
   * @param {*} options wms图层选项
   * @param {*} clearFlag 加载图层前，是否清楚图层
   * @param  点击回调方法
   * @return {*}
   */
  addWmsLayer(options, clearFlag = true, clickCallback) {
    if (clearFlag) {
      this.rmLayerById(options.id)
    }
    const wmsLayer = new mars3d.layer.WmsLayer({
      id: options.id,
      url: options.url,
      layers: options.layers,
      zIndex: options.zIndex || 0,
      parameters: {
        format: options.format,
        transparent: true
      },
      show: true
    })
    this.map.addLayer(wmsLayer)
    if (clickCallback) {
      wmsLayer.on(mars3d.EventType.click, function (event) {
        clickCallback(event)
      })
    }
  }

  /**
   * @name: addEduXWLabel
   * @msg: 添加教育用地图标
   * @param {*} column 用于筛选的字段
   * @param {*} values 用于筛选的值构成的数组
   * @return {*}
   */
  addEduXWLabel(column, values) {
    let valStr = ''
    values.forEach((item) => {
      valStr += "'" + item + "', "
    })
    valStr = valStr.substring(0, valStr.length - 2)
    const wfsUrl =
      '/topMapServer/geoserver/wfs?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature' +
      '&TYPENAME=gxj_20:eduland&OUTPUTFORMAT=application/json&' +
      'cql_filter=' +
      column +
      ' in (' +
      valStr +
      ')'
    axios.get(wfsUrl).then((res) => {
      this.eduXWBills = new Cesium.BillboardCollection()
      const scale = 0.3 * this.bigScale
      res.data.features.forEach((item) => {
        const geometry = item.geometry
        const centroid = turf.centroid(geometry)
        const coor = centroid.geometry.coordinates
        this.eduXWBills.add({
          id: item.properties.PLOT_NO,
          image: require('./images/etop/eduLand.png'),
          position: Cesium.Cartesian3.fromDegrees(coor[0], coor[1]),
          scale,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10.0, 50000)
        })
      })
      this.map.viewer.scene.primitives.add(this.eduXWBills)
    })
  }

  /**
   * @name: rmLayerById
   * @msg: 通过id移除图层
   * @param {*} id 图层id
   * @return {*}
   */
  rmLayerById(id) {
    const layer = this.map.getLayerById(id)
    if (layer) {
      this.map.removeLayer(layer)
    }
  }

  /**
   * @name: filterWmsLayer
   * @msg: 对wms图层进行过滤操作
   * @param {*} layerId 图层id
   * @param {*} column 字段名
   * @return {*}
   */
  filterWmsLayer(layerId, column, values) {
    const wmsLayer = this.map.getLayerById(layerId)
    if (wmsLayer) {
      const options = wmsLayer.options
      let valStr = ''
      values.forEach((item) => {
        valStr += "'" + item + "', "
      })
      valStr = valStr.substring(0, valStr.length - 2)
      options.parameters.cql_filter = column + ' in (' + valStr + ')'
      wmsLayer.setOptions(options)
    }
  }

  // 添加应急事件点
  addEmergency(eventPos, emerPosArr) {
    if (!this.emerLayer) {
      this.emerLayer = new mars3d.layer.GraphicLayer()
      this.map.addLayer(this.emerLayer)
    }
    const eventPrimitive1 = new mars3d.graphic.CirclePrimitive({
      position: new mars3d.LatLngPoint(eventPos[0], eventPos[1], 100),
      style: {
        radius: 1000.0,
        color: '#FF0000',
        opacity: 0.4,
        outlineColor: '#FF0000'
      }
    })
    this.emerLayer.addGraphic(eventPrimitive1)

    const eventPrimitive2 = new mars3d.graphic.EllipsoidPrimitive({
      position: new mars3d.LatLngPoint(eventPos[0], eventPos[1], 100),
      style: {
        radii: new Cesium.Cartesian3(2000, 2000, 2000),
        innerRadii: new Cesium.Cartesian3(1000, 1000, 1000),
        minimumCone: Cesium.Math.toRadians(89.8),
        maximumCone: Cesium.Math.toRadians(90.2),
        color: '#F9E900',
        opacity: 0.4,
        outlineColor: '#F9E900'
      }
    })
    this.emerLayer.addGraphic(eventPrimitive2)
    const eventPrimitive3 = new mars3d.graphic.EllipsoidPrimitive({
      position: new mars3d.LatLngPoint(eventPos[0], eventPos[1], 100),
      style: {
        radii: new Cesium.Cartesian3(4000, 4000, 4000),
        innerRadii: new Cesium.Cartesian3(2000, 2000, 2000),
        minimumCone: Cesium.Math.toRadians(89.8),
        maximumCone: Cesium.Math.toRadians(90.2),
        color: '#00D0FF',
        opacity: 0.4,
        outlineColor: '#00D0FF'
      }
    })
    this.emerLayer.addGraphic(eventPrimitive3)

    addEmergencyFun(this.map, {
      colors: null,
      rounds: [],
      lng: eventPos[0],
      lat: eventPos[1],
      height: 100
    })
    if (!this.emerBills) {
      this.emerBills = new Cesium.BillboardCollection()
      this.map.viewer.scene.primitives.add(this.emerBills)
    }
    this.emerBills.add({
      image: require('./images/etop/icon_zhongdaweixianyuan.png'),
      position: Cesium.Cartesian3.fromDegrees(eventPos[0], eventPos[1], 300),
      scale: 0.5
    })
    this.emerBills.add({
      image: require('./images/etop/icon_jiayouzhan.png'),
      position: Cesium.Cartesian3.fromDegrees(eventPos[0] + 0.01, eventPos[1] + 0.01, 300),
      scale: 0.5
    })
    this.emerBills.add({
      image: require('./images/etop/icon_jingbeidui.png'),
      position: Cesium.Cartesian3.fromDegrees(eventPos[0] + 0.02, eventPos[1] - 0.02, 300),
      scale: 0.5
    })
    this.emerBills.add({
      image: require('./images/etop/icon_shipin.png'),
      position: Cesium.Cartesian3.fromDegrees(eventPos[0] - 0.01, eventPos[1] + 0.02, 300),
      scale: 0.5
    })
  }

  //基础教育用地3D浮窗----返回educationLayer对象
  addLandForeducation3D(data, colors, length, width, totalHeight) {
    if (!this.educationLayer) {
      this.educationLayer = new mars3d.layer.GraphicLayer()
      this.map.addLayer(this.educationLayer)
    }
    showStandColumn(this.educationLayer, data, colors, length, width, totalHeight)
    return this.educationLayer
  }

  addLandForeducation2D(data, colors, length, totalHeight) {
    if (!this.educationColumnLayer) {
      this.educationColumnLayer = new mars3d.layer.DivLayer()
      this.map.addLayer(this.educationColumnLayer)
    }
    try {
      showStandColumn2D(this.educationColumnLayer, data, colors, length, totalHeight)
    } catch (error) {
      console.error('addLandForeducation2D', error)
    }
    return this.educationColumnLayer
  }

  //地图添加视角
  setCameraViewHander(cameraView, cameraOptions) {
    this.map.setCameraView({ ...this.map.getCameraView(), ...cameraView }, { ...cameraOptions })
  }

  //添加遮盖点击事件
  onXzqMaskClickHander(callback) {
    const xzqLayer = this.layer.getLayerById('xzqMask')
    xzqLayer.on(mars3d.EventType.click, callback)
  }

  //移除遮盖点击事件
  offXzqMaskClickHander(callback) {
    const xzqLayer = this.layer.getLayerById('xzqMask')
    xzqLayer.off(mars3d.EventType.click, callback)
  }

  //遮盖鼠标移入事件
  onXzqMaskMouseOverHander(callback) {
    const xzqLayer = this.layer.getLayerById('xzqMask')
    xzqLayer.on(mars3d.EventType.mouseOver, callback)
  }

  //遮盖鼠标移出事件
  onXzqMaskMouseOutHander(callback) {
    const xzqLayer = this.layer.getLayerById('xzqMask')
    xzqLayer.off(mars3d.EventType.mouseOut, callback)
  }

  //鼠标点击地图空白事件
  clickMap(callback) {
    this.map.on(mars3d.EventType.clickMap, callback)
  }

  //移除鼠标点击地图空白事件
  rmClickMap(callback) {
    this.map.off(mars3d.EventType.clickMap, callback)
  }

  //地图鼠标移动事件
  mouseMoveMap(callback) {
    this.map.on(mars3d.EventType.mouseMove, callback)
  }

  //移除地图鼠标移动事件
  rmMouseMoveMap(callback) {
    this.map.off(mars3d.EventType.mouseMove, callback)
  }

  //开启缩放
  enableCameraZoom() {
    this.map.scene.screenSpaceCameraController.enableZoom = true
  }

  //禁止缩放
  unableCameraZoom() {
    this.map.scene.screenSpaceCameraController.enableZoom = false
  }

  addDivLayer(data, options = {}, clickCallback) {
    if (!(data && data.length > 0)) return
    // 添加总览图层
    try {
      const divLayer = new mars3d.layer.DivLayer()
      this.map.addLayer(divLayer)
      const offsetX = options && options.offsetX ? options.offsetX * this.bigScale : 0
      const offsetY = options && options.offsetY ? options.offsetY * this.bigScale : 0
      data.forEach((item) => {
        if (item.html) {
          item.div_html = item.html

          if (this.scaleType === 'today') {
            //今日深圳适配
            item.div_html =
              '<div style="transform: scale(' +
              this.bigScale +
              ') translateZ(10px); transform-origin:0 center;pointer-events:all">' +
              item.div_html +
              '</div>'
          } else {
            //陈辉版适配
            if (this.bigScale > 1) {
              item.div_html =
                '<div style="transform: scale(2) translateZ(10px) translate(25%, 25%)">' +
                item.div_html +
                '</div>'
            }
          }

          const graphic = new mars3d.graphic.DivGraphic({
            position: item.position,
            pointerEvents: true,
            attr: {
              ...item
            },
            style: {
              html: item.div_html,
              horizontalOrigin:
                options.horizontalOrigin === 0
                  ? 0
                  : options.horizontalOrigin || Cesium.HorizontalOrigin.LEFT,
              verticalOrigin:
                options.verticalOrigin === 0
                  ? 0
                  : options.verticalOrigin || Cesium.VerticalOrigin.CENTER,
              offsetX,
              offsetY,
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                options.distanceDisplayConditionMin || 0,
                options.distanceDisplayConditionMax || 999999999999
              ) //按视距距离显示
            }
          })
          divLayer.addGraphic(graphic)
        }
      })
      if (clickCallback) {
        // 在layer上绑定监听事件
        divLayer.on(mars3d.EventType.click, function (event) {
          clickCallback(event)
        })
      }
      return divLayer
    } catch (error) {
      console.error('addDivLayer', error)
      return
    }
  }

  /**
   * @name: removeLayerByLayerId
   * @msg: 根据图层id移除对应的图层
   * @param {*} layerId
   * @returns
   */
  removeLayerByLayerId(layerId) {
    let layer = this.map.getLayerById(layerId)
    if (!layer) {
      return
    }
    layer.clear()
    this.map.removeLayer(layer, true)
    layer = null
  }

  /**
   * @name: removeLayerByLayer
   * @msg: 根据图层移除对应的图层
   * @param {*} layer
   * @returns
   */
  removeLayerByLayer(layer) {
    if (!layer) {
      return
    }
    layer.clear()
    this.map.removeLayer(layer, true)
    layer = null
  }

  addMarkLayer(list, clickCallback, options = {}) {
    if (!(list && list.length > 0)) return
    // 创建矢量数据图层
    try {
      const graphicLayer = new mars3d.layer.GraphicLayer({
        clampToGround: options.clampToGround ? options.clampToGround : false,
        clustering: options.clustering ? options.clustering : null
      })
      // 高亮时的样式（默认为})
      this.map.addLayer(graphicLayer)
      const scale = (options.styleOptions?.scale || 0.5) * this.bigScale
      const highlightScale = (options.styleOptions?.highlightScale || 0.8) * this.bigScale
      list.forEach((item) => {
        const graphic = new mars3d.graphic.BillboardPrimitive({
          name: item.name,
          position: item.position,
          style: {
            image: item.image,
            scale,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            clampToGround: options.clampToGround ? options.clampToGround : false,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
            highlight: {
              type: mars3d.EventType.click,
              scale: highlightScale
            }
          },
          attr: { ...item }
        })
        graphicLayer.addGraphic(graphic)
      })
      const _map = this.map
      if (clickCallback) {
        // 在layer上绑定监听事件
        graphicLayer.on(mars3d.EventType.click, function (event) {
          if (!event.graphic) {
            // 单击了聚合的点
            _map.flyTo(event.pickedObject.id, { duration: 1 })
          } else {
            clickCallback(event)
          }
        })
        graphicLayer.on(mars3d.EventType.mouseOver, function (event) {
          if (event && event.graphic) {
            event.graphic.setStyle({ scale: highlightScale })
          }
        })
        graphicLayer.on(mars3d.EventType.mouseOut, function (event) {
          if (event && event.graphic) {
            event.graphic.setStyle({ scale })
          }
        })
      }
      return graphicLayer
    } catch (error) {
      console.error('addMarkLayer', error)
      return
    }
  }

  addMarkPopupLayer(list, clickCallback, options = {}) {
    if (!(list && list.length > 0)) return
    try {
      // 创建矢量数据图层
      const graphicLayer = new mars3d.layer.GraphicLayer()
      this.map.addLayer(graphicLayer)
      const scale = (options.styleOptions?.scale || 1) * this.bigScale
      const highlightScale = (options.styleOptions?.highlightScale || 1.2) * this.bigScale
      list.forEach((item) => {
        const graphic = new mars3d.graphic.BillboardPrimitive({
          name: item.name,
          position: item.position,
          style: {
            image: item.image,
            scale,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            clampToGround: true,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
            highlight: {
              type: mars3d.EventType.click,
              scale: highlightScale
            }
          },
          attr: { ...item }
        })
        graphicLayer.addGraphic(graphic)
      })
      graphicLayer.bindPopup(function (event) {
        const attr = event.graphic.attr || {}
        return attr.html
        // return mars3d.Util.getTemplateHtml({ title: attr.name, template: popupTemplate, attr: attr })
      })
      if (clickCallback) {
        // 在layer上绑定监听事件
        graphicLayer.on(mars3d.EventType.click, function (event) {
          clickCallback(event)
        })
        graphicLayer.on(mars3d.EventType.mouseOver, function (event) {
          if (event && event.graphic) {
            event.graphic.setStyle({ scale: highlightScale })
          }
        })
        graphicLayer.on(mars3d.EventType.mouseOut, function (event) {
          if (event && event.graphic) {
            event.graphic.setStyle({ scale })
          }
        })
      }
      return graphicLayer
    } catch (error) {
      console.error('addMarkPopupLayer', error)
      return
    }
  }

  addMarkAndDivLayer(list, options = {}, clickCallback) {
    if (!(list && list.length > 0)) return
    try {
      // 创建矢量数据图层
      const graphicLayer = new mars3d.layer.GraphicLayer()
      this.map.addLayer(graphicLayer)
      const scale = (options.markStyleOptions?.scale || 1) * this.bigScale
      const highlightScale = (options.markStyleOptions?.highlightScale || 1.2) * this.bigScale
      const offsetX =
        options && options.offsetX ? options.offsetX * this.bigScale : 40 * this.bigScale
      const offsetY =
        options && options.offsetY ? options.offsetY * this.bigScale : -20 * this.bigScale
      list.forEach((item) => {
        const graphic = new mars3d.graphic.BillboardPrimitive({
          name: item.name,
          position: item.position,
          style: {
            image: item.image,
            scale,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            clampToGround: options.clampToGround ? options.clampToGround : true,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
            highlight: {
              type: mars3d.EventType.click,
              scale: highlightScale
            }
          },
          attr: { ...item, clickLayerType: 'mark' }
        })
        if (item.html) {
          item.div_html = item.html
          //今日深圳适配
          if (this.scaleType === 'today') {
            item.div_html =
              '<div style="transform: scale(' +
              this.bigScale +
              ') translateZ(10px); transform-origin:0 center;pointer-events:all">' +
              item.div_html +
              '</div>'
          } else {
            //陈辉版适配
            if (this.bigScale > 1) {
              item.div_html =
                '<div style="transform: scale(2) translateZ(10px) translate(25%, 25%)">' +
                item.div_html +
                '</div>'
            }
          }

          const divGraphic = new mars3d.graphic.DivGraphic({
            position: item.position,
            pointerEvents: true,
            attr: {
              ...item,
              clickLayerType: 'div'
            },
            style: {
              html: item.div_html,
              horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
              verticalOrigin: Cesium.VerticalOrigin.CENTER,
              offsetX,
              offsetY,
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                options.distanceDisplayConditionMin || 0,
                options.distanceDisplayConditionMax || 999999999999
              ) //按视距距离显示
            }
          })
          graphicLayer.addGraphic(divGraphic)
        }
        graphicLayer.addGraphic(graphic)
      })
      if (clickCallback) {
        // 在layer上绑定监听事件
        graphicLayer.on(mars3d.EventType.click, function (event) {
          clickCallback(event)
        })
        graphicLayer.on(mars3d.EventType.mouseOver, function (event) {
          if (event && event.graphic) {
            event.graphic.setStyle({ scale: highlightScale })
          }
        })
        graphicLayer.on(mars3d.EventType.mouseOut, function (event) {
          if (event && event.graphic) {
            event.graphic.setStyle({ scale })
          }
        })
      }
      return graphicLayer
    } catch (error) {
      console.error('addMarkAndDivLayer', error)
      return
    }
  }

  /**
   * 根据坐标点，类型获取坐标点所属类型的边界线Feature
   * @param {*} point 坐标点
   * @param {*} type  area 区| street 街道 | community社区
   */
  getBorderFeatureByPoint(point, type = 'area') {
    return getBorderFeatureByPoint(point, type)
  }

  /**
   *
   * @param options
   * {
   *   ffq:{
   *     clear:true//是否清除上一次的图层
   *     fill：true，//是否填充
   *     color：'#FFB100'//填充色
   *     opacity : 0.6，//头透明度
   *     outline : true,//是否显示外边线
   *     outlineColor : '#FFAE00',//外边线颜色
   *     outlineWidth : 3,//外边线宽度
   *     clickCallback:function(){}//点击回调函数
   *   }，
   *   ckgkq：{}//同上
   *   gkq：{}//同上
   *   fkq：{}//同上
   * }
   */
  addYqMixinLayer(options) {
    !options && (options = {})
    const ffqLayerId = yqMixin.methods.addCOVID_FFQ_A(options.ffq)
    const ckgkqLayerId = yqMixin.methods.addCOVID_CKGKQ_A(options.ckgkq)
    const gkqLayerId = yqMixin.methods.addCOVID_GKQ_A(options.gkq)
    const fkqLayerId = yqMixin.methods.addCOVID_FKQ_A(options.fkq)
    return {
      ffqLayerId,
      ckgkqLayerId,
      gkqLayerId,
      fkqLayerId
    }
  }

  clickHightLight(options) {
    yqMixin.methods.clickHightLight(options)
  }

  /**
   *
   * @param options
   * {
   *     layerId //图层id
   *     zIndex: 90 //图层级别  数字越大级别越大
   *     data：[]  //数组对象  单对象必须包含centerPosition中心点[lng,lat]  image:中心点图标 placeRange：三区经纬度数组
   *     fill：true，//是否填充
   *     color：'#FFB100'//填充色
   *     opacity : 0.6，//头透明度
   *     outline : true,//是否显示外边线
   *     outlineColor : '#FFAE00',//外边线颜色
   *     outlineWidth : 3,//外边线宽度
   *     clickCallback:function(){}//点击回调函数
   * }
   * @return obj 包含（graphicLayer三区面图层， maskBillboardCollection坐标点图层 ）
   */

  addThreeAreasLayer(options) {
    const obj = yqMixin.methods.addThreeAreasLayer(options)
    return obj
  }

  /**
   *
   * @param options
   * {
   *     data：geojson数据
   *     zIndex: 9 图层等级越大越在顶层
   *     fill：true，//是否填充
   *     color：'#FFB100'//填充色
   *     opacity : 0.6，//头透明度
   *     outline : true,//是否显示外边线
   *     outlineColor : '#FFAE00',//外边线颜色
   *     outlineWidth : 3,//外边线宽度
   *     clickCallback:function(){}//点击回调函数
   * }
   */
  addGeojsonLayer(options) {
    return addGeojsonLayer(options)
  }

  /**
   *  添加易图图层服务
   * @param options
   * {
   *     id 图层id
   *     url 图层服务url
   *     zIndex: 9 图层等级越大越在顶层
   *     fill：true，//是否填充
   *     color：'#FFB100'//填充色
   *     opacity : 0.6，//头透明度
   *     outline : true,//是否显示外边线
   *     outlineColor : '#FFAE00',//外边线颜色
   *     outlineWidth : 3,//外边线宽度
   *     clickCallback:function(){}//点击回调函数
   * }
   */
  addEtopGeojsonLayer(options) {
    return addEtopGeojsonLayer(options)
  }

  /**
   * 行政区反向遮罩，
   * quName：行政区名称
   */
  async showXzqFxMask(quName = '深圳市') {
    let res = await axios.get('/jsons/keyAreas/map/szxzq4.geojson')
    const features = res.features
    let geojsonFilter = features.filter((v, i) => {
      return v.properties.QUNAME === quName
    })
    // 通过turf修复数据
    const featureCollection = turf.featureCollection(geojsonFilter)
    //
    let maskLayer = this.map.getLayerById('masksz')
    if (maskLayer) {
      maskLayer.load({ data: featureCollection })
    } else {
      const geoJsonLayer = new mars3d.layer.GeoJsonLayer({
        id: 'masksz',
        data: featureCollection,
        mask: true,
        show: false,
        zIndex: 1,
        symbol: {
          styleOptions: {
            fill: true,
            color: '#000217',
            opacity: 0.45,
            outline: true,
            outlineStyle: {
              color: '#ededed',
              width: 1,
              opacity: 1
            },
            arcType: Cesium.ArcType.GEODESIC,
            clampToGround: true
          }
        }
      })
      this.map.addLayer(geoJsonLayer)
    }
  }

  addWallPrimitive(layer, data, style) {
    this.map.addLayer(layer)
    const wallPrimitive = new mars3d.graphic.WallPrimitive({
      positions: data,
      style: style
    })
    const PolylineGlowPrimitive = new mars3d.graphic.PolylineEntity({
      positions: data,
      style: {
        width: 40, // 线宽
        material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.PolylineGlow, {
          color: Cesium.Color.fromCssColorString(style.color), // Cesium.Color.ORANGE,
          glowPower: 0.05, // 发光强度
          taperPower: 1.0
        }),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 8000) //按视距距离显示
      }
    })
    layer.addGraphic(PolylineGlowPrimitive)

    layer.addGraphic(wallPrimitive)
  }

  addDivPrimitive(layer, point, html) {
    this.map.addLayer(layer)
    let graphic1 = new mars3d.graphic.DivGraphic({
      position: Cesium.Cartesian3.fromDegrees(point[0], point[1], 0),
      style: {
        html: html,
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scaleByDistance: new Cesium.NearFarScalar(100, 0.8, 5000, 0.1),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
        // setHeight:173,
        clampToGround: true
      }
    })
    layer.addGraphic(graphic1)
  }

  addGeojsonLayerByOptions(options, clearFlag = true) {
    if (clearFlag) {
      this.rmLayerById(options.id)
    }
    const graphicLayer = new mars3d.layer.GeoJsonLayer({
      id: options.id,
      //data: featureCollection,
      url: options.url,
      symbol: options.symbol,
      show: options.show,
      zIndex: options.zIndex
    })
    this.map.addLayer(graphicLayer)
  }
  /**
   * 根据行政区划名称，设置遮罩
   * @param quName {string} 行政区划名称，默认深圳市
   * @param isLocate {boolean} 是否定位，默认true定位
   * @param maskColor {string} 遮罩颜色，默认#000217
   * @param opacity {number} 遮罩透明度，默认0.8
   * @param outlineStyleColor {string} 遮罩外边线颜色，默认#000217
   * @param outlineWidth {number} 遮罩外边线宽度，默认2
   * @param outlineOpacity {number} 遮罩外边线透明度，默认1
   * @return 返回遮罩图层id
   */
  showMaskByName({
    quName,
    isLocate,
    maskColor,
    opacity,
    outlineStyleColor,
    outlineWidth,
    outlineOpacity
  } = {}) {
    regionMask.showMaskByName({
      quName,
      isLocate,
      maskColor,
      opacity,
      outlineStyleColor,
      outlineWidth,
      outlineOpacity
    })
  }
  /**
   * 深圳市外的遮罩
   * @param opacity {number} 遮罩透明度，默认0.8
   * @param maskColor {string} 遮罩颜色，默认"#000217"
   * @param maskOutLineColor {string} 遮罩外边线颜色，默认"#ededed"
   * @param maskOutLineWidth {number} 遮罩外边线宽度，默认1
   * @returns {string} 遮罩图层id
   */
  showMaskSzOutside({ opacity, maskColor, maskOutLineColor, maskOutLineWidth } = {}) {
    regionMask.showMaskSzOutside({
      opacity,
      maskColor,
      maskOutLineColor,
      maskOutLineWidth
    })
  }
  /**
   * 根据id删除指定图层
   * @param id
   */
  clearLayerById(id) {
    let map = window.etopMap.map
    if (!Array.isArray(id)) {
      id = [id]
    }
    id.map((i) => {
      const layer = map.getLayerById(i)
      layer && map.removeLayer(layer)
    })
  }

  // 添加可视域
  graphicViewShed(positions) {
    const tiles3dLayer = new mars3d.layer.TilesetLayer({
      type: '3dtiles',
      center: {
        lat: 22.011214,
        lng: 114.17,
        alt: 70296,
        heading: 0,
        pitch: -45
      },
      // eventParent:true,
      url: '//data.mars3d.cn/3dtiles/qx-xuexiao/tileset.json',
      maximumScreenSpaceError: 1,
      maximumMemoryUsage: 1024,
      dynamicScreenSpaceError: true,
      cullWithChildrenBounds: false,
      luminanceAtZenith: 0.6
    })
    this.map.addLayer(tiles3dLayer)
    if (!this.graphicViewShedData) {
      this.graphicViewShedData = new mars3d.layer.GraphicLayer()
      this.map.addLayer(this.graphicViewShedData)
    }
    this.viewShed = new mars3d.graphic.ViewShed({
      ...positions
    })
    this.graphicViewShedData.addGraphic(this.viewShed)
  }
  /**
   * 增加地铁线的方法，要求线段的有不同颜色
   * @param Cesium {Object} Cesium接口
   * @param viewer {Object} 视图接口
   * @param positions {Array} 点坐标数组
   * @param lineWidth {Number} 线宽度，默认10
   * @param colorArr {Array}  颜色数组，用于一条线上的间断的颜色 CSS颜色表达'#F593FE'
   * @param callback {function} 回调函数
   * @param id {Strign}  线段ID
   * @returns {string}
   */
  addWayLines(Cesium, viewer, positions, lineWidth, colorArr, id, callback) {
    if (Cesium == undefined || viewer == undefined || positions == undefined) {
      return
    }
    if (lineWidth == undefined) {
      lineWidth = 10
    } else if (colorArr == undefined) {
      colorArr = ['#F593FE']
    } else if (id == undefined) {
      id = 'polyline' + Math.round(Math.random() * 10 + 1000)
    }
    let scene = viewer.scene
    let colors = []
    let remainder = positions.length % colorArr.length
    let integer = parseInt(positions.length / colorArr.length)
    let remainderColorArr = colorArr.slice(0, remainder)
    for (let i = 0; i < integer; i++) {
      colors = colors.concat(colorArr)
      if (i == integer - 1) {
        colors = colors.concat(remainderColorArr)
      }
    }
    //设置线段的位置和颜色，一一对应，arcType为ArcType.NONE
    let perSegmentPolyline = new Cesium.GeometryInstance({
      id: id,
      geometry: new Cesium.PolylineGeometry({
        positions: positions,
        colors: colors,
        width: lineWidth,
        vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT,
        colorsPerVertex: true
      })
    })
    scene.primitives.add(
      new Cesium.Primitive({
        geometryInstances: [perSegmentPolyline],
        appearance: new Cesium.PolylineColorAppearance()
      })
    )
  }

  /**
   * 计算任意多边形的质心，仅限于同一坐标系下的平面坐标
   * @param points {Object} 一个面的坐标点数组[[lng,lat],[lng,lat],[lng,lat],[lng,lat],[114.18811933, 22.61799043]]
   * @returns {string}
   */
  getPolygonAreaCenter(points) {
    let sum_x = 0
    let sum_y = 0
    let sum_area = 0
    let p1 = points[1]
    function Area(p0, p1, p2) {
      let area = 0.0
      area =
        p0[0] * p1[1] +
        p1[0] * p2[1] +
        p2[0] * p0[1] -
        p1[0] * p0[1] -
        p2[0] * p1[1] -
        p0[0] * p2[1]
      return area / 2
    }
    for (let i = 2; i < points.length; i++) {
      p2 = points[i]
      area = Area(points[0], p1, p2)
      sum_area += area
      sum_x += (points[0][0] + p1[0] + p2[0]) * area
      sum_y += (points[0][1] + p1[1] + p2[1]) * area
      p1 = p2
    }
    let xx = sum_x / sum_area / 3
    let yy = sum_y / sum_area / 3
    return { x: xx, y: yy }
  }

  /**
   * 计算任意多边形的质心，仅限于同一坐标系下的平面坐标
   * @param points {Object} 一个面的坐标点数组[{lng:'',lat:'',alt:''},{}]
   * @returns {string}
   */
  getPolygonQualityCenter(points) {
    let sum_x = 0
    let sum_y = 0
    let sum_area = 0
    let p1 = points[1]
    let p2, area
    function Area(p0, p1, p2) {
      let area = 0.0
      area =
        p0.lng * p1.lat +
        p1.lng * p2.lat +
        p2.lng * p0.lat -
        p1.lng * p0.lat -
        p2.lng * p1.lat -
        p0.lng * p2.lat
      return area / 2
    }
    for (var i = 2; i < points.length; i++) {
      p2 = points[i]
      area = Area(points[0], p1, p2)
      sum_area += area
      sum_x += (points[0].lng + p1.lng + p2.lng) * area
      sum_y += (points[0].lat + p1.lat + p2.lat) * area
      p1 = p2
    }
    let xx = sum_x / sum_area / 3
    let yy = sum_y / sum_area / 3
    return { x: xx, y: yy }
  }

  /**
   * 笛卡尔坐标系转WGS84坐标系
   * @param point
   * @return {{lat: *, lng: *, alt: *}}
   */
  Cartesian3_to_WGS84(point) {
    let cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z)
    let cartographic = Cesium.Cartographic.fromCartesian(cartesian33)
    let lat = Cesium.Math.toDegrees(cartographic.latitude)
    let lng = Cesium.Math.toDegrees(cartographic.longitude)
    let alt = cartographic.height
    return { lng: lng, lat: lat, alt: alt }
  }

  /**
   * 防管封控区计算标注点
   * @param S1 {Array} 防控区面S1坐标点数组对应标注点p1 [[lng,lat],[lng,lat],[],[]]
   * @param S2 {Array} 管控区面S2坐标点数组对应标注点p2 [[lng,lat],[lng,lat],[],[]]
   * @param S3 {Array} 封控区面S3坐标点数组对应标注点p3 [[lng,lat],[lng,lat],[],[]]
   * @param degree {Number} 根据这个度数来选取线段
   * @return {{lat: *, lng: *, alt: *}} {p1:[lng,lat],p2:[lng,lat],p3:[lng,lat]}
   */
  cpuLabelsPoints(S1, S2, S3, degree) {
    let p1, p2, p3
    let line = turf.lineString(S1)
    let bbox = turf.bbox(line)
    let bboxArr = [
      [bbox[0], bbox[1]],
      [bbox[0], bbox[3]],
      [bbox[2], bbox[3]],
      [bbox[2], bbox[1]]
    ]
    //判断是否凹多边形
    let concaveS3 = this.concave(S3)
    //计算封控区面S3的质心
    let polygon = turf.polygon([S3])
    let center = turf.centerOfMass(polygon)
    //判断S3的质心点在不在面S3上
    let pHasS3 = turf.booleanPointInPolygon(
      turf.point(center.geometry.coordinates),
      turf.polygon([S3])
    )

    //取S3质心和防控区面最大的距离
    let maxLen = 0
    for (let i = 0; i < bboxArr.length; i++) {
      //计算两点距离
      let from = turf.point(center.geometry.coordinates)
      let to = turf.point(bboxArr[i])
      let options = { units: 'miles' }
      let distance = turf.rhumbDistance(from, to, options)
      if (distance > maxLen) {
        maxLen = distance
      }
    }

    //根据最大距离maxLen按度数取点
    let pNum = Math.round(360 / degree)
    //存储每个角度的线段
    let destinations = []
    for (let i = 0; i < pNum; i++) {
      let pt = turf.point(center.geometry.coordinates)
      let distanceLength = maxLen
      let bearing = degree * i
      let options = { units: 'miles' }
      let destination = turf.rhumbDestination(pt, distanceLength, bearing, options)
      let arr = [center.geometry.coordinates, destination.geometry.coordinates]
      destinations.push(arr)
    }

    //先确定封控区的标注点p3
    if (concaveS3 == 1 && pHasS3) {
      p3 = center.geometry.coordinates
    } else if (concaveS3 == -1 && !pHasS3) {
    }

    //计算两点的长度p[lng,lat]
    function cpuL(p1, p2) {
      let from = turf.point(p1)
      let to = turf.point(p2)
      let options = { units: 'miles' }
      let distance = turf.rhumbDistance(from, to, options)
      return distance
    }

    //计算多条线段和多条线段的交点，返回交点间距离最大的线段中心点
    function cpuPolyLineP(destinations, S3) {
      let maxLen = 0
      let result = null
      let resultArr = []
      for (let i = 0; i < destinations.length; i++) {
        let objS3 = []
        let distanceS3
        for (let j = 0; j < S3.length - 1; j++) {
          let line1 = turf.lineString(destinations[i])
          let line2 = turf.lineString([S3[j], S3[j + 1]])
          let intersects = turf.lineIntersect(line1, line2)
          if (intersects.features.length > 0) {
            objS3.push(intersects.features[0].geometry.coordinates)
          }
        }
        console.log(objS3.length)
        if (objS3.length <= 1) {
          distanceS3 == 0
        } else if (objS3.length > 1) {
          distanceS3 = cpuL(objS3[0], objS3[1])
        }
        if (distanceS3 > maxLen) {
          maxLen = distanceS3
          result = objS3
        }
      }
      return result
    }
  }

  /**
   * getConcavePolygonPoint  计算任意多边形的标注点
   * @param S {Array} 凹多边形S坐标点数组对应标注点p1 [[lng,lat],[lng,lat],[],[]]
   * @param degree {Number} 根据这个度数来选取线段
   * @return p[]
   */
  getConcavePolygonPoint(S, degree) {
    let p
    if (degree == undefined) {
      degree = 30
    }
    //判断是否凹多边形
    let concaveS3 = this.concave(S)
    //计算封控区面S3的质心
    let polygon = turf.polygon([S])
    let center = turf.centerOfMass(polygon)
    //判断S3的质心点在不在面S3上
    let pHasS3 = turf.booleanPointInPolygon(
      turf.point(center.geometry.coordinates),
      turf.polygon([S])
    )

    if (pHasS3) {
      p = center.geometry.coordinates
    } else if (!pHasS3 && concaveS3 == -1) {
      let destinations = this.getDegreeLines(center.geometry.coordinates, S, degree)
      let maxLen = 0
      for (let i = 0; i < destinations.length; i++) {
        let lines = this.cpuPolyLineAndPolygonP(destinations[i], S)
        if (lines.distance > maxLen) {
          let labelP = turf.midpoint(lines.points[0], lines.points[1])
          p = labelP.geometry.coordinates
        }
      }
    }
    return p
  }

  /**
   * 判断多边形的凹凸
   * @param {*} p 顶点数组(数组对象)[[lng,lat],[lng,lat],[]]
   * @returns 1：凸集；-1：凹集；0：曲线不符合要求无法计算
   */
  concave(p) {
    var n = p.length //顶点个数
    var j, k, z
    var flag = 0
    if (n < 3) {
      console.log('不符合要求')
      return 0
    }
    for (var i = 0; i < n; i++) {
      j = (i + 1) % n
      k = (i + 2) % n
      z = (p[j][0] - p[i][0]) * (p[k][1] - p[j][1])
      z -= (p[j][1] - p[i][1]) * (p[k][0] - p[j][0])
      if (z < 0) {
        flag |= 1
      } else if (z > 0) {
        flag |= 2
      }
      if (flag == 3) {
        console.log('凹多边形')
        return -1 //CONCAVE
      }
    }
    if (flag != 0) {
      console.log('凸多边形')
      return 1 //CONVEX
    } else {
      return 0
    }
  }

  /**
   * 计算线段与面的交点
   * @param {Array} polyline  一根线段的坐标点数组[[lng,lat],[lng,lat]]
   * @param {Array} polygon  一个面的点坐标数组[[lng,lat],[lng,lat],[lng,lat],[lng,lat]]
   * @returns {Object}  {points:[lng,lat],distance:0}
   */
  cpuPolyLineAndPolygonP(polyline, polygon) {
    let result = []
    let distance = 0
    for (let i = 0; i < polygon.length - 1; i++) {
      let line1 = turf.lineString(polyline)
      let line2 = turf.lineString([polygon[i], polygon[i + 1]])
      let intersects = turf.lineIntersect(line1, line2)
      if (intersects.features.length > 0) {
        result.push(intersects.features[0].geometry.coordinates)
      }
    }
    if (result.length == 2) {
      let from = turf.point(result[0])
      let to = turf.point(result[1])
      let options = { units: 'miles' }
      distance = turf.rhumbDistance(from, to, options)
    }
    return { points: result, distance: distance }
  }
  /**
   * 按角度和输入点与面的外接矩形最大长度计算线段数组
   * @param {Array} point  坐标点[lng,lat]
   * @param {Array} S  一个面的点坐标数组[[lng,lat],[lng,lat],[lng,lat],[lng,lat]]
   * @param {Number} degree  划分度数
   * @returns {Array} destinations [[[lng,lat],[lng,lat]],[[lng,lat],[lng,lat]],[],[],[]]
   */
  getDegreeLines(point, S, degree) {
    //计算多边形的外接矩形
    let line = turf.lineString(S)
    let bbox = turf.bbox(line)
    let bboxArr = [
      [bbox[0], bbox[1]],
      [bbox[0], bbox[3]],
      [bbox[2], bbox[3]],
      [bbox[2], bbox[1]]
    ]
    //取S3质心和防控区面最大的距离maxLen
    let maxLen = 0
    for (let i = 0; i < bboxArr.length; i++) {
      //计算两点距离
      let from = turf.point(point)
      let to = turf.point(bboxArr[i])
      let options = { units: 'miles' }
      let distance = turf.rhumbDistance(from, to, options)
      if (distance > maxLen) {
        maxLen = distance
      }
    }

    //根据最大距离maxLen按度数取点
    let pNum = Math.round(360 / degree)
    //存储每个角度的线段集合destinations
    let destinations = []
    for (let i = 0; i < pNum; i++) {
      let pt = turf.point(point)
      let distanceLength = maxLen
      let bearing = degree * i
      let options = { units: 'miles' }
      let destination = turf.rhumbDestination(pt, distanceLength, bearing, options)
      let arr = [point, destination.geometry.coordinates]
      destinations.push(arr)
    }
    return destinations
  }
}
export default EtopMap
