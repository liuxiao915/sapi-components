<template>
    <div class="chart-bar-line-wrap">
        <chart-content-box @finished="finished" :option="chartOption"></chart-content-box>
    </div>
</template>
<script>
import chartContentBox from './echart-content-box.vue'
import Chart from './instance'

export default {
    name: 'echart-bar-line',
    components: {
        chartContentBox
    },
    props: {
        option: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
        }
    },
    computed: {
        chartOption () {
            const chart = new Chart()
            const option = chart.$getBaseOption(this.option)
            return option
        }
    },
    methods: {
        finished () {
            this.$emit('finished')
        }
    }
}
</script>
<style lang="less" scoped>
.chart-bar-line-wrap {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>
