/**
 * 折线图/柱状图
 * @method barLineOption
 * @param unit {Array | String}
 * @param xAxisData {Array}
 * @param seriesData {Array}
 * @param showLegend {Boolean} 是否展示图例
 * @param showLegend {Boolean} 是否展示滚动条
 * @return object
 */
export const barLineOption = (
  unit = '',
  xAxisData = [],
  seriesData = [],
  showLegend = false,
  dataZoom = false,
  title,
  showLabelLen
) => {
  if (seriesData.length && seriesData[0]?.data.length) {
    const series = []
    const seriesLen = seriesData.length
    const dataLen = seriesData[0]?.data.length
    seriesData.forEach((item, index) => {
      series.push({
        name: item.name,
        yAxisIndex: 0,
        data: item.data,
        type: item.type,
        barWidth: seriesLen >= 14 ? 16 : 24,
        barMaxWidth: 40,
        label: {
          show: false,
          position: 'top'
        },
        symbol: 'circle',
        symbolSize: 10
      })
    })
    return {
      color: ['#006CFF', '#42E8AE'],
      grid: {
        top: 45,
        bottom: dataLen >= 10 ? -20 : 0,
        left: 0,
        right: 0,
        containLabel: true
      },
      dataZoom: [
        {
          show: dataZoom,
          type: 'slider',
          start: 0,
          xAxisIndex: 0,
          height: 10,
          // minSpan: 3,
          // maxSpan: dataZoom ? 50 : 100,
          bottom: 0,
          showDataShadow: false,
          showDetail: false,
          brushSelect: false,
          handleSize: '100%', // 滚动条竖杠大小
          handleStyle: {
            color: '#3AAAF0',
            borderColor: '#007acc',
            borderWidth: 'none'
          },
          fillerColor: 'rgba(27, 102, 177, 1)',
          backgroundColor: 'rgba(4, 28, 52, 1)',
          borderColor: '#002944'
        }
      ],
      // toolbox: {
      //   top: -7,
      //   feature: {
      //     saveAsImage: {
      //       name: title,
      //       backgroundColor: 'transparent',
      //       iconStyle: {
      //         borderWidth: 3
      //       }
      //     }
      //   }
      // },
      legend: [
        {
          show: showLegend,
          top: 0,
          right: 30,
          itemGap: 15,
          itemWidth: 12, // 设置宽度
          itemHeight: 12 // 设置高度
        }
      ],
      tooltip: {
        confine: true,
        trigger: 'axis',
        formatter: (params) => {
          params = params.filter(ele => {
            if (ele.data && typeof ele.data === 'object' && ele.data.symbol === 'none') {
              return false
            }
            if (ele.value !== undefined) {
              return true
            }
            return false
          })
          return `<span>${params[0].axisValueLabel}</span><br />` + params.map((ele, index) => {
            return `${ele.marker}<span>${ele.seriesName}：</span><span>${ele.value === null ? '-' : ele.value}${Array.isArray(unit) ? unit[index] : unit}</span>`
          }).join('<br />')
        }
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
          axisLabel: {
            color: '#000',
            interval: 0,
            align: 'center',
            margin: dataLen >= 10 ? 30 : 8,
            rotate: dataLen >= 10 ? 30 : 0,
            formatter(value) {
              if (value.length > showLabelLen) {
                return value.slice(0, showLabelLen) + '...'
              } else {
                return value
              }
            }
          },
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0.15)',
              type: 'dashed'
            }
          }
        }
      ],
      series: series
    }
  } else {
    return {
      title: {
        text: '暂无数据',
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: 32,
          fontWeight: 'normal',
          color: '#666666'
        }
      }
    }
  }
}

/**
 * 水滴球
 * @method waterDropOption
 * @param data
 * @param unit
 * @param text
 * @return object
 */
