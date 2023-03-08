<template>
    <div class="chart-line-bar-wrap">
        <chart-content-box @finished="finished" :option="chartOption"></chart-content-box>
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
        xAxisData: {
            type: Array,
            default() {
                return [];
            }
        },
        oneLineOption: {
            type: Object,
            default () {
                return {
                    name: '',
                    data: []
                }
            }
        },
        anotherLineOption: {
            type: Object,
            default () {
                return {
                    name: '',
                    data: []
                }
            }
        },
        oneBarOption: {
            type: Object,
            default () {
                return {
                    name: '',
                    data: []
                }
            }
        },
        anotherBarOption: {
            type: Object,
            default () {
                return {
                    name: '',
                    data: []
                }
            }
        }
    },
    data () {
        return {
        }
    },
    computed: {
        chartOption () {
            function isEmpty(val) {
                return val !== null && val !== undefined && val !== ''
            }
            const $toThousands = this.$utils.toThousands;
            const oneLineOption = {
                type: 'line',
                yAxisIndex: 1,
                label: {
                    show: true,
                    color: '#333'
                },
                lineStyle: {
                    color: '#E67377',
                    width: 4
                },
                name: '',
                data: []
            };

            const anotherLineOption = {
                type: 'line',
                yAxisIndex: 1,
                symbol:'circle',
                symbolSize: 6,
                label: {
                    show: true,
                    color: '#333'
                },
                itemStyle: {
                    color: '#F3AF35',
                },
                lineStyle: {
                    color: '#F3AF35',
                    type: 'dotted',
                    width: 4
                },
                name: '',
                data: []
            };

            const oneBarOption = {
                type: 'bar',
                name: '',
                itemStyle: {
                    color: '#7F85F5'
                },
                barMaxWidth: 30,
                label: {
                    show: true,
                    color: '#333',
                    position: 'top',
                    formatter: function(params) {
                        return $toThousands(params.value)
                    }
                },
                data: []
            }

            const anotherBarOption = {
                type: 'bar',
                name: '',
                barGap: '-100%',
                itemStyle: {
                    color: '#19D4FA'
                },
                barMaxWidth: 30,
                label: {
                    show: true,
                    color: '#333',
                    position: 'top',
                    formatter: function(params) {
                        return $toThousands(params.value)
                    }
                },
                data: []
            }

            //计算最大值
            function calMax(arr) {
                arr = arr.filter(item => item !== null && item !== undefined && item !== '');
                if (!arr.length) {
                    return 0;
                }

                let max = Math.max(...arr)
                if (max < 5) {
                    return Math.ceil(max);
                }
                
                const submultiple = max / 5;
                if (submultiple > 5 && submultiple <= 10) {
                    return 5 * 10;
                } 

                const subLength = parseInt(submultiple).toString().length;
                return Math.ceil(submultiple / Math.pow(10, subLength - 1)) * Math.pow(10, subLength - 1) * 5
            }
            
            //计算最小值
            function calMin(arr) {
                arr = arr.filter(item => item !== null && item !== undefined && item !== '');
                if (!arr.length) {
                    return 0;
                }
                let min = Math.min(...arr)
                if (Math.abs(min) < 5) {
                    return Math.floor(min);
                }
                
                const submultiple = min / 5;
                if (submultiple < -5 && submultiple >= -10) {
                    return 5 * -10;
                } 

                const subLength = Math.abs(parseInt(submultiple)).toString().length;
                return Math.floor(submultiple / Math.pow(10, subLength - 1)) * Math.pow(10, subLength - 1) * 5
            }
            
            merge(oneLineOption, this.oneLineOption)
            merge(anotherLineOption, this.anotherLineOption)
            merge(oneBarOption, this.oneBarOption)
            merge(anotherBarOption, this.anotherBarOption)
            let Min1 = calMin([...oneLineOption.data, ...anotherLineOption.data]), Min2 = calMin([...oneBarOption.data, ...anotherBarOption.data]),
            Max1 = calMax([...oneLineOption.data, ...anotherLineOption.data]), Max2 = calMax([...oneBarOption.data, ...anotherBarOption.data]), baseInterval;

            if (Min1 >= 0 && Min2 >= 0) {
                baseInterval = 5;
                Min1 = 0;
                Min2 = 0;
            } else {
                baseInterval = 10;
                // Min1 = Math.abs(Min1) > Math.abs(Max1) ? -Math.abs(Min1) : -Math.abs(Max1)
                Min1 = -Math.abs(Min1)
                Max1 = Math.abs(Max1) > Math.abs(Min1) ? Math.abs(Max1) : Math.abs(Min1)
                // Min2 = Math.abs(Min2) > Math.abs(Max2) ? -Math.abs(Min2) : -Math.abs(Max2);
                Min2 = -Math.abs(Min2);
                Max2 = Math.abs(Max2) > Math.abs(Min2) ? Math.abs(Max2) : Math.abs(Min2);
            }

            anotherLineOption.data = Array.from({ length: this.xAxisData.length }, (item,index) => {
                if (index < oneLineOption.data.length - 1) {
                    return item;
                }

                if (index === oneLineOption.data.length - 1) {
                    return {
                        value: oneLineOption.data[oneLineOption.data.length - 1],
                        symbol: 'none', 
                        label: { 
                            show: false
                        }
                    }
                }

                return anotherLineOption.data[index - oneLineOption.data.length];
            })

            oneLineOption.data = Array.from({ length: this.xAxisData.length }, (item,index) => {
                if (oneLineOption.data[index] || oneLineOption.data[index] === 0) {
                    return oneLineOption.data[index];
                }
                return item;
            })

            anotherBarOption.data = Array.from({ length: this.xAxisData.length }, (item,index) => {
                if (index < oneBarOption.data.length) {
                    return item;
                }
                return anotherBarOption.data[index - oneBarOption.data.length];
            })

            oneBarOption.data = Array.from({ length: this.xAxisData.length }, (item,index) => {
                if (oneBarOption.data[index] || oneBarOption.data[index] === 0) {
                    return oneBarOption.data[index];
                }
                return item;
            })
            return {
                animation: false,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    },
                    formatter: function (params, ticket, callback) {
                        params = params.filter(ele => {
                            if (ele.data && typeof ele.data === 'object' && ele.data.symbol === 'none') {
                                return false;
                            }

                            if (ele.value !== undefined) {
                                return true;
                            }
                        })
                        return params.map(ele => {
                            return `${ele.marker}<span>${ele.seriesName}：</span><span>${ele.seriesType === 'line' ? ele.value + '%' : $toThousands(ele.value)}</span>`;
                        }).join('<br />')
                    }
                },
                grid: {
                    left: 60,
                    right: 60,
                    top: 60,
                    bottom: 20,
                },
                legend: {
                    icon: 'circle',
                    data: [oneBarOption.name, anotherBarOption.name, oneLineOption.name, anotherLineOption.name],
                    top: 0,
                    left: 0,
                    padding: [24, 0, 24, 60],
                    itemHeight: 12,
                    textStyle: {
                        fontSize: 12
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.xAxisData,
                        axisPointer: {
                            type: 'shadow'
                        },
                        splitLine:{
                    　　　　show:false
                    　　},
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        axisPointer: {
                            label: {
                                show: false
                            }
                        },
                        min: Min2,
                        max: Max2,
                        splitNumber: baseInterval,
                        interval: (Max2 - Min2) / baseInterval
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} %'
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        min: Min1,
                        max: Max1,
                        splitNumber: baseInterval,
                        interval: (Max1 - Min1) / baseInterval
                    }
                ],
                series: [
                    oneLineOption,
                    anotherLineOption,
                    oneBarOption,
                    anotherBarOption
                ]
            }
        }
    },
    methods: {
        finished() {
            this.$emit('finished')
        }
    }
}
</script>
<style lang="less" scoped>
.chart-line-bar-wrap {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>