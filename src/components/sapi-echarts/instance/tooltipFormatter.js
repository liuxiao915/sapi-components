import utils from '@/utils/index.js'
export function tooltipFormatter (formatType) {
    const $toThousands = utils.toThousands
    let formatter =  {
        //去掉重复项，折线单位为%
        1: function (params) {
            params = params.filter(ele => {
                if (ele.data && typeof ele.data === 'object' && ele.data.symbol === 'none') {
                    return false
                }

                if (ele.value !== undefined) {
                    return true
                }

                return false
            })
            return `<span>${params[0].axisValueLabel}</span><br />` +  params.map(ele => {
                return `${ele.marker}<span>${ele.seriesName}：</span><span>${ele.seriesType === 'line' ? (ele.value || 0) + '%' : $toThousands(ele.value)}</span>`
            }).join('<br />')
        },
        //去掉重复项单位不变
        2: function (params) {
            params = params.filter(ele => {
                if (ele.data && typeof ele.data === 'object' && ele.data.symbol === 'none') {
                    return false
                }

                if (ele.value !== undefined) {
                    return true
                }

                return false
            })
            return `<span>${params[0].axisValueLabel}</span><br />` +  params.map(ele => {
                return `${ele.marker}<span>${ele.seriesName}：</span><span>${$toThousands(ele.value)}</span>`
            }).join('<br />')
        }

    }

    return formatter[formatType]
}