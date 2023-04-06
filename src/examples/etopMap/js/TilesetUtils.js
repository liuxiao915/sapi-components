import * as mars3d from "mars3d";

export default class TilesetUtils {
  map = null;
  // tilesetLayer 实例
  tilesetLayer = null;
  constructor(map) {
    this.map = map;
  }
  /**
   * @method addTilesetLayer
   * @param options { Object } TilesetLayer 配置项
   * @returns tilesetLayer { Object } 实例
   */
  addTilesetLayer(options = {}) {
    if (this.tilesetLayer) return;

    this.tilesetLayer = new mars3d.layer.TilesetLayer(options);

    this.map.addLayer(this.tilesetLayer);

    return this.tilesetLayer;
  }
  /**
   * @method addTilesetFlood
   * @param options { Object } TilesetFlood 配置项
   * @returns TilesetFlood { Object } 实例
   */
  addTilesetFlood(options = {}) {
    if (!this.tilesetLayer) this.addTilesetLayer();

    const tilesetFlood = new mars3d.thing.TilesetFlood({
      layer: this.tilesetLayer,
      floodAll: true,
      ...options,
    });

    this.map.addThing(tilesetFlood);

    return tilesetFlood;
  }
  /**
   * @method removeTilesetFlood
   * @param tilesetFlood { Object } tilesetFlood 实例
   * @param hasDestroy { Boolean } 是否释放
   */
  removeTilesetFlood(tilesetFlood, hasDestroy) {
    this.map.removeThing(tilesetFlood, hasDestroy);
  }
  // 移除图层
  removeTilesetLayer() {
    this.tilesetLayer && this.map.removeLayer(this.tilesetLayer);
  }
  /**
   * @method addTilesetShadows
   * @param options { Object } TilesetShadows 配置项
   * @returns TilesetShadows { Object } 实例
   */
  addTilesetShadows(options = {}) {
    if (!this.tilesetLayer) this.addTilesetLayer();

    this.map.fixedLight = false;

    const shadows = new mars3d.thing.Shadows({
      multiplier: 1600,
      ...options,
    });

    this.map.addThing(shadows);

    return shadows;
  }
  /**
   * @method removeTilesetShadows
   * @param tilesetShadows { Object } tilesetShadows 实例
   * @param hasDestroy { Boolean } 是否释放
   */
  removeTilesetShadows(tilesetShadows, hasDestroy) {
    this.map.removeThing(tilesetShadows, hasDestroy);
  }
}
