import * as mars3d from "mars3d";

export default class BaseBoxEntityUtils {
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
  initGraphicLayer(options,) {
    if (!this.graphicLayer) {
      this.graphicLayer = new mars3d.layer.GraphicLayer(options || {});
      this.map.addLayer(this.graphicLayer);
      //this.bindLayerPopup(this.graphicLayer)
    }

    return this.graphicLayer;
  }
  getPositionList(position, length, offset) {
    const divide = (length + 1) / 2;
    const [lng] = position;
    const lngStart = lng - divide * offset;

    const lngArr = [];

    for (let i = 0; i < length; i++) lngArr.push(lngStart + offset * i);

    return lngArr;
  }
  /**
   * @method addBoxEntityBar
   * @param position { Array } 经纬度
   * @param dimensions { Array } 长宽
   * @param data { Array } 数据
   * @param offset { Number } 位置偏移
   */
  addBoxEntityBar({
    position,
    dimensions = [900, 900],
    data = [],
    offset = 0.015,
  }) {
    this.initGraphicLayer({});

    const lngArr = this.getPositionList(position, data.length, offset);
    const [, lat, alt] = position;
    const [length, width, height] = dimensions;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      const style = {
        dimensions: new mars3d.Cesium.Cartesian3(
          length,
          width,
          item?.value || height
        ),
        heading: 45,
        addHeight: (item?.value || height) / 2,
        setHeight: 3000,
        ...item.style,
      };

      const boxEntity = new mars3d.graphic.BoxEntity({
        position: new mars3d.LngLatPoint(lngArr[i], lat, alt),
        style,
      });
      boxEntity.attr.data=data[i];
      this.graphicLayer.addGraphic(boxEntity);
    }
    
    return this.graphicLayer;
  }
  /**
   * @method addBoxEntityBarList
   * @param list { Array } 数据
   * @returns graphicLayer { Object } 实例
   */
  addBoxEntityBarList(list) {
    for (const item of list) this.addBoxEntityBar(item);

    return this.graphicLayer;
  }
  removeBoxEntityBar() {
    this.graphicLayer.clear();
  }
  //绑定弹窗
  bindLayerPopup(graphicLayer) { 
    graphicLayer.bindPopup(function (event) {
      console.log(event)
      const attr = event.graphic.attr || {}
      attr["类型"] = event.graphic.type
      attr["数值"] = JSON.stringify(event.graphic.attr.data)
      attr["屏幕坐标"] = event.position
      attr["BOX坐标"] = event.graphic.points[0]
      attr["备注"] = "我支持鼠标交互"
  
      return mars3d.Util.getTemplateHtml({ title: "数据展示", template: "all", attr: attr })
    })
  }
}
