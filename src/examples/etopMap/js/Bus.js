import * as mars3d from 'mars3d'
import axios from '@/hooks/axios'

// 包含巴士、巴士线路相关的逻辑
class Bus {
  constructor(map) {
    this.map = map
  }
  // 添加巴士路线
  addBusLine() {
    if (this.busLineDS) {
      return
    }
    axios.get('/jsons/keyAreas/map/busLine.geojson').then((res) => {
      if (!(res && res.data && res.data.features)) {
        return
      }
      const busLine = res.data.features
      // 创建一个DataSource单独保存巴士路线
      this.busLineDS = new mars3d.Cesium.CustomDataSource('busLine')
      this.map.viewer.dataSources.add(this.busLineDS)
      // 添加每一条巴士路线并渲染
      busLine.forEach((item) => {
        const coordinates = item.geometry.coordinates
        const coords = []
        coordinates.forEach((v) => {
          coords.push(v[0])
          coords.push(v[1])
        })
        this.busLineDS.entities.add({
          id: item.properties.id,
          name: 'busLine',
          // name: item.properties.Name,
          polyline: {
            positions: mars3d.Cesium.Cartesian3.fromDegreesArray(coords),
            width: 5,
            material: new mars3d.Cesium.PolylineTrailLinkMaterialProperty(
              mars3d.Cesium.Color.fromCssColorString('#39FFA6'),
              3000
            ),
            distanceDisplayCondition:
              new mars3d.Cesium.DistanceDisplayCondition(0, 350000)
          }
        })
      })
    })
  }

  addBusModel(positions) {
    // 创建矢量数据图层
    if (!this.graphicLayer) {
      this.graphicLayer = new mars3d.layer.GraphicLayer({ zIndex: 999999 })
      this.map.addLayer(this.graphicLayer)
    }

    // 该数据可以从 基础项目 飞行漫游功能界面操作后单个路线的 保存JSON
    const flydata = {
      positions: positions,
      speed: 500,
      point: {
        pixelSize: 20,
        scaleByDistance: true,
        visibleDepth: false,
        color: mars3d.Cesium.Color.RED,
        distanceDisplayCondition: new mars3d.Cesium.DistanceDisplayCondition(
          1,
          130000
        ),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        show: true
      },
      // camera: {
      //   type: 'gs',
      //   radius: 30000
      // },
      // shadow: [
      //   {
      //     type: 'circle',
      //     radius: 1000,
      //     color: '#ffff00',
      //     opacity: 0.3,
      //     materialType: mars3d.MaterialType.CircleWave,
      //     speed: 20,
      //     count: 3,
      //     gradient: 0.1,
      //     show: true
      //   }
      // ]
      // interpolation: true, // 是否setInterpolationOptions插值
      clockLoop: true // 是否循环播放
    }

    const roamLine = new mars3d.graphic.RoamLine(flydata)
    this.graphicLayer.addGraphic(roamLine)

    // 不贴地时，直接开始
    roamLine.start()
  }

