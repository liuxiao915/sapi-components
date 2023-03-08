<template>
    <div class="chart-bar-line-wrap">
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
        radarOption: {
            type: Object,
            default () {
                return {}
            }
        },
        radarData: {
            type: Array,
            default () {
                return []
            }
        },
        radar: {
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
            const baseOption = {
                type: 'radar',
                areaStyle: {},
                data: this.radarData
            }
            var tooltip = {
                trigger: 'item',
                confine: true,
            }
            merge(tooltip,this.radarOption.tooltip)
            return {
                tooltip: tooltip,
                legend: {
                    bottom: 0,
                    itemHeight: 8,
                    itemWidth: 8,
                    textStyle: {
                        color: '#606972',
                        fontSize: 12
                    },
                    data: this.radarData.map(item => {
                        return {
                            name: item.name,
                            icon: 'rect',
                        }
                    })
                },
                radar: this.radar,
                series: [baseOption]
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
