import * as mars3d from "mars3d";

export default class BaseRoamLineUtils {
  map = null;
  graphicLayer = null;
  constructor(map) {
    this.map = map;
  }
  /**
   * @method initGraphicLayer 初始化 graphicLayer
   * @param options { Object } graphicLayer 配置项
   * @returns graphicLayer { Object } 实例
   */
  initGraphicLayer(options) {
    if (!this.graphicLayer) {
      this.graphicLayer = new mars3d.layer.GraphicLayer(options || {});
      this.map.addLayer(this.graphicLayer);
    }

    return this.graphicLayer;
  }
  /**
   * @method addRoamLine
   * @param options { Object } 漫游路线配置项
   * @returns roamLine { Object } 实例
   */
  addRoamLine(options = {}) {
    this.initGraphicLayer();

    const params = {
      ...options,
    };

    const roamLine = new mars3d.graphic.RoamLine(params);

    this.graphicLayer.addGraphic(roamLine);

    return roamLine;
  }
  /**
   * @method addRoamLineList
   * @param list[options] { Array[Object] } 漫游路线配置项
   * @returns roamLine[] { Object } 实例
   */
  addRoamLineList(list) {
    return list.map((team) => this.addRoamLine(team));
  }
  removeLayer() {
    this.graphicLayer && this.map.removeLayer(this.graphicLayer, true);

    this.graphicLayer = null;
  }
}
