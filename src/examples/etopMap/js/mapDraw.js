import * as mars3d from 'mars3d'
export default {
  drawPolygon: (map, options, drawCreatedCallback) => {
    const layer = window.etopMap.map.getLayerById('drawMap')
    layer ? window.etopMap.map.removeLayer(layer) : ''
    const geoJsonDrawLayer = new mars3d.layer.GraphicLayer({
      id:'drawMap',
    })
    map.addLayer(geoJsonDrawLayer)
    geoJsonDrawLayer.startDraw({
      // type ,style 参考http://mars3d.cn/api/global.html#GraphicType
      type: (options && options.type) || 'polygon',
      style: (options && options.style) || {
        fill: true,
        color: '#ff0000',
        opacity: 0.3,
        outline: true,
        outlineStyle: {
          color: '#ff0000',
          width: 3,
          opacity: 1,
          material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.PolylineDash, {
            color: '#ff0000'
          })
        },
        clampToGround: false
      }
    })
    if (drawCreatedCallback) {
      geoJsonDrawLayer.on(mars3d.EventType.drawCreated, function (event) {
        drawCreatedCallback(event)
      })
    }
  },
  drawBillboard: (map, options, drawCreatedCallback) => {
    const layer = window.etopMap.map.getLayerById('drawMap')
    layer ? window.etopMap.map.removeLayer(layer) : ''
    const geoJsonDrawLayer = new mars3d.layer.GraphicLayer({
      id:'drawMap',
    })
    map.addLayer(geoJsonDrawLayer)
    geoJsonDrawLayer.startDraw({
      // type ,style 参考http://mars3d.cn/api/global.html#GraphicType
      type: 'billboard',
      style: (options && options.style) || {
        image:require("@/assets/images/draw/point.png"),
        scale:1,
        clampToGround: false
      }
    })
    if (drawCreatedCallback) {
      geoJsonDrawLayer.on(mars3d.EventType.drawCreated, function (event) {
        drawCreatedCallback(event)
      })
    }
  },
  drawCurve: (map, options, drawCreatedCallback) => {
    const layer = window.etopMap.map.getLayerById('drawMap')
    layer ? window.etopMap.map.removeLayer(layer) : ''
    const geoJsonDrawLayer = new mars3d.layer.GraphicLayer({
      id:'drawMap',
    })
    map.addLayer(geoJsonDrawLayer)
    geoJsonDrawLayer.startDraw({
      // type ,style 参考http://mars3d.cn/api/global.html#GraphicType
      type: 'curve',
      style: (options && options.style) || {
        color:'#3f65f6',
        width:6,
      }
    })
    if (drawCreatedCallback) {
      geoJsonDrawLayer.on(mars3d.EventType.drawCreated, function (event) {
        drawCreatedCallback(event)
      })
    }
  },
  drawRectangle:(map, options, drawCreatedCallback) => {
    const layer = window.etopMap.map.getLayerById('drawMap')
    layer ? window.etopMap.map.removeLayer(layer) : ''
    const geoJsonDrawLayer = new mars3d.layer.GraphicLayer({
      id:'drawMap',
    })
    map.addLayer(geoJsonDrawLayer)
    geoJsonDrawLayer.startDraw({
      // type ,style 参考http://mars3d.cn/api/global.html#GraphicType
      type: 'rectangle',
      style: (options && options.style) || {
        fill:true,
        color:'#797af3',
        opacity:0.8,
        outline:true,
        outlineStyle:{
          material:mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.PolylineDash, {
            color: Cesium.Color.RED,
            gapColor:Cesium.Color.TRANSPARENT,
          }),
          width:6,
        }
      }
    })
    if (drawCreatedCallback) {
      geoJsonDrawLayer.on(mars3d.EventType.drawCreated, function (event) {
        drawCreatedCallback(event)
      })
    }
  },
  drawCircle:(map, options, drawCreatedCallback) => {
    const layer = window.etopMap.map.getLayerById('drawMap')
    layer ? window.etopMap.map.removeLayer(layer) : ''
    const geoJsonDrawLayer = new mars3d.layer.GraphicLayer({
      id:'drawMap',
    })
    map.addLayer(geoJsonDrawLayer)
    geoJsonDrawLayer.startDraw({
      // type ,style 参考http://mars3d.cn/api/global.html#GraphicType
      type: 'circle',
      style: (options && options.style) || {
        fill:true,
        color:'#797af3',
        opacity:0.4,
        outline:true,
        outlineWidth:2,
        outlineColor:'#4869f5',
      }
    })
    if (drawCreatedCallback) {
      geoJsonDrawLayer.on(mars3d.EventType.drawCreated, function (event) {
        drawCreatedCallback(event)
      })
    }
  },
  drawLabel:(map, options, drawCreatedCallback) => {
    const layer = window.etopMap.map.getLayerById('drawMap')
    layer ? window.etopMap.map.removeLayer(layer) : ''
    const geoJsonDrawLayer = new mars3d.layer.GraphicLayer({
      id:'drawMap',
    })
    map.addLayer(geoJsonDrawLayer)
    geoJsonDrawLayer.startDraw({
      // type ,style 参考http://mars3d.cn/api/global.html#GraphicType
      type: 'label',
      style: (options && options.style) || {
        text:'文本标记',
        color:'#4869f5',
        background: true,
        backgroundColor:'#ffffff',
      }
    })
    if (drawCreatedCallback) {
      geoJsonDrawLayer.on(mars3d.EventType.drawCreated, function (event) {
        drawCreatedCallback(event)
      })
    }
  },
}
