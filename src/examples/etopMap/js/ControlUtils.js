import * as mars3d from "mars3d";

export default class ControlUtils {
  map = null;
  // 指南针实例
  compass = null;
  // 鹰眼地图实例
  overviewMap = null;
  constructor(map) {
    this.map = map;
  }
  // 指南针基础配置
  compassBaseConfig = { left: "19px", bottom: "205px" };
  /**
   * @method addCompass
   * @param options { Object } 指南针配置项
   * @returns compass { Object } 实例
   */
  addCompass(options = {}) {
    if (this.compass) return;
    // 配置覆盖
    const config = {
      ...this.compassBaseConfig,
      ...options,
    };

    const compass = new mars3d.control.Compass(config);

    this.map.addControl(compass);

    this.compass = compass;

    return compass;
  }
  removeCompass() {
    this.map.removeControl(this.compass);
    this.compass = null;
  }
  // 鹰眼地图基础配置
  overviewMapBaseConfig = {
    style: {
      left: "19px",
      top: "115px",
      width: "200px",
      height: "150px",
    },
    rectangle: {
      color: "#fecd78",
      outline: 1,
      outlineColor: "#ff7800",
    },
    basemap: {
      type: "group",
      layers: [
        { name: "底图", type: "tdt", layer: "vec_d" },
        { name: "注记", type: "tdt", layer: "vec_z" },
      ],
    },
  };
  /**
   * @method addOverviewMap
   * @param options { Object } 鹰眼配置项
   * @returns overviewMap { Object } 实例
   */
  addOverviewMap(options = {}) {
    if (this.overviewMap) return;

    // 配置覆盖
    const { style, rectangle, basemap } = options;

    const styleConfig = {
      ...{ style: this.overviewMapBaseConfig.style },
      ...style,
    };

    const rectangleConfig = {
      ...{ rectangle: this.overviewMapBaseConfig.rectangle },
      ...rectangle,
    };

    const basemapConfig = {
      ...{ basemap: this.overviewMapBaseConfig.basemap },
      ...basemap,
    };

    // 配置覆盖
    const config = {
      ...this.baseConfig,
      ...options,
      ...styleConfig,
      ...rectangleConfig,
      ...basemapConfig,
    };

    const overviewMap = new mars3d.control.OverviewMap(config);

    this.map.addControl(overviewMap);

    this.overviewMap = overviewMap;

    return overviewMap;
  }
  removeOverviewMap() {
    this.map.removeControl(this.overviewMap);
    this.overviewMap = null;
  }
}
