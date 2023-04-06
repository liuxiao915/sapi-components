import * as mars3d from 'mars3d'

let maxR = 4000 // 最大半径
let minR = 0 // 圆初始半径
const deviationR = 10 // 为每次圆增加的大小
const colors = ['#FF0000', '#F9E900', '#00D0FF'] // 颜色数组
const rounds = [1000, 2000, 4000] // 半径数组 从小到大

const getRound = () => {
  minR = minR + deviationR
  if (minR >= maxR) {
    minR = 0
  }
  return minR
}

/**
 *
 * @param {*} map 地图对象
 * @param {*} data rounds半径数组 colors颜色数组 lng经度 lat纬度 height高度
 */
export const addEmergencyFun = (map, data) => {
  const roundArray = data && data.rounds && data.rounds.length === 3 ? data.rounds : rounds
  const colorArray = data && data.colors && data.colors.length === 3 ? data.colors : colors
  maxR = Math.max.apply(null, roundArray)
  map.viewer.entities.add({
    name: '',
    position: mars3d.Cesium.Cartesian3.fromDegrees(data.lng, data.lat, data.height),
    ellipse: {
      semiMinorAxis: new mars3d.Cesium.CallbackProperty(getRound, false),
      semiMajorAxis: new mars3d.Cesium.CallbackProperty(getRound, false),
      height: data.height,
      material: new mars3d.Cesium.ImageMaterialProperty({
        repeat: new mars3d.Cesium.Cartesian2(1.0, 1.0),
        transparent: true,
        color: new mars3d.Cesium.CallbackProperty(function () {
          var alp = 1 - minR / maxR
          if (minR < roundArray[0]) {
            return mars3d.Cesium.Color.fromCssColorString(colorArray[0]).withAlpha(0.5)
          } else if (minR < roundArray[1]) {
            return mars3d.Cesium.Color.fromCssColorString(colorArray[1]).withAlpha(0.4)
          } else if (minR < roundArray[2]) {
            return mars3d.Cesium.Color.fromCssColorString(colorArray[2]).withAlpha(
              alp > 0.38 ? 0.38 : alp
            )
          }
        }, false)
      })
    }
  })
}
