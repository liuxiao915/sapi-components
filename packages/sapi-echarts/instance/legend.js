export function legendMixin (Chart) {
    Chart.prototype._getLegend = function (seriesData) {
        const typeIconMap = {
            bar: 'rect',
            line: 'line'
        }
        
        return {
            bottom: 0,
            itemHeight: 8,
            itemWidth: 8,
            textStyle: {
                color: '#606972',
                fontSize: 12
            },
            data: seriesData.filter(item => !item.legend || item.legend.show !== false).map(item => {
                return {
                    name: item.name,
                    icon: item.icon || typeIconMap[item.type]
                }
            })
        }
    }
}