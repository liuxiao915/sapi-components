/* eslint-disable */
import customLayer from './customLayer'
class layer {
  constructor(map, options) {
    this.map = map
    this.bigScale = (options && options.bigScale) || 1
    this.viewer = map.viewer

    // 底图配置列表
    this.baseLayerConfigs = []
    // 已加载的底图（允许加载多张底图）
    this.baseLayers = []

    // 使用原生方法加载的图层，主要是3dtiles
    this._primitives = []
    // 使用原生方法加载的瓦片服务
    this._imageryLayers = []
    // 选中primitive
    this._select_primitive = null
    // 鼠标移入primitive
    this._mouseover_primitive = null

    this.customLayer = customLayer
  }

  /**
   * @name: loadLayers
   * @msg: 加载业务图层
   * @param {*} layerConfigs
   * @return {*}
   */
  loadLayers(layerConfigs) {
    if (layerConfigs.constructor !== Array) {
      return
    }

    layerConfigs.forEach((config) => {
      this.loadLayer(config)
    })
  }

  /**
   * @name: loadBaseLayers
   * @msg: 加载底图
   * @param {*} layerConfigs
   * @return {*}
   */
  loadBaseLayers(layerConfigs) {
    // 如果传的参数不合理就什么都不做
    if (layerConfigs.constructor !== Array || layerConfigs.length === 0) {
      return
    }
    // 保存配置信息
    this.baseLayerConfigs = layerConfigs
    // 查找默认底图，如果未设置，则默认第一个
    const defaultLayer = layerConfigs.find((t) => t.default)
    let index = 0
    if (defaultLayer) {
      index = layerConfigs.indexOf(defaultLayer)
    }
    this.switchBaseLayer(index)
  }

  /**
   * @name: switchBaseLayer
   * @msg: 切换底图
   * @param {*} index
   * @return {*}
   */
  switchBaseLayer(index) {
    // 如果索引超出范围就什么都不做
    if (index >= this.baseLayerConfigs.length) {
      return
    }
    // 移除之前加载的底图
    this.baseLayers.forEach((lyr) => {
      this.clearLayerById(lyr.id)
    })
    this.baseLayers = []
    // 如果参数是-1，则什么都不做
    if (index == -1) {
      return
    }
    // 切换底图
    const baseLayer = this.baseLayerConfigs[index]
    if (baseLayer.constructor === Array) {
      baseLayer.forEach((layer) => {
        const lyr = this.loadLayer(layer)
        this.baseLayers.push(lyr)
        // this.viewer.imageryLayers.lowerToBottom(
        //   lyr.imageryProvider
        // );
      })
    } else {
      const lyr = this.loadLayer(baseLayer)
      this.baseLayers.push(lyr)
      // this.viewer.imageryLayers.lowerToBottom(
      //   lyr.imageryProvider
      // );
    }
    // // 把默认的百度底图放到最下边
    // let baiduLayer = this.getLayerById('baiduLayer')
    // this.viewer.imageryLayers.lowerToBottom(baiduLayer.layer)
  }

  /**
   * @name: loadLayer
   * @msg: 加载图层
   * @param {*} config
   * @return {*}
   */
  loadLayer(config) {
    let lyr
    switch (config.type) {
      case 'xyz':
        lyr = this.addXyzLayer(config.options)
        break
      // 普通3dtiles
      case '3dtiles':
        lyr = this.add3Dtiles(config.options)
        break
      // 倾斜摄影
      case 'mesh':
        lyr = this.addMesh(config.options)
        break
      // 规自 行政区
      case 'wfs':
        lyr = this.addWFSLayer(config.options)
        break
      // 规自 wmts格式数据
      case 'urlTemplate':
        lyr = this.addUrlLayer(config.options)
        break
      // 规自 卫星影像
      case 'baseLayer_satellite':
        lyr = this.addSatellite(config.options)
        break
      // 规自 电子地图
      case 'baseLayer_blue':
      case 'shenzhen_poi':
      case 'baseLayer_white':
        lyr = this.addElectricLayer(config.options)
        break
    }
    return lyr
  }

