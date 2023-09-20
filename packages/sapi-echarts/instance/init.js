import merge from 'lodash.merge'

export function initMixin (Chart) {
    // 暂未支持dataset计算
    Chart.prototype.$getBaseOption = function (option) {
        const chartOption = {
            tooltip: this._getTooltip(option.tooltip),
            grid: {},
            legend: {},
            xAxis: [],
            yAxis: []
        }
        let isReverse = false
        // 初始化配置项
        chartOption.series = this._initSeriesOption(option.series)
        if (option.xAxis && option.xAxis[0] && option.xAxis[0].type === 'value') {
            isReverse = true
            // 根据yAxisIndex创建x轴
            chartOption.yAxis = this._initXAxisOption(chartOption.series, option.yAxis, isReverse)
            // 根据xAxisIndex创建y轴
            chartOption.xAxis = this._initYAxisOption(chartOption.series, 'xAxisIndex')
        } else {
            isReverse = false
            // 根据xAxisIndex创建x轴
            chartOption.xAxis = this._initXAxisOption(chartOption.series, option.xAxis, isReverse)
            // 根据yAxisIndex创建y轴
            chartOption.yAxis = this._initYAxisOption(chartOption.series, 'yAxisIndex')
        }
        // 根据Y轴数量控制grid默认间距
        chartOption.grid = this._getGrid(option.legend, isReverse)
        merge(chartOption, option)
        // 处理分割
        const delimiterFlag = chartOption.series.some(data => data.delimiter)
        if (delimiterFlag) {
            chartOption.series = this._delimitSeriesData(chartOption.series)
            chartOption.series = this._initSeriesOption(chartOption.series)
        }
        // 设置legend默认data
        chartOption.legend = merge(this._getLegend(chartOption.series), option.legend)
        // 删除不属于echarts的属性
        delete chartOption.tooltip.formatType
        return chartOption
    }
}