import * as mars3d from "mars3d";

export const dataList = [
  {
    id: 0,
    name: "南山区",
    position: [113.95073239750282, 22.564112402018165, 0],
    image: require("@/assets/images/mars3d/yellow.png"),
  },
  {
    id: 2,
    name: "宝安区",
    position: [113.84573239750282, 22.650112402018165, 0],
    image: require("@/assets/images/mars3d/yellow.png"),
  },
  {
    id: 4,
    name: "光明区",
    position: [113.93073239750282, 22.754112402018165, 0],
    image: require("@/assets/images/mars3d/yellow.png"),
  },
  {
    id: 6,
    name: "罗湖区",
    position: [114.15073239750282, 22.571112402018165, 0],
    image: require("@/assets/images/mars3d/yellow.png"),
  },
  {
    id: 8,
    name: "福田区",
    position: [114.03073239750282, 22.534112402018165, 0],
    image: require("@/assets/images/mars3d/yellow.png"),
  },
  {
    id: 10,
    name: "龙岗区",
    position: [114.26673239750282, 22.722112402018165, 0],
    image: require("@/assets/images/mars3d/yellow.png"),
  },
  {
    id: 12,
    name: "盐田区",
    position: [114.26873239750282, 22.611112402018165, 0],
    image: require("@/assets/images/mars3d/yellow.png"),
  },
  {
    id: 14,
    name: "坪山区",
    position: [114.35173239750282, 22.663112402018165, 0],
    image: require("@/assets/images/mars3d/yellow.png"),
  },
  {
    id: 16,
    name: "大鹏新区",
    position: [114.47673239750282, 22.591112402018165, 0],
    image: require("@/assets/images/mars3d/yellow.png"),
  },
  {
    id: 18,
    name: "深汕合作区",
    position: [115.027275, 22.864112402018165, 0],
    image: require("@/assets/images/mars3d/yellow.png"),
  },
  {
    id: 20,
    name: "龙华区",
    position: [114.02073239750282, 22.640112402018165, 0],
    image: require("@/assets/images/mars3d/yellow.png"),
  },
]

export const addMarkLayer = (map, list, clickCallback, options = {}) => {
  if (!(list && list.length > 0)) return
  // 创建矢量数据图层
  try {
    const graphicLayer = new mars3d.layer.GraphicLayer({
      clampToGround: options.clampToGround ? options.clampToGround : false,
      clustering: options.clustering ? options.clustering : null
    })
    // 高亮时的样式（默认为})
    map.addLayer(graphicLayer)
    const scale = (options.styleOptions?.scale || 0.5) * 1
    const highlightScale = (options.styleOptions?.highlightScale || 0.8) * 1
    list.forEach((item) => {
      const graphic = new mars3d.graphic.BillboardPrimitive({
        name: item.name,
        position: item.position,
        style: {
          image: item.image,
          scale,
          horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: mars3d.Cesium.VerticalOrigin.BOTTOM,
          clampToGround: options.clampToGround ? options.clampToGround : false,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
          highlight: {
            type: mars3d.EventType.click,
            scale: highlightScale
          }
        },
        attr: { ...item }
      })
      graphicLayer.addGraphic(graphic)
    })
    const _map = map
    if (clickCallback) {
      // 在layer上绑定监听事件
      graphicLayer.on(mars3d.EventType.click, function (event) {
        if (!event.graphic) {
          // 单击了聚合的点
          _map.flyTo(event.pickedObject.id, { duration: 1 })
        } else {
          clickCallback(event)
        }
      })
      graphicLayer.on(mars3d.EventType.mouseOver, function (event) {
        if (event && event.graphic) {
          event.graphic.setStyle({ scale: highlightScale })
        }
      })
      graphicLayer.on(mars3d.EventType.mouseOut, function (event) {
        if (event && event.graphic) {
          event.graphic.setStyle({ scale })
        }
      })
    }
    return graphicLayer
  } catch (error) {
    console.error('addMarkLayer', error)
    return
  }
}

