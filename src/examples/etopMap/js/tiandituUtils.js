import * as mars3d from 'mars3d'

export default {
  /**
   * 添加天地图的图层(电子图层, 影像图层以及地形渲染图层)
   * @param {*} type  天地图图层类型(支持vec, img, ter三种)
   * @param {*} isLabelShow   天地图对应的注记层是否显示
   * @param {*} token    天地图的token, 可自行注册(https://console.tianditu.gov.cn/api/key)
   */
  addTiandituLayers({
    type = 'img',
    isLabelShow = true,
    token = mars3d.Token.tiandituArr
  } = {}) {
    //清除已加载的天地图
    this.removeTiandituLayers()
    //添加天地图图层
    const tdtLayer = new mars3d.layer.TdtLayer({
      layer: `${type}_d`,
      key: token,
      name: '天地图图层',
      id: 'tiandituLayer'
    })
    //天地图注记
    const tdtLabel = new mars3d.layer.TdtLayer({
      layer: `${type}_z`,
      key: token,
      name: '天地图注记',
      id: 'tiandituLabel',
      show: isLabelShow
    })
    window.etopMap.map.addLayer(tdtLayer)
    window.etopMap.map.addLayer(tdtLabel)
  },

  removeTiandituLayers() {
    const tdtLayer = window.etopMap.map.getLayerById('tiandituLayer')
    const tdtLabel = window.etopMap.map.getLayerById('tiandituLabel')
    tdtLayer && window.etopMap.map.removeLayer(tdtLayer)
    tdtLabel && window.etopMap.map.removeLayer(tdtLabel)
  }
}
