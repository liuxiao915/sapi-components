import * as mars3d from 'mars3d'

let graphicLayer // 矢量图层对象
let colorList = ['#00FF8E', '#F9E900', '#B620E0', '#FC2120'] // 颜色数组
let defalutLength = 30 // 柱体默认长度
let defaultTotalHeight = 120 // 柱体默认总长度
let tipsLayer = null

/**
 * 展示椎体
 * @param {Object} layer
 * @param {Object} data 数据结构看代码结尾cityPositio对象
 * @param {Array} colors 自定义颜色数组 数组的长度要大于或等于data[0].list的长度
 * @param {Number} length 柱体总长度
 * @param {Number} width 柱体总宽度
 * @param {Number} totalHeight 柱体总高度
 * @returns {Object}
 */
export const showStandColumn2D = (layer, data, colors, length, totalHeight, options = {}) => {
  if (!layer) return
  graphicLayer = layer
  if (colors && colors.length > 0) {
    colorList = colors
  }
  if (length) {
    defalutLength = length
  }
  if (totalHeight) {
    defaultTotalHeight = totalHeight
  }
  const maxValue = getMaxValue(data)
  // 添加总览图层
  data.forEach((item) => {
    item.html = getHtml(item)
    if (item.list && item.list.length > 0) {
      item.list.forEach((obj) => {
        obj.height =
          maxValue > 0 ? Math.floor((Number(obj.value) / maxValue) * defaultTotalHeight) : 0
      })
      item.totalValue = getTotalValue(item)
      const html = getPillarHtml(item)
      const graphic = new mars3d.graphic.DivGraphic({
        position: item.centerPoint,
        pointerEvents: true,
        attr: {
          ...item
        },
        style: {
          html,
          horizontalOrigin: mars3d.Cesium.HorizontalOrigin.LEFT,
          verticalOrigin: mars3d.Cesium.VerticalOrigin.BOTTOM,
          offsetX: (options && options.offsetX) || 0,
          offsetY: (options && options.offsetY) || 0,
          distanceDisplayCondition: new mars3d.Cesium.DistanceDisplayCondition(
            (options && options.distanceDisplayConditionMin) || 1000,
            (options && options.distanceDisplayConditionMax) || 999999999999
          ) // 按视距距离显示
        }
      })

      // graphic.bindTooltip(item.html, { direction: 'right' })
      graphicLayer.addGraphic(graphic)
    }
  })

  graphicLayer.on(mars3d.EventType.mouseOver, function (event) {
    const tips = {
      name: event.graphic.attr.name,
      position: event.graphic.attr.centerPoint,
      html: event.graphic.attr.html
    }
    tipsLayer = window.etopMap.addDivLayer([{ ...tips }], {
      offsetX: 40,
      offsetY: -50
    })
  })
  graphicLayer.on(mars3d.EventType.mouseOut, function (event) {
    window.etopMap.removeLayerByLayer(tipsLayer)
    tipsLayer = null
  })
}

// 获取单组数据累加最大值
const getMaxValue = (data) => {
  const numArray = data.map((item) => {
    return getTotalValue(item)
  })
  return Math.max.apply(null, numArray)
}

const getTotalValue = (item) => {
  if (item.list && item.list.length > 0) {
    return item.list.reduce((prev, next) => {
      return Number((prev && prev.value) || prev) + Number(next.value)
    }, 0)
  } else {
    return 0
  }
}

const getPillarHtml = (item) => {
  let html = ''
  if (!(item && item.list && item.list.length > 0)) {
    return html
  }
  for (let i = item.list.length - 1; i >= 0; i--) {
    html =
      `<div style="height: ${item.list[i].height}px;background-image: linear-gradient(to top, rgba(0,0,0,0), ${colorList[i]});"></div>` +
      html
  }
  html = `<div style="width:${defalutLength}px">` + html
  html += '</div>'
  html =
    `<div style="text-align:center;color:#e8d11a;font-width: 700;width:60px;transform: translateX(-15px);">${item.totalValue}</div>` +
    html
  return html
}

// 获取弹框html
const getHtml = (item) => {
  let html = ''
  if (item.html) {
    html = item.html
  } else {
    if (item.list && item.list.length > 0) {
      html = `<div style="padding: 10px; background: rgba(0,9,45,0.90);border: 1px solid rgba(84,181,255,0.50); position: relative;font-size:16px">
      <div style="position: absolute; width: 4px; height: 4px; left: 0; top: 0; background-color: #676a7a;"></div>
      <div style="position: absolute; width: 4px; height: 4px; right: 0; top: 0; background-color: #676a7a;"></div>
      <div style="position: absolute; width: 4px; height: 4px; left: 0; bottom: 0; background-color: #676a7a;"></div>
      <div style="position: absolute; width: 4px; height: 4px; right: 0; bottom: 0; background-color: #676a7a;"></div>
      <div style="color: #54CFFF; padding-bottom: 10px; border-bottom: rgba(255,255,255,0.2) solid 1px; margin-bottom: 10px;">${item.name}</div>`
      item.list.forEach((obj, index) => {
        html +=
          '<div style="width: 180px; display: flex; justify-content: space-between; align-items: center;">'
        html += `<div style="display: flex; align-items: center;" ><div style="background-color: ${colorList[index]}; margin-right: 4px; width: 8px; height: 8px"></div><div style="color: #54CFFF;">${obj.label}</div></div>`
        html += `<div style="display: flex; align-items: center; color: #ffffff;"><div style="font-size: 24px">${obj.value}</div><div style="margin-left: 4px;">${obj.unit}</div></div>`
        html += '</div>'
      })
      html += '</div>'
    }
  }
  return html
}

