import { initMixin } from './init'
import { gridMixin } from './grid'
import { legendMixin } from './legend'
import { tooltipMixin } from './tooltip'
import { xAxisMixin } from './xAxis'
import { yAxisMixin } from './yAxis'
import { seriesMixin } from './series'

function Chart () {
    if (this instanceof Chart) {
        return this
    } else {
        console.warn('Chart is a constructor and should be called with the `new` keyword')
    }
}

initMixin(Chart)
gridMixin(Chart)
legendMixin(Chart)
tooltipMixin(Chart)
xAxisMixin(Chart)
yAxisMixin(Chart)
seriesMixin(Chart)

export default Chart