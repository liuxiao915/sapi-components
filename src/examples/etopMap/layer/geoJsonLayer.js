import * as mars3d from 'mars3d'
import axios from '@/hooks/axios'

export const addGeojsonLayer = (options) => {
  if (!options) {
    options = {}
  }
  if (!(options.data && options.data.features && options.data.features.length > 0)) return
  const graphicLayer = new mars3d.layer.GraphicLayer({ zIndex: options.zIndex || 9 })
  window.etopMap.map.addLayer(graphicLayer)
  options.data.features.map((feat) => {
    feat.geometry.coordinates.map((coords) => {
      const p = new mars3d.graphic.PolygonEntity({
        positions: coords,
        style: {
          fill: options.fill ? options.fill : true,
          color: options.color ? options.color : '#FF6464',
          opacity: options.opacity ? options.opacity : 0.33,
          outline: options.outline ? options.outline : true,
          outlineStyle: {
            color: options.outlineColor ? options.outlineColor : '#FF6464',
            width: options.outlineWidth ? options.outlineWidth : 3,
            opacity: 1
          },
          clampToGround: true
        },
        flyTo: true
      })
      graphicLayer.addGraphic(p)
    })
  })

  if (options.clickCallback) {
    graphicLayer.on(mars3d.EventType.click, function (event) {
      options.clickCallback(event)
    })
  }
  return graphicLayer
}

// 添加易图图层服务
export const addEtopGeojsonLayer = (params) => {
  if (!params) {
    params = {}
  }
  if (!(params.id && params.url)) {
    return
  }
  try {
    window.etopMap.map.getLayerById(params.id) &&
      window.etopMap.map.removeLayer(window.etopMap.map.getLayerById(params.id))
    const graphicLayer = new mars3d.layer.GraphicLayer({
      id: params.id,
      zIndex: params.zIndex || 97
    })
    window.etopMap.map.addLayer(graphicLayer)
    if (params.clickCallback) {
      graphicLayer.on(mars3d.EventType.click, function (evt) {
        params.clickCallback(evt)
      })
    }
    axios
      .get(params.url, {
        headers: {
          'szvsud-license-key': 'X/RF5zkOrX9RkW/DuWoAn6p0iE7kZbHfDdVThH+vjey2Rfoz8tarcELoNAzNO8D7',
          'contetn-type': 'application/json'
        }
      })
      .then((result) => {
        result.data.features.map((feat) => {
          feat.geometry.coordinates.map((coords) => {
            const p = new mars3d.graphic.PolygonEntity({
              positions: coords,
              style: {
                fill: params.fill ? params.fill : false,
                color: params.color ? params.color : '#FB8E00',
                opacity: params.opacity ? params.opacity : 0,
                outline: params.outline ? params.outline : true,
                outlineStyle: {
                  color: params.outlineColor ? params.outlineColor : '#FB8E00',
                  width: params.outlineWidth ? params.outlineWidth : 4,
                  opacity: 1,
                  material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.Color, {
                    color: params.outlineColor ? params.outlineColor : '#FB8E00'
                  })
                },
                clampToGround: true
              }
            })
            graphicLayer.addGraphic(p)
          })
        })
      })
  } catch (error) {
    console.error('addEtopGeojsonLayer', error)
  }
}
