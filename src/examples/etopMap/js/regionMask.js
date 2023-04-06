import * as mars3d from 'mars3d'
import axios from '@/hooks/axios'
import * as turf from '@turf/turf'
import { getRegionData } from '@/api/modules/map/region.js'

export default {
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
  async showMaskByName({
    quName = '深圳市',
    isLocate = true,
    maskColor = '#000217',
    opacity = 0.8,
    outlineStyleColor = '#000217',
    outlineWidth = 2,
    outlineOpacity = 1
  } = {}) {
    let xzqData = await this.getSzMaskData()
    if (quName === '深圳市') {
      window.etopMap.clearLayerById('mask')
      window.etopMap.map.flyHome()
    } else {
      let geojsonFilter = xzqData.filter((v, i) => {
        return v.properties.QNAME === quName
      })
      // 通过turf修复数据
      const featureCollection = turf.featureCollection(geojsonFilter)
      if (isLocate) {
        const bbox = turf.bbox(featureCollection)
        window.etopMap.map.flyToExtent(
          {
            xmin: bbox[0],
            ymin: bbox[1],
            xmax: bbox[2],
            ymax: bbox[3]
          },
          { scale: 1.8, duration: 1.5 }
        )
      }
      //
      this.addGeojsonLayer(featureCollection, {
        id: 'mask',
        mask: true,
        symbol: {
          styleOptions: {
            fill: true,
            color: maskColor,
            opacity: opacity,
            outline: true,
            outlineStyle: {
              color: outlineStyleColor,
              width: outlineWidth,
              opacity: outlineOpacity
            },
            arcType: mars3d.Cesium.ArcType.GEODESIC,
            clampToGround: true
          }
        }
      })
    }
    return 'mask'
  },
  /**
   * 深圳市外的遮罩
   * @param opacity {number} 遮罩透明度，默认0.8
   * @param maskColor {string} 遮罩颜色，默认"#000217"
   * @param maskOutLineColor {string} 遮罩外边线颜色，默认"#ededed"
   * @param maskOutLineWidth {number} 遮罩外边线宽度，默认1
   * @returns {string} 遮罩图层id
   */
  showMaskSzOutside({
    opacity = 0.8,
    maskColor = '#000217',
    maskOutLineColor = '#ededed',
    maskOutLineWidth = 1
  } = {}) {
    const geoJsonLayer = new mars3d.layer.GeoJsonLayer({
      url: './jsons/szdistrict.json',
      id: 'maskWw',
      mask: true,
      show: true,
      zIndex: 1,
      symbol: {
        styleOptions: {
          fill: true,
          color: maskColor,
          opacity: opacity,
          outline: true,
          outlineStyle: {
            color: maskOutLineColor,
            width: maskOutLineWidth,
            opacity: 1
          },
          arcType: mars3d.Cesium.ArcType.GEODESIC,
          clampToGround: true
        }
      }
    })
    window.etopMap.map.addLayer(geoJsonLayer)
    return 'maskWw'
  },
  async getSzMaskData() {
    let result;

    if (process?.env?.VUE_APP_ETOPMAP_DEVELOPER) 
    result = await axios.get('/jsons/keyAreas/map/szxzq5.geojson')

    else result = await getRegionData()
    
    return result.data.features
  },

  // 添加GeoJSON图层
  addGeojsonLayer(geojson, options) {
    if (window.etopMap.map.getLayer(options.id)) {
      window.etopMap.map.getLayer(options.id).load({
        data: geojson,
        symbol: options.symbol,
        zIndex: options.zIndex,
        flyTo: options.flyTo,
        pointerEvents: true
      })
      return null
    }
    let geoJsonLayer = new mars3d.layer.GeoJsonLayer({
      id: options.id,
      mask: options.mask, //标识为遮罩层
      data: geojson,
      symbol: options.symbol,
      zIndex: options.zIndex,
      flyTo: options.flyTo,
      pointerEvents: true
    })
    window.etopMap.map.addLayer(geoJsonLayer)
  }
}
