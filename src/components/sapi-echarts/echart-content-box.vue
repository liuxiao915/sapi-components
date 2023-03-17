<template>
    <div class="chart-content-box"></div>
</template>
<script>
import * as echarts from 'echarts'
import ResizeObserver from 'resize-observer-polyfill'
import merge from 'lodash.merge'

const debounce = function (fn, delay) {
    let timer = null
    const that = this
    return function () {
        const param = arguments
        if (timer) {
            window.clearTimeout(timer)
        }

        timer = window.setTimeout(function () {
            fn.apply(that, param)
        }, delay)
    }
}

export default {
    name: 'echart-content-box',
    props: {
        option: {
            type: Object,
            required: true
        },
        extendOption: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            doing: false
        }
    },
    watch: {
        option: {
            handler (val) {
                if (!this.chart || this.doing) return
                this.doing = true
                this.setOption()
            },
            immediate: true,
            deep: true
        },
        extendOption: {
            handler (val) {
                if (!this.chart || this.doing) return
                this.doing = true
                this.setOption()
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        setOption () {
            const option = merge({}, this.option, this.extendOption)
            this.chart.setOption(option, { notMerge: true })
            this.$emit('setChart', this.chart)
            this.chart.on('finished', () => {
                // console.log('finished')
                this.$emit('finished', true)
            });
            this.doing = false
            this.$nextTick(() => {
                this.resize()
            })
        },
        resize () {
            this.chart.resize({
                width: 'auto',
                height: 'auto'
            })
        }
    },
    async mounted () {
        // if (this.option && this.option.geo && this.option.geo.map === 'china') {
        //     await import('echarts/map/js/china')
        // }

        this.chart = echarts.init(this.$el)
        this.chart.on('click', (params) => {
            this.$emit('clickChart', params)
        });
        this.setOption()

        this.observer = new ResizeObserver(debounce(() => {
            this.resize()
        }, 300))
        this.observer.observe(this.$el)
        this.$nextTick(() => {
            this.$emit('readyed')
        })
    },
    beforeDestroy () {
        this.observer && this.observer.disconnect()
    }
}
</script>
<style lang="less" scoped>
.chart-content-box {
    width: 100%;
    height: 100%;
}
</style>
