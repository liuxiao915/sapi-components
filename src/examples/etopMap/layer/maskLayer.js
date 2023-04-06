import axios from '@/hooks/axios'
import { color } from 'echarts'
import * as mars3d from 'mars3d'

export default {
  /**
   * @name: addXzqMaskLayer
   * @msg: 添加行政区遮罩和行政区注记
   */
  addXzqMaskLayer(dataList, etopMap, options) {
    if (!etopMap) return
    if (!options) {
      options = {}
    }
    function getItem(name, dataList) {
      if (!(dataList && dataList.length > 0)) return null
      const array = dataList.filter((item) => {
        return item.name === name
      })
      if (array && array.length > 0) {
        return array[0]
      } else {
        return null
      }
    }

    const layerId = 'xzqMask'
    etopMap.removeLayerByLayerId(layerId)

    // 创建行政区遮罩图层
    const layer = new mars3d.layer.GeoJsonLayer({
      id: layerId
    })
    const height = mars3d.Cesium.Cartographic.fromCartesian(
      etopMap.map.viewer.camera.position
    ).height
    if (height < 60000) {
      layer.show = false
    }
    if (options.clickCallback) {
      layer.on(mars3d.EventType.click, function (event) {
        if (options.highlight) {
          event.layer.graphics.forEach((item) => {
            item.openHighlight({}, true)
          })
          event.layer.graphics.forEach((item) => {
            if (event.graphic.attr.QUNAME === item.attr.QUNAME) {
              item.openHighlight(options.highlight, false)
            }
          })
        }
        options.clickCallback(event)
      })
    }
    if (options.mouseOverCallback) {
      layer.on(mars3d.EventType.mouseOver, function (event) {
        if (options.highlight) {
          event.layer.graphics.forEach((item) => {
            item.openHighlight({}, true)
          })
          event.layer.graphics.forEach((item) => {
            if (event.graphic.attr.QUNAME === item.attr.QUNAME) {
              item.openHighlight(options.highlight, false)
            }
          })
        }
        options.mouseOverCallback(event)
      })
    }
    if (options.mouseOutCallback) {
      layer.on(mars3d.EventType.mouseOut, function (event) {
        event.layer.graphics.forEach((item) => {
          item.openHighlight({}, true)
        })
        options.mouseOutCallback(event)
      })
    }
    etopMap.map.addLayer(layer)

    // 添加每个行政区的遮罩
    axios.get('/jsons/keyAreas/map/szxzq4.geojson').then((res) => {
      res.data.features.map((feat) => {
        const item = getItem(feat.properties.QUNAME, dataList)
        feat.geometry.coordinates.map((coords) => {
          const p = new mars3d.graphic.PolygonEntity({
            positions: coords,
            style: {
              height: 3000,
              extrudedHeight: 0,
              fill: true,
              color: item && item.color ? item.color : '#005AAC',
              opacity: options.opacity ? options.opacity : 0.95,
              outline: options.outline ? options.outline : true,
              outlineStyle: {
                color: item && item.color ? item.color : '#0092FF',
                width: options.outlineWidth ? options.outlineWidth : 2,
                opacity: 1
              },
              highlight: options.highlight ? options.highlight : null,
              clampToGround: false
            },
            attr: { ...feat, ...feat.properties }
          })
          layer.addGraphic(p)
        })
      })
    })
    setTimeout(() => {
      if (etopMap.xzqLabels?._labels?.length > 0) {
        return
      }
      // 添加行政区注记
      axios.get('/jsons/keyAreas/map/qu_centroids.geojson').then((res) => {
        const features = res.data.features
        etopMap.xzqLabels = etopMap.map.viewer.scene.primitives.add(
          new mars3d.Cesium.LabelCollection()
        )
        if (height < 60000) {
          etopMap.xzqLabels.show = false
        }
        const scale = 0.6 * etopMap.bigScale
        features.forEach((item) => {
          const coordinates = item.geometry.coordinates
          const quName = item.properties.QNAME
          etopMap.xzqLabels.add({
            position: mars3d.Cesium.Cartesian3.fromDegrees(
              coordinates[0],
              coordinates[1],
              3400
            ),
            text: quName,
            distanceDisplayCondition:
              new mars3d.Cesium.DistanceDisplayCondition(10.0, 170000),
            horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: mars3d.Cesium.HorizontalOrigin.Bottom,
            scale,
            showBackground: true,
            backgroundColor: new mars3d.Cesium.Color(0, 0.35, 0.674, 0),
            visibleDepth: false
          })
        })
      })
    }, 500)
  },

  //移除遮罩高亮
  removeXzqMaskHighlight(etopMap) {
    const xzqLayer = etopMap.layer.getLayerById('xzqMask')
    if (xzqLayer) {
      xzqLayer.graphics.forEach((item) => {
        item.openHighlight({}, true)
      })
    }
  },

  /**
   * @name: addJdMaskLayer
   * @msg: 添加各街道遮罩
   */
  addJdMaskLayer(etopMap, options) {
    if (!etopMap) return
    if (!options) {
      options = {}
    }
    const layer = new mars3d.layer.GeoJsonLayer({
      id: 'xzqMask',
      name: '街道拥堵',
      //url: '/jsons/keyAreas/map/gzj_jd3.geojson',
      data: geodata.jdData,
      graphicOptions: {
        vertexCacheOptimize: true,
        asynchronous: false
      },
      zIndex: 100,
      mask: true,
      symbol: {
        type: 'polygonCombine',
        styleOptions: {
          height: 3000,
          extrudedHeight: 0,
          fill: true,
          color: '#005AAC',
          opacity: 1,
          outline: true,
          outlineStyle: {
            color: '#ffffff',
            width: 1.1,
            opacity: 1
          }
        },
        merge: true,
        styleField: options.styleField || '',
        styleFieldOptions: options.styleFieldOptions || null
      }
      // flyTo: true,
    })
    const height = mars3d.Cesium.Cartographic.fromCartesian(
      etopMap.map.viewer.camera.position
    ).height
    if (height < 60000) {
      layer.show = false
    }
    if (options.clickCallback) {
      layer.on(mars3d.EventType.click, function (event) {
        options.clickCallback(event)
      })
    }
    etopMap.map.addLayer(layer)
  },

  /**
   * 利用entity的方式加载面geojson并拉伸高度
   * @param {Cesium.Viewer} viewer ：Cesium的Viewer
   * @param {String} url ：geojson文件的地址
   * @param {Number} exHeight ：拉伸高度字段名称
   * @param {Object} styleFieldOptions ：数据对应颜色字段名称
   * @param {Function} clickCallback ：创建拉伸体后回调函数
   */
  addExtrudedGeoJson(viewer, url, exHeight, styleFieldOptions, clickCallback) {
    viewer.scene.fxaa = true
    viewer.scene.postProcessStages.fxaa.enabled = true
    const promise = new mars3d.Cesium.GeoJsonDataSource.load(url)
    console.log(promise)
    promise.then((datasource) => {
      console.time(12)
      console.log(datasource)
      datasource.show = false;
      viewer.dataSources.add(datasource) // 加载这个geojson资源
      const entities = datasource.entities.values
      console.log(entities)
      let colorstr = null
      for (let index = 0; index < entities.length; index++) {
        const entity = entities[index]
        if (styleFieldOptions[entity.name]) {
          colorstr = styleFieldOptions[entity.name].color
          entity.polygon.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND // 贴地
          entity.polygon.height = 0 // 距地高度0米
          entity.polygon.extrudedHeightReference = Cesium.HeightReference.RELATIVE_TO_GROUND //拉伸
          //entity.polygon.extrudedHeight = entity.properties[exHeightFieldName]; // 拉伸高度
          entity.polygon.extrudedHeight = exHeight // 拉伸高度
          entity.polygon.outline = false
          // entity.polygon.outlineColor = Cesium.Color.fromCssColorString(colorstr)
          // entity.polygon.outlineWidth = 10
          entity.polygon.material = Cesium.Color.fromCssColorString(colorstr).withAlpha(0.98)
        }
        if (index == entities.length - 1) {
          datasource.show = true
          console.timeEnd(12)
        }
      }
    })
    let handler = new mars3d.Cesium.ScreenSpaceEventHandler(
      etopMap.map.viewer.canvas
    )
    handler.setInputAction(function (movement) {
      let pickedEntity = pickEntity(viewer, movement.position)
      if (pickedEntity == undefined) {
        return
      }
      let obj = {}
      obj.graphic = {}
      obj.graphic.attr = {}
      obj.graphic.attr.OBJECTID = pickedEntity.properties.OBJECTID._value
      obj.graphic.attr.QUCODE = pickedEntity.properties.JDCODE._value
      obj.graphic.attr.QUNAME = pickedEntity.properties.QUNAME._value
      obj.graphic.type = 'MultiPolygon'
      obj.graphic.coordinates = []
      let pos = pickedEntity.polygon.hierarchy._value.positions
      for (let i = 0; i < pos.length; i++) {
        let car3 =
          etopMap.map.viewer.scene.globe.ellipsoid.cartesianToCartographic(
            pos[i]
          )
        let lat = Cesium.Math.toDegrees(car3.latitude)
        let lng = Cesium.Math.toDegrees(car3.longitude)
        let arra = [lat, lng]
        obj.graphic.coordinates.push(arra)
        car3 = null
        arra = null
      }
      obj.position = movement
      obj.windowPosition = movement
      obj.cartesian = etopMap.map.viewer.scene.camera.pickEllipsoid(
        { x: movement.position.x, y: movement.position.y, z: 0 },
        etopMap.map.viewer.scene.globe.ellipsoid
      )
      obj.czmObject = pickedEntity
      //console.log(obj);
      //let pickedEntities = drillPickEntities(viewer, movement.position);
      clickCallback(obj)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    function pickEntity(viewer, windowPosition) {
      let picked = viewer.scene.pick(windowPosition)
      if (Cesium.defined(picked)) {
        let id = Cesium.defaultValue(picked.id, picked.primitive.id)
        if (id instanceof Cesium.Entity) {
          return id
        }
      }
      return undefined
    }
    function drillPickEntities(viewer, windowPosition) {
      let i
      let entity
      let picked
      let pickedPrimitives = viewer.scene.drillPick(windowPosition)
      let length = pickedPrimitives.length
      let result = []
      let hash = {}

      for (i = 0; i < length; i++) {
        picked = pickedPrimitives[i]
        entity = Cesium.defaultValue(picked.id, picked.primitive.id)
        if (
          entity instanceof Cesium.Entity &&
          !Cesium.defined(hash[entity.id])
        ) {
          result.push(entity)
          hash[entity.id] = true
        }
      }
      return result
    }
    etopMap.map.viewer.camera.changed.addEventListener(() => {
      // TODO
      const height = mars3d.Cesium.Cartographic.fromCartesian(
        etopMap.map.viewer.camera.position
      ).height
      if (height < 60000) {
        etopMap.map.dataSources._dataSources[0].show = false
      } else {
        etopMap.map.dataSources._dataSources[0].show = true
      }
    })
  },

  /**
   * 利用primitive的方式加载面geojson并拉伸高度
   * @param {Cesium.Viewer} viewer ：Cesium的Viewer
   * @param {String||Object} url ：geojson文件的地址或者接口地promise
   * @param {Number} exHeight ：拉伸高度字段名称
   * @param {Object} styleFieldOptions ：数据对应颜色字段名称
   * @param {Function} clickCallback ：创建拉伸体后回调函数
   */
  addPolyExtrudeGeoJson(viewer, url, exHeight, styleFieldOptions, clickCallback) {
    viewer.scene.fxaa = true
    viewer.scene.postProcessStages.fxaa.enabled = true
    let features=null;
    if(typeof(url)=='object'){
      url.then((res)=>{
        features = res.data.features;
        addDataToGlobe(features)
      }) 
    }else if(typeof(url)=='string'){
      axios.get(url).then((res) => {
        console.log(res)
        features = res.data.features;
        addDataToGlobe(features)
      })
    }
    
    let handler = new mars3d.Cesium.ScreenSpaceEventHandler(
      etopMap.map.viewer.canvas
    )
    handler.setInputAction(function (movement) {
      let pickedFeature = viewer.scene.pick(movement.position);
      if (!Cesium.defined(pickedFeature)) {
        // nothing picked
        return;
      }
      let worldPosition = viewer.scene.pickPosition(movement.position);
      let featureID=Number(pickedFeature.id.split('_')[1])
      let obj = {}
      obj.graphic = {}
      obj.graphic.attr = {}
      obj.graphic.attr.OBJECTID = features[featureID].properties.fid
      obj.graphic.attr.JDNAME = features[featureID].properties.jd_name
      obj.graphic.attr.QUNAME = features[featureID].properties.qu_name
      obj.graphic.attr.JDCODE = features[featureID].properties.qu_code
      obj.graphic.type = 'MultiPolygon'
      obj.graphic.coordinates = features[featureID].geometry
      obj.position = movement
      obj.windowPosition = movement
      obj.cartesian=worldPosition
      obj.czmObject=pickedFeature.primitive
      obj.features=features[featureID]
      clickCallback(obj)

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    function addDataToGlobe(features) {
      const instances = [];
      for (let i = 0; i < features.length; i++) {
        for (let j = 0; j < features[i].geometry.coordinates.length; j++) {

          if(styleFieldOptions[features[i].properties.jd_name]){

          let colorstr = styleFieldOptions[features[i].properties.jd_name]
          let objecID='polygon_'+i
          const polygonArray = features[i].geometry.coordinates[j].toString().split(',');
          const polygon = new Cesium.PolygonGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(
              Cesium.Cartesian3.fromDegreesArray(polygonArray)
            ),
            // 设置面的拉伸高度
            extrudedHeight: exHeight,
            perPositionHeight: true,
            closeBottom: true,
            closeTop: false,
            arcType: 'ArcType.RHUMB'
          });
          const geometry = Cesium.PolygonGeometry.createGeometry(polygon);
          instances.push(new Cesium.GeometryInstance({
            id: objecID,
            geometry: geometry,
            attributes: {
              //color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({ alpha: 0.98 })),
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString(colorstr.color).withAlpha(0.9)),
            }
          }));
          }
        }
      }
      // 合并单个geometry,提高渲染效率
      const primitive = new Cesium.Primitive({
        geometryInstances: instances,
        appearance: new Cesium.PerInstanceColorAppearance({
          flat: true,
        }),
        vertexCacheOptimize: true,
        releaseGeometryInstances: false
      });
      viewer.scene.primitives.add(primitive);
    }
  }
}
