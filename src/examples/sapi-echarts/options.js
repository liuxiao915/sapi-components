import { utils } from '@/utils/index'
import { areaList, geoCoordMap } from '@/utils/common'
// 饼图
export const pieOption = (unit = '', title = '', total = '-', seriesData = []) => {
  const list = seriesData.filter(item => item.value || item.value === 0)
  return {
    backgroundColor: '#fff',
    color: ['#1890FF', '#26C9C3', '#95DE64', '#FFC53D', '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        if (params.data.rate) {
          return `<div style="padding: 5px;font-size: 12px;color: #FFFFFF;font-family: PingFangSC-Regular;">
            ${params.marker}<span>${params.name}：</span><span>${utils.toThousands(params.value)}${unit}</span>
            <span>${utils.toThousands(params.data.proportion)}${params.data.percentage}</span>
          </div>`
        } else {
          return `<div style="padding: 5px;font-size: 12px;color: #FFFFFF;font-family: PingFangSC-Regular;">
            ${params.marker}<span>${params.name}：</span><span>${utils.toThousands(params.value)}${unit}</span>
          </div>`
        }
      }
    },
    title: [
      {
        text: '{a|' + utils.toThousands(total) + '}{b|' + ' ' + unit + '}',
        subtext: title,
        top: '36%',
        left: 'center',
        textStyle: {
          rich: {
            a: {
              fontSize: 24,
              color: '#666666',
              fontWeight: 500
            },
            b: {
              fontSize: 14,
              color: '#666666'
            }
          },
        },
        subtextStyle: {
          fontSize: 14,
          fontWeight: '400',
          color: '#666666'
        }
      }
    ],
    legend: {
      show: false
    },
    xAxis: [
      {
        show: false
      }
    ],
    yAxis: [
      {
        show: false
      }
    ],
    series: [
      {
        type: 'pie',
        radius: ['80%', '55%'],
        center: ['50%', '50%'],
        data: list,
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2
        },
        labelLine: {
          length: 20,
          length2: 100
        },
        label: {
          show: false
        }
      }
    ]
  }
}
// 饼图,图例在右
export const pieRightOption = (unit = '', title = '', total = '', seriesData = []) => {
  return {
    color: [
      '#1890FF',
      '#26C9C3',
      '#95DE64',
      '#FFC53D',
      '#5470c6',
      '#91cc75',
      '#fac858',
      '#ee6666',
      '#73c0de',
      '#3ba272',
      '#fc8452',
      '#9a60b4',
      '#ea7ccc'
    ],
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        if (params.data.rate) {
          return `<div style="padding: 5px;font-size: 12px;color: #FFFFFF;font-family: PingFangSC-Regular;">
            ${params.marker}<span>${params.name}：</span><span>${utils.toThousands(params.value)}${unit}</span>
            <span>${utils.toThousands(params.data.proportion)}${params.data.percentage}</span>
          </div>`
        } else {
          return `<div style="padding: 5px;font-size: 12px;color: #FFFFFF;font-family: PingFangSC-Regular;">
            ${params.marker}<span>${params.name}：</span><span>${utils.toThousands(params.value)}${unit}</span>
          </div>`
        }
      },
      textStyle: {
        fontSize: 14
      }
    },
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      containLabel: true
    },
    legend: [
      {
        orient: 'vertical',
        icon: 'circle',
        top: 'center',
        left: '50%',
        textStyle: {
          align: 'left',
          fontSize: 12,
          verticalAlign: 'middle',
          color: '#666666',
          lineHeight: 16
        }
      },
      {
        orient: 'vertical',
        icon: 'none',
        top: 'center',
        right: 0,
        align: 'right',
        textStyle: {
          align: 'left',
          verticalAlign: 'middle',
          lineHeight: 16,
          color: '#212121',
          fontWeight: 400,
          rich: {
            value: {
              fontSize: 12,
              color: '#212121'
            }
          }
        },
        formatter: (name) => {
          if (seriesData.length) {
            const item = seriesData.filter((item) => item.name === name)[0]
            return `{value| ${utils.toThousands(item.value)}${item.unit || unit}}`
          }
        }
      }
    ],
    xAxis: [
      {
        show: false
      }
    ],
    yAxis: [
      {
        show: false
      }
    ],
    series: [
      {
        type: 'pie',
        center: ['22%', '50%'],
        radius: ['52%', '77%'],
        hoverAnimation: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            color: '#9A9EBA',
            formatter: '{val|' + utils.toThousands(total) + '}\n{titleTxt|' + unit + '}',
            rich: {
              val: {
                fontSize: 20,
                lineHeight: 36,
                fontWeight: 500,
                color: '#212121'
              },
              titleTxt: {
                fontSize: 12,
                fontWeight: 500,
                color: '#666666'
              }
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: 14
            }
          }
        },
        labelLine: {
          show: false
        },
        data: seriesData
      }
    ]
  }
}
/**
* 柱状图
* @method barOption
* @param unit 
* @param xAxisData 
* @param seriesName 
* @param seriesData 
* @param seriesType 
* @param xAxisType {custom | time} custom是自定义类型，x轴为4个字换行，time是时间类型，x轴为不换行，同时滚动条在最右边，显示最新数据
* @return string
*/
export const barOption = (unit = '', xAxisData = [], seriesName = '', seriesData = [], seriesType = 'bar', xAxisType = 'custom') => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      show: false
    },
    grid: {
      top: 30,
      bottom: 25,
      containLabel: true
    },
    dataZoom: [
      {
        type: 'slider',
        bottom: 0,
        start: xAxisType === 'time' ? 100 : 0,
        left: 12,
        right: 12,
        showDetail: false,
        height: 12,
        moveHandleSize: 4,
        minValueSpan: 4,
        maxValueSpan: 4
      }
    ],
    xAxis: [
      {
        data: xAxisData,
        type: 'category',
        axisLabel: {
          interval: 0,
          formatter(value) {
            const valArr = []
            if (xAxisType === 'time') {
              return value
            } else {
              while (value.length) {
                valArr.push(value.slice(0, 5))
                value = value.slice(5)
              }
              return valArr.join('\n')
            }
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false // 不显示坐标轴线
        },
        axisTick: {
          show: false // 不显示坐标轴刻度线
        },
        splitLine: {
          lineStyle: {
            color: '#E5E5E5',
            type: 'dashed'
          }
        }
      }
    ],
    series: [
      {
        name: seriesName,
        type: seriesType,
        symbol: 'circle',
        barWidth: 18,
        itemStyle: {
          color: '#40A9FF'
        },
        label: {
          show: false,
          position: 'top', // 在上方显示
          fontSize: 12,
          textStyle: {
            color: '#666666'
          }
        },
        data: seriesData
      }
    ]
  }
}

