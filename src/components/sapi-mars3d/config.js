export const option = {
  "map3d": {
    "scene": {
      "center": {
        "x": 114.17,
        "y": 22.65,
        "z": 140000,
        "pitch": -90,
        "roll": 0
      },
      "contextOptions": {
        "infoBox": false,
        "webgl": {
          "preserveDrawingBuffer": true
        }
      },
      "scene3DOnly": false,
      "shadows": false,
      "removeDblClick": true,
      "sceneMode": 3,
      "showSun": true,
      "showMoon": false,
      "showSkyBox": false,
      "showSkyAtmosphere": true,
      "fog": true,
      "fxaa": true,
      "globe": {
        "depthTestAgainstTerrain": false,
        "baseColor": "#2B323E",
        "showGroundAtmosphere": true,
        "enableLighting": false
      },
      "cameraController": {
        "zoomFactor": 3.0,
        "minimumZoomDistance": 50,
        "maximumZoomDistance": 500000,
        "enableRotate": true,
        "enableTranslate": true,
        "enableTilt": true,
        "enableZoom": true,
        "enableCollisionDetection": true,
        "minimumCollisionTerrainHeight": 15000
      }
    },
    "control": {
      "homeButton": false,
      "baseLayerPicker": false,
      "sceneModePicker": false,
      "vrButton": false,
      "fullscreenButton": false,
      "navigationHelpButton": false,
      "animation": false,
      "timeline": false,
      "infoBox": false,
      "geocoder": false,
      "geocoderConfig": {
        "key": [
          "ae29a37307840c7ae4a785ac905927e0"
        ]
      },
      "selectionIndicator": false,
      "defaultContextMenu": false,
      "mouseDownView": false,
      "contextmenu":{
        "preventDefault":false,
        "hasDefault": false
      }
    },
    "terrain": {
      "url": "//data.mars3d.cn/terrain",
      "show": false
    }
  }
}


export const options1 = {
  "map3d": {
    "scene": {
      "center": { "lat": 30.526361, "lng": 116.335987, "alt": 45187, "heading": 0, "pitch": -45 },
      "scene3DOnly": false,
      "shadows": false,
      "removeDblClick": true,
      "sceneMode": 3,
      "showSun": true,
      "showMoon": true,
      "showSkyBox": true,
      "showSkyAtmosphere": true,
      "fog": true,
      "fxaa": true,
      "requestRenderMode": true,
      "globe": {
        "depthTestAgainstTerrain": false,
        "baseColor": "#546a53",
        "showGroundAtmosphere": true,
        "enableLighting": false
      },
      "cameraController": {
        "zoomFactor": 3.0,
        "minimumZoomDistance": 1,
        "maximumZoomDistance": 50000000,
        "enableRotate": true,
        "enableTranslate": true,
        "enableTilt": true,
        "enableZoom": true,
        "enableCollisionDetection": true,
        "minimumCollisionTerrainHeight": 15000
      }
    },
    "control": {
      "homeButton": true,
      "baseLayerPicker": true,
      "sceneModePicker": true,
      "vrButton": false,
      "fullscreenButton": true,
      "navigationHelpButton": true,
      "animation": false,
      "timeline": false,
      "infoBox": false,
      "geocoder": false,
      "selectionIndicator": false,

      "contextmenu": { "hasDefault": true },
      "mouseDownView": true,
      "zoom": { "insertIndex": 1 },
      "compass": { "bottom": "toolbar", "left": "5px" },
      "distanceLegend": { "left": "100px", "bottom": "2px" },
      "locationBar": {
        "fps": true,
        "crs": "CGCS2000_GK_Zone_3",
        "crsDecimal": 0,
        "template": "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div class='hide1000'>横{crsx}  纵{crsy}</div> <div>海拔：{alt}米</div> <div class='hide700'>层级：{level}</div><div>方向：{heading}°</div> <div>俯仰角：{pitch}°</div><div class='hide700'>视高：{cameraHeight}米</div>"
      }
    },
    "templateValues": {
      "dataServer": "//data.mars3d.cn",
      "gltfServerUrl": "//data.mars3d.cn/gltf"
    },
    "terrain": {
      "url": "//data.mars3d.cn/terrain",
      "show": true
    },
    "basemaps": [
      { "id": 10, "name": "地图底图", "type": "group" },
      {
        "id": 2021,
        "pid": 10,
        "name": "天地图影像",
        "icon": "/img/basemaps/tdt_img.png",
        "type": "group",
        "layers": [
          { "name": "底图", "type": "tdt", "layer": "img_d" },
          { "name": "注记", "type": "tdt", "layer": "img_z" }
        ],
        "show": true
      },
      {
        "pid": 10,
        "name": "天地图电子",
        "icon": "/img/basemaps/tdt_vec.png",
        "type": "group",
        "layers": [
          { "name": "底图", "type": "tdt", "layer": "vec_d" },
          { "name": "注记", "type": "tdt", "layer": "vec_z" }
        ]
      },
      {
        "pid": 10,
        "name": "高德影像",
        "type": "group",
        "icon": "/img/basemaps/gaode_img.png",
        "layers": [
          { "name": "底图", "type": "gaode", "layer": "img_d" },
          { "name": "注记", "type": "gaode", "layer": "img_z" }
        ]
      },
      {
        "pid": 10,
        "name": "高德电子",
        "type": "gaode",
        "icon": "/img/basemaps/gaode_vec.png",
        "layer": "vec"
      },
      {
        "pid": 10,
        "name": "百度影像",
        "type": "group",
        "icon": "/img/basemaps/bd-img.png",
        "layers": [
          { "name": "底图", "type": "baidu", "layer": "img_d" },
          { "name": "注记", "type": "baidu", "layer": "img_z" }
        ]
      },
      {
        "pid": 10,
        "name": "百度电子",
        "icon": "/img/basemaps/bd-vec.png",
        "type": "baidu",
        "layer": "vec"
      },
      {
        "pid": 10,
        "name": "腾讯影像",
        "icon": "/img/basemaps/tencent_img.png",
        "type": "group",
        "layers": [
          { "name": "底图", "type": "tencent", "layer": "img_d" },
          { "name": "注记", "type": "tencent", "layer": "img_z" }
        ]
      },
      {
        "pid": 10,
        "name": "腾讯电子",
        "icon": "/img/basemaps/tencent_vec.png",
        "type": "tencent",
        "layer": "vec"
      },
      {
        "pid": 10,
        "name": "ArcGIS影像",
        "icon": "/img/basemaps/esriWorldImagery.png",
        "type": "xyz",
        "url": "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        "enablePickFeatures": false
      },
      {
        "pid": 10,
        "name": "微软影像",
        "icon": "/img/basemaps/bingAerial.png",
        "type": "bing",
        "layer": "Aerial"
      },
      {
        "pid": 10,
        "name": "OSM地图(暂不可用)",
        "type": "xyz",
        "icon": "/img/basemaps/osm.png",
        "url": "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "subdomains": "abc"
      },
      {
        "id": 2017,
        "pid": 10,
        "name": "暗色底图",
        "type": "gaode",
        "icon": "/img/basemaps/blackMarble.png",
        "layer": "vec",
        "invertColor": true,
        "filterColor": "#4e70a6",
        "brightness": 0.6,
        "contrast": 1.8,
        "gamma": 0.3,
        "hue": 1,
        "saturation": 0
      },
      {
        "pid": 10,
        "name": "蓝色底图",
        "icon": "/img/basemaps/bd-c-midnight.png",
        "type": "xyz",
        "url": "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        "chinaCRS": "GCJ02",
        "enablePickFeatures": false
      },
      {
        "pid": 10,
        "name": "黑色底图",
        "icon": "/img/basemaps/bd-c-dark.png",
        "type": "tencent",
        "layer": "custom",
        "style": "4"
      },
      {
        "pid": 10,
        "name": "离线地图 (供参考)",
        "type": "group",
        "icon": "/img/basemaps/google_img.png",
        "layers": [
          {
            "name": "全球",
            "type": "xyz",
            "url": "{dataServer}/tile/googleImg/{z}/{x}/{y}.jpg",
            "minimumLevel": 0,
            "maximumLevel": 9
          },
          {
            "name": "中国",
            "type": "xyz",
            "url": "{dataServer}/tile/googleImg/{z}/{x}/{y}.jpg",
            "minimumTerrainLevel": 10,
            "minimumLevel": 10,
            "maximumLevel": 12,
            "rectangle": { "xmin": 69.706929, "xmax": 136.560941, "ymin": 15.831038, "ymax": 52.558005 }
          },
          {
            "name": "具体项目(如合肥)",
            "type": "xyz",
            "url": "{dataServer}/tile/googleImg/{z}/{x}/{y}.jpg",
            "minimumTerrainLevel": 12,
            "minimumLevel": 12,
            "maximumLevel": 18,
            "rectangle": { "xmin": 116.33236, "xmax": 118.183557, "ymin": 31.143784, "ymax": 32.565035 }
          }
        ]
      },
      {
        "pid": 10,
        "name": "单张图片 (本地离线)",
        "icon": "/img/basemaps/offline.png",
        "type": "image",
        "url": "//data.mars3d.cn/file/img/world/world.jpg"
      }
    ],
    "layers": [
      { "id": 50, "name": "辅助图层", "type": "group" },
      { "pid": 50, "type": "graticule", "name": "经纬网" },
      {
        "pid": 50,
        "name": "行政区划界线",
        "type": "tdt",
        "url": "https://t{s}.tianditu.gov.cn/DataServer?T=ibo_w&x={x}&y={y}&l={z}",
        "maximumLevel": 10,
        "mapSplit": false
      },
      {
        "pid": 50,
        "name": "高德实时路况",
        "type": "gaode",
        "layer": "time",
        "minimumTerrainLevel": 4,
        "minimumLevel": 4,
        "proxy": "//server.mars3d.cn/proxy/",
        "mapSplit": false
      },
      {
        "pid": 50,
        "name": "百度实时路况",
        "type": "baidu",
        "layer": "time",
        "mapSplit": false
      },

      { "id": 60, "name": "地形", "type": "group" },
      { "pid": 60, "type": "terrain", "name": "Cesium地形", "terrain": { "type": "ion" }, "radio": true },
      { "pid": 60, "type": "terrain", "name": "Mars3D地形", "terrain": { "type": "xyz", "url": "{dataServer}/terrain" }, "radio": true },
      {
        "pid": 60,
        "type": "terrain",
        "name": "ArcGIS地形",
        "terrain": { "type": "arcgis", "url": "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer" },
        "radio": true
      },
      { "pid": 60, "type": "terrain", "name": "无地形", "terrain": { "type": "none" }, "radio": true },

      { "id": 40, "name": "栅格数据", "type": "group" },
      { "id": 4020, "pid": 40, "name": "OGC WMS服务", "type": "group" },
      {
        "pid": 4020,
        "name": "教育设施点",
        "type": "wms",
        "url": "//server.mars3d.cn/geoserver/mars/wms",
        "layers": "mars:hfjy",
        "crs": "EPSG:4326",
        "parameters": { "transparent": "true", "format": "image/png" },
        "popup": "名称：{项目名称}<br />类型：{设施类型}<br />面积：{用地面积}亩<br />位置：{具体位置}",
        "mapSplit": false,
        "show": false,
        "flyTo": true
      },
      {
        "pid": 4020,
        "name": "道路线",
        "type": "wms",
        "url": "//server.mars3d.cn/geoserver/mars/wms",
        "layers": "mars:hfdl",
        "crs": "EPSG:4326",
        "parameters": { "transparent": "true", "format": "image/png" },
        "center": { "lat": 31.743214, "lng": 117.277097, "alt": 47197.7, "heading": 0.3, "pitch": -78.8 },
        "popup": "all",
        "mapSplit": false,
        "show": false,
        "flyTo": true
      },
      {
        "pid": 4020,
        "name": "建筑物面",
        "type": "wms",
        "url": "//server.mars3d.cn/geoserver/mars/wms",
        "layers": "mars:hfjzw",
        "crs": "EPSG:4326",
        "parameters": { "transparent": "true", "format": "image/png" },
        "highlight": {
          "showTime": 5000,
          "fill": true,
          "color": "#2deaf7",
          "opacity": 0.6,
          "outline": true,
          "outlineWidth": 3,
          "outlineColor": "#e000d9",
          "outlineOpacity": 1.0,
          "clampToGround": true
        },
        "center": { "lat": 31.79513, "lng": 117.236172, "alt": 3784.6, "heading": 0.7, "pitch": -42.2 },
        "popup": "all",
        "show": false,
        "flyTo": true
      },
      {
        "pid": 4020,
        "name": "规划面",
        "type": "wms",
        "url": "//server.mars3d.cn/geoserver/mars/wms",
        "layers": "mars:hfgh",
        "crs": "EPSG:4326",
        "parameters": { "transparent": "true", "format": "image/png" },
        "center": { "lat": 31.743214, "lng": 117.277097, "alt": 47197.7, "heading": 0.3, "pitch": -78.8 },
        "popup": "all",
        "show": false,
        "flyTo": true
      },
      { "id": 4030, "pid": 40, "name": "ArcGIS 瓦片", "type": "group" },
      {
        "pid": 4030,
        "name": "合肥规划图",
        "type": "arcgis_cache",
        "url": "{dataServer}/arcgis_cache/hfgh/_alllayers/{z}/{y}/{x}.png",
        "minimumLevel": 1,
        "maximumLevel": 17,
        "minimumTerrainLevel": 1,
        "maximumTerrainLevel": 17,
        "rectangle": { "xmin": 116.846, "xmax": 117.642, "ymin": 31.533, "ymax": 32.185 }
      },
      { "id": 4010, "pid": 40, "name": "ArcGIS Dynamic", "type": "group" },
      {
        "id": 401085,
        "pid": 4010,
        "type": "arcgis",
        "name": "主要道路",
        "url": "//server.mars3d.cn/arcgis/rest/services/mars/hefei/MapServer",
        "layers": "24",
        "highlight": { "type": "polyline", "color": "#2deaf7", "width": 4, "clampToGround": true },
        "center": { "lat": 31.814176, "lng": 117.225362, "alt": 5105.3, "heading": 359.2, "pitch": -83.1 },
        "popup": "all",
        "onWidget": "layer-picture-heatmap",
        "mapSplit": false
      },
      {
        "id": 401086,
        "pid": 4010,
        "type": "arcgis",
        "name": "建筑物",
        "url": "//server.mars3d.cn/arcgis/rest/services/mars/hefei/MapServer",
        "layers": "35,36,37,39",
        "highlight": {
          "fill": true,
          "color": "#2deaf7",
          "opacity": 0.6,
          "outline": true,
          "outlineWidth": 3,
          "outlineColor": "#e000d9",
          "outlineOpacity": 1.0,
          "clampToGround": true
        },
        "center": { "lat": 31.816951, "lng": 117.22898, "alt": 2916.7, "heading": 0.3, "pitch": -78.8 },
        "popup": "名称：{NAME}<br />层数：{floor}",
        "onWidget": "layer-picture-heatmap"
      },
      {
        "id": 401087,
        "pid": 4010,
        "type": "arcgis",
        "name": "规划",
        "url": "//server.mars3d.cn/arcgis/rest/services/mars/guihua/MapServer",
        "highlight": {
          "showTime": 5000,
          "fill": true,
          "color": "#2deaf7",
          "opacity": 0.6,
          "outline": true,
          "outlineWidth": 3,
          "outlineColor": "#e000d9",
          "outlineOpacity": 1.0,
          "clampToGround": true
        },
        "center": { "lat": 31.816951, "lng": 117.22898, "alt": 2916.7, "heading": 0.3, "pitch": -78.8 },
        "popup": [
          { "field": "用地名称", "name": "名称" },
          { "field": "用地编号", "name": "编号" },
          { "field": "规划用地", "name": "规划" },
          { "type": "html", "html": "<div style='text-align: right;color: #ff0000;padding-right: 10px;'>数据仅供参考</div>" }
        ],
        "popupNoTitle": true,
        "onWidget": "layer-picture-guihua"
      },
      { "id": 30, "name": "矢量数据", "type": "group" },
      { "id": 3030, "pid": 30, "name": "GeoJSON数据", "type": "group" },
      {
        "id": 303011,
        "pid": 3030,
        "type": "geojson",
        "name": "平台标绘",
        "url": "{dataServer}/file/geojson/mars3d-draw.json",
        "popup": "{type}{name}",
        "show": false,
        "flyTo": true
      },
      {
        "pid": 3030,
        "type": "geojson",
        "name": "用地规划",
        "url": "{dataServer}/file/geojson/guihua.json",
        "symbol": {
          "styleOptions": { "opacity": 0.6, "color": "#0000FF", "width": 3, "clampToGround": true },
          "styleField": "类型",
          "styleFieldOptions": {
            "一类居住用地": { "color": "#FFDF7F" },
            "二类居住用地": { "color": "#FFFF00" },
            "社区服务用地": { "color": "#FF6A38" },
            "幼托用地": { "color": "#FF6A38" },
            "商住混合用地": { "color": "#FF850A" },
            "行政办公用地": { "color": "#FF00FF" },
            "文化设施用地": { "color": "#FF00FF" },
            "小学用地": { "color": "#FF7FFF" },
            "初中用地": { "color": "#FF7FFF" },
            "体育场用地": { "color": "#00A57C" },
            "医院用地": { "color": "#A5527C" },
            "社会福利用地": { "color": "#FF7F9F" },
            "商业用地": { "color": "#FF0000" },
            "商务用地": { "color": "#7F0000" },
            "营业网点用地": { "color": "#FF7F7F" },
            "一类工业用地": { "color": "#A57C52" },
            "社会停车场用地": { "color": "#C0C0C0" },
            "通信用地": { "color": "#007CA5" },
            "排水用地": { "color": "#00BFFF" },
            "公园绿地": { "color": "#00FF00" },
            "防护绿地": { "color": "#007F00" },
            "河流水域": { "color": "#7FFFFF" },
            "配建停车场": { "color": "#ffffff" },
            "道路用地": { "color": "#ffffff" }
          }
        },
        "popup": "{类型}",
        "show": false,
        "flyTo": true
      },
      {
        "pid": 3030,
        "type": "geojson",
        "name": "建筑物面",
        "url": "{dataServer}/file/geojson/buildings-demo.json",
        "symbol": { "styleOptions": { "color": "#0d3685", "outlineColor": "#0d3685", "opacity": 0.8 } },
        "buildings": { "cloumn": "floors", "height": "flo_height" },
        "popup": "all",
        "flyTo": true
      },
      {
        "pid": 3030,
        "type": "geojson",
        "name": "安徽各市",
        "url": "{dataServer}/file/geojson/areas/340000_full.json",
        "symbol": {
          "type": "polygon",
          "styleOptions": {
            "materialType": "PolyGradient",
            "materialOptions": {
              "color": "rgb(15,176,255)",
              "opacity": 0.7,
              "alphaPower": 1.3
            },
            "label": {
              "text": "{name}",
              "opacity": 1,
              "font_size": 25,
              "color": "#ffffff",
              "outline": true,
              "outlineColor": "#000000",
              "outlineWidth": 3,
              "scaleByDistance": true,
              "scaleByDistance_far": 2743804,
              "scaleByDistance_farValue": 0.3,
              "scaleByDistance_near": 10000,
              "scaleByDistance_nearValue": 1,
              "distanceDisplayCondition": true,
              "distanceDisplayCondition_far": 2743804,
              "distanceDisplayCondition_near": 0
            }
          }
        },
        "popup": "{name}",
        "show": false,
        "flyTo": true
      },
      {
        "pid": 3030,
        "type": "geojson",
        "name": "中国省界",
        "url": "{dataServer}/file/geojson/areas/100000_full.json",
        "symbol": {
          "type": "polylineP",
          "styleOptions": {
            "color": "#ffffff",
            "width": 2,
            "opacity": 0.8,
            "label": {
              "text": "{name}",
              "position": "center",
              "font_size": 30,
              "color": "#ffffff",
              "outline": true,
              "outlineColor": "#000000",
              "scaleByDistance": true,
              "scaleByDistance_far": 60000000,
              "scaleByDistance_farValue": 0.2,
              "scaleByDistance_near": 1000000,
              "scaleByDistance_nearValue": 1,
              "distanceDisplayCondition": true,
              "distanceDisplayCondition_far": 12000000,
              "distanceDisplayCondition_near": 0
            }
          }
        },
        "show": false,
        "flyTo": true
      },
      {
        "pid": 3030,
        "type": "geojson",
        "name": "西藏垭口",
        "url": "{dataServer}/file/geojson/xizangyakou.json",
        "symbol": {
          "styleOptions": {
            "image": "img/marker/mark-red.png",
            "scaleByDistance": true,
            "scaleByDistance_far": 5000000,
            "scaleByDistance_farValue": 0.5,
            "scaleByDistance_near": 1000,
            "scaleByDistance_nearValue": 1,
            "verticalOrigin": 1,
            "horizontalOrigin": 0,
            "clampToGround": true,
            "label": {
              "text": "{NAME}",
              "font_size": 25,
              "color": "#ffff00",
              "font_family": "微软雅黑",
              "outline": true,
              "outlineColor": "#000000",
              "pixelOffsetY": -40,
              "scaleByDistance": true,
              "scaleByDistance_far": 1000000,
              "scaleByDistance_farValue": 0.5,
              "scaleByDistance_near": 1000,
              "scaleByDistance_nearValue": 1,
              "distanceDisplayCondition": true,
              "distanceDisplayCondition_far": 1000000,
              "distanceDisplayCondition_near": 0,
              "visibleDepth": true
            }
          }
        },
        "popup": [
          { "field": "NAME", "name": "名称" },
          { "type": "details", "callback": "showPopupDetails", "field": "图片", "className": "mars3d-popup-btn-custom" }
        ],
        "show": false,
        "flyTo": true
      },
      {
        "pid": 3030,
        "type": "geojson",
        "name": "体育设施点",
        "url": "{dataServer}/file/geojson/hfty-point.json",
        "symbol": {
          "styleOptions": {
            "image": "img/marker/mark-red.png",
            "scale": 1,
            "scaleByDistance": true,
            "scaleByDistance_far": 20000,
            "scaleByDistance_farValue": 0.5,
            "scaleByDistance_near": 1000,
            "scaleByDistance_nearValue": 1,
            "verticalOrigin": 1,
            "horizontalOrigin": 0,
            "clampToGround": true,
            "label": {
              "text": "{项目名称}",
              "font_size": 25,
              "color": "#ffffff",
              "outline": true,
              "outlineColor": "#000000",
              "pixelOffsetY": -25,
              "scaleByDistance": true,
              "scaleByDistance_far": 80000,
              "scaleByDistance_farValue": 0.5,
              "scaleByDistance_near": 1000,
              "scaleByDistance_nearValue": 1,
              "distanceDisplayCondition": true,
              "distanceDisplayCondition_far": 80000,
              "distanceDisplayCondition_near": 0
            }
          }
        },
        "popup": [
          { "field": "项目名称", "name": "项目名称" },
          { "field": "建设性质", "name": "建设性质" },
          { "field": "设施级别", "name": "设施级别" },
          { "field": "所属区县", "name": "所属区县" },
          { "field": "建筑内容及", "name": "建筑内容" },
          { "field": "新增用地（", "name": "新增用地" },
          { "field": "开工", "name": "开工" },
          { "field": "总投资（万", "name": "总投资" },
          { "field": "资金来源", "name": "资金来源" },
          { "field": "初步选址", "name": "初步选址" },
          { "field": "设施类型", "name": "设施类型" },
          { "field": "设施等级", "name": "设施等级" },
          { "field": "所在区县", "name": "所在区县" },
          { "field": "具体位置", "name": "具体位置" },
          { "field": "建设内容（", "name": "建设内容" },
          { "field": "用地面积（", "name": "用地面积", "format": "mars3d.MeasureUtil.formatArea" },
          { "field": "设施规模（", "name": "设施规模" },
          { "field": "举办者类型", "name": "举办者类型" },
          { "field": "开工时间", "name": "开工时间" },
          { "field": "总投资额（", "name": "总投资额", "unit": "亿元" },
          { "field": "项目推进主", "name": "项目推进主体" },
          { "field": "项目进度", "name": "项目进度" },
          { "field": "项目来源", "name": "项目来源" },
          { "field": "备注", "name": "备注" }
        ],
        "show": false,
        "flyTo": true
      },
      { "id": 3070, "pid": 30, "name": "GeoServer WFS", "type": "group" },
      {
        "pid": 3070,
        "type": "wfs",
        "name": "建筑物面",
        "url": "//server.mars3d.cn/geoserver/mars/ows",
        "layer": "mars:hfjzw",
        "parameters": { "maxFeatures": 500 },
        "minimumLevel": 15,
        "symbol": {
          "type": "polygonP",
          "styleOptions": { "color": "#00469c", "outline": false, "opacity": 1 }
        },
        "buildings": { "cloumn": "floor" },
        "center": { "lat": 31.818396, "lng": 117.229083, "alt": 2554.4, "heading": 359.2, "pitch": -83.1 },
        "popup": "名称：{NAME}<br />层数：{floor}"
      },
      {
        "pid": 3070,
        "name": "教育设施点",
        "type": "wfs",
        "url": "//server.mars3d.cn/geoserver/mars/ows",
        "layer": "mars:hfjy",
        "parameters": { "maxFeatures": 500 },
        "minimumLevel": 13,
        "symbol": {
          "type": "billboardP",
          "styleOptions": {
            "image": "img/marker/mark-red.png",
            "scaleByDistance": true,
            "scaleByDistance_far": 20000,
            "scaleByDistance_farValue": 0.6,
            "scaleByDistance_near": 1000,
            "scaleByDistance_nearValue": 1,
            "clampToGround": true,
            "label": {
              "text": "{项目名称}",
              "font_size": 15,
              "color": "#ffffff",
              "outline": true,
              "outlineColor": "#000000",
              "pixelOffsetY": -30,
              "distanceDisplayCondition": true,
              "distanceDisplayCondition_far": 2000,
              "distanceDisplayCondition_near": 0
            }
          }
        },
        "center": { "lat": 31.812256, "lng": 117.229873, "alt": 4683.91, "heading": 357.4, "pitch": -65.4 },
        "popup": "all"
      },
      { "id": 3010, "pid": 30, "name": "ArcGIS WFS", "type": "group" },
      {
        "pid": 3010,
        "type": "arcgis_wfs",
        "name": "兴趣点",
        "url": "//server.mars3d.cn/arcgis/rest/services/mars/hefei/MapServer/1",
        "where": " 1=1 ",
        "minimumLevel": 15,
        "center": { "lat": 31.818396, "lng": 117.229083, "alt": 2554.4, "heading": 359.2, "pitch": -83.1 },
        "symbol": {
          "type": "billboardP",
          "styleOptions": {
            "image": "img/marker/mark-blue.png",
            "scaleByDistance": true,
            "scaleByDistance_far": 20000,
            "scaleByDistance_farValue": 0.6,
            "scaleByDistance_near": 1000,
            "scaleByDistance_nearValue": 1,
            "clampToGround": true,
            "label": {
              "text": "{NAME}",
              "font_size": 15,
              "color": "#ffffff",
              "outline": true,
              "outlineColor": "#000000",
              "pixelOffsetY": -30,
              "distanceDisplayCondition": true,
              "distanceDisplayCondition_far": 3000,
              "distanceDisplayCondition_near": 0
            }
          },
          "styleField": "address",
          "styleFieldOptions": {
            "AB03": { "image": "img/marker/mark-red.png" },
            "A980": { "image": "img/marker/mark-blue.png" },
            "A900": { "image": "img/marker/mark-green.png" }
          }
        },
        "popup": "名称：{NAME}<br />地址：{address}",
        "show": false
      },
      {
        "pid": 3010,
        "type": "arcgis_wfs",
        "name": "道路",
        "url": "//server.mars3d.cn/arcgis/rest/services/mars/hefei/MapServer/28",
        "minimumLevel": 14,
        "symbol": {
          "type": "polylineP",
          "styleOptions": { "color": "#3388ff", "width": 3, "clampToGround": true },
          "styleField": "NAME",
          "styleFieldOptions": {
            "祁门路": { "color": "#8744c0", "width": 3 },
            "东流路": { "color": "#f7ba2a", "width": 3 },
            "翡翠路": { "color": "#20a0ff", "width": 3 },
            "岳西路": { "color": "#50bfff", "width": 3 }
          }
        },
        "popup": "名称：{NAME}",
        "center": { "lat": 31.814176, "lng": 117.225362, "alt": 5105.3, "heading": 359.2, "pitch": -83.1 }
      },
      {
        "pid": 3010,
        "type": "arcgis_wfs",
        "name": "建筑物面",
        "url": "//server.mars3d.cn/arcgis/rest/services/mars/hefei/MapServer/37",
        "minimumLevel": 15,
        "symbol": { "styleOptions": { "color": "#0d3685", "outlineColor": "#0d3685", "opacity": 0.8 } },
        "buildings": { "cloumn": "floor" },
        "debuggerTileInfo": false,
        "center": { "lat": 31.816951, "lng": 117.22898, "alt": 1916.7, "heading": 0.3, "pitch": -78.8 },
        "popup": "名称：{NAME}<br />层数：{floor}"
      },
      { "id": 3060, "pid": 30, "name": "CZML数据", "type": "group" },
      {
        "id": 306010,
        "pid": 3060,
        "type": "czml",
        "name": "汽车",
        "url": "{dataServer}/file/czml/car.czml",
        "center": { "lat": 40.894745, "lng": 121.920252, "alt": 904, "heading": 64, "pitch": -67 },
        "onWidget": "control-clock",
        "radio": true,
        "flyTo": true
      },
      {
        "id": 306011,
        "pid": 3060,
        "type": "czml",
        "name": "飞行编队",
        "url": "{dataServer}/file/czml/flight.czml",
        "popup": "all",
        "onWidget": "control-clock",
        "radio": true,
        "flyTo": true
      },
      {
        "id": 306012,
        "pid": 3060,
        "type": "czml",
        "name": "船舶编队",
        "url": "{dataServer}/file/czml/ship.czml",
        "popup": "all",
        "onWidget": "control-clock",
        "radio": true,
        "flyTo": true
      },
      { "id": 3050, "pid": 30, "name": "KML数据", "type": "group" },
      { "pid": 3050, "type": "kml", "name": "海上安全警告", "url": "{dataServer}/file/kml/NAVWARN.kmz", "popup": "all" },
      {
        "pid": 3050,
        "type": "kml",
        "name": "国境线",
        "url": "{dataServer}/file/kml/countryboundary.kml",
        "symbol": { "styleOptions": { "color": "#FED976", "width": 2 } }
      },
      {
        "pid": 3050,
        "type": "kml",
        "name": "省界线",
        "url": "{dataServer}/file/kml/province.kml",
        "symbol": { "styleOptions": { "color": "#00FF00", "width": 2 } }
      },
      { "id": 20, "name": "三维模型", "type": "group" },
      { "id": 2010, "pid": 20, "name": "gltf模型", "type": "group" },
      {
        "pid": 2010,
        "type": "graphic",
        "name": "风力发电机",
        "data": [
          {
            "type": "modelP",
            "position": [117.219071, 31.828783, 39.87],
            "style": {
              "url": "//data.mars3d.cn/gltf/mars/fengche.gltf",
              "scale": 50,
              "heading": -93
            }
          }
        ],
        "popup": "示例信息，这是一个风力发电机",
        "center": { "lat": 31.821083, "lng": 117.21832, "alt": 832.64, "heading": 2.3, "pitch": -39.2 }
      },
      {
        "pid": 2010,
        "type": "graphic",
        "name": "警车",
        "data": [
          {
            "type": "modelP",
            "position": [117.217458, 31.815349, 35.03],
            "style": {
              "url": "//data.mars3d.cn/gltf/mars/jingche/jingche.gltf",
              "scale": 2,
              "heading": -95,
              "clampToGround": true
            }
          }
        ],
        "center": { "lat": 31.815363, "lng": 117.215958, "alt": 107.35, "heading": 90.7, "pitch": -26.1 }
      },
      { "id": 2040, "pid": 20, "name": "城市白模", "type": "group" },
      {
        "id": 204011,
        "pid": 2040,
        "type": "3dtiles",
        "name": "合肥市区",
        "url": "{dataServer}/3dtiles/jzw-hefei/tileset.json",
        "maximumScreenSpaceError": 1,
        "maximumMemoryUsage": 1024,
        "marsJzwStyle": true,
        "highlight": { "type": "click", "color": "#FFFF00" },
        "popup": [
          { "field": "objectid", "name": "编号" },
          { "field": "name", "name": "名称" },
          { "field": "height", "name": "楼高", "unit": "米" }
        ],
        "center": { "lat": 31.786281, "lng": 117.223716, "alt": 3718, "heading": 2, "pitch": -45 }
      },
      {
        "id": 204012,
        "pid": 2040,
        "type": "3dtiles",
        "name": "上海市区",
        "url": "{dataServer}/3dtiles/jzw-shanghai/tileset.json",
        "maximumScreenSpaceError": 4,
        "maximumMemoryUsage": 1024,
        "style": {
          "color": {
            "conditions": [
              ["${floor} >= 200", "rgba(45, 0, 75, 0.5)"],
              ["${floor} >= 100", "rgb(170, 162, 204)"],
              ["${floor} >= 50", "rgb(224, 226, 238)"],
              ["${floor} >= 25", "rgb(252, 230, 200)"],
              ["${floor} >= 10", "rgb(248, 176, 87)"],
              ["${floor} >= 5", "rgb(198, 106, 11)"],
              ["true", "rgb(127, 59, 8)"]
            ]
          }
        },
        "highlight": { "type": "click", "color": "#FFFF00" },
        "popup": [
          { "field": "name", "name": "名称" },
          { "field": "floor", "name": "楼层" }
        ],
        "center": { "lat": 31.257341, "lng": 121.466139, "alt": 2170.8, "heading": 122.2, "pitch": -31.8 }
      },

      { "id": 2050, "pid": 20, "name": "点云", "type": "group" },
      {
        "id": 202016,
        "pid": 2050,
        "type": "3dtiles",
        "name": "高压线塔杆",
        "url": "//data.mars3d.cn/3dtiles/pnts-ganta/tileset.json",
        "maximumScreenSpaceError": 1,
        "position": { "alt": 31 },
        "style": {
          "color": {
            "conditions": [
              ["(${Classification} >= 4) && (${Classification} < 5) ", "color('#DC143C')"],
              ["(${Classification} >= 7) && (${Classification} < 8)  ", "color('#7B68EE')"],
              ["(${Classification} >= 16) && (${Classification} < 17)  ", "color('#00CED1')"],
              ["(${Classification} >= 17) && (${Classification} < 18)  ", "color('#3CB371')"],
              ["(${Classification} >= 18) && (${Classification} < 19)  ", "color('#FFFF00')"],
              ["(${Classification} >= 19) && (${Classification} < 20)  ", "color('#FFA500')"],
              ["(${Classification} >= 20) && (${Classification} < 21)  ", "color('#FF6347')"]
            ]
          }
        },
        "hasOpacity": false,
        "center": { "lat": 31.504746, "lng": 118.264278, "alt": 580, "heading": 29, "pitch": -49 }
      },
      { "id": 2060, "pid": 20, "name": "BIM模型", "type": "group" },
      {
        "id": 20601121,
        "pid": 2060,
        "type": "3dtiles",
        "name": "大学教学楼",
        "url": "{dataServer}/3dtiles/bim-daxue/tileset.json",
        "position": { "lng": 117.251229, "lat": 31.844015, "alt": 31.2 },
        "highlight": { "type": "click", "color": "#FFFF00" },
        "popup": "all",
        "scenetree": "scenetree.json",
        "center": { "lat": 31.842516, "lng": 117.25107, "alt": 145, "heading": 8, "pitch": -39 }
      },
      {
        "pid": 2060,
        "type": "3dtiles",
        "name": "轻轨地铁站",
        "url": "{dataServer}/3dtiles/bim-ditiezhan/tileset.json",
        "position": { "lng": 117.203994, "lat": 31.857999, "alt": 28.9 },
        "rotation": { "z": 168.1 },
        "highlight": { "type": "click", "color": "#00FF00" },
        "popup": "all",
        "scenetree": "scenetree.json",
        "center": { "lat": 31.856125, "lng": 117.204513, "alt": 155, "heading": 350, "pitch": -31 }
      },
      {
        "id": 206012,
        "pid": 2060,
        "type": "3dtiles",
        "name": "桥梁",
        "url": "{dataServer}/3dtiles/bim-qiaoliang/tileset.json",
        "position": { "lng": 117.096906, "lat": 31.851564, "alt": 45 },
        "rotation": { "z": 17.5 },
        "maximumScreenSpaceError": 16,
        "maximumMemoryUsage": 1024,
        "skipLevelOfDetail": true,
        "loadSiblings": true,
        "cullRequestsWhileMoving": true,
        "cullRequestsWhileMovingMultiplier": 10,
        "preferLeaves": true,
        "progressiveResolutionHeightFraction": 0.5,
        "dynamicScreenSpaceError": true,
        "preloadWhenHidden": true,
        "center": { "lat": 31.849357, "lng": 117.099194, "alt": 306.2, "heading": 327.1, "pitch": -30.9 },
        "scenetree": "scenetree.json",
        "highlight": { "type": "click", "color": "#00FF00" },
        "popup": "all"
      },
      { "id": 2020, "pid": 20, "name": "人工建模", "type": "group" },
      {
        "id": 202013,
        "pid": 2020,
        "type": "3dtiles",
        "name": "地下管网",
        "url": "{dataServer}/3dtiles/max-piping/tileset.json",
        "position": { "lng": 117.215457, "lat": 31.843363, "alt": -3.6 },
        "rotation": { "z": 336.7 },
        "maximumScreenSpaceError": 2,
        "maximumMemoryUsage": 1024,
        "highlight": { "type": "click", "color": "#00FF00" },
        "popup": "all",
        "center": { "lat": 31.838821, "lng": 117.216402, "alt": 461, "heading": 0, "pitch": -46 },
        "msg": "演示数据，地下数据拖动时会在地面漂移"
      },
      {
        "id": 202012,
        "pid": 2020,
        "type": "3dtiles",
        "name": "石化工厂",
        "url": "{dataServer}/3dtiles/max-shihua/tileset.json",
        "position": { "lng": 117.077158, "lat": 31.659116, "alt": 24.6 },
        "maximumScreenSpaceError": 1,
        "maximumMemoryUsage": 1024,
        "highlight": { "type": "click", "color": "#00FF00" },
        "popup": "all",
        "scenetree": "scenetree.json",
        "center": { "lat": 31.654916, "lng": 117.08278, "alt": 279, "heading": 316, "pitch": -29 }
      },
      {
        "id": 202030,
        "pid": 2020,
        "name": "水利闸门",
        "type": "group",
        "center": { "lat": 29.794301, "lng": 121.47998, "alt": 262, "heading": 191, "pitch": -35 }
      },
      {
        "pid": 202030,
        "name": "闸门",
        "type": "graphic",
        "data": [
          {
            "type": "modelP",
            "position": [121.479813, 29.791278, 16],
            "style": {
              "url": "//data.mars3d.cn/gltf/mars/zhamen.glb",
              "heading": 105
            }
          }
        ],
        "center": { "lat": 29.791607, "lng": 121.479925, "alt": 27, "heading": 198, "pitch": -18 }
      },
      {
        "id": 202011,
        "pid": 202030,
        "type": "3dtiles",
        "name": "整体",
        "url": "{dataServer}/3dtiles/max-fsdzm/tileset.json",
        "position": { "alt": 15.2 },
        "maximumScreenSpaceError": 1,
        "maximumMemoryUsage": 1024,
        "center": { "lat": 29.792675, "lng": 121.480207, "alt": 190.8, "heading": 196.1, "pitch": -49 }
      },
      { "id": 2030, "pid": 20, "name": "倾斜摄影", "type": "group" },
      {
        "id": 203014,
        "pid": 2030,
        "type": "3dtiles",
        "name": "县城社区",
        "url": "{dataServer}/3dtiles/qx-shequ/tileset.json",
        "position": { "alt": 11.5 },
        "maximumScreenSpaceError": 2,
        "maximumMemoryUsage": 2048,
        "dynamicScreenSpaceError": true,
        "cullWithChildrenBounds": false,
        "center": { "lat": 28.440864, "lng": 119.486477, "alt": 588.23, "heading": 268.6, "pitch": -37.8 },
        "show": false,
        "flyTo": false
      },
      {
        "id": 203015,
        "pid": 2030,
        "name": "合肥天鹅湖",
        "type": "3dtiles",
        "url": "{dataServer}/3dtiles/qx-teh/tileset.json",
        "position": { "lng": 117.218434, "lat": 31.81807, "alt": 163 },
        "maximumScreenSpaceError": 16,
        "maximumMemoryUsage": 1024,
        "dynamicScreenSpaceError": true,
        "cullWithChildrenBounds": false,
        "skipLevelOfDetail": true,
        "preferLeaves": true,
        "center": { "lat": 31.795308, "lng": 117.21948, "alt": 1820, "heading": 0, "pitch": -39 }
      },
      {
        "pid": 2030,
        "type": "3dtiles",
        "name": "大雁塔",
        "url": "{dataServer}/3dtiles/qx-dyt/tileset.json",
        "position": { "alt": -27 },
        "maximumScreenSpaceError": 1,
        "maximumMemoryUsage": 1024,
        "center": { "lat": 34.215516, "lng": 108.960251, "alt": 834, "heading": 4, "pitch": -48 },
        "flat": {},
        "flyTo": false,
        "show": false
      },
      {
        "id": 203013,
        "pid": 2030,
        "type": "geojson",
        "name": "文庙-单体化",
        "url": " {dataServer}/file/geojson/dth-wm.json",
        "symbol": {
          "type": "polygonP",
          "styleOptions": {
            "color": "rgba(255, 255, 255, 0.01)",
            "clampToGround": true,
            "classification": true,
            "buffer": 1,
            "highlight": {
              "color": "rgba(255,255,0,0.5)"
            }
          }
        },
        "popup": [
          { "field": "name", "name": "房屋名称" },
          { "field": "jznf", "name": "建造年份" },
          { "field": "ssdw", "name": "所属单位" },
          { "field": "remark", "name": "备注信息" }
        ]
      },
      {
        "id": 203012,
        "pid": 2030,
        "type": "3dtiles",
        "name": "文庙",
        "url": "{dataServer}/3dtiles/qx-simiao/tileset.json",
        "position": { "alt": 80.6 },
        "maximumScreenSpaceError": 2,
        "maximumMemoryUsage": 2048,
        "dynamicScreenSpaceError": true,
        "cullWithChildrenBounds": false,
        "skipLevelOfDetail": true,
        "preferLeaves": true,
        "center": { "lat": 33.589536, "lng": 119.032216, "alt": 145.08, "heading": 3.1, "pitch": -22.9 }
      },
      { "id": 99, "name": "数据图层", "type": "group" }
    ]
  }
}
