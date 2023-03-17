<template>
    <div class="chart-reach-box" :style="{background: bgColor,width: '100%'}" :class="scene">
        <div class="chart-reach" ref="chartBox" style="width: 100%">
            <chart-content-box :option="chartOption"></chart-content-box>
        </div>
    </div>
</template>
<script>
import ChartContentBox from './echart-content-box.vue'
import merge from 'lodash.merge'

export default {
    name: 'echart-reach',
    components: {
        ChartContentBox
    },
    props: {
        // 使用场景 （图表：chart、大屏：screen）
        scene: {
            type: String
        },
        title: {
            type: String,
            default: ''
        },
        rate: {
            required: true
        },
        // 饼图配置
        pieOption: {
            type: Object,
            default () {
                return {}
            }
        },
        // 背景颜色
        bgColor: {
            type: String,
            default: '#fff'
        },
        // 单位
        unit: {
            type: String,
            default: '%'
        },
        toFixedNum: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            
        }
    },
    computed: {
        chartOption () {
            let rate = 0
            if (typeof this.rate === 'number') {
                rate = this.rate
            }
            let pieData = []
            if (this.unit == '%' && rate < 100) {
                pieData = [
                    {
                        value: rate
                    },
                    {
                        value: (100 - rate).toFixed(2),
                        itemStyle: {
                            color: this.scene === 'screen' ? '#f0f0f0' : '#eeeeee'
                        }
                    }
                ]
                if(rate < 0) {
                    pieData = [
                        {
                            value: 0
                        },{
                            value: 100,
                            itemStyle: {
                                color: this.scene === 'screen' ? '#f0f0f0' : '#eeeeee'
                            }
                        }
                    ]
                }
            } else {
                pieData = [{ value: 100 }]
            }
            const pieOption = {
                silent: true,
                center: ['50%', '50%'],
                radius: ['70%', '95%'],
                label: {
                    show: false
                },

                type: 'pie',
                data: pieData
            }
            merge(pieOption, this.pieOption)

            return {
                legend: {
                    show: false
                },
                title: {
                    text: this.title,
                    subtext: `${Number(rate).toFixed(this.toFixedNum)}${this.unit}`,
                    top: '30%',
                    left: 'center',
                    textStyle: {
                        color: this.scene === 'screen' ? '#90a0ae' : '#333',
                        fontSize: 12
                    },
                    subtextStyle: {
                        color: this.scene === 'screen' ? '#90a0ae' : '#333',
                        fontSize: 16
                    }
                },
                series: [
                    pieOption
                ]
            }
        }
    },
    mounted () {
        
    }
}
</script>
<style lang="less" scoped>
.chart-reach-box {
    width: 100%;
    height: 100%;
    display: flex;
}
.chart-reach {
    height: 100%;
    flex-shrink: 0;
}
</style>
