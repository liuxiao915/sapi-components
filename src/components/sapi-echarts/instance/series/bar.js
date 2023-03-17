import utils from '@/utils/index.js'

export function barMixin (Chart) {
    Chart.prototype._getBarBaseOption = function () {
        const $toThousands = utils.toThousands
        return {
            name: '',
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            barMaxWidth: 30,
            barGap: 0,
            label: {
                show: false,
                color: '#333',
                position: 'top',
                formatter: function(params) {
                    return $toThousands(params.value)
                }
            },
            data: []
        }
    }
}
