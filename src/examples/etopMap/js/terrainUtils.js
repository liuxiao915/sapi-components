/**
 * 天地图的地形服务有问题  mars3d-tdt插件的引用问题
 * cesium-tdt只支持cesium1.52 1.58 1.63.1
 */
import * as mars3d from 'mars3d'

export default {
  /**
   * 切换地形服务
   * @param {*} type ('xyz','arcgis','ion','gee','vr')
   */
  toggleTerrainProvider(type){
    if(process?.env?.NODE_ENV === 'production'){
      if(!type){
        if (process?.env?.VUE_APP_ETOPMAP_DEVELOPER) 
          type = 'xyz'
  
        else type = 'guizi'
      }
    }else if(process?.env?.NODE_ENV === 'development'){
      if(!type){
        type === 'xyz'
      }
    }
    
    const map = window.etopMap.map
    switch(type){
      case 'none':  //无地形
        map.terrainProvider = mars3d.LayerUtil.getNoTerrainProvider()
        break
      case "xyz": // 标准xyz服务
        map.terrainProvider = mars3d.LayerUtil.createTerrainProvider({
          url: "http://data.mars3d.cn/terrain",
        })
        break
      case "arcgis": // ArcGIS地形服务
        map.terrainProvider = mars3d.LayerUtil.createTerrainProvider({
          type: "arcgis",
          url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
        })
        break
      case "ion": // cesium官方ion在线服务
        map.terrainProvider = mars3d.LayerUtil.createTerrainProvider({
          type: "ion",
          //requestWaterMask: true,
          //requestVertexNormals: true
        })
        break
      case "gee": // 谷歌地球企业服务
        map.terrainProvider = mars3d.LayerUtil.createTerrainProvider({
          type: "gee",
          url: "http://www.earthenterprise.org/3d",
          proxy: "//server.mars3d.cn/proxy/"
        })
        break
      case "vr": // vr地形服务
        map.terrainProvider = mars3d.LayerUtil.createTerrainProvider({
          type: "vr",
          url: "https://www.vr-theworld.com/vr-theworld/tiles1.0.0/73/"
        })
        break
      case 'tianditu':
        //用mars3d插件有问题
        // map.terrainProvider = new mars3d.provider.TdtTerrainProvider({
        //   url: "https://t{s}.tianditu.gov.cn/DataServer",
        //   key: '08e556c9d308740a38027f9a4b7875d6',
        //   subdomains: "01234567"
        // })
        //用cesium插件有版本问题
        break
      case 'guizi':
        let headers ={
          "szvsud-license-key":"yO+ChHjBx7FZmtGQnUVVCVe8JcKfj0ggEmqjUkBrTOEk9EF+j3Nk65pqSo5W8+Qz"
        }
        const url = new mars3d.Cesium.Resource({
          url: "http://10.253.102.69/gw/COMMON/dem/dem30/",
          queryParameters:{
            TileMatrixSet: 'EPSG:4490',
            layer:'dem30',
          },
          headers,
        })
        map.terrainProvider = mars3d.LayerUtil.createTerrainProvider({
          url,
        })
        break
    }
    //map.scene.globe.terrainExaggeration = 10 // 修改地形夸张程度
  },

  /**
   * 是否开启地形服务
   * @param {*} val   Boolean  
   */
  enableTerrain(val){
    window.etopMap.map.hasTerrain = val
  },

  /**
   * 是否开启三角网
   * @param {*} val   Boolean  
   */
  enabledTerrainSJW(val) {
    window.etopMap.map.scene.globe._surface.tileProvider._debug.wireframe = val
  }
}