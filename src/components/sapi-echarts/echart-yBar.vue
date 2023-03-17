<template>
    <div class="chart-pie-wrap">
        <chart-content-box :option="chartOption"></chart-content-box>
    </div>
</template>
<script>
import chartContentBox from './echart-content-box.vue'
import merge from 'lodash.merge'

export default {
    name: 'echart-yBar',
    components: {
        chartContentBox
    },
    props: {
        yBarOption: {
            type: Object,
            default () {
                return {}
            }
        },
        barData: {
            type: Array,
            default () {
                return []
            }
        },
        yAxisData: {
            type: Array,
            default (){
                return []
            }
        },
        total: {
            type: Boolean,
            default () {
                return false
            }
        }
    },
    data () {
        return {

        }
    },
    computed: {
        chartOption () {
            const legendData = []
            this.barData.forEach(item => {
                legendData.push(item.name)
            })
            const legend= {
                data: legendData,
                bottom: 0,
                itemHeight: 8,
                itemWidth: 8,
                textStyle: {
                    fontSize: 12
                }
            }
            merge(legend, this.yBarOption.legend)
            const grid= {
                left: 5,
                right: 10,
                top: 0,
                bottom: 25,
                containLabel: true
            }
            merge(grid, this.yBarOption.grid)
            if(this.total){
                let obj = {}
                this.barData.forEach((item, index) => {
                    this.$set(obj, 'arr'+index,item.data)
                })
                function isBlank(val){
                    if(val == null || val == ""){
                        return true;
                    }
                }
                var result = [];  
                for(var key in obj){
                    obj[key].forEach((value,index)=>{
                        if( isBlank(result[index])){
                            result[index] = 0 ;
                        }
                        result[index] += value ;
                    })
                }
                 
                this.barData.push({
                    name: '总计',
                    type: 'bar',
                    stack: '',
                    barWidth : 30,
                    label: {                 
                        normal: {
                            show: true, 
                            position: 'right',   
                            formatter: '{c}',
                            textStyle: { color: '#000' } 
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(128, 128, 128, 0)'
                        }
                    },
                    z: -1,
                    barGap: '-100%',  
                    data: result
                })
            }
            const barSeriesData = this.barData.map(bar => {
                const barOption = {
                    name: 'Direct',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: []
                }
                return merge(barOption, bar)
            })
            var tooltip = {
                trigger: 'axis',
                confine: true,
                axisPointer: {
                    type: 'shadow'
                },
            }
            merge(tooltip, this.yBarOption.tooltip)
            return {
                xAxis: {
                    type: 'value',
                    // show:this.yBarOption.xAxis && this.yBarOption.xAxis.show || false,
                    splitLine:{
                        show: false
                　　},
                    axisLine: {
                        show:false,
                        lineStyle: {
                            color: 'rgba(65,97,128,0.15)'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        color: '#A0A4AA',
                        fontSize: 12,
                    },
                },
                tooltip: tooltip,
                grid: grid,
                legend: legend,
                dataZoom: this.yBarOption.dataZoom ? this.yBarOption.dataZoom : [],
                yAxis: {
                    type: 'category',
                    data: this.yAxisData,
                    axisTick: {
                        alignWithLabel: true
                    },
                    splitLine:{
                　　　　show:false
                　　},
                    axisLabel: {
                        interval: 0,
                        color: '#A0A4AA',
                        fontSize: 12,
                        formatter (value) {
                            let valArr = []
                            while (value.length) {
                                valArr.push(value.slice(0, 8))
                                value = value.slice(8)
                            }
                            return valArr.join('\n')
                        }
                    },
                    axisLine:{
                        show:true,
                        lineStyle:{
                            color:'#A0A4AA'
                        }
                    }
                },
                series: [
                    ...barSeriesData
                ]
            }
        }
    }
}
</script>

<style lang="less" scoped>
.chart-pie-wrap {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>