// 数据结构示例
export const cityPosition = [
  {
    name: '南山区',
    centerPoint: [113.930732397502823, 22.544112402018165],
    list: [
      {
        label: '已建成',
        value: '3',
        unit: '块'
      },
      {
        label: '在建',
        value: '9',
        unit: '块'
      },
      {
        label: '立项',
        value: '28',
        unit: '块'
      },
      {
        label: '规划未建',
        value: '12',
        unit: '块'
      }
    ],
    html: ''
  },
  {
    name: '罗湖区',
    centerPoint: [114.14314284970456, 22.577614641637847],
    list: [
      {
        label: '已建成',
        value: '3',
        unit: '块'
      },
      {
        label: '在建',
        value: '9',
        unit: '块'
      },
      {
        label: '立项',
        value: '28',
        unit: '块'
      },
      {
        label: '规划未建',
        value: '12',
        unit: '块'
      }
    ],
    html: ''
  },
  {
    name: '福田区',
    centerPoint: [114.041531601993711, 22.546180573700912],
    list: [
      {
        label: '已建成',
        value: '3',
        unit: '块'
      },
      {
        label: '在建',
        value: '9',
        unit: '块'
      },
      {
        label: '立项',
        value: '28',
        unit: '块'
      },
      {
        label: '规划未建',
        value: '12',
        unit: '块'
      }
    ],
    html: ''
  },
  {
    name: '宝安区',
    centerPoint: [113.851333608652638, 22.679122091019771],
    list: [
      {
        label: '已建成',
        value: '3',
        unit: '块'
      },
      {
        label: '在建',
        value: '9',
        unit: '块'
      },
      {
        label: '立项',
        value: '28',
        unit: '块'
      },
      {
        label: '规划未建',
        value: '12',
        unit: '块'
      }
    ],
    html: ''
  },
  {
    name: '龙岗区',
    centerPoint: [114.206547228868871, 22.695658245233684],
    list: [
      {
        label: '已建成',
        value: '3',
        unit: '块'
      },
      {
        label: '在建',
        value: '9',
        unit: '块'
      },
      {
        label: '立项',
        value: '28',
        unit: '块'
      },
      {
        label: '规划未建',
        value: '12',
        unit: '块'
      }
    ],
    html: ''
  },
  {
    name: '龙华区',
    centerPoint: [114.029752276023032, 22.686835176968035],
    list: [
      {
        label: '已建成',
        value: '3',
        unit: '块'
      },
      {
        label: '在建',
        value: '9',
        unit: '块'
      },
      {
        label: '立项',
        value: '28',
        unit: '块'
      },
      {
        label: '规划未建',
        value: '12',
        unit: '块'
      }
    ],
    html: ''
  },
  {
    name: '盐田区',
    centerPoint: [114.270779530868992, 22.597519394223507],
    list: [
      {
        label: '已建成',
        value: '3',
        unit: '块'
      },
      {
        label: '在建',
        value: '9',
        unit: '块'
      },
      {
        label: '立项',
        value: '28',
        unit: '块'
      },
      {
        label: '规划未建',
        value: '12',
        unit: '块'
      }
    ],
    html: ''
  },
  {
    name: '大鹏新区',
    centerPoint: [114.463978, 22.597867],
    list: [
      {
        label: '已建成',
        value: '3',
        unit: '块'
      },
      {
        label: '在建',
        value: '9',
        unit: '块'
      },
      {
        label: '立项',
        value: '28',
        unit: '块'
      },
      {
        label: '规划未建',
        value: '12',
        unit: '块'
      }
    ],
    html: ''
  },
  {
    name: '坪山区',
    centerPoint: [114.357942197043172, 22.692203941120454],
    list: [
      {
        label: '已建成',
        value: '3',
        unit: '块'
      },
      {
        label: '在建',
        value: '9',
        unit: '块'
      },
      {
        label: '立项',
        value: '28',
        unit: '块'
      },
      {
        label: '规划未建',
        value: '12',
        unit: '块'
      }
    ],
    html: ''
  },
  {
    name: '光明区',
    centerPoint: [113.926301513474826, 22.766154577974362],
    list: [
      {
        label: '已建成',
        value: '43',
        unit: '块'
      },
      {
        label: '在建',
        value: '69',
        unit: '块'
      },
      {
        label: '立项',
        value: '28',
        unit: '块'
      },
      {
        label: '规划未建',
        value: '12',
        unit: '块'
      }
    ],
    html: ''
  },
  {
    name: '深汕合作区',
    centerPoint: [115.046366201863876, 22.877896398732691],
    list: [
      {
        label: '已建成',
        value: '13',
        unit: '块'
      },
      {
        label: '在建',
        value: '59',
        unit: '块'
      },
      {
        label: '立项',
        value: '28',
        unit: '块'
      },
      {
        label: '规划未建',
        value: '12',
        unit: '块'
      }
    ],
    html: ''
  }
]