/**
* 多柱状图
* @method barOption
* @param unit 
* @param xAxisData 
* @param seriesName 
* @param seriesData 
* @param seriesType 
* @param xAxisType {custom | time} custom是自定义类型，x轴为4个字换行，time是时间类型，x轴为不换行，同时滚动条在最右边，显示最新数据
* @return string
*/
export const lotBarOption = (unit = '', xAxisData = [], seriesName = [], seriesData = [], xAxisType = 'custom') => {
  return {
    legend: {
      top: -3,
      left: -4
    },
    grid: {
      top: 60,
      bottom: 25
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          interval: 0,
          formatter(value) {
            const valArr = []
            if (xAxisType === 'time') {
              return value
            } else {
              while (value.length) {
                valArr.push(value.slice(0, 5))
                value = value.slice(5)
              }
              return valArr.join('\n')
            }
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    dataZoom: [
      {
        type: 'slider',
        showDetail: false,
        start: xAxisType === 'time' ? 100 : 0,
        left: 12,
        right: 12,
        bottom: 0,
        height: 12,
        moveHandleSize: 4,
        minValueSpan: 4,
        maxValueSpan: 4
      }
    ],
    series: [
      {
        name: seriesName[0],
        type: 'line',
        barWidth: 12,
        symbol: 'circle',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#40A9FF'
        },
        label: {
          show: false
        },
        data: seriesData[0]
      },
      {
        name: seriesName[1],
        type: 'line',
        symbol: 'circle',
        itemStyle: {
          color: '#00FFF9'
        },
        label: {
          show: false
        },
        barWidth: 12,
        emphasis: {
          focus: 'series'
        },
        data: seriesData[1]
      },
      {
        name: seriesName[2],
        type: 'line',
        symbol: 'circle',
        itemStyle: {
          color: '#FFE000'
        },
        label: {
          show: false
        },
        barWidth: 12,
        emphasis: {
          focus: 'series'
        },
        data: seriesData[2]
      }
    ]
  }
}

// 横向单柱状图
export const rowBarOption = (unit = '', seriesNames = '', arr = []) => {
  const list = arr.sort((a, b) => {
    return Number(b.value) - Number(a.value)
  })
  const list1 = list.map((item, index) => {
    return {
      name: index + 1 + item.name,
      value: item.value
    }
  })
  list1.reverse()
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      show: false
    },
    grid: {
      top: 10,
      bottom: 0,
      left: 15,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        show: false,
        axisPointer: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        data: list1.map((item) => item.name),
        axisLine: {
          show: false // 不显示坐标轴线
        },
        axisTick: {
          show: false // 不显示坐标轴刻度线
        },
        axisLabel: {
          // 图形前面方形样式
          formatter(value, index) {
            return ['{a|' + value.slice(0, 1) + '}', '{b|' + value.slice(1) + '}'].join('')
          },
          rich: {
            a: {
              backgroundColor: '#F2F9FF',
              borderRadius: 50,
              verticalAlign: 'middle',
              width: 14,
              height: 14,
              fontSize: 10,
              color: '#3388FF',
              align: 'center'
            },
            b: {
              fontSize: 12,
              color: '#999999'
            }
          }
        }
      }
    ],
    series: [
      {
        name: seriesNames,
        type: 'bar',
        barWidth: 18,
        itemStyle: {
          color: '#40A9FF'
        },
        label: {
          show: true,
          position: 'insideRight', // 在图中右方显示
          fontSize: 12,
          padding: [3, 0, 0, 0],
          textStyle: {
            color: '#FFFFFF'
          },
          formatter: function (value) {
            return utils.toThousands(value.data)
          }
        },
        data: list1.map((item) => item.value)
      }
    ]
  }
}

// 堆叠图
export const aDBarOption = (unit = '', xAxisData = [], seriesNames = [], seriesList = [], xAxisType = 'custom') => {
  return {
    color: ['#ffe000', '#73d13d', '#00fff9', '#3388ff'],
    legend: {
      top: 0,
      left: -4,
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      top: 60,
      bottom: 25
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          interval: 0,
          formatter(value) {
            const valArr = []
            if (xAxisType === 'time') {
              return value
            } else {
              while (value.length) {
                valArr.push(value.slice(0, 5))
                value = value.slice(5)
              }
              return valArr.join('\n')
            }
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        minInterval: 1,
        splitLine: {
          show: true
        }
      }
    ],
    dataZoom: [
      {
        type: 'slider',
        showDetail: false,
        left: 12,
        right: 12,
        bottom: 0,
        height: 12,
        moveHandleSize: 4,
        minValueSpan: 5,
        maxValueSpan: 5
      }
    ],
    series: [
      {
        name: seriesNames[0],
        type: 'bar',
        stack: 'Ad',
        barWidth: 12,
        emphasis: {
          focus: 'series'
        },
        label: {
          show: false
        },
        data: seriesList[0]
      },
      {
        name: seriesNames[1],
        type: 'bar',
        stack: 'Ad',
        barWidth: 12,
        label: {
          show: false
        },
        emphasis: {
          focus: 'series'
        },
        data: seriesList[1]
      },
      {
        name: seriesNames[2],
        type: 'bar',
        stack: 'Ad',
        barWidth: 12,
        label: {
          show: false
        },
        emphasis: {
          focus: 'series'
        },
        data: seriesList[2]
      },
      {
        name: seriesNames[3],
        type: 'bar',
        stack: 'Ad',
        barWidth: 12,
        label: {
          show: false
        },
        emphasis: {
          focus: 'series'
        },
        data: seriesList[3]
      }
    ]
  }
}

const pointData = (data) => {
  const res = []
  const arr = data.map(item => item.value)
  const max = Math.max(...arr)
  for (let i = 0; i < areaList.length; i++) {
    const geoCoord = geoCoordMap[areaList[i]]
    if (geoCoord) {
      res.push({
        name: areaList[i],
        value: [geoCoord[0], geoCoord[1], Math.floor((arr[i] / max) * 100)]
      })
    }
  }
  return res
}
const handleFormatter = (params, legendData, seriesData) => {
  let data = ''
  legendData.forEach((item, index) => {
    let curAreaDatas = []
    seriesData[index].forEach(val => {
      if(val.name === params.name) {
        curAreaDatas.push(val.value)
      }
    })
    if(params.seriesName === item.name || item) {
      data += ` <div class="flex">
      <div class="flex-item-center">
        <span class="tooltip-innder-bar ${'c' + item.color.split('#')[1]}"></span>
        <span class="tooltip-inner-name">${item.name || item}：</span>
        <span class="tooltip-inner-name">
          ${utils.toThousands(curAreaDatas)}
        </span>
        </div>
      </div>`
    }
  })
  return `<div class="tooltip-outbox">
    <div class="tooltip-outbox-name" @click="$emit('getShowHousing')">${params.name}</div>
    <div class="tooltip-inner-padding">${data}</div>
  </div>`
}

/**
 * 深圳3d地图
 * @param {*} legendData 
 * @param {*} seriesNames 
 * @param {*} seriesData 
 * @returns object
 */
export const mapOption = (legendData, seriesNames, seriesData) => {
  return {
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(255, 255, 255, 255)",
      confine: true,
      axisPointer: {
        type: "line", 
        lineStyle: { "color": "#54B5FF", "type": "dashed" }
      },
      formatter: (params) => {
        return handleFormatter(params, legendData, seriesData)
      }
    },
    legend: {
      show: true,
      top: 0,
      left: 0, 
      itemWidth: 10,
      itemHeight: 10, 
      textStyle: {
        color: "red", 
        fontSize: "16",
        fontWeight: 400, 
        display: "flex"
      },
      data: legendData
    },
    series: [
      {
        id: "a1",
        name: seriesNames[0],
        type: "bar3D",
        coordinateSystem: "geo3D",
        "barSize": 1.5,
        "shading": "color",
        "minHeight": 5,
        "barGap": 0,
        "itemStyle": { "color": "#00fff9", "opacity": 0.5, "border": 1 },
        "emphasis": { "label": { "show": false } },
        "label": { "show": false },
        "data": pointData(seriesData[0]).map((item) => {
          return {
            ...item,
            value: [item.value[0] - 0.016, item.value[1], item.value[2]]
          }
        })
      },
      {
        "id": "a2",
        "name": seriesNames[1],
        "type": "bar3D",
        "coordinateSystem": "geo3D",
        "barSize": 1.5, 
        "shading": "color", 
        "minHeight": 5, 
        "barGap": 0,
        "itemStyle": { "color": "#ffe000", "opacity": 0.5 },
        "emphasis": { "label": { "show": false } }, "label": { "show": false },
        "data": pointData(seriesData[1])
      },
      {
        "id": "a3",
        "name": seriesNames[2],
        "type": "bar3D",
        "barGap": 0,
        "coordinateSystem": "geo3D",
        "barSize": 1.5,
        "shading": "color",
        "minHeight": 5,
        "itemStyle": { "color": "#33D7FF", "opacity": 0.5 },
        "emphasis": { "label": { "show": false } },
        "label": { "show": false },
        "data": pointData(seriesData[2]).map((item) => {
          return {
            ...item,
            value: [item.value[0] + 0.016, item.value[1], item.value[2]]
          }
        })
      }
    ]
  }
}