import * as mars3d from 'mars3d'

let graphicLayer // 矢量图层对象
let colorList = ['#54B5FF', '#00FFF9', '#F9E900', '#FFB713'] // 颜色数组
let defalutWidth = 1500 // 柱体默认宽度
let defalutLength = 1500 // 柱体默认长度
let defaultTotalHeight = 10000 // 柱体默认总长度

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
export const showStandColumn = (layer, data, colors, length, width, totalHeight) => {
  if (!layer) return
  graphicLayer = layer
  if (colors && colors.length > 0) {
    colorList = colors
  }
  if (length) {
    defalutLength = length
  }
  if (width) {
    defalutWidth = width
  }
  if (totalHeight) {
    defaultTotalHeight = totalHeight
  }
  const maxValue = getMaxValue(data)
  data.forEach((item) => {
    item.html = getHtml(item)
    item.totalValue = getTotalValue(item)
    let height=0;
    if (item.list && item.list.length > 0) {
      item.list.forEach((obj, index) => {
        obj.height =
          maxValue > 0 ? Math.floor((Number(obj.value) / maxValue) * defaultTotalHeight) : 0
        const position = mars3d.Cesium.Cartesian3.fromDegrees(
          item.centerPoint[0],
          item.centerPoint[1],
          getHeight(item, index)
        )
        height=height+obj.height;
        createZT(position, obj.height, colorList[index], item.html)
      })
      
    }
    item.centerPoint[2]=height
    divGraphicWhite(graphicLayer,item)
  })
  changeWriteMode()
}

// 获取矩形高度
const getHeight = (item, index) => {
  let height = 0
  item.list.forEach((obj, i) => {
    if (i <= index) {
      height += i === index ? obj.height / 2 : obj.height
    }
  })
  return height
}

// 获取单组数据累加最大值
const getMaxValue = (data) => {
  const numArray = data.map((item) => {
    if (item.list && item.list.length > 0) {
      return item.list.reduce((prev, next) => {
        return Number((prev && prev.value) || prev) + Number(next.value)
      }, 0)
    } else {
      return 0
    }
  })
  return Math.max.apply(null, numArray)
}

//统计总数
const getTotalValue = (item) => {
  if (item.list && item.list.length > 0) {
    return item.list.reduce((prev, next) => {
      return Number((prev && prev.value) || prev) + Number(next.value)
    }, 0)
  } else {
    return 0
  }
}

// 获取弹框html
const getHtml = (item) => {
  let html = ''
  // let colorList1 =  colorList.reverse()
  if (item.html) {
    html = item.html
  } else {
    if (item.list && item.list.length > 0) {
      html = `${item.name}<br/>`
      item.list.forEach((obj, index) => {
        html += `<span style="color:${colorList[index]}">${obj.label}：${obj.value} ${obj.unit}</span><br/>`
      })
      const arr=html.split('<br/>')
      const arr1=[arr[0]]
      for(let i=1; i<arr.length; i++){
        arr1[arr.length-i]=arr[i]+'<br/>'
      }
      html=arr1.toString().replace(/,/g,'')  
    }
  }
  return html
}

// 获取canvas
const getColorRamp = (val) => {
  if (val == null) {
    val = { 0.0: 'blue', 0.1: 'cyan', 0.37: 'lime', 0.54: 'yellow', 1: 'red' }
  }
  var ramp = document.createElement('canvas')
  ramp.width = 1
  ramp.height = 100
  var ctx = ramp.getContext('2d')
  var grd = ctx.createLinearGradient(0, 0, 0, 100)
  for (var key in val) {
    grd.addColorStop(1 - Number(key), val[key])
  }
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, 1, 100)
  return ramp
}

//  创建柱体
const createZT = (position, len, color, html) => {
  const rgba = mars3d.Cesium.Color.fromCssColorString(color)
  const graphic = new mars3d.graphic.BoxEntity({
    position: position,
    style: {
      heading: 45,
      dimensions: new mars3d.Cesium.Cartesian3(defalutLength, defalutWidth, len),
      color: color,
      outline: true,
      outlineColor: color,
      material: new mars3d.Cesium.ImageMaterialProperty({
        transparent: true, // 设置透明
        image: getColorRamp({
          0.0: rgba.withAlpha(1.0).toCssColorString().replace(')', ',1.0)'),
          0.6: rgba.withAlpha(0.4).toCssColorString(),
          1.0: rgba.withAlpha(0).toCssColorString()
        })
      })
    }
  })

  graphic.bindTooltip(html, { direction: 'right' })
  graphicLayer.addGraphic(graphic)
  return graphic
}

//添加数据统计
function divGraphicWhite(graphicLayer,item) {
  const divGraphic = new mars3d.graphic.DivUpLabel({
    position: item.centerPoint,
    style: {
      text: item.totalValue,
      color: "#fff",
      font_size: 16,
      font_family: "微软雅黑",
      lineHeight: 0,
      circleSize: 0,
      //distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000) // 按视距距离显示
    }
  })
  graphicLayer.addGraphic(divGraphic)
}

//修改数据显示
function changeWriteMode(){
  let node=document.getElementsByClassName('mars3d-divUpLabel-text')
  for(let i=0;i<node.length;i++){node[i].style.writingMode='horizontal-tb'}
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
