import axios from 'axios'
import * as mars3d from 'mars3d'
export default {
  name: 'yqMixin',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},

  methods: {
    // 封控区
    addCOVID_FKQ_A(params) {
      if (!params) {
        params = {}
      }
      params.clear && this.removeLayer('COVID_FKQ_A')
      const graphicLayer = new mars3d.layer.GraphicLayer({
        id: 'COVID_FKQ_A',
        zIndex: 98
      })
      window.etopMap.map.addLayer(graphicLayer)
      if (params.clickCallback) {
        graphicLayer.on(mars3d.EventType.click, function (evt) {
          params.clickCallback(evt)
        })
      }
      axios
        .get(
          'http://10.253.102.69/gw/OGC/GeoData/WFS/COVID_FKQ_A?format=image/png&service=WFS&version=1.1.1&request=GetFeature&typeName=covid-19:covid_fkq&outputFormat=application%2Fjson',
          {
            // axios
            //   .get('/jsons/keyAreas/map/COVID_FKQ_A.geojson', {
            headers: {
              'szvsud-license-key':
                'X/RF5zkOrX9RkW/DuWoAn6p0iE7kZbHfDdVThH+vjey2Rfoz8tarcELoNAzNO8D7'
            }
          }
        )
        .then((result) => {
          result &&
            result.data &&
            result.data.features &&
            result.data.features.map((feat) => {
              feat &&
                feat.geometry &&
                feat.geometry.coordinates &&
                feat.geometry.coordinates.map((coords) => {
                  this.addPic(
                    coords,
                    require('../images/yq/COVID_FKQ_A.png'),
                    'FKQ_A'
                  )
                  const p = new mars3d.graphic.PolygonEntity({
                    positions: coords,
                    style: {
                      fill: params.fill ? params.fill : true,
                      color: params.color ? params.color : '#F7684F',
                      opacity: params.opacity ? params.opacity : 0.6,
                      outline: params.outline ? params.outline : true,
                      outlineStyle: {
                        color: params.outlineColor
                          ? params.outlineColor
                          : '#F7684F',
                        width: params.outlineWidth ? params.outlineWidth : 3,
                        opacity: 1,
                        material: mars3d.MaterialUtil.createMaterialProperty(
                          mars3d.MaterialType.PolylineDash,
                          {
                            color: params.outlineColor
                              ? params.outlineColor
                              : '#F7684F'
                          }
                        )
                      },
                      clampToGround: true
                    },
                    attr: { threeZoneName: '封控区', ...feat }
                  })
                  graphicLayer.addGraphic(p)
                })
            })
        })
      return 'COVID_FKQ_A'
    },
    // 防范区
    addCOVID_FFQ_A(params) {
      if (!params) {
        params = {}
      }
      params.clear && this.removeLayer('COVID_FFQ_A')
      const graphicLayer = new mars3d.layer.GraphicLayer({
        id: 'COVID_FFQ_A',
        zIndex: 95
      })
      if (params.clickCallback) {
        graphicLayer.on(mars3d.EventType.click, function (evt) {
          params.clickCallback(evt)
        })
      }
      window.etopMap.map.addLayer(graphicLayer)
      axios
        .get(
          'http://10.253.102.69/gw/OGC/GeoData/WFS/COVID_FFQ_A?format=image/png&service=WFS&version=1.1.1&request=GetFeature&typeName=covid-19:covid_ffq&outputFormat=application%2Fjson',
          {
            // axios
            //   .get('/jsons/keyAreas/map/COVID_FFQ_A.geojson', {
            headers: {
              'szvsud-license-key':
                'X/RF5zkOrX9RkW/DuWoAn6p0iE7kZbHfDdVThH+vjey2Rfoz8tarcELoNAzNO8D7'
            }
          }
        )
        .then((result) => {
          result &&
            result.data &&
            result.data.features &&
            result.data.features.map((feat) => {
              feat &&
                feat.geometry &&
                feat.geometry.coordinates &&
                feat.geometry.coordinates.map((coords) => {
                  this.addPic(
                    coords,
                    require('../images/yq/COVID_FFQ_A.png'),
                    'FFQ_A'
                  )
                  const p = new mars3d.graphic.PolygonEntity({
                    positions: coords,
                    style: {
                      fill: params.fill ? params.fill : true,
                      color: params.color ? params.color : '#94C2FB',
                      opacity: params.opacity ? params.opacity : 0.6,
                      outline: params.outline ? params.outline : true,
                      outlineStyle: {
                        color: params.outlineColor
                          ? params.outlineColor
                          : '#94C2FB',
                        width: params.outlineWidth ? params.outlineWidth : 3,
                        opacity: 1,
                        material: mars3d.MaterialUtil.createMaterialProperty(
                          mars3d.MaterialType.PolylineDash,
                          {
                            color: params.outlineColor
                              ? params.outlineColor
                              : '#94C2FB'
                          }
                        )
                      },
                      clampToGround: true
                    },
                    attr: { threeZoneName: '防范区', ...feat }
                  })
                  graphicLayer.addGraphic(p)
                })
            })
        })
      return 'COVID_FFQ_A'
    },
    // 管控区
    addCOVID_GKQ_A(params) {
      if (!params) {
        params = {}
      }
      params.clear && this.removeLayer('COVID_GKQ_A')
      const graphicLayer = new mars3d.layer.GraphicLayer({
        id: 'COVID_GKQ_A',
        zIndex: 97
      })
      window.etopMap.map.addLayer(graphicLayer)
      if (params.clickCallback) {
        graphicLayer.on(mars3d.EventType.click, function (evt) {
          params.clickCallback(evt)
        })
      }
      axios
        .get(
          'http://10.253.102.69/gw/OGC/GeoData/WFS/COVID_GKQ_A?format=image/png&service=WFS&version=1.1.1&request=GetFeature&typeName=covid-19:covid_gkq&outputFormat=application%2Fjson',
          {
            // axios
            //   .get('/jsons/keyAreas/map/COVID_GKQ_A.geojson', {
            headers: {
              'szvsud-license-key':
                'X/RF5zkOrX9RkW/DuWoAn6p0iE7kZbHfDdVThH+vjey2Rfoz8tarcELoNAzNO8D7'
            }
          }
        )
        .then((result) => {
          result &&
            result.data &&
            result.data.features &&
            result.data.features.map((feat) => {
              feat &&
                feat.geometry &&
                feat.geometry.coordinates &&
                feat.geometry.coordinates.map((coords) => {
                  this.addPic(
                    coords,
                    require('../images/yq/COVID_GKQ_A.png'),
                    'GKQ_A'
                  )
                  const p = new mars3d.graphic.PolygonEntity({
                    positions: coords,
                    style: {
                      fill: params.fill ? params.fill : true,
                      color: params.color ? params.color : '#F6D094',
                      opacity: params.opacity ? params.opacity : 0.6,
                      outline: params.outline ? params.outline : true,
                      outlineStyle: {
                        color: params.outlineColor
                          ? params.outlineColor
                          : '#F6D094',
                        width: params.outlineWidth ? params.outlineWidth : 3,
                        opacity: 1,
                        material: mars3d.MaterialUtil.createMaterialProperty(
                          mars3d.MaterialType.PolylineDash,
                          {
                            color: params.outlineColor
                              ? params.outlineColor
                              : '#F6D094'
                          }
                        )
                      },
                      clampToGround: true
                    },
                    attr: { threeZoneName: '管控区', ...feat }
                  })
                  graphicLayer.addGraphic(p)
                })
            })
        })
      return 'COVID_GKQ_A'
    },
    // 參考管控区
    addCOVID_CKGKQ_A(params) {
      if (!params) {
        params = {}
      }
      params.clear && this.removeLayer('COVID_CKGKQ_A')
      const graphicLayer = new mars3d.layer.GraphicLayer({
        id: 'COVID_CKGKQ_A',
        zIndex: 96
      })
      window.etopMap.map.addLayer(graphicLayer)
      if (params.clickCallback) {
        graphicLayer.on(mars3d.EventType.click, function (evt) {
          params.clickCallback(evt)
        })
      }
      axios
        .get(
          'http://10.253.102.69/gw/OGC/GeoData/WFS/COVID_CKGKQ_A?format=image/png&service=WFS&version=1.1.1&request=GetFeature&typeName=covid-19:covid_ckgkq&outputFormat=application%2Fjson',
          {
            // axios
            //   .get('/jsons/keyAreas/map/COVID_CKGKQ_A.geojson', {
            headers: {
              'szvsud-license-key':
                'X/RF5zkOrX9RkW/DuWoAn6p0iE7kZbHfDdVThH+vjey2Rfoz8tarcELoNAzNO8D7'
            }
          }
        )
        .then((result) => {
          result &&
            result.data &&
            result.data.features &&
            result.data.features.map((feat) => {
              feat &&
                feat.geometry &&
                feat.geometry.coordinates &&
                feat.geometry.coordinates.map((coords) => {
                  this.addPic(
                    coords,
                    require('../images/yq/COVID_CKGKQ_A.png'),
                    'CKGKQ'
                  )
                  const p = new mars3d.graphic.PolygonEntity({
                    positions: coords,
                    style: {
                      fill: params.fill ? params.fill : true,
                      color: params.color ? params.color : '#FA94D3',
                      opacity: params.opacity ? params.opacity : 0.6,
                      outline: params.outline ? params.outline : true,
                      outlineStyle: {
                        color: params.outlineColor
                          ? params.outlineColor
                          : '#FA94D3',
                        width: params.outlineWidth ? params.outlineWidth : 3,
                        opacity: 1,
                        material: mars3d.MaterialUtil.createMaterialProperty(
                          mars3d.MaterialType.PolylineDash,
                          {
                            color: params.outlineColor
                              ? params.outlineColor
                              : '#FA94D3'
                          }
                        )
                      },
                      clampToGround: true
                    },
                    attr: { threeZoneName: '參考管控区', ...feat }
                  })
                  graphicLayer.addGraphic(p)
                })
            })
        })
      return 'COVID_CKGKQ_A'
    },
    // 删除图层
    removeLayer(layerId) {
      window.etopMap.map.getLayerById(layerId) &&
        window.etopMap.map.removeLayer(window.etopMap.map.getLayerById(layerId))
    },
    // 高亮
    clickHightLight(params) {
      if (!params) {
        params = {}
      }
      !params.layerId && (params.layerId = 'clickHightLight')
      params.clear && this.removeLayer(params.layerId)
      const graphicLayer = new mars3d.layer.GraphicLayer({ id: params.layerId })
      graphicLayer.clampToGround({ has3dtitles: true })
      window.etopMap.map.addLayer(graphicLayer)

      const polygon = new mars3d.graphic.PolygonEntity({
        positions: params.positions,
        style: {
          fill: params.fill ? params.fill : false,
          color: params.color ? params.color : '#1f31cc',
          outline: params.outline ? params.outline : true,
          outlineColor: params.outlineColor ? params.outlineColor : '#1f31cc',
          outlineWidth: params.outlineWidth ? params.outlineWidth : 3,
          outlineOpacity: params.outlineOpacity ? params.outlineOpacity : 1,
          clampToGround: params.clampToGround ? params.clampToGround : true
        }
      })
      // console.log('polygon.center: ' + polygon.center);
      // console.log('polygon.centerPoint : ' + polygon.centerPoint );
      // window.etopMap.map.flyTo(polygon);
      graphicLayer.addGraphic(polygon)
    },
    addPic(coords, image, type) {
      this.yqEntprimitives = window.etopMap.map.viewer.scene.primitives.add(
        new mars3d.Cesium.BillboardCollection()
      )
      const polygon = new mars3d.graphic.PolygonEntity({
        positions: coords,
        style: {
          fill: false,
          color: '#1f31cc',
          outline: true,
          outlineColor: '#1f31cc',
          outlineWidth: 3,
          outlineOpacity: 1,
          clampToGround: true
        }
      })
      this.yqEntprimitives.add({
        id: 'yq_' + type,
        image: image,
        show: true,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        position: mars3d.Cesium.Cartesian3.fromDegrees(
          polygon.centerPoint.lng,
          polygon.centerPoint.lat,
          30
        ),
        scale: 1 * window.etopMap.bigScale
        // scaleByDistance: new mars3d.Cesium.NearFarScalar(50, 0.5, 1.5e5, 0.3)
      })
    },

    addThreeAreasLayer(params) {
      if (!params) {
        params = {}
      }
      if (!(params.data && params.data.length > 0)) return
      const graphicLayer = new mars3d.layer.GraphicLayer({
        id: params.layerId || null,
        zIndex: params.zIndex || 90
      })
      window.etopMap.map.addLayer(graphicLayer)
      if (params.clickCallback) {
        graphicLayer.on(mars3d.EventType.click, function (evt) {
          params.clickCallback(evt)
        })
      }
      const yqEntprimitives = window.etopMap.map.viewer.scene.primitives.add(
        new mars3d.Cesium.BillboardCollection()
      )
      params.data.foreEach((item) => {
        const p = new mars3d.graphic.PolygonEntity({
          positions: item.placeRange,
          style: {
            fill: params.fill ? params.fill : true,
            color: params.color ? params.color : '#F7684F',
            opacity: params.opacity ? params.opacity : 0.6,
            outline: params.outline ? params.outline : true,
            outlineStyle: {
              color: params.outlineColor ? params.outlineColor : '#F7684F',
              width: params.outlineWidth ? params.outlineWidth : 3,
              opacity: 1,
              material: mars3d.MaterialUtil.createMaterialProperty(
                mars3d.MaterialType.PolylineDash,
                {
                  color: params.outlineColor ? params.outlineColor : '#F7684F'
                }
              )
            },
            clampToGround: true
          },
          attr: { ...item }
        })
        graphicLayer.addGraphic(p)

        yqEntprimitives.add({
          id: 'yq3q_mark_' + item.id,
          image: item.image,
          show: true,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          position: mars3d.Cesium.Cartesian3.fromDegrees(
            item.centerPosition[0],
            item.centerPosition[1],
            30
          ),
          scale: 1 * window.etopMap.bigScale
        })
      })
      return { graphicLayer, maskBillboardCollection: yqEntprimitives }
    }
  }
}
