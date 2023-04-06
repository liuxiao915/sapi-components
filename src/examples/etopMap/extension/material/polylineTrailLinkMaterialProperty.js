import * as mars3d from 'mars3d'
/**
 * class PolylineTrailLinkMaterialProperty 流动线纹理扩展类
 * 可设置颜色，速度
 */
class PolylineTrailLinkMaterialProperty {
  constructor(color, duration) {
    this._definitionChanged = new mars3d.Cesium.Event()
    this._color = undefined
    this._colorSubscription = undefined
    this.color = color
    this.duration = duration || 3000
    this._time = new Date().getTime()

    this.isTranslucent = function () {
      return true
    }
  }
  /**
   * 获取类型
   * @private
   */
  getType() {
    return 'PolylineTrailLink'
  }
  /**
   * 获取属性值，获取结果材质
   * @param {number} time 速度相关的动画时间
   * @param {object} result 返回的材质结果
   * @private
   */
  getValue(time, result) {
    if (!mars3d.Cesium.defined(result)) {
      result = {}
    }
    result.color = mars3d.Cesium.Property.getValueOrClonedDefault(
      this._color,
      time,
      mars3d.Cesium.Color.WHITE,
      result.color
    )
    result.image = mars3d.Cesium.Material.PolylineTrailLinkImage
    result.time =
      ((new Date().getTime() - this._time) % this.duration) / this.duration
    return result
  }
  /**
   * 如果为true，则会调用该对象的equal方法来判断
   * @param {object} other
   * @private
   */
  equals(other) {
    return (
      this === other ||
      (other instanceof PolylineTrailLinkMaterialProperty &&
        mars3d.Cesium.Property.equals(this._color, other._color))
    )
  }
}

// const createMaterialImage = function () {
//   var c = document.createElement('canvas')
//   c.width = 512
//   c.height = 32
//   var ctx = c.getContext('2d')
//   var my_gradient = ctx.createLinearGradient(0, 0, c.width, 0)
//   my_gradient.addColorStop(0, 'rgba(255,0,0, 1)')
//   my_gradient.addColorStop(1, 'rgba(255,0,0, 0)')
//   ctx.fillStyle = my_gradient
//   ctx.fillRect(0, 0, c.width, c.height)
//   return c.toDataURL('image/png')
// }

Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
  isConstant: {
    get: function () {
      return false
    }
  },
  definitionChanged: {
    get: function () {
      return this._definitionChanged
    }
  },
  color: mars3d.Cesium.createPropertyDescriptor('color')
})

mars3d.Cesium.PolylineTrailLinkMaterialProperty =
  PolylineTrailLinkMaterialProperty
mars3d.Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink'
// 被着色器采样的图片
mars3d.Cesium.Material.PolylineTrailLinkImage = require('../../images/etop/alphaGradient.png')
// 着色器代码
mars3d.Cesium.Material.PolylineTrailLinkSource = `czm_material czm_getMaterial(czm_materialInput materialInput) {
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec2 st = materialInput.st;
    vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));
    material.alpha = colorImage.a * color.a;
    material.diffuse = (color.rgb);
    return material;
  }`
mars3d.Cesium.Material._materialCache.addMaterial(
  mars3d.Cesium.Material.PolylineTrailLinkType,
  {
    fabric: {
      type: mars3d.Cesium.Material.PolylineTrailLinkType,
      uniforms: {
        color: new mars3d.Cesium.Color(1.0, 0.0, 0.0, 0),
        image: mars3d.Cesium.Material.PolylineTrailLinkImage,
        time: 20
      },
      source: mars3d.Cesium.Material.PolylineTrailLinkSource
    },
    translucent: function (material) {
      return true
    }
  }
)
