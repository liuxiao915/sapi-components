import { utils } from '@/utils/index'
import { areaList, geoCoordMap } from '@/utils/common'

export const baseOption = (unit = []) => {
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
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        z: 20
      },
      extraCssText: 'z-index: 2',
      confine: true,
      opacity: 0.7,
      backgroundColor: 'rgba(96,96,96)',
      formatter: (params) => {
        return (
          `<div style="padding: 5px;font-size: 12px;color: #FFFFFF;font-family: PingFangSC-Regular;">
            <div>${params.length ? params[0].axisValue : ''}</div> 
            <p style="width: 100%;height:1px;background: #ffffff;opacity: 0.4;margin: 7px 0"></p>` +
            params.map((ele, index) => {
              const height = ele.seriesType === 'bar' ? `10px` : `2px`
              return `<div style="display: flex; align-items: center;">
                <div style="height:${height};width:12px;background: ${ele.color
                };color:#40A9FF;margin: 1px 5px 0 0"></div>
                <span style="line-height: 16px;"> ${ele.seriesName} ：${ele.data === null ? '-' : $utils.toThousands(ele.value) + (unit[index] ? unit[index] : '')
                }</span>
              </div>`
            })
            .join('') +
          '</div>'
        )
      }
    },
    legend: {
      left: 0,
      right: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        fontSize: 13,
        color: '#666666'
      }
    },
    grid: {
      top: 50,
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false // 不显示坐标轴刻度线
        },
        axisLine: {
          lineStyle: {
            color: '#E5E5E5'
          }
        },
        axisLabel: {
          color: '#666666',
          fontSize: 10
        },
        data: []
      }
    ],
    yAxis: [
      {
        name: '',
        type: 'value',
        data: [],
        axisTick: {
          show: false // 不显示坐标轴刻度线
        },
        axisLine: {
          show: false, // 不显示坐标轴线
          lineStyle: {
            color: '#E5E5E5'
          }
        },
        nameTextStyle: {
          color: '#999999',
          fontSize: 10,
          padding: [0, 0, 0, -10]
        },
        axisLabel: {
          color: '#999999',
          fontSize: 10
        },
        splitLine: {
          lineStyle: {
            color: '#E5E5E5',
            type: 'dashed'
          }
        }
      },
      {
        type: 'value',
        position: 'rihght',
        data: [],
        axisTick: {
          show: false // 不显示坐标轴刻度线
        },
        axisLine: {
          show: false, // 不显示坐标轴线
          lineStyle: {
            color: '#E5E5E5'
          }
        },
        nameTextStyle: {
          color: '#999999',
          fontSize: 10
        },
        axisLabel: {
          interval: 0,
          color: '#999999',
          fontSize: 10
        }
      }
    ],
    series: []
  }
}


// 水滴图  width: 100, height: 100, showDefaultImg： false, seriesData是数字类型
export const liquidfillOption = (seriesData, labelText = '完成比例') => {
  return {
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
        type: 'liquidFill',
        data: [(seriesData / 100).toFixed(4)],
        radius: '96px',
        label: {
          normal: {
            textStyle: {
              color: '#333333',
              insideColor: '#333333',
              fontSize: 12
            },
            formatter: ['{a|' + seriesData + '%}', '{b|' + labelText + '}'].join('\n'),
            rich: {
              a: {
                fontSize: 16,
                fontWeight: 600,
                lineHeight: 36
              },
              b: {}
            }
          }
        },
        backgroundStyle: {
          color: '#ffffff',
          borderWidth: 0.5,
          borderColor: 'rgba(51,136,255,0.4)'
        },
        outline: {
          show: true,
          borderDistance: 5,
          itemStyle: {
            color: 'none',
            borderColor: '#3388FF',
            borderWidth: 2
          }
        }
      }
    ]
  }
}

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
* @method lotBarOption
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


export const chartFn = () => {
  const info = {
    "name": "单位",
    "data": [
        "77.13",
        "11.24",
        "5.32",
        "2.56",
        "1.83",
        "1.57",
        "0.35"
    ],
    "yDataType": [
        "城镇私营企业及其他城镇企业",
        "其他",
        "外商投资企业",
        "民办非企业单位和社会团体",
        "国有企业",
        "国家机关和事业单位",
        "城镇集体企业"
    ]
  }
  return {
    title: null,
    legend: null,
    grid: {
      top: 0,
      left: 0,
      right: 70,
      bottom: 0,
      containLabel: true
    },
    tooltip: {
      confine: true,
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      padding: 0,
      borderWidth: 0,
      formatter: function (params) {
        const dom = `
        <div>
        <span class="tooltip-value val">
          ${params[0].data}
        </span> %</div>`
        return `<div class="toltip-min-width">
        <div class="tooltip-two"></div>
        <div class="tooltip-three"></div>
        <div class="tooltip-four"></div>
        <div class="tooltip-five"></div>
         <div class="flex-name chart-min-width">${params[0].name}</div>
          ${dom}
        </div>`
      }
    },
    xAxis: {
      type: 'value',
      axisLabel: null,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      splitLine: null
    },
    yAxis: [
      {
        type: 'category',
        data: info.yDataType,
        nameGap: 10,
        inverse: true,
        min: 0,
        axisLabel: {
          show: true,
          interval: 0,
          fontSize: 16,
          lineHeight: 20,
          fontFamily: 'PingFang SC',
          color: '#FFFFFF',
          formatter(val) {
            if (val === '城镇私营企业及其他城镇企业') {
              return '城镇私营企业及\n其他城镇企业'
            } else if (val === '民办非企业单位和社会团体') {
              return '民办非企业单位\n和社会团体'
            } else {
              return val
            }
          }
        },
        axisLine: false,
        axisTick: {
          show: false
        },
        nameTextStyle: {
          overflow: 'breakAll'
        }
      }
    ],
    series: [
      {
        name: info.name || '',
        type: 'bar',
        data: info.data || [],
        barWidth: 18,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(0,255,146,0.03)'
              },
              {
                offset: 0.99,
                color: 'rgba(0,255,143,0.5)'
              }
            ],
            globalCoord: false
          }
        },
        showBackground: true,
        backgroundStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(2,255,252,0)'
              },
              {
                offset: 0.985,
                color: 'rgba(0,214,255,0.2)'
              },
              {
                offset: 1,
                color: '#00D0FF'
              }
            ],
            globalCoord: false
          }
        },
        label: {
          show: true,
          position: 'start',
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          offset: [370, 4],
          align: 'right',
          formatter: (param) => `${param.value}%`
        }
      },
      {
        name: '',
        type: 'pictorialBar', // 象形柱图
        symbol: 'reat', // 正方形
        symbolSize: [2, 17], // 图形大小
        symbolOffset: [0, 0], // 位移
        symbolPosition: 'end', // 图形的定位位置
        itemStyle: {
          color: 'rgba(1, 254, 147,1)'
        },
        data: [...info.data, 100] || []
      }
    ]
  }
}