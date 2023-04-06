import * as turf from '@turf/turf'
import axios from '@/hooks/axios'

/**
 * 根据坐标点，类型获取坐标点所属类型的边界线Feature
 * @param {*} point 坐标点
 * @param {*} type  area 区| street 街道 | community社区
 */
export const getBorderFeatureByPoint = (point, type = 'area') => {
  let url = ''
  switch (type) {
    case 'area':
      url = '/jsons/keyAreas/map/szxzq5.geojson'
      break
    case 'street':
      url = '/jsons/keyAreas/map/gzj_jd3.geojson'
      break
    case 'community':
      url = '/jsons/keyAreas/map/gjz_sq2.geojson'
      break
    default:
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        const features = res.data.features
        if (features && features.length > 0) {
          const list = features.filter((item) => {
            if (
              item.geometry &&
              item.geometry.coordinates &&
              item.geometry.coordinates.length > 0
            ) {
              let poly = null
              if (item.geometry.type === 'Polygon') {
                poly = turf.polygon(item.geometry.coordinates)
              } else {
                poly = turf.multiPolygon(item.geometry.coordinates)
              }
              if (!poly) return false
              return turf.booleanPointInPolygon(point, poly)
            }
          })
          if (list && list.length > 0) {
            resolve(list[0])
          } else {
            resolve(null)
          }
        } else {
          resolve(null)
        }
      })
      .catch((error) => {
        // 此处为请求失败数据
        reject(error)
      })
  })
}
