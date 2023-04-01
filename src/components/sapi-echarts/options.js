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

// 饼图
export const pieOption = (list = [], titleTotal = '') => {
  const bgColor = '#fff'
  return {
    backgroundColor: bgColor,
    color: ['#40A9FF', '#45DAD1', '#73D13D', '#FFDD44'],
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        if (params.data.rate) {
          return `<div style="padding: 5px;font-size: 12px;color: #FFFFFF;font-family: PingFangSC-Regular;">
            ${params.marker}<span>${params.name}：</span><span>${toThousands(params.value)}${params.data.unit}</span>
            <span>${toThousands(params.data.proportion)}${params.data.percentage}</span>
          </div>`
        } else {
          return `<div style="padding: 5px;font-size: 12px;color: #FFFFFF;font-family: PingFangSC-Regular;">
            ${params.marker}<span>${params.name}：</span><span>${toThousands(params.value)}${params.data.unit}</span>
          </div>`
        }
      }
    },
    title: [
      {
        text: toThousands(titleTotal),
        subtext: '总个数',
        top: '35%',
        left: 'center',
        textStyle: {
          fontSize: 24,
          fontWeight: '500',
          color: '#333333'
        },
        subtextStyle: {
          fontSize: 14,
          fontWeight: '400',
          color: '#666666'
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
        radius: ['80%', '55%'],
        center: ['50%', '50%'],
        data: list,
        avoidLabelOverlap: true,

        itemStyle: {
          normal: {
            borderColor: bgColor,
            borderWidth: 2
          }
        },
        labelLine: {
          normal: {
            length: 20,
            length2: 100
          }
        },
        label: {
          normal: {
            show: false
          }
        }
      }
    ]
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