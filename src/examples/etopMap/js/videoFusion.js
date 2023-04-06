import * as mars3d from 'mars3d'
export default class VideoUtils {
  constructor(map) {
    this.map = map
  }
  addVideoFusion(videoInfo) {
    this.clearVideoLayer()
    //创建视频图层
    const graphicLayer = new mars3d.layer.GraphicLayer({
      zIndex: 999999,
      id: 'videoGraphic'
    })
    this.map.addLayer(graphicLayer)
    //创建视频dom节点
    const videoElement = this.createVideoDom(videoInfo.id, videoInfo.url)
    //创建矢量数据, 用于贴图
    const graphic = new mars3d.graphic.PolygonEntity({
      positions: videoInfo.positions,
      style: {
        material: videoElement,
        stRotationDegree: videoInfo.stRotation, // 视频旋转角度
        clampToGround: true
      },
      attr: { remark: videoInfo }
    })
    graphicLayer.addGraphic(graphic)
    return graphicLayer
  }

  createVideoDom(className = '', url) {
    const videoElement = mars3d.DomUtil.create(
      'video',
      className,
      document.querySelector('.mapContainer')
    )
    videoElement.setAttribute('muted', 'muted')
    videoElement.setAttribute('autoplay', 'autoplay')
    videoElement.setAttribute('loop', 'loop')
    videoElement.setAttribute('crossorigin', '')
    videoElement.setAttribute('controls', '')
    videoElement.style.display = 'none'

    const sourceContainer = mars3d.DomUtil.create('source', '', videoElement)
    sourceContainer.setAttribute('src', url)
    sourceContainer.setAttribute('type', 'video/mp4')

    this.map.clock.shouldAnimate = true
    return videoElement
  }

  clearVideoLayer() {
    const graphicLayer = this.map.getLayerById('videoGraphic')
    this.map.removeLayer(graphicLayer)
  }
}
