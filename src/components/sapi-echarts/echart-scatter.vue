<template>
    <div class="chart-bar-line-wrap">
        <chart-content-box :option="chartOption"></chart-content-box>
    </div>
</template>
<script>
import chartContentBox from './echart-content-box.vue'
import merge from 'lodash.merge'

export default {
    name: 'echart-scatter',
    components: {
        chartContentBox
    },
    props: {
        option: {
            type: Object,
            default () {
                return {}
            }
        },
    },
    data () {
        return {

        }
    },
    computed: {
        chartOption () {
            var xAxis = {
                    splitLine:{
                    show: false
            　　},
                axisLine: {
                    lineStyle: {
                        color: 'rgba(65,97,128,0.15)'
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: '#A0A4AA',
                    fontSize: 12,
                },
                nameLocation:'end',
            }
            merge(xAxis,this.option.xAxis)
            var yAxis= {
                type: 'value',
                axisTick: {
                    show: false
                },
                splitLine:{
                    show:true,
                    lineStyle: {
                        type: 'solid',
                        color: 'rgba(65,97,128,0.15)'
                    }
            　　},
                axisLabel: {
                    interval: 0,
                    color: '#A0A4AA',
                    fontSize: 12,
                    formatter: '{value}'
                },
                axisLine:{
                    show:false,
                    lineStyle:{
                        color:'rgba(65,97,128,0.15)'
                    }
                },
            }
            merge(yAxis,this.option.yAxis)
            var tooltip = {
                trigger: 'item',
            }
            merge(tooltip,this.option.tooltip)
            var grid = {
                left: 5,
                right: 5,
                top: 25,
                bottom: 5,
                containLabel: true
            }
            merge(grid,this.option.grid)
            return {
                tooltip: tooltip,
                grid: grid,
                legend: {
                    bottom: 0,
                    itemHeight: 8,
                    itemWidth: 8,
                    textStyle: {
                        color: '#606972',
                        fontSize: 12
                    },
                    data:[]
                },
                xAxis: xAxis,
                yAxis: yAxis,
                series: this.option.series
            }
        }
    },
}
</script>
<style lang="less" scoped>
.chart-bar-line-wrap {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>
