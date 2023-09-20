import merge from 'lodash.merge'
import { guid } from '../../utils'
import { barMixin } from './bar'
import { lineMixin } from './line'

export function seriesMixin (Chart) {
    barMixin(Chart)
    lineMixin(Chart)
    // 初始化系列配置项
    Chart.prototype._initSeriesOption = function (seriesData) {
        return (seriesData || []).map(item => {
            const optionMap = {
                bar: this._getBarBaseOption,
                line: this._getLineBaseOption
            }
            const barBaseOption = (optionMap[item.type] || (() => ({}))).call(this)
            const barOption = merge(barBaseOption, item)
            return barOption
        })
    }
    // 分割系列数据
    Chart.prototype._delimitSeriesData = function (seriesData) {
        return seriesData.reduce((delimiterData, originItem) => {
            if (typeof originItem.delimiter === 'function') {
                const data = originItem.delimiter(originItem)
                if (Array.isArray(data)) {
                    const stackId = originItem.stack || guid()
                    for (let k = 0; k < data.length; k++) {
                        const item = data[k];
                        const delimit = item.delimit
                        if (item.delimit) {
                            item.data = Array.from({ length: originItem.data.length }, (e, i) => {
                                // lt: < gt: > lte: <= gte: >=
                                const delimitTypeMap = {
                                    lt_gt: i < delimit.lt && i > delimit.gt,
                                    gt_lt: i < delimit.lt && i > delimit.gt,
                                    lt_gte: i < delimit.lt && i >= delimit.gte,
                                    gte_lt: i < delimit.lt && i >= delimit.gte,
                                    lte_gt: i <= delimit.lte && i > delimit.gt,
                                    gt_lte: i <= delimit.lte && i > delimit.gt,
                                    lte_gte: i <= delimit.lte && i >= delimit.gte,
                                    gte_lte: i <= delimit.lte && i >= delimit.gte,
                                    lt: i < delimit.lt,
                                    lte: i <= delimit.lte,
                                    gt: i > delimit.gt,
                                    gte: i >= delimit.gte
                                }
                                const delimitType = Object.keys(delimit).join('_')
                                if (delimitTypeMap.hasOwnProperty(delimitType) && delimitTypeMap[delimitType]) {
                                    return originItem.data[i]
                                }
                                return e
                            })
                        }

                        if (!item.data) {
                            item.data = []
                        }

                        if (originItem.type === 'bar') {
                            // 定义折叠变量值
                            item.stack = stackId
                        } else if (originItem.type === 'line' && k !== 0) {
                            // 折线分割拼接需处理后续临界点临界点
                            const prevData = data[k - 1]
                            if (prevData.data && prevData.data.length) {
                                const idx = item.data.findIndex(ele => ele !== undefined)
                                const preIdx = idx - 1
                                const dotData = typeof prevData.data[preIdx] === 'object' ? prevData.data[preIdx] : { value: prevData.data[preIdx] }
                                item.data.splice(idx - 1, 1, merge(dotData, {
                                    symbol: 'none',
                                    label: { 
                                        show: false
                                    }
                                }))
                            }
                        }
                        // 同步公共配置项
                        const originItemKeys = Object.keys(originItem)
                        for (const key of originItemKeys) {
                            if (!item[key]) {
                                item[key] = originItem[key]
                            }
                        }
                    }

                    delimiterData.push(...data)
                } else {
                    console.warn(`Delimiter function required return an Array instance`)
                }
            } else {
                delimiterData.push(originItem)
            }

            return delimiterData
        }, [])
    }
    // 获取最大最小值
    Chart.prototype._getSeriesMaxAndMinData = function (seriesData, axisIndexKey) {
        const maxValArr = []
        const minValArr = []
        const obj = {}
        for (let i = 0; i < seriesData.length; i++) {
            const bar = seriesData[i]
            if (bar.stack && obj[bar.stack]) {
                obj[bar.stack].data.push(bar.data)
            } else if (bar.stack && bar.type === 'bar' && !obj[bar.stack]) {
                obj[bar.stack] = {
                    isStack: true,
                    data: [bar.data]
                }
            } else {
                obj[i] = {
                    isStack: false,
                    data: [...bar.data]
                }
            }
        }
        const keys = Object.keys(obj)
        
        for (const key of keys) {
            const data = obj[key]
            if (data.isStack && data.data && data.data.length) {
                const length = data.data[0].length
                const countArr = Array.from({ length: length }, (item, index) => {
                    const valueCount = {
                        max: 0,
                        min: 0
                    }
                    for (let i = 0; i < data.data.length; i++) {
                        const itemData = data.data[i];
                        let value = typeof itemData[index] === 'object' ? itemData[index].value : itemData[index]
                        value = Number(value) || 0
                        if (value >= 0) {
                            valueCount.max += value
                        } else {
                            valueCount.min += value
                        }
                    }
                    return valueCount
                })
                if (countArr && countArr.length) {
                    maxValArr.push(Math.max(...countArr.map(valueCount => valueCount.max)))
                    minValArr.push(Math.min(...countArr.map(valueCount => valueCount.min)))
                } else {
                    maxValArr.push(0)
                    maxValArr.push(0)
                }
            } else {
                const valArr = (data.data || []).map(itemData => {
                    if (itemData && typeof itemData === 'object') {
                        const axisIndexKeyMap = {
                            xAxisIndex: 0,
                            yAxisIndex: 1
                        }
                        return Array.isArray(itemData.value) ? itemData.value[axisIndexKeyMap[axisIndexKey]] : itemData.value
                    }

                    return itemData || ''
                })
                if (valArr && valArr.length) {
                    maxValArr.push(Math.max(...valArr))
                    minValArr.push(Math.min(...valArr))
                } else {
                    maxValArr.push(0)
                    maxValArr.push(0)
                }
            }
        }

        return {
            maxValArr,
            minValArr
        }
    }
}