export const waterDropOption = (data, unit = '%', text = '完成率') => {
  const title = data === null ? '-' : data
  return {
    title: {
      text: title + unit,
      textStyle: {
        fontSize: 42,
        fontFamily: 'DINCondensed-Bold',
        fontWeight: '600',
        color: '#3DF9FF',
        rich: {
          a: {
            fontSize: 28
          }
        }
      },
      x: 'center',
      y: '35%'
    },
    graphic: [
      {
        type: 'group',
        left: 'center',
        top: '63%',
        children: [
          {
            type: 'text',
            z: 100,
            left: '10',
            top: 'midle',
            style: {
              fill: '#fff',
              text: '完成率',
              font: '16px Microsoft YaHei'
            }
          }
        ]
      }
    ],
    series: [
      {
        type: 'liquidFill',
        name: text, // 系列名称，用于tooltip的显示，legend 的图例筛选
        radius: '70%', // 水球图的半径
        center: ['50%', '50%'], // 水球图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
        // 水填充图的形状 circle 默认圆形  rect 圆角矩形  triangle 三角形
        // diamond 菱形  pin 水滴状 arrow 箭头状  还可以是svg的path
        shape: 'circle',
        phase: 0, // 波的相位弧度 不设置  默认自动
        direction: 'right', // 波浪移动的速度  两个参数  left 从右往左 right 从左往右
        outline: {
          borderDistance: 0,
          itemStyle: {
            borderWidth: 2,
            borderColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(1,179,226,1)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(50,115,233, .75)'
                },
                {
                  offset: 1,
                  color: 'rgba(50,115,233, 1)'
                }
              ],
              globalCoord: false
            }
          }
        },
        // 图形样式
        itemStyle: {
          color: 'rgba(1,179,226,1)', // 水球显示的背景颜色
          opacity: 0.4, // 波浪的透明度
          shadowBlur: 10 // 波浪的阴影范围
        },
        backgroundStyle: {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 1,
                color: 'rgba(0,24,55, 0)'
              },
              {
                offset: 1,
                color: 'rgba(1,179,226,1)'
              },
              {
                offset: 1,
                color: 'rgba(1,179,226,1)'
              }
            ],
            globalCoord: false
          }
        },
        // 图形的高亮样式
        emphasis: {
          itemStyle: {
            opacity: 0.8 // 鼠标经过波浪颜色的透明度
          }
        },
        // 图形上的文本标签
        label: {
          show: false
        },
        data: [data / 100] // 系列中的数据内容数组
      }
    ]
  }
}

// bar，y轴是柱状图
export const yBarOption = (unit = '', yAxisData = [], seriesName = '', seriesData = [], title) => {
  if (seriesData.length) {
    return {
      color: ['#3189FF'],
      tooltip: {
        confine: true,
        trigger: 'axis',
        formatter: (params) => {
          params = params.filter(ele => {
            if (ele.data && typeof ele.data === 'object' && ele.data.symbol === 'none') {
              return false
            }
            if (ele.value !== undefined) {
              return true
            }
            return false
          })
          return `<span>${params[0].axisValueLabel}</span><br />` + params.map((ele, index) => {
            return `${ele.marker}<span>工单数：</span><span>${ele.value + (Array.isArray(unit) ? unit[index] : unit)}</span>`
          }).join('<br />')
        }
      },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {
      //       name: seriesName,
      //       backgroundColor: 'transparent',
      //       iconStyle: {
      //         borderWidth: 3
      //       }
      //     }
      //   }
      // },
      grid: {
        top: 25,
        right: 20,
        bottom: 0,
        left: 0,
        containLabel: true
      },
      legend: {
        show: false
      },
      xAxis: [
        {
          type: 'value',
          max: (value) => {
            return value.max * (1.5).toFixed(0)
          },
          minInterval: 1,
          axisLabel: {
            interval: 0
          },
          splitLine: {
            lineStyle: {
              color: '#E5E5E5',
              type: 'dashed'
            }
          },
          axisPointer: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          data: yAxisData,
          axisLabel: {
            interval: 0,
            align: 'right',
            formatter(value) {
              if (value.length > 6) {
                return value.slice(0, 6) + '...'
              } else {
                return value
              }
            }
            // 文本超出换行
            // formatter(value) {
            //   const valArr = []
            //   while (value.length) {
            //     valArr.push(value.slice(0, 5))
            //     value = value.slice(5)
            //   }
            //   return valArr.join('\n')
            // }
          }
        }
      ],
      series: [
        {
          name: seriesName,
          data: seriesData,
          barWidth: 14, // 柱体的宽度
          type: 'bar',
          label: {
            show: false,
            position: 'right'
          }
        }
      ]
    }
  } else {
    return {
      title: {
        text: '暂无数据',
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: 32,
          fontWeight: 'normal',
          color: '#666666'
        }
      }
    }
  }
}

