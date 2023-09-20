import { tooltipFormatter } from './tooltipFormatter'

export function tooltipMixin (Chart) {
    Chart.prototype._getTooltip = function (tooltip) {
        const option = {
            trigger: 'axis',
            appendToBody: true,
            axisPointer: {
                type: 'shadow',
                shadowStyle: {
                    opacity: 0.3,
                    color: 'rgba(0, 0, 0, 0.2)'
                }
            },
            alwaysShowContent: false,
            triggerOn: 'mousemove|click',
            backgroundColor: 'rgba(255,255,255,1)',
            extraCssText: 'box-shadow: 0 1px 2px 0 rgba(0,0,0,0.20);z-index:1',
            textStyle: {
                fontSize: 12,
                color: '#3F454B'
            }
        }

        if (tooltip && tooltip.formatType) {
            option.formatter = this._tooltipFormatter(tooltip.formatType)
        }
        return option
    }

    Chart.prototype._tooltipFormatter = function (formatType) {
        return tooltipFormatter(formatType)
    }
}