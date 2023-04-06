import * as mars3d from 'mars3d'

export default {
  /**弃用
   * 根据optionObj参数飞行至指定type的几何要素
   * @param {String} type 支持graphic(BaseGraphic|Array), 
   *                 pointP(LngLatPoint|Cesium.Cartesian3|Array)
   *                 positions(Array.<Cesium.Cartesian3>)
   *                 extent(Object|Cesium.Rectangle)
   *                 home(geomObj=null)
   *                 target(Cesium内部对象)
   * @param {array/object} geomObj 
   * @param {object} optionsObj 常用参数(radius, scale, minHeight, maxHeight, heading, pitch, roll, duration, complete, cancel, easingFunction)
   * @returns null
   */
   flyByTypes(type='graphic', geomObj, optionsObj={}){
    if(!geomObj){
      return 
    }
    switch(type){
      case 'graphic':
        window.etopMap.map.flyToGraphic(geomObj, optionsObj)
        break;
      case 'pointP':
        window.etopMap.map.flyToPoint(geomObj, optionsObj)
        break;
      case 'positions':
        window.etopMap.map.flyToPositions(geomObj, optionsObj)
        break;
      case 'extent':
        window.etopMap.map.flyToExtent(geomObj, optionsObj)
        break;
      case 'home':
        window.etopMap.map.flyHome(optionsObj)
        break;
      case 'target':
        window.etopMap.map.flyTo(geomObj, optionsObj)
        break;
    }
  },

  /**
   * 飞行至某个点(经纬度坐标)
   * @param {object} 
   *                 param0 lng 经度
   *                 param1 lat 纬度
   *                 param2 alt 高度
   *                 param3 options {Object} 飞行参数
   */
  flyToPoint({lng,lat,alt=0,options={}}){
    const point = new mars3d.LngLatPoint(lng, lat, alt)
    window.etopMap.map.flyToPoint(point, {
      radius: options.radius || 1000,
      heading: options.heading || 0,
      pitch: options.pitch || -45,
      roll:options.roll || 0,
      duration: options.duration || 1,
      clampToGround: options.clampToGround || false,
      complete: options.complete || (()=>{}),
      cancel: options.cancel || (()=>{}),
    })
  },

  /**
   * 飞行至边界框范围
   * @param {Object} 
   * param0 xmin 左边界
   * param1 xmax 右边界
   * param2 ymin 下边界
   * param3 ymax 上边界
   * param4 height 高度
   * param5 options 飞行参数 {object}
   */
  flyToExtent({xmin, xmax, ymin, ymax, height=0, options={}}){
    const extent={
      xmin,
      xmax,
      ymin,
      ymax,
      height
    }
    window.etopMap.map.flyToExtent(extent, {
      scale: options.scale || 3,
      minHeight:options.minHeight || 200,
      maxHeight: options.maxHeight || 2000,
      heading: options.heading || 0,
      pitch: options.pitch || -45,
      roll:options.roll || 0,
      duration: options.duration || 1,
      complete: options.complete || (()=>{}),
      cancel: options.cancel || (()=>{}),
    })
  },

/**
 * 飞行至矢量对象
 * @param {Object} graphic 矢量对象
 * @param {Object} options 飞行参数
 */
  flyToGraphic(graphic, options={}){
    let sr
    if(graphic.type==='point'||graphic.type==='pointP'){
      sr={
        radius: options.radius || 1000,
      }
    }else{
      sr={
        scale: options.scale || 3,
      }
    }
    window.etopMap.map.flyToGraphic(graphic, {...sr, ...{   
      minHeight:options.minHeight || 200,
      maxHeight: options.maxHeight || 2000,
      heading: options.heading || 0,
      pitch: options.pitch || -45,
      roll:options.roll || 0,
      duration: options.duration || 1,
      complete: options.complete || (()=>{}),
      cancel: options.cancel || (()=>{}),
    }})
  },

  /**
   * 飞行至坐标数组
   * @param {Array} positionArr Cartesian3位置数组
   * @param {Object} options 飞行参数
   */
  flyToPositions(positionArr, options={}){
    window.etopMap.map.flyToPositions(positionArr, {   
      radius: options.radius || 1000,
      scale: options.scale || 3,
      minHeight:options.minHeight || 200,
      maxHeight: options.maxHeight || 2000,
      heading: options.heading || 0,
      pitch: options.pitch || -45,
      roll:options.roll || 0,
      duration: options.duration || 1,
      complete: options.complete || (()=>{}),
      cancel: options.cancel || (()=>{}),
    })
  },

  /**
   * 飞行至Cesium相关矢量对象处
   * @param {Object} target cesium矢量对象
   * @param {Object} options 飞行参数
   */
  flyTo(target, options={}){
    window.etopMap.map.flyTo(target,{
      maximumHeight: options.maximumHeight || 2000,
      duration: options.duration || 1,
      offset: options.offset || 3.0
    })
  }
}