<template>
    <div class="chart-pie-wrap">
        <chart-content-box :option="chartOption"></chart-content-box>
    </div>
</template>
<script>
import chartContentBox from './chart-content-box.vue'
import merge from 'lodash.merge'

export default {
    components: {
        chartContentBox
    },
    props: {
        showTitle: {
            type: Boolean,
            default: true
        },
        showSubTitle: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ''
        },
        unit: {
            type: String,
            default: ''
        },
        pieOption: {
            type: Object,
            default () {
                return {
                    data: []
                }
            }
        },
        props: {
            type: Object,
            default () {
                return {
                    value: 'value',
                    name: 'name'
                }
            }
        },
         showScale: {
            type: Boolean,
            default: true
         },
        colors: {
            type: Array,
            default () {
                return []
            }
        },
    },
    data () {
        return {

        }
    },
    computed: {
        chartOption () {
            var _this = this
            const baseOption = {
                type: 'pie',
                center: ['50%', '40%'],
                radius: ['40%', '55%'],
                data: [],
                label: this.pieOption.label || {show:true},
                emphasis: {
                    scale: false,
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }

            merge(baseOption, this.pieOption, {
                data: (this.pieOption.data || []).map(ele => {
                    return {
                        ...ele,
                        value: ele[this.props.value],
                        name: ele[this.props.name]
                    }
                })
            })
            const count = baseOption.data.reduce((prev, next) => prev + next.value, 0)
            var legend = {
                bottom: 0,
                left: 'center',
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
            }
            merge(legend,this.pieOption.legend)
            var title={
                show: this.showTitle,
                text: this.title,
                subtext: this.showSubTitle ? `${count.toFixed(2)}${this.unit}` : '',
                // subtext: 2022.22+ '亿',
                top: '30%',
                left: 'center',
                textStyle: {
                    color: '#505254',
                    fontSize: 12
                },
                subtextStyle: {
                    color: '#1D2023',
                    fontSize: 14
                }
            }
            merge(title,this.pieOption.title)
            return {
                grid: {
                    containLabel: true
                },
                legend: legend,
                title: title,
                label: {
                    formatter(params){
                        return _this.showScale ? 
                            _this.$utils.toThousands(params.value, 2) + _this.unit + '(' + params.percent.toFixed(2) + '%)' :
                            _this.$utils.toThousands(params.value, 2) + _this.unit
                    },
                    color: '#000000'
                },
                tooltip: {
                    trigger: 'item',
                    confine: true,
                    formatter(params){
                        return `<span>${params.seriesName}</span><br />` + `${params.marker}<span>${params.name}：</span><span>${_this.$utils.toThousands(params.value, 2) + _this.unit}</span>`
                    }
                },
                series: [
                    baseOption
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