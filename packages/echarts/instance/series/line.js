export function lineMixin (Chart) {
    Chart.prototype._getLineBaseOption = function () {
        return {
            name: '',
            type: 'line',
            yAxisIndex: 0,
            symbol: 'circle',
            symbolSize: 0,
            data: [],
            label: {
                show: false,
                color: '#333'
            },
            lineStyle: {
                width: 1
            },
            itemStyle: {
                borderWidth: 1
            }
        }
    }
}