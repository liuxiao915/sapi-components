import { Fragment } from 'vue-fragment'

export default {
    name: 'SapiTableTd',
    inject: ['table'],
    components: {
        'vc-fragment': Fragment,
        'overflow-tooltip': () => import('./overflow-tooltip.vue')
    },
    props: {
        tableDataItem: {
            type: Object,
            required: true
        },
        level: {
            type: Number,
            default: 1
        },
        // 是否展开子级
        isExpandChild: {
            type: Boolean,
            default: false
        },
        // 行号
        rowIndex: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            loading: false
        }
    },
    methods: {
        _changeExpand () {
            if (this.loading) return
            const { lazy } = this.table
            if (lazy) {
                if (this.table.hasLoad(this.tableDataItem)) {
                    this.$emit('on-change-expand', !this.isExpandChild)
                } else {
                    this.addChildren()
                }
            } else {
                this.$emit('on-change-expand', !this.isExpandChild)
            }
        },
        cellClick (column, columnIdx, event) {
            const columnEl = this.$refs.cellRef[columnIdx]
            this.table.$emit('cell-click', this.tableDataItem, column, columnEl, event)
            this.table.$emit('row-click', this.tableDataItem, column, event)
        },
        cellDblclick (column, columnIdx, event) {
            const columnEl = this.$refs.cellRef[columnIdx]
            this.table.$emit('cell-dblclick', this.tableDataItem, column, columnEl, event)
            this.table.$emit('row-dblclick', this.tableDataItem, column, event)
        },
        async addChildren () {
            this.loading = true
            try {
                const hasChildren = await this.table._addChildren(this.tableDataItem)
                if (hasChildren) {
                    this.$emit('on-change-expand', true)
                }
            } finally {
                this.loading = false
            }
        },
        // td内容
        renderContent (columnItem) {
            if (columnItem.$scopedSlots.default) {
                // if columnItem.$parent.comName !== columnItem.comName
                return columnItem.$scopedSlots.default({
                    column: columnItem.$props,
                    row: this.tableDataItem,
                    $index: this.rowIndex
                })
            } else {
                return columnItem.prop ? this.tableDataItem[columnItem.prop] : ''
            }
        },
        spanMethod () {
            return {
                rowspan: 1,
                colspan: 1
            }
        }
    },
    render (h) {
        const {
            columns,
            hasChildren,
            getColumnClass,
            spanMethod,
            indent,
            cellClassName,
            cellStyle,
            preColumns,
            treeRowIcon: { openIcon, closeIcon },
            extendBtnIndex
        } = this.table

        let getSpanMethod = () => ({
            rowspan: 1,
            colspan: 1
        })
        if (typeof spanMethod === 'function') {
            getSpanMethod = (column, columnIndex) => {
                const span = spanMethod({
                    rowIndex: this.rowIndex,
                    row: this.tableDataItem,
                    column,
                    // 不包括前置列
                    columnIndex: columnIndex
                })
                if (typeof span === 'object') {
                    if (Array.isArray(span)) {
                        const [rowspan, colspan] = span
                        return {
                            rowspan,
                            colspan
                        }
                    } else {
                        return span
                    }
                }
                return {
                    rowspan: 1,
                    colspan: 1
                }
            }
        }

        // 获取单元格className
        let getCellClassName = () => cellClassName

        if (typeof cellClassName === 'function') {
            getCellClassName = (columnItem, columnIdx) => cellClassName({
                rowIndex: this.rowIndex,
                columnIndex: columnIdx + preColumns.length,
                row: this.tableDataItem,
                column: columnItem.$props
            })
        }

        // 获取单元格样式
        let getCellStyle = () => cellStyle

        if (typeof cellStyle === 'function') {
            getCellStyle = (columnItem, columnIdx) => cellStyle({
                rowIndex: this.rowIndex,
                columnIndex: columnIdx + preColumns.length,
                row: this.tableDataItem,
                column: columnItem.$props
            })
        }

        const tds = columns
            .map((columnItem, columnIdx) => {
                // 有子级并且是第一个td
                const extendBtn = hasChildren(this.tableDataItem) && columnIdx === extendBtnIndex ? (
                    <span class='sapi-table-extend__btn' onClick={this._changeExpand} title={this.isExpandChild ? '收起' : '展开'}>
                        {this.loading ? <i class='el-icon-loading' title='加载中' key='el-icon-loading'></i>
                            : <i key='el-icon-arrow' class={this.isExpandChild ? closeIcon : openIcon}></i>
                        }
                    </span>) : ''

                const span = getSpanMethod(columnItem.$props, columnIdx)
                // 移除rowspan或者colspan是0的TD
                if (+span.rowspan === 0 || +span.colspan === 0) {
                    return <td style='display: none'></td>
                }
                // 内容
                const content = (<div class={{ 'sapi-cell': true, ['sapi-cell-txt-' + columnItem.align.toLowerCase()]: true }}>
                    {columnIdx === extendBtnIndex && this.level > 1 && <span
                        style={{ 'padding-left': `${indent * (this.level - 1)}px`, 'padding-right': !hasChildren(this.tableDataItem) ? '20px' : '0' }}
                        class='sapi-table__indent'></span>}
                    {extendBtn}
                    {/* td内容 */}
                    {this.renderContent(columnItem)}
                </div>)

                return (<td
                    key={columnItem.name}
                    rowspan={span.rowspan}
                    style={getCellStyle(columnItem, columnIdx)}
                    colspan={span.colspan}
                    class={`${getColumnClass(columnItem)} ${getCellClassName(columnItem, columnIdx)}`}
                    onClick={this.cellClick.bind(this, columnItem.$props, columnIdx)}
                    onDblclick={this.cellDblclick.bind(this, columnItem.$props, columnIdx)}
                    ref='cellRef'
                    refInFor
                >
                    {!columnItem.showOverflowTooltip && content}
                    {columnItem.showOverflowTooltip && <overflow-tooltip key={this.tableDataItem[columnItem.prop]}>{content}</overflow-tooltip>}
                </td>)
            })
        return (<vc-fragment>
            {tds}
        </vc-fragment>)
    }
}
