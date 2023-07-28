<template>
  <div class="dashboard-container">
    <div class="map-c">
      <div class="map-title">echarts深圳市地图</div>
      <select v-model="areaCode" size="mini" class="map-selector" placeholder="深圳市" @change="changeAreaCode">
        <option v-for="item in areaCodList" :key="item.code" :label="item.name" :value="item.code" />
      </select>
      <div id="szMap" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import szMapData from './szMapData/440300.json'
import dapengMapData from './szMapData/440301.json'
import luohuMapData from './szMapData/440303.json'
import futianMapData from './szMapData/440304.json'
import nanshanMapData from './szMapData/440305.json'
import baoanMapData from './szMapData/440306.json'
import longgangMapData from './szMapData/440307.json'
import yantianMapData from './szMapData/440308.json'
import longhuaMapData from './szMapData/440309.json'
import pingshanMapData from './szMapData/440310.json'
import guangmingMapData from './szMapData/440311.json'
import shenshanMapData from './szMapData/440312.json'
import lightLoop from '@/assets/images/mars3d/yellow.png'

export default {
  name: 'Dashboard',
  data: function () {
    const getData = function (id) {
      const data = {
        1: { count: 100 },
        2: { count: 200 },
        3: { count: 300 }
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(data[id] || [])
        }, 300)
      })
    }
    let points = [
      {
        value: [118.8062, 31.9208],
        itemStyle: {
          color: "#4ab2e5",
        },
      },
      {
        value: [127.9688, 45.368],
        itemStyle: {
          color: "#4fb6d2",
        },
      },
      {
        value: [110.3467, 41.4899],
        itemStyle: {
          color: "#52b9c7",
        },
      },
      {
        value: [125.8154, 44.2584],
        itemStyle: {
          color: "#5abead",
        },
      },
      {
        value: [116.4551, 40.2539],
        itemStyle: {
          color: "#f34e2b",
        },
      },
      {
        value: [123.1238, 42.1216],
        itemStyle: {
          color: "#f56321",
        },
      },
      {
        value: [114.4995, 38.1006],
        itemStyle: {
          color: "#f56f1c",
        },
      },
      {
        value: [117.4219, 39.4189],
        itemStyle: {
          color: "#f58414",
        },
      },
      {
        value: [112.3352, 37.9413],
        itemStyle: {
          color: "#f58f0e",
        },
      },
      {
        value: [109.1162, 34.2004],
        itemStyle: {
          color: "#f5a305",
        },
      },
      {
        value: [103.5901, 36.3043],
        itemStyle: {
          color: "#e7ab0b",
        },
      },
      {
        value: [106.3586, 38.1775],
        itemStyle: {
          color: "#dfae10",
        },
      },
      {
        value: [101.4038, 36.8207],
        itemStyle: {
          color: "#d5b314",
        },
      },
      {
        value: [103.9526, 30.7617],
        itemStyle: {
          color: "#c1bb1f",
        },
      },
      {
        value: [108.384366, 30.439702],
        itemStyle: {
          color: "#b9be23",
        },
      },
      {
        value: [113.0823, 28.2568],
        itemStyle: {
          color: "#a6c62c",
        },
      },
      {
        value: [102.9199, 25.46639],
        itemStyle: {
          color: "#96cc34",
        },
      },
      {
        value: [119.4543, 25.9222],
      },
    ];
    return {
      echart: null,
      areaCode: 440300,
      areaCodList: [ // 深圳各区code
        { code: 440300, name: '深圳市' },
        { code: 440301, name: '大鹏新区' },
        { code: 440303, name: '罗湖区' },
        { code: 440304, name: '福田区' },
        { code: 440305, name: '南山区' },
        { code: 440306, name: '宝安区' },
        { code: 440307, name: '龙岗区' },
        { code: 440308, name: '盐田区' },
        { code: 440309, name: '龙华区' },
        { code: 440310, name: '坪山区' },
        { code: 440311, name: '光明区' },
        { code: 440312, name: '深汕合作区' }
      ],
      option: { // 地图配置
        // tooltip: {
        //   show: true,
        //   trigger: 'item',
        //   triggerOn: 'mousemove',
        //   formatter: function (params, ticket, callback) {
        //     getData(params.data.id).then(cData => {
        //       callback(ticket, `
        //         <div class="map-item-detail">
        //           <div class="title">${params.data.name || ''}</div>
        //           <div class="text">人数：<span class="val">${cData.count || ''}</span></div>
        //         </div>
        //       `)
        //     })
        //     return 'loading...'
        //   }
        // },
        geo: {
          map: "city",
          aspectScale: 0.75, //长宽比
          zoom: 1.1,
          roam: false,
          itemStyle: {
            areaColor: '#2D85E1',
            shadowColor: "rgb(58,115,192)",
            shadowOffsetX: 10,
            shadowOffsetY: 11,
          },
          emphasis: {
            itemStyle: {
              areaColor: "#2AB8FF",
              borderWidth: 0,
              color: "green",
            },
            label: {
              show: false,
            }
          },
          select: {
            itemStyle: {
              areaColor: "#2AB8FF",
              borderWidth: 0,
              color: "green",
            }
          }
        },
        series: [
          {
            type: "map",
            map: "city",
            roam: false,
            zoom: 1.1,
            label: {
              show: true,
              color: "#1DE9B6"
            },
            itemStyle: {
              borderColor: "rgb(147, 235, 248)",
              borderWidth: 1,
              areaColor: '#2D85E1'
            },
            emphasis: {
              label: {
                color: "rgb(183,185,14)",
              },
              itemStyle: {
                areaColor: "rgb(46,229,206)",
                borderWidth: 0.1
              }
            },
            select: {
              itemStyle: {
                areaColor: "#2AB8FF",
                borderWidth: 0,
                color: "green",
              }
            }
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            showEffectOn: "render",
            zlevel: 1,
            rippleEffect: {
              period: 15,
              scale: 4,
              brushType: "fill",
            },
            emphasis: {},
            label: {
              formatter: "{b}",
              position: "right",
              offset: [15, 0],
              color: "#1DE9B6",
              show: true,
            },
            itemStyle: {
              color: "#1DE9B6",
              shadowBlur: 10,
              shadowColor: "#333",
            },
            symbolSize: 12,
            data: points,
          }, //地图线的动画效果
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 7, //图标大小
            },
            lineStyle: {
              color: "#1DE9B6",
              width: 1, //线条宽度
              opacity: 0.1, //尾迹线条透明度
              curveness: 0.3, //尾迹线条曲直度
            },
            data: [
              {
                coords: [
                  [118.8062, 31.9208],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#4ab2e5",
                },
              },
              {
                coords: [
                  [127.9688, 45.368],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#4fb6d2",
                },
              },
              {
                coords: [
                  [110.3467, 41.4899],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#52b9c7",
                },
              },
              {
                coords: [
                  [125.8154, 44.2584],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#5abead",
                },
              },
              {
                coords: [
                  [116.4551, 40.2539],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#f34e2b",
                },
              },
              {
                coords: [
                  [123.1238, 42.1216],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#f56321",
                },
              },
              {
                coords: [
                  [114.4995, 38.1006],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#f56f1c",
                },
              },
              {
                coords: [
                  [117.4219, 39.4189],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#f58414",
                },
              },
              {
                coords: [
                  [112.3352, 37.9413],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#f58f0e",
                },
              },
              {
                coords: [
                  [109.1162, 34.2004],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#f5a305",
                },
              },
              {
                coords: [
                  [103.5901, 36.3043],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#e7ab0b",
                },
              },
              {
                coords: [
                  [106.3586, 38.1775],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#dfae10",
                },
              },
              {
                coords: [
                  [101.4038, 36.8207],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#d5b314",
                },
              },
              {
                coords: [
                  [103.9526, 30.7617],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#c1bb1f",
                },
              },
              {
                coords: [
                  [108.384366, 30.439702],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#b9be23",
                },
              },
              {
                coords: [
                  [113.0823, 28.2568],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#a6c62c",
                },
              },
              {
                coords: [
                  [102.9199, 25.46639],
                  [119.4543, 25.9222],
                ],
                lineStyle: {
                  color: "#96cc34",
                },
              },
            ],
          },
        ]
      }
    }
  },
  mounted() {
    this.renderSzMap()
  },
  created() {
    echarts.registerMap('city', szMapData)
  },
  methods: {
    // 渲染深圳地图
    renderSzMap() {
      // this.option.series = this.getSzMapSeries()
      this.echart = echarts.init(document.getElementById('szMap'))
      this.echart.setOption(this.option)
      window.onresize = function () {
        this.echart && this.echart.resize()
      }
    },
    // 地图落点
    getSzMapSeries() {
      const seriesList = [
        {
          name: 's1',
          data: [
            { id: 1, name: 'test1', areaCode: 440304, value: [114.05096, 22.541009] },
            { id: 2, name: 'test2', areaCode: 440303, value: [114.13166, 22.54836] },
            { id: 3, name: 'test3', areaCode: 440307, value: [114.24779, 22.71991] }
          ]
        }
      ]

      return seriesList.map(sData => {
        return {
          type: 'scatter',
          roam: false,
          name: sData.name,
          coordinateSystem: 'geo',
          data: this.areaCode === 440300 ? sData.data : sData.data.filter(item => this.areaCode === item.areaCode),
          symbol: (params) => ('image://' + lightLoop), // 图标
          z: 2,
          symbolSize: [20, 20] // symbols图标大小
        }
      })
    },
    // 切换区域
    changeAreaCode() {
      const areaCodeMapDataKeyBy = {
        440300: szMapData,
        440301: dapengMapData,
        440303: luohuMapData,
        440304: futianMapData,
        440305: nanshanMapData,
        440306: baoanMapData,
        440307: longgangMapData,
        440308: yantianMapData,
        440309: longhuaMapData,
        440310: pingshanMapData,
        440311: guangmingMapData,
        440312: shenshanMapData
      }

      echarts.registerMap('city', areaCodeMapDataKeyBy[this.areaCode] || szMapData)
      this.option.geo.zoom = areaCodeMapDataKeyBy[this.areaCode] && this.areaCode === 440300 ? 1.1 : 1.2
      this.option.series[0].zoom = areaCodeMapDataKeyBy[this.areaCode] && this.areaCode === 440300 ? 1.1 : 1.2
      this.echart.setOption(this.option)
    }
  }
}
</script>
<style lang="less" scoped>
.map-c {
  position: relative;
  background-color: #EFF9F8;
  .map-title {
    text-align: center;
    padding: 20px;
    font-size: 22px;
    font-weight: 500;
  }

  .map-selector {
    position: absolute;
    z-index: 99;
    top: 30px;
    right: 20px;
    width: 120px;

    .el-input {
      width: 120px !important;

      input {
        height: 22px;
        line-height: 22px;
      }
    }
  }

  #szMap {
    width: 100%;
    height: 750px;

    .map-item-detail {
      .title {
        font-size: 16px;
        color: #333333;
        font-weight: 500;
        margin-bottom: 10px;
      }

      .text {
        font-size: 14px;
        color: #999;
        margin-bottom: 5px;
      }

      .val {
        font-size: 14px;
        color: #333;
      }
    }
  }
}
</style>