  /**
   * @name: clearLayerById
   * @msg: 根据图层id清除指定图层
   * @param {*}
   * @return {*}
   */
  clearLayerById(id) {
    const marslayer = this.map.getLayerById(id)
    if (marslayer) {
      this.map.removeLayer(marslayer)
      return
    }

    const primitive = this._primitives.find((p) => p.id === id)
    if (primitive) {
      this._primitives.slice(this._primitives.indexOf(primitive), 1)
      this.viewer.scene.primitives.remove(primitive)
      return
    }

    const imageryLayer = this._imageryLayers.find((p) => p.id === id)
    if (imageryLayer) {
      this._imageryLayers = this._imageryLayers.filter((imagery) => imagery != imageryLayer)
      this.viewer.imageryLayers.remove(imageryLayer)
    }
  }

  /**
   * @name: getLayerById
   * @msg: 根据id获取对应图层
   * @param {*} id
   * @return {*}
   */
  getLayerById(id) {
    const layer = this.map.getLayerById(id)
    if (layer) {
      return layer
    }

    const primitive = this._primitives.find((p) => p.id === id)
    if (primitive) {
      return primitive
    }

    const imageryLayer = this._imageryLayers.find((p) => p.id === id)
    if (imageryLayer) {
      return imageryLayer
    }
  }

  /**
   * @name: setLayerVisible
   * @msg: 根据图层id设置图层显隐
   * @param {*} layerId
   * @param {*} visible
   * @return {*}
   */
  setLayerVisible(layerId, visible) {
    const lyr = this.getLayerById(layerId)
    if (lyr) {
      lyr.show = visible
    }
  }

  /**
   * @name: add3Dtiles
   * @msg: 添加3dtiles
   * @param {*} options 配置项
   * @param {*} callback 回调函数
   * @return {*} 添加的图层对象
   */
  add3Dtiles(options, clearFlag = true) {
    if (clearFlag) {
      this.clearLayerById(options.id)
    }

    var resource = new Cesium.Resource({
      url: options.url,
      headers: options.headers
    })

    const tileset = new mars3d.layer.TilesetLayer({
      type: '3dtiles',
      show: options.show,
      id: options.id,
      url: resource,
      name: options.name,
      flyTo: options.flyTo,
      // 最大的屏幕空间误差，数值越大，需要靠的越近才渲染下一级,性能压力也会越小，默认16
      maximumScreenSpaceError: 16,
      // 最大使用的GPU内存量(MB)，内存不够的话会主动释放一部分视野外的,默认512
      maximumMemoryUsage: 2048,
      // 关闭阴影
      shadows: Cesium.ShadowMode.DISABLED,
      // 是否预加载镜头移动目的地上的瓦片
      preloadFlightDestinations: true,
      // 先渲染子叶
      // preferLeaves: true,
      // 跳过一些细节内容，启用这个后面的几个配置才有效
      skipLevelOfDetail: true,
      // 只请求所需渲染的内容，开启可以极大的提升性能,会跳过所有中间级别直接到最后效果，需要精确控制则用后面两个参数
      immediatelyLoadDesiredLevelOfDetail: true,
      // //指定要跳过的最小误差，用于精确控制跳过范围
      // skipScreenSpaceErrorFactor: 10000,
      // //要跳过的级别，会跳过此级别以内的，用于精确控制跳过范围
      // skipLevels: 100,
      // //预加载可见节点的相邻节点
      // loadSiblings: true,
      // 全屏渲染后才会清晰化房屋
      dynamicScreenSpaceError: true,
      // 摄像头停止移动后多少秒开始加载新数据,0代表立刻
      foveatedTimeDelay: 0.2,
      style: {
        color: {
          conditions: options.colorConditions || []
        }
      },
      // maximumScreenSpaceError: 1,
      // maximumMemoryUsage: 1024,
      // dynamicScreenSpaceError: true,
      // cullWithChildrenBounds: false,
      // skipLevelOfDetail: true,
      // preferLeaves: true,
      luminanceAtZenith: options.luminanceAtZenith || 0.2
    })

    // 回调函数
    if (options.callback) {
      tileset.on(mars3d.EventType.load, options.callback)
    }

    this.map.addLayer(tileset)

    return tileset
  }

  /**
   * @name: addXyzLayer
   * @msg: 添加xyz格式的底图
   * @param {*} options 配置项
   * @return {*} 添加的图层对象
   */
  addXyzLayer(options, clearFlag = true) {
    if (clearFlag) {
      this.clearLayerById(options.id)
    }

    const xyzLayer = new mars3d.layer.XyzLayer({
      show: options.show,
      id: options.id,
      url: options.url, // 必填，服务地址
      name: options.name,
      type: 'xyz',
      zIndex: 0,
      minimumLevel: 0, //瓦片所支持的最低层级，如果数据没有第0层，该参数必须配置,当地图小于该级别时，平台不去请求服务数据
      maximumLevel: 18, // 瓦片所支持的最大层级,大于该层级时会显示上一层拉伸后的瓦片，当地图大于该级别时，平台不去请求服务数据。
      // minimumTerrainLevel: 0, //展示影像图层的最小地形细节级别，小于该级别时，平台不显示影像数据。
      // maximumTerrainLevel: 18 //展示影像图层的最大地形细节级别，大于该级别时，平台不显示影像数据。
      rectangle: options.rectangle // 可选 地图范围
    })

    this.map.addLayer(xyzLayer)

    return xyzLayer
  }

  /**
   * @name: addUrlLayer
   * @msg: 规自wmts格式数据
   * @param {*} options 配置项
   * @return {*} 添加的图层对象
   */
  addUrlLayer(options, clearFlag = true) {
    if (clearFlag) {
      this.clearLayerById(options.id)
    }

    var res = new Cesium.Resource({
      url: options.url,
      headers: options.headers
    })

    const xyzoptions = {
      id: options.id,
      url: res,
      flyTo: options.flyTo
    }

    xyzoptions.tilingScheme = new Cesium.GeographicTilingScheme()
    xyzoptions.minimumLevel = 0
    xyzoptions.customTags = {
      sz: function (imageryProvider, x, y, level) {
        return level - 9
      }
    }

    const xyzLayer = new mars3d.layer.XyzLayer(xyzoptions)
    this.map.addLayer(xyzLayer)
    xyzLayer.id = options.id
    xyzLayer.show = options.show

    return xyzLayer
  }

  // 添加GeoJSON图层
  addGeojsonLayer(options, clearFlag = true) {
    if (clearFlag) {
      this.clearLayerById(options.id)
    }
    const geoJsonLayer = new mars3d.layer.GeoJsonLayer({
      url: options.url,
      id: options.id,
      mask: options.mask, // 标识为遮罩层
      data: options.data,
      symbol: options.symbol,
      zIndex: options.zIndex,
      flyTo: options.flyTo,
      pointerEvents: true
    })
    // 回调函数
    if (options.callback) {
      geoJsonLayer.on(mars3d.EventType.load, options.callback)
    }
    this.map.addLayer(geoJsonLayer)

    return geoJsonLayer
  }

  /**
   * @name: addMesh
   * @msg: 使用原生加载倾斜摄影，mar3d对倾斜摄影的支持不是很好
   * @param {*} options
   * @return {*}
   */
  addMesh(options) {
    var resource = new Cesium.Resource({
      url: options.url,
      headers: options.headers
    })
    const meshTiles = new Cesium.Cesium3DTileset({
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
    this.viewer.scene.primitives.add(meshTiles)

    meshTiles.show = options.show
    meshTiles.id = options.id
    this._primitives.push(meshTiles)

    return meshTiles
  }

  /**
   * @name: addSatellite
   * @msg: 添加航空影像(规自数据，其它数据可能不适用)
   * @param {*} options
   * @return {*}
   */
  addSatellite(options) {
    var conf = {
      id: options.id,
      url: options.url,
      show: options.show,
      type: 'xyz',
      zIndex: 0,
      minimumLevel: 0, //瓦片所支持的最低层级，如果数据没有第0层，该参数必须配置,当地图小于该级别时，平台不去请求服务数据
      maximumLevel: 18, // 瓦片所支持的最大层级,大于该层级时会显示上一层拉伸后的瓦片，当地图大于该级别时，平台不去请求服务数据。
      // minimumTerrainLevel: 0, //展示影像图层的最小地形细节级别，小于该级别时，平台不显示影像数据。
      // maximumTerrainLevel: 18 //展示影像图层的最大地形细节级别，大于该级别时，平台不显示影像数据。
    }
    if (options.url.indexOf('{s}') > -1) {
      conf.subdomains = '1234'
    }

    if (options.headers) {
      conf.headers = options.headers
    }

    const baseLayer = new mars3d.layer.XyzLayer(conf)
    this.map.addLayer(baseLayer)
    return baseLayer
  }

  /**
   * @name: addUrlLayer
   * @msg: 蓝白底图加载(规自数据，其它数据可能不适用)
   * @param {*} options
   * @return {*}
   */
  addElectricLayer(options) {
    var res = new Cesium.Resource({
      url: options.url,
      headers: options.headers
    })
    var image = new Cesium.UrlTemplateImageryProvider({
      id: options.id,
      url: res,
      name: options.name,
      show: options.show,
      tilingScheme: new Cesium.GeographicTilingScheme(),
      minimumLevel: 0,
      customTags: {
        sz: function (imageryProvider, x, y, level) {
          return level - 9
        }
      }
    })
    const urlTemplateImageryProvider = this.viewer.imageryLayers.addImageryProvider(image)
    // this.viewer.imageryLayers.lowerToBottom(urlTemplateImageryProvider)
    this._imageryLayers.push(urlTemplateImageryProvider)
    urlTemplateImageryProvider.id = options.id
    return urlTemplateImageryProvider
  }

  /**
   * @name: addWFSLayer
   * @msg: 行政区wfs图层加载
   * @param {*} options
   * @return {*}
   */
  addWFSLayer(options) {
    const geoJsonLayer = new mars3d.layer.GeoJsonLayer({
      id: options.id,
      name: options.name,
      url: `${options.url}?service=WFS&version=1.0.0&request=GetFeature&typeName=${options.layer}&outputFormat=application/json`,
      headers: options.headers,
      show: options.show,
      symbol: options.symbol
    })

    this.map.addLayer(geoJsonLayer)

    return geoJsonLayer
  }

  /**
   * @name: addGaodeLayer
   * @msg: 添加高德地图
   * @param {*} options
   * @return {*}
   */
  addGaodeLayer(options) {
    const gaodeLayer = new mars3d.layer.GaodeLayer({
      id: options.id,
      layer: options.layer,
      brightness: options.brightness,
      alpha: options.alpha,
      contrast: options.contrast,
      hue: options.hue,
      saturation: options.saturation,
      gamma: options.gamma
    })

    this.map.addLayer(gaodeLayer)

    return gaodeLayer
  }

  /**
   * @name: addBaiduLayer
   * @msg: 添加百度地图
   * @param {*} options
   * @return {*}
   */
  addBaiduLayer(options) {
    const baiduLayer = new mars3d.layer.BaiduLayer({
      id: options.id,
      layer: options.layer,
      brightness: options.brightness,
      alpha: options.alpha,
      contrast: options.contrast,
      hue: options.hue,
      saturation: options.saturation,
      gamma: options.gamma
    })

    this.map.addLayer(baiduLayer)

    return baiduLayer
  }

  /**
   * @name: addLabels
   * @msg: 添加文字标注
   * @param {*} options
   * @return {*}
   */
  addLabels(data, options, clearFlag = true) {
    if (clearFlag) {
      this.clearLayerById(options.id)
    }
    let graphicLayer
    if (options.id) {
      graphicLayer = this.map.getLayerById(options.id)
    }

    if (!graphicLayer) {
      graphicLayer = new mars3d.layer.GraphicLayer({
        id: options.id
      })

      this.map.addLayer(graphicLayer)
    }

    data.forEach((item) => {
      const coor = item.position
      var label = new mars3d.graphic.LabelEntity({
        position: new mars3d.LatLngPoint(coor[0], coor[1], coor[2]),
        style: {
          text: item.name,
          color: options.color,
          font_size: options.fontSize,
          font_weight: options.fontWeight,
          scaleByDistance: options.scaleByDistance,
          disableDepthTestDistance: Number.POSITIVE_INFINITY, // 不被遮挡,
          distanceDisplayCondition: options.distanceDisplayCondition,
          scale: options.scale * this.bigScale
        },
        attr: item
      })

      graphicLayer.addGraphic(label)
    })

    return graphicLayer
  }

  /**
   * @name: addLabels
   * @msg: 添加图标(可附带文字)
   * @param {*} options
   * @return {*}
   */
  addBillboards(data, options = {}, clearFlag = true) {
    try {
      // 移除之前可能已经添加的图标
      this.rmBillboards()
      // 添加Billboard和Label
      this.billboards = this.map.viewer.scene.primitives.add(new Cesium.BillboardCollection())
      this.labels = this.map.viewer.scene.primitives.add(new Cesium.LabelCollection())
      const scale = (options.billScale || 1) * this.bigScale
      const highlightScale = ((options.billScale || 1) + 0.3) * this.bigScale
      data.forEach((item) => {
        const coor = item.position
        const pos = Cesium.Cartesian3.fromDegrees(coor[0], coor[1], coor[2])
        this.billboards.add({
          id: item.id + '-' + item.text,
          position: pos,
          image: item.image,
          color: options.color,
          scale,
          disableDepthTestDistance:
            options.billDisableDepthTestDistance || Number.POSITIVE_INFINITY,
          distanceDisplayCondition: options.billDistanceDisplayCondition,
          eyeOffset: options.billEyeOffset,
          height: options.height,
          heightReference: options.billHeightReference,
          horizontalOrigin: options.horizontalOrigin,
          pixelOffset: options.billPixelOffset,
          pixelOffsetScaleByDistance: options.pixelOffsetScaleByDistance,
          rotation: options.rotation,
          scaleByDistance: options.billScaleByDistance,
          show: options.billShow,
          sizeInMeters: options.sizeInMeters,
          translucencyByDistance: options.billTranslucencyByDistance,
          verticalOrigin: options.billVerticalOrigin,
          width: options.width
        })
      })
      this.billMoveHandler = new Cesium.ScreenSpaceEventHandler(this.map.viewer.canvas)
      const scene = this.map.viewer.scene
      this.billMoveHandler.setInputAction((event) => {
        if (this.labels) {
          this.labels.removeAll()
        }
        const feature = scene.pick(event.endPosition)
        if (feature && feature.primitive && feature.primitive.id) {
          if (!(this._select_primitive && feature.primitive.id === this._select_primitive.id)) {
            feature.primitive.scale = highlightScale
            this._mouseover_primitive = feature.primitive
          }
          const id = feature.primitive.id
          const name = id.split('-')[1]
          this.labels.add({
            position: feature.primitive.position,
            text: name,
            scale,
            backgroundColor: options.backgroundColor,
            backgroundPadding: options.backgroundPadding,
            disableDepthTestDistance:
              options.labelDisableDepthTestDistance || Number.POSITIVE_INFINITY,
            distanceDisplayCondition: options.labelDistanceDisplayCondition,
            eyeOffset: options.labelEyeOffset,
            fillColor: options.fillColor,
            font: options.font,
            heightReference: options.labelHeightReference,
            horizontalOrigin: options.labelHorizontalOrigin,
            outlineColor: options.outlineColor,
            outlineWidth: options.outlineWidth,
            pixelOffset: options.labelPixelOffset,
            pixelOffsetScaleByDistance: options.labelPixelOffsetScaleByDistance,
            scaleByDistance: options.labelScaleByDistance,
            show: options.labelShow,
            style: options.style,
            totalScale: options.totalScale,
            translucencyByDistance: options.labelTranslucencyByDistance,
            verticalOrigin: options.labelVerticalOrigin
          })
        } else {
          if (
            this._mouseover_primitive &&
            !(this._select_primitive && this._mouseover_primitive.id === this._select_primitive.id)
          ) {
            this._mouseover_primitive.scale = scale
            this._mouseover_primitive = null
          }
        }

      console.log("鼠标移动")
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)



      // 绑定点击事件
      if (options.callback) {
        this.billClickHandler = new Cesium.ScreenSpaceEventHandler(this.map.viewer.canvas)
        this.billClickHandler.setInputAction((event) => {
          const feature = this.map.viewer.scene.pick(event.position)
          if (feature && feature.primitive && feature.primitive.id) {
            if (this._select_primitive && feature.primitive.id === this._select_primitive.id) {
              this._select_primitive.scale = scale
              this._select_primitive = null
            } else if (
              this._select_primitive &&
              feature.primitive.id !== this._select_primitive.id
            ) {
              this._select_primitive.scale = scale
              this._select_primitive = null
              this._select_primitive = feature.primitive
              this._select_primitive.scale = highlightScale
            } else {
              this._select_primitive = feature.primitive
              this._select_primitive.scale = highlightScale
            }
            options.callback(feature.id.split('-')[0], feature.primitive.position)
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      }
    } catch (error) {
      console.error('addBillboards', error)
    }
  }

  /**
   * @name: rmBillboards
   * @msg: 移除图标
   * @param {*} options
   * @return {*}
   */
  rmBillboards() {
    // 移除Billboard
    if (this.billboards) {
      this.map.viewer.scene.primitives.remove(this.billboards)
      this.billboards = null
    }
    // 移除Label
    if (this.labels) {
      this.map.viewer.scene.primitives.remove(this.labels)
      this.labels = null
    }
    if (this.billMoveHandler) {
      this.billMoveHandler.destroy()
      this.billMoveHandler = null
    }
    // 解绑事件
    if (this.billClickHandler) {
      this.billClickHandler.destroy()
      this.billClickHandler = null
    }
  }

  /**
   * @name: setGraphicVisible
   * @msg: 设置图标的显隐
   * @param {*} id 图标的唯一标识
   * @param {*} visible 满足条件对象的显隐状态，默认true
   * @return {*}
   */
  setGraphicVisible(id, visible = true) {
    if (!this.billboards) {
      return
    }
    // 控制Billboard显隐
    for (let i = 0, len = this.billboards.length; i < len; i++) {
      const billboard = this.billboards.get(i)
      if (billboard.id.split('-')[0] == id) {
        billboard.show = visible
      }
    }
  }

  /**
   * @name: setGraphicsVisible
   * @msg: 设置一个图层内部分图标的显隐
   * @param {*} ids 用于过滤的唯一标识的数组
   * @param {*} visible 满足条件对象的显隐状态，默认true
   * @return {*}
   */
  setGraphicsVisible(ids = [], visible = true) {
    if (!this.billboards) {
      return
    }
    // 控制Billboard和Label显隐
    for (let i = 0, len = this.billboards.length; i < len; i++) {
      const billboard = this.billboards.get(i)
      ids.indexOf(billboard.id.split('-')[0])!==-1 ? billboard.show = visible :''
      // for (let j = 0, len2 = ids.length; j < len2; j++) {
      //   if (billboard.id.split('-')[0] == ids[j]) {
      //     billboard.show = visible
      //   }
      // }
    }
  }

  /**
   * @name: addFewBillboards
   * @msg: 添加图标(可附带文字)
   * @param {*} options
   * @return {*}
   */
  addFewBillboards(data, options = {}, clearFlag = true) {
    try {
      if (clearFlag) {
        this.clearLayerById(options.id)
      }
      let graphicLayer
      if (options.id) {
        graphicLayer = this.map.getLayerById(options.id)
      }

      if (!graphicLayer) {
        graphicLayer = new mars3d.layer.GraphicLayer({
          id: options.id
        })

        this.map.addLayer(graphicLayer)

        if (options.callback) {
          graphicLayer.on(mars3d.EventType.click, (e) => {
            options.callback(e.graphic.attr, e.graphic, e.cartesian)
          })
        }
      }

      const scale = (options.scale || 1) * this.bigScale
      const highlightScale = ((options.scale || 1) + 0.3) * this.bigScale
      data.forEach((item) => {
        let coor = item.position
        var label = new mars3d.graphic.BillboardEntity({
          position: new mars3d.LatLngPoint(coor[0], coor[1], coor[2]),
          style: {
            image: item.image,
            scaleByDistance: options.scaleByDistance,
            disableDepthTestDistance: Number.POSITIVE_INFINITY, //不被遮挡
            horizontalOrigin: options.horizontalOrigin,
            verticalOrigin: options.verticalOrigin,
            distanceDisplayCondition: options.distanceDisplayCondition,
            scale,
            label: options.label && {
              //不需要文字时，去掉label配置即可
              text: item.name,
              color: options.label.color,
              font_size: options.label.fontSize,
              font_weight: options.label.fontWeight,
              font_family: options.label.font_family,
              horizontalOrigin: options.label.horizontalOrigin,
              verticalOrigin: options.label.verticalOrigin,
              pixelOffset: options.label.pixelOffset,
              pixelOffsetScaleByDistance: options.label.pixelOffsetScaleByDistance,
              scaleByDistance: options.label.scaleByDistance,
              distanceDisplayCondition: options.label.distanceDisplayCondition,
              disableDepthTestDistance: Number.POSITIVE_INFINITY, //不被遮挡
              scale
            },
            highlight: {
              type: mars3d.EventType.click,
              scale: highlightScale
            }
          },
          attr: { ...item, image: null } // 图片太大，没必要存储
        })

        graphicLayer.addGraphic(label)
      })
      return graphicLayer
    } catch (error) {
      console.error('addFewBillboards', error)
      return
    }
  }

  createEmptyGraphicLayer() {
    const graphicLayer = new mars3d.layer.GraphicLayer()
    this.map.addLayer(graphicLayer)
    return graphicLayer
  }
}

export default layer