/**
 * 饼图
 * @method pieOption
 * @param seriesData {Array}
 * @param pieType {String} circle：饼图，ring：环形图
 * @param unit {Array | String}
 * @return object
 */
export const pieOption = (unit = '', seriesData = [], pieType, title) => {
  let total = null
  if (seriesData.length) {
    if (pieType === 'ring') {
      total = seriesData.reduce((pre, cur) => (pre += cur.value), 0)
    }
    return {
      color: [
        '#1890FF',
        '#26c9c3',
        '#95DE64',
        '#FFC53D',
        '#5470c6',
        '#91cc75',
        '#f1a90d',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc'
      ],
      // legend: [
      //   {
      //     show: true,
      //     icon: 'circle',
      //     bottom: 0,
      //     left: 'center',
      //     itemGap: 15,
      //     itemWidth: 12, // 设置宽度
      //     itemHeight: 12 // 设置高度
      //   }
      // ],
      tooltip: {
        confine: true,
        trigger: 'item',
        formatter: (params) => {
          return `${params.marker}<span>${params.name}：</span><br /><span>${params.value + unit}</span><span style="margin-left: 15px">${params.data.percentage}%</span>`
        }
      },
      title: [
        {
          text: pieType === 'ring' ? `{c|${total}}` + '\n\n' + `{b|${title}}` : '',
          top: '41%',
          left: '34%',
          textAlign: 'center',
          textStyle: {
            rich: {
              c: {
                color: '#333333',
                fontSize: 20,
                fontWeight: 700,
                align: 'center'
              },
              b: {
                color: '#666', fontSize: 14, align: 'center', padding: [0, 0, 8, 0]
              }
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
      // toolbox: {
      //   feature: {
      //     saveAsImage: {
      //       name: title,
      //       backgroundColor: 'transparent',
      //       iconStyle: {
      //         borderWidth: 3
      //       }
      //     }
      //   }
      // },
      series: [
        {
          type: 'pie',
          radius: '50%',
          center: ['50%', '47%'],
          data: seriesData,
          avoidLabelOverlap: true,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            alignTo: 'edge',
            // formatter: '{name|{b}}\n{time|{@data.percentage}%}',
            formatter: (params) => {
              return `${params.name}\n${params.data.percentage}%`
            },
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            rich: {
              time: {
                fontSize: 10,
                color: '#999'
              }
            }
          },
          labelLine: {
            length: 15,
            length2: 0,
            maxSurfaceAngle: 80
          },
          labelLayout: (params) => {
            const isLeft = params.labelRect.x < 180
            const points = params.labelLinePoints
            points[2][0] = isLeft
              ? params.labelRect.x
              : params.labelRect.x + params.labelRect.width
            return {
              labelLinePoints: points
            }
          }
        }
      ]
    }
  } else {
    return {
      title: {
        text: '暂无数据',
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: 32,
          fontWeight: 'normal',
          color: '#666666'
        }
      }
    }
  }
}
