import { BASE_SPLIT_NUMBER, calMax, calMin } from '../utils'

export function yAxisMixin (Chart) {
    Chart.prototype._getYAxis = function (seriesData, axisIndexKey) {
        const series = this._getSeriesMaxAndMinData(seriesData, axisIndexKey)
        const divideOption = this._divideYAxisMark(series.maxValArr, series.minValArr)
        return {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                color: '#A0A4AA' 
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid',
                    color: 'rgba(65,97,128,0.15)'
                }
            },
            axisPointer: {
                label: {
                    show: false
                }
            },
            ...divideOption
        }
    }

    // 初始化X轴配置项
    Chart.prototype._initYAxisOption = function (seriesData, axisIndexKey) {
        const ySeries = {}
        const yAxisData = []
        for (const item of seriesData) {
            if (ySeries[item[axisIndexKey] || 0]) {
                ySeries[item[axisIndexKey] || 0].push(item)
            } else {
                ySeries[item[axisIndexKey] || 0] = [item]
            }
        }
        let preYAxisoption = null
        const yKeys = Object.keys(ySeries)
        // 保持各轴刻度划分数量一致
        for (const yKey of yKeys) {
            const yAxisOption = this._getYAxis(ySeries[yKey], axisIndexKey)
            if (preYAxisoption) {
                const prePositiveSplitNumber = preYAxisoption.max / preYAxisoption.interval
                const preNegativeSplitNumber = Math.abs(preYAxisoption.min / preYAxisoption.interval)
                const nextPositiveSplitNumber = yAxisOption.max / yAxisOption.interval
                const nextNegativeSplitNumber = Math.abs(yAxisOption.min / yAxisOption.interval)
                // 计算使所有Y轴刻度划分 splitNumber 保持一致
                if (prePositiveSplitNumber > nextPositiveSplitNumber) {
                    yAxisOption.splitNumber = yAxisOption.splitNumber + prePositiveSplitNumber - nextPositiveSplitNumber
                    yAxisOption.max = prePositiveSplitNumber * yAxisOption.interval
                } else if (prePositiveSplitNumber < nextPositiveSplitNumber) {
                    preYAxisoption.splitNumber = preYAxisoption.splitNumber + nextPositiveSplitNumber - prePositiveSplitNumber
                    preYAxisoption.max = nextPositiveSplitNumber * preYAxisoption.interval
                }

                if (preNegativeSplitNumber > nextNegativeSplitNumber) {
                    yAxisOption.splitNumber = yAxisOption.splitNumber + preNegativeSplitNumber - nextNegativeSplitNumber
                    yAxisOption.min = -preNegativeSplitNumber * yAxisOption.interval
                } else if (preNegativeSplitNumber < nextNegativeSplitNumber) {
                    preYAxisoption.splitNumber = preYAxisoption.splitNumber + nextNegativeSplitNumber - preNegativeSplitNumber
                    preYAxisoption.min = -nextNegativeSplitNumber * preYAxisoption.interval
                }

            } else {
                preYAxisoption = yAxisOption
            }
            yAxisData.push(yAxisOption)
        }

        const data = yAxisData[0]
        if (data && data.splitNumber < 5) {
            const plusSplitNumber = Math.max(...yAxisData.map(item => item.max / item.interval))
            const negaSplitNumber = Math.max(...yAxisData.map(item => Math.abs(item.min / item.interval)))
            if (plusSplitNumber >= negaSplitNumber) {
                for (const item of yAxisData) {
                    item.max = item.max + (BASE_SPLIT_NUMBER - item.splitNumber) * item.interval
                    item.splitNumber = BASE_SPLIT_NUMBER
                }
            } else {
                for (const item of yAxisData) {
                    item.min = item.min - (BASE_SPLIT_NUMBER - item.splitNumber) * item.interval
                    item.splitNumber = BASE_SPLIT_NUMBER
                }
            }
        }
        return yAxisData
    }

    // 划分Y轴刻度
    Chart.prototype._divideYAxisMark = function (maxValArr, minValArr) {
        let max = calMax(maxValArr), min = calMin(minValArr), interval, splitNumber
        max = max > 0 ? max : 0
        min = min > 0 ? 0 : min

        if (max === 0 && min ===0) {
            max = 1
        }
        
        if (max > Math.abs(min)) {
            interval = max / BASE_SPLIT_NUMBER
            min = min === 0 ? 0 : Math.floor(Math.min(...minValArr) / interval) * interval
            const negaSplitNumber = Math.abs(min) / interval
            const plusSpitNumber = Math.ceil(Math.max(...maxValArr) / interval)
            max = plusSpitNumber * interval
            splitNumber = negaSplitNumber + plusSpitNumber
        } else if (max < Math.abs(min)) {
            interval = Math.abs(min) / BASE_SPLIT_NUMBER
            max = max === 0 ? 0 : Math.ceil(Math.max(...maxValArr) / interval) * interval
            const plusSpitNumber = Math.ceil(max) / interval
            const negaSplitNumber = Math.abs(Math.floor(Math.min(...minValArr) / interval))
            min = - (negaSplitNumber * interval)
            splitNumber = plusSpitNumber + negaSplitNumber
        }

        return {
            max: max,
            min: min,
            interval: interval,
            splitNumber: splitNumber
        }
    }
}