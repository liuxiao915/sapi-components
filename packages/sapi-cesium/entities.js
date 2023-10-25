/**
* @Description: 添加我们的应用程序的主要焦点——geocache数据。为了便于可视化，Cesium支持流行的矢量格式GeoJson和KML
* @Author: liux
* @Date: 2023-10-16 18:38:53
* @LastEditTime: 2023-10-16 18:38:53
*/
import * as Cesium from "cesium";

// 添加一个飞机
export const addAir = (viewer, url, height) => {
  viewer.entities.removeAll();
  const position = Cesium.Cartesian3.fromDegrees(
    -123.0744619,
    44.0503706,
    height
  );
  const heading = Cesium.Math.toRadians(135);
  const pitch = 0;
  const roll = 0;
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
  );

  const entity = viewer.entities.add({
    name: url,
    position: position,
    orientation: orientation,
    model: {
      uri: url,
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
  });
  viewer.trackedEntity = entity;
}

export const addSimplestyles = (viewer, url) => {
  const dataSource = Cesium.GeoJsonDataSource.load(url);
  viewer.dataSources.add(dataSource);
  viewer.zoomTo(dataSource);
}

export const addWyoming = (viewer, height) => {
   const wyoming = viewer.entities.add({
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        -109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596,
        -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429,
        -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429,
        -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073,
      ]),
      height: height,
      material: Cesium.Color.RED.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.BLACK,
    }
  });
  viewer.zoomTo(wyoming)
}

export const addEntities = (viewer, url) => {
  viewer.dataSources.removeAll();
  const geocachePromise = Cesium.GeoJsonDataSource.load(url, {
    stroke: Cesium.Color.HOTPINK,
    fill: Cesium.Color.PINK,
    strokeWidth: 3,
    markerSymbol: '?'
  })

  geocachePromise.then(function(dataSource) {
    // Add the new data as entities to the viewer
    viewer.dataSources.add(dataSource);
    var entities = dataSource.entities.values;
    const colorHash = {};
    for (var i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const name = entity.name;
      let color = colorHash[name];
      if (!color) {
        color = Cesium.Color.fromRandom({
          alpha: 1.0,
        });
        colorHash[name] = color;
      }
      //Set the polygon material to our random color.
      entity.polygon.material = color;
      //Remove the outlines.
      entity.polygon.outline = false;
      entity.polygon.extrudedHeight = entity.properties.Population / 50.0;
  }
  })
}