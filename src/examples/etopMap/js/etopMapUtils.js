import * as turf from '@turf/turf'
import axios from 'axios'
import * as mars3d from 'mars3d'
// 获取封控区数据
const fkqData = () => {
  return axios.get(
    'http://10.253.102.69/gw/OGC/GeoData/WFS/COVID_FKQ_A?format=image/png&service=WFS&version=1.1.1&request=GetFeature&typeName=covid-19:covid_fkq&outputFormat=application%2Fjson',
    {
      //  return  axios
      //   .get('/jsons/keyAreas/map/COVID_FKQ_A.geojson', {
      headers: {
        'szvsud-license-key':
          'X/RF5zkOrX9RkW/DuWoAn6p0iE7kZbHfDdVThH+vjey2Rfoz8tarcELoNAzNO8D7'
      }
    }
  )
}
// 管控區
const gkqData = () => {
  return axios.get(
    'http://10.253.102.69/gw/OGC/GeoData/WFS/COVID_GKQ_A?format=image/png&service=WFS&version=1.1.1&request=GetFeature&typeName=covid-19:covid_gkq&outputFormat=application%2Fjson',
    {
      // return axios
      //   .get('/jsons/keyAreas/map/COVID_GKQ_A.geojson', {
      headers: {
        'szvsud-license-key':
          'X/RF5zkOrX9RkW/DuWoAn6p0iE7kZbHfDdVThH+vjey2Rfoz8tarcELoNAzNO8D7'
      }
    }
  )
}
// 防範區
const ffqData = () => {
  return axios.get(
    'http://10.253.102.69/gw/OGC/GeoData/WFS/COVID_FFQ_A?format=image/png&service=WFS&version=1.1.1&request=GetFeature&typeName=covid-19:covid_ffq&outputFormat=application%2Fjson',
    {
      // return axios
      //   .get('/jsons/keyAreas/map/COVID_FFQ_A.geojson', {
      headers: {
        'szvsud-license-key':
          'X/RF5zkOrX9RkW/DuWoAn6p0iE7kZbHfDdVThH+vjey2Rfoz8tarcELoNAzNO8D7'
      }
    }
  )
}

export default {
  /**
   * 根据几何查询中心点
   * @param geometry
   * @returns {Cesium.Cartesian3|*}
   */
  getQhCenter(geometry) {
    return turf.centerOfMass(geometry)
  },

  /**
   * 创建面的GeoJson
   * @param positions  [[[lng,lat],[lng,lat]]]
   * @returns {}
   */
  createPolygonGeoJson(positions) {
    return turf.polygon(positions)
  },

  /**
   * 根据几何查询中心点
   * @param positions
   * @returns {Cesium.Cartesian3|*}
   */
  getQhCenterWithPositions(positions) {
    return turf.centerOfMass(this.createPolygonGeoJson(positions))
  },

  /**
   * 根据坐标点，查询是否属于三区
   * @param {*} point 坐标点
   * point示例：[[114.067415,22.519059],[114.067784,22.519079],[114.038896,22.5291],[ 113.86342,22.562968],[-46.643, -23.557,0]]
   */
  async queryIsSanqu(point) {
    const points = turf.points(point)
    const fkqArr = fkqData() // 封控区
    const gkqArr = gkqData() // 管控区
    const ffqArr = ffqData() // 防范区
    const reslutsArr = await Promise.all([fkqArr, gkqArr, ffqArr])
    const searchWithinArr = []
    reslutsArr.map((resluts, index) => {
      let typeName = ''
      resluts &&
        resluts.data &&
        resluts.data.features &&
        resluts.data.features.map((features) => {
          const polygonArr = []
          features &&
            features.geometry &&
            features.geometry.coordinates &&
            features.geometry.coordinates.map((coordinates) => {
              const temp1 = []
              coordinates.map((coord) => {
                coord.map((cord) => {
                  temp1.push(cord)
                })
              })
              if (temp1[0] !== temp1[temp1.length - 1]) {
                temp1.push(temp1[0])
              }
              polygonArr.push(temp1)
            })
          const searchWithin = turf.polygon(polygonArr)
          const ptsWithin = turf.pointsWithinPolygon(points, searchWithin)
          if (index === 0) {
            typeName = '封控区'
          } else if (index === 1) {
            typeName = '管控区'
          } else if (index === 2) {
            typeName = '防范区'
          }
          if (ptsWithin.features.length) {
            searchWithinArr.push({
              typeName: typeName,
              features: features
            })
          }
        })
    })
    return searchWithinArr
  },

  /**
   * 计算两点间的距离
   * @param stPt：开始坐标[ 113.982078, 22.547923]
   * @param endPt：结束坐标[ 113.982078, 22.547923]
   * @param units：单位：degrees, radians, miles, or kilometers
   * @param type：distance：直线距离，circle：大圆线距离
   * @returns {number}，返回距离
   */
  calculateLeng({ stPt, endPt, units = 'kilometers', type = 'distance' } = {}) {
    const from = turf.point(stPt)
    const to = turf.point(endPt)
    const options = { units: units }
    let distance = turf.distance(from, to, options)
    if (type === 'circle') {
      // 大圆线
      distance = turf.rhumbDistance(from, to, options)
    }
    return distance
  },

  /**
   *
   * @param centerPt:[ 113.98207845324552, 22.54792327953856]
   * @param radius:半径，100
   * @param units:单位：degrees, radians, miles, or kilometers
   * @param type:类型，positive正向正方形，rotate：旋转90度的正方形
   * @returns {number} 四个顶点，正北为0度 逆时针方向
   */
  calculateSquare({
    centerPt,
    radius,
    units = 'kilometers',
    type = 'positive'
  } = {}) {
    const distance = Math.sqrt(Math.pow(radius, 2) + Math.pow(radius, 2))
    var point = turf.point(centerPt)
    var options = { units }
    var destination1 = turf.destination(point, distance, 45, options)
    var destination2 = turf.destination(point, distance, 135, options)
    var destination3 = turf.destination(point, distance, 225, options)
    var destination4 = turf.destination(point, distance, 315, options)

    if (type === 'rotate') {
      destination1 = turf.destination(point, radius, 0, options)
      destination2 = turf.destination(point, radius, 90, options)
      destination3 = turf.destination(point, radius, 180, options)
      destination4 = turf.destination(point, radius, 270, options)
    }
    return [
      destination1.geometry.coordinates,
      destination2.geometry.coordinates,
      destination3.geometry.coordinates,
      destination4.geometry.coordinates
    ]
  },

  //世界坐标转经纬度
  cartesian3ToPoint(cartesian) {
    const result =
      window.etopMap.viewer.scene.globe.ellipsoid.cartesianToCartographic(
        cartesian
      )
    return [
      mars3d.Cesium.Math.toDegrees(result.longitude),
      mars3d.Cesium.Math.toDegrees(result.latitude)
    ]
  }
}
