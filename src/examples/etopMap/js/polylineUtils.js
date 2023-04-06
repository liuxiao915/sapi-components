import * as mars3d from 'mars3d'

export default {
  /**
   *
   * @param {*} graphicLayer layer对象
   * @param {*} startPoint 开始坐标点
   * @param {*} endPoint 终点坐标点
   * @param {{
   *    angularityFactor:Number,
   *    numOfSingleLine:Number,
   *    width:Number,
   *    materialColor:String,
   *    materialSpeed:Number,
   *    materialPercent:Number,
   *    materialAlpha:Number,
   * }} polylineOptions
   */
  addPolylineEntity(layer, startPoint, endPoint, polylineOptions) {
    if (!polylineOptions) {
      polylineOptions = {}
    }
    const sPoint = mars3d.Cesium.Cartesian3.fromDegrees(
      startPoint[0],
      startPoint[1],
      startPoint.length > 2 ? startPoint[2] : 0
    )
    const ePoint = mars3d.Cesium.Cartesian3.fromDegrees(
      endPoint[0],
      endPoint[1],
      endPoint.length > 2 ? endPoint[2] : 0
    )
    const positions = mars3d.PolyUtil.getLinkedPointList(
      sPoint,
      ePoint,
      polylineOptions.angularityFactor || 10000,
      polylineOptions.numOfSingleLine || 20
    ) // 计算曲线点
    const graphic = new mars3d.graphic.PolylineEntity({
      positions: positions,
      style: {
        width: polylineOptions.width || 5,
        material: mars3d.MaterialUtil.createMaterialProperty(
          mars3d.MaterialType.LineFlowColor,
          {
            color: polylineOptions.materialColor || '#00ffff',
            speed: polylineOptions.materialSpeed || 30,
            percent: polylineOptions.materialPercent || 0.25,
            alpha: polylineOptions.materialAlpha || 0.6
          }
        )
      }
    })
    layer.addGraphic(graphic)
  },

  /**
   * 根据点画线
   */
  drawLineByPositions({    positions,    color = '#FFA14E',    width = 3,    closure = false,    layerId  } = {}) {
    const graphicLayer = new mars3d.layer.GraphicLayer({ id: layerId })
    this.map.addLayer(graphicLayer)
    const primitive = new mars3d.graphic.PolylinePrimitive({
      // positions: [
      //     [117.225811, 31.772658, 28],
      //     [117.251371, 31.771603, 24.8],
      //     [117.24979, 31.739408, 25.4],
      //     [117.229487, 31.751584, 27.5]
      // ],
      positions: positions,
      style: {
        width: width,
        closure: closure,
        color: color,
        material: mars3d.MaterialUtil.createMaterial(
          mars3d.MaterialType.Color,
          {
            color: color,
            dashLength: 5
          }
        )
      }
    })
    graphicLayer.addGraphic(primitive)
    return graphicLayer
  },


 // 虚线 ，双色间隔
 drawDash2ColorPolyline(graphicLayer ,options) {

    const graphic = new mars3d.graphic.PolylineEntity({
      id:options.id,
      positions:options.positions,
      style: {
        width: options.width,
        material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.PolylineDash, {
          color: options.color,
          gapColor: options.gapColor,
          dashPattern: options.dashPattern
        }),
        clampToGround: options.clampToGround, //设置贴地
        classificationType:options.classificationType,//指定贴地时的覆盖类型，是只对地形、3dtiles 或 两者同时。
        disableDepthTestDistance :Number.POSITIVE_INFINITY,//去掉地形遮挡
        depthFail:false,
        // zIndex:1000,
        // addHeight:1000
      },
    })
    graphicLayer.addGraphic(graphic)
   
    return graphicLayer

  }

}
