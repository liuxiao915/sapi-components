import axios from '@/hooks/axios'
import * as mars3d from 'mars3d'

export default {
  // 教育用地wfs
  showEdulandWfs(params) {
    if (!params) {
      params = {}
    }
    try {
      window.etopMap.map.getLayerById('edulandWfsLayerId') &&
        window.etopMap.map.removeLayer(window.etopMap.map.getLayerById('edulandWfsLayerId'))
      const graphicLayer = new mars3d.layer.GraphicLayer({ id: 'edulandWfsLayerId', zIndex: 97 })
      window.etopMap.map.addLayer(graphicLayer)
      if (params.clickCallback) {
        graphicLayer.on(mars3d.EventType.click, function (evt) {
          params.clickCallback(evt)
        })
      }
      axios
        .get(
          '/geoserver/gxj_20/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gxj_20%3Aeduland&outputFormat=application%2Fjson',
          {
            headers: {
              'szvsud-license-key':
                'X/RF5zkOrX9RkW/DuWoAn6p0iE7kZbHfDdVThH+vjey2Rfoz8tarcELoNAzNO8D7',
              'content-type': 'application/json'
            }
          }
        )
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
                    // Color
                    material: mars3d.MaterialUtil.createMaterialProperty(
                      mars3d.MaterialType.Color,
                      {
                        color: params.outlineColor ? params.outlineColor : '#FB8E00'
                      }
                    )
                  },
                  clampToGround: true
                }
              })
              graphicLayer.addGraphic(p)
            })
          })
        })
    } catch (error) {
      console.error('showEdulandWfs', error)
    }
  }
}
