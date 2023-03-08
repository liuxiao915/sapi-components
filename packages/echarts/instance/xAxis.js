export function xAxisMixin (Chart) {
    Chart.prototype._getXAxis = function (xAxisData, isReverse) {
        return {
            type: 'category',
            data: [],
            boundaryGap: true,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval: 0,
                color: '#A0A4AA',
                fontSize: 12,
                rotate: 0,
                align: isReverse ? 'right' : 'center'
            },
            splitLine:{
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(65,97,128,0.15)'
                }
            }
        }
    }

    // 初始化X轴配置项
    Chart.prototype._initXAxisOption = function (seriesData, originalXAxisData, isReverse) {
        const xSeries = {}
        const xAxisData = []
        const axisIndexKey = isReverse ? 'yAxisIndex' : 'xAxisIndex'
        for (const item of seriesData) {
            if (xSeries[item[axisIndexKey] || 0]) {
                xSeries[item[axisIndexKey] || 0].push(item)
            } else {
                xSeries[item[axisIndexKey] || 0] = [item]
            }
        }
        const xKeys = Object.keys(xSeries)
        for (let i = 0; i < xKeys.length; i++) {
            const xKey = xKeys[i];
            xAxisData.push(this._getXAxis(originalXAxisData[i], isReverse))
        }
        return xAxisData
    }
}