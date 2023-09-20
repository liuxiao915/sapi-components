<template>
    <div class="chart-bar-line-wrap">
        <chart-content-box :option="chartOption"></chart-content-box>
    </div>
</template>

<script>
import chartContentBox from './echart-content-box.vue'
import { merge } from 'lodash'
export default {
    name: 'echart-multi-bar',
    components: {
        chartContentBox
    },
    props:{
        data: {
            type: Array,
            default () {
                return []
            }
        },
        yAxisData: {
            type: Array,
            default() {
                return [];
            }
        },
        legendOpt: Object,
        xAxisOpt: Object,
        yAxisOpt: Object,
        option: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
        }
    },
    computed: {
        chartOption() {
            const legendData = this.data.map(bar => ({name: bar.name, icon: bar.icon || 'rect'}))
            const seriesData = this.data.map(bar => {
                const barOption = {
                    name: '',
                    type: 'bar',
                    barWidth: 20,
                    barGap: 0,
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: [],
                    itemStyle: {}
                }
                return merge(barOption, bar)
            })
            const option = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        shadowStyle: {
                            opacity: 0.3,
                            color: 'rgba(0, 0, 0, 0.2)'
                        }
                    },
                    alwaysShowContent: false,
                    triggerOn: 'mousemove|click',
                    backgroundColor: 'rgba(255,255,255,1)',
                    extraCssText: 'box-shadow: 0 1px 2px 0 rgba(0,0,0,0.20)',
                    textStyle: {
                        fontSize: 12,
                        color: '#3F454B',
                    },
                },
                legend: merge({
                    data: legendData,
                    bottom: '0',
                    itemHeight: 8,
                    itemWidth: 8,
                    icon: 'rect',
                    textStyle: {
                        color: '#606972',
                        fontSize: 12
                    }
                }, this.legendOpt),
                grid: {
                    top: '10',
                    left: '10',
                    right: '30',
                    bottom: '30',
                    containLabel: true
                },
                xAxis: merge({
                    type: 'value',
                    max: function (value) {
                        if (value.max % 10 === 0) {
                            return value.max + 10
                        }
                        return (Math.ceil(value.max / 10) - 1) * 10 + 10;
                    },
                    splitNumber: 5,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#A0A4AA',
                        formatter: '{value}亿',
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(65,97,128,0.15)'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'solid',
                            color: 'rgba(65,97,128,0.15)'
                        }
                    }
                },this.xAxisOpt),
                yAxis: merge({
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#69717A' 
                    },
                    axisLine: {
                        show: false,
                    },
                    type: 'category',
                    data: this.yAxisData,
                },this.yAxisOpt),
                series: seriesData
            }
            return merge(option, this.option);
        }
    }
}
</script>

<style lang="less" scoped>
.chart-bar-line-wrap {
    width: 100%;
    height: 205px;
    display: flex;
}
</style>