  // 移除巴士路线
  rmBusLine() {
    if (!this.busLineDS) {
      return
    }
    this.map.viewer.dataSources.remove(this.busLineDS)
    // 因为发现上面一条语句删除不了，存在bug，所以再重新删除全部
    // this.map.viewer.dataSources.removeAll()
    this.busLineDS = null
  }
  // 添加巴士
  addBus() {
    axios.get('/jsons/keyAreas/map/busLine.geojson').then((res) => {
      if (!(res && res.data && res.data.features)) {
        return
      }
      const busLine = res.data.features
      // 添加每一条巴士路线并渲染
      busLine.forEach((item, index) => {
        const coordinates = item.geometry.coordinates
        if (index < 100) this.addBusModel(coordinates)
      })
    })
    // if (this.busDS) {
    //   return
    // }
    // // 用于保存已添加的Bus的Entity
    // this.busModels = {}
    // // 轮询巴士轨迹数据的间隔时间（单位：秒）
    // this.interval = 20
    // // 配置mars3d.Cesium相关设置项
    // const clock = this.map.viewer.clock
    // clock.clockRange = mars3d.Cesium.ClockRange.CLAMPED
    // clock.shouldAnimate = true
    // // 创建一个DataSource单独保存巴士
    // this.busDS = new mars3d.Cesium.CustomDataSource('bus')
    // this.map.viewer.dataSources.add(this.busDS)
    // // 开启巴士轮询操作
    // this.busLoopRequest(true, this.interval)
  }
  // 开启或关闭巴士轮询操作
  busLoopRequest(isOpen, interval) {
    if (isOpen) {
      if (!this.busRequestId) {
        // 新增巴士
        this.addOrUpdateBus()
        // 轮询巴士轨迹数据并更新，轮询时间略小于this.interval。
        this.busRequestId = window.setInterval(
          this.addOrUpdateBus.bind(this),
          (interval - 0.5) * 1000
        )
      }
    } else {
      if (this.busRequestId) {
        // 移除对巴士数据的轮询操作
        window.clearInterval(this.busRequestId)
        this.busRequestId = null
      }
    }
  }
  // 新增或者更新巴士
  addOrUpdateBus() {
    this.beginTime = Date.now() // 记录请求的起始时间
    // getBusTrack({
    //   timespan: 30
    // }).then((res) => {
    //   const begin = Date.now()
    //   const data = res.data.data
    //   // 先处理此次没有返回对应数据的巴士（将其停在上段轨迹的最后一个轨迹点处）
    //   if (Object.keys(this.busModels).length > 0) {
    //     const hasBusIdx = [] // 保存本次有数据的巴士的索引
    //     data.clwz.forEach((item) => {
    //       hasBusIdx.push(item.clbm)
    //     })
    //     for (const key in this.busModels) {
    //       if (Object.hasOwnProperty.call(this.busModels, key)) {
    //         if (hasBusIdx.indexOf(key) == -1) {
    //           // 处理没有返回对应数据的巴士
    //           this.optNodataBus(key)
    //         }
    //       }
    //     }
    //   }
    //   const time = (Date.now() - begin) / 1000
    //   // 通过遍历每一条巴士轨迹数据去新增或更新巴士
    //   data.clwz.forEach((item) => {
    //     // 如果巴士不存在则新增，否则就更新
    //     const busModel = this.busModels[item.clbm]
    //     if (busModel == null) {
    //       this.addNewBus(item)
    //     } else {
    //       // 通过将上一段轨迹的最后一个轨迹点插入新轨迹数组，来使轨迹平滑
    //       // const lastPoint = busModel.properties.getValue(new mars3d.Cesium.JulianDate).lastPoint;
    //       // if (lastPoint) {
    //       //   item.path.unshift(lastPoint);
    //       // }
    //       this.updateBus(busModel, item)
    //     }
    //   })
    //   const time2 = (Date.now() - begin) / 1000
    // })
  }
  // 新增巴士的具体操作
  addNewBus(item) {
    // 通过插值计算轨迹
    const position = this.computeTrack(item.path)
    // 根据提供的PositionProperty的速度计算表示巴士旋转（朝向）的四元数
    const orientation = new mars3d.Cesium.VelocityOrientationProperty(position)
    // 添加新巴士Entity到DataSource的EntityCollection中
    const entity = this.busDS.entities.add({
      name: 'bus',
      position: position,
      orientation: orientation,
      // 巴士模型（GLTF）
      model: {
        uri: './model3d/Bus/bus2.gltf',
        // 模型的最小像素大小
        minimumPixelSize: 8,
        // 模型的缩放比例
        scale: 0.5,
        // 模型相对于相机的可视范围
        distanceDisplayCondition: new mars3d.Cesium.DistanceDisplayCondition(
          0,
          1000
        ),
        // 是否运行模型中的动画效果
        runAnimations: false
      },
      // 地图低缩放级别时，表示巴士位置的闪烁点
      point: {
        pixelSize: 10,
        color: mars3d.Cesium.Color.RED,
        outlineColor: new mars3d.Cesium.CallbackProperty(function color() {
          //关键代码
          return mars3d.Cesium.Color.fromRandom({
            minimumRed: 0.76,
            minimumGreen: 0.78,
            minimumBlue: 0.75,
            alpha: 1.0
          })
        }, false),
        outlineWidth: 5,
        distanceDisplayCondition: new mars3d.Cesium.DistanceDisplayCondition(
          1000,
          130000
        ),
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      },
      // 用于存储一些属性信息
      properties: new mars3d.Cesium.PropertyBag()
    })
    // 记录巴士该段轨迹数据的最后一个轨迹点，用于轨迹数据平滑衔接
    entity.properties.addProperty('lastPoint', item.path[item.path.length - 1])
    // 保存巴士Entity，以备下次更新数据时筛选
    this.busModels[item.clbm] = entity
  }
  // 更新巴士的具体操作
  updateBus(busModel, item) {
    // 通过插值计算轨迹
    const position = this.computeTrack(item.path)
    // 根据提供的PositionProperty的速度计算表示巴士旋转（朝向）的四元数
    const orientation = new mars3d.Cesium.VelocityOrientationProperty(position)
    // 更新巴士轨迹和运动朝向
    busModel.position = position
    busModel.orientation = orientation
  }
  // 处理没有返回对应数据的巴士
  optNodataBus(key) {
    const busModel = this.busModels[key]
    const lastPoint = busModel.properties.getValue(
      new mars3d.Cesium.JulianDate()
    ).lastPoint
    if (lastPoint) {
      const position = mars3d.Cesium.Cartesian3.fromDegrees(
        lastPoint[0],
        lastPoint[1]
      )
      busModel.position = position
    }
  }
  // 通过插值计算轨迹
  computeTrack(path) {
    const position = new mars3d.Cesium.SampledPositionProperty()
    const len = path.length
    // 用于插值的时间段（要考虑请求数据花费的时间）
    const duration = this.interval - (Date.now() - this.beginTime) / 1000
    // 每个轨迹点之间的时间间隔
    const tick = duration / (len - 1)
    const startTime = this.map.viewer.clock.currentTime
    // 轨迹插值
    for (let i = 0; i < len; i++) {
      const time = mars3d.Cesium.JulianDate.addSeconds(
        startTime,
        i * tick,
        new mars3d.Cesium.JulianDate()
      )
      position.addSample(
        time,
        mars3d.Cesium.Cartesian3.fromDegrees(path[i][0], path[i][1])
      )
    }
    return position
  }
  // 移除巴士
  rmBus() {
    if (!this.graphicLayer) {
      return
    }
    console.log(this.graphicLayer, 'graphicLayer')
    this.map.removeLayer(this.graphicLayer)
    this.graphicLayer = null
    // if (!this.busDS) {
    //   return
    // }
    // this.map.viewer.dataSources.remove(this.busDS)
    // this.busDS = null
    // // 关闭巴士轮询操作
    // this.busLoopRequest(false)
  }
}

export default Bus
