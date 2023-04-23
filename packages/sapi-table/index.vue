<template>
    <div
        class="sapi-table-container"
        :class="uniqueId"
        ref="sapiTable"
        :style="{'max-width': tableMaxWidth}"
    >
        <!-- 动态样式 -->
        <component :is="'style'">
            {{dynamicColumnStyle}}
            <!-- 覆盖滚动条样式 -->
            .{{uniqueId}} .sapi-table-header-overflow::after{
            width: {{scrollbarW}}px;
            }
        </component>
        <!-- 列的插槽 （隐藏） -->
        <div class="sapi-table-column-slot-container">
            <slot></slot>
        </div>
        <div
            class="sapi-table-content"
            :class="{'sapi-table-fixed-left-shadow': hasFixedShadow && isSupportSticky && isFixedLeft, 'sapi-table-fixed-right-shadow': hasFixedShadow && isSupportSticky && isFixedRight}"
        >
            <div
                class="table-header-scrollbar-placeholder"
                v-if="hasYScrollbar"
                :style="{'width': scrollbarW + 'px', 'height': tableHeaderH + 'px'}"
            ></div>
            <div
                class="table-footer-scrollbar-placeholder"
                v-if="hasYScrollbar && showSummary"
                :style="{'width': scrollbarW + 'px', 'height': tableFooterH + 'px'}"
            ></div>

            <div
                class="sapi-table-header"
                :class="{'sapi-table-header-overflow': hasYScrollbar}"
                ref="tableHeader"
                v-if="showHeader"
            >
                <table
                    cellspacing="0"
                    cellpadding="0"
                    class="sapi-table"
                    :class="{'sapi-table-has-border': hasBorder}"
                    :style="{'min-width': allColumnsWidth + 'px'}"
                >
                    <table-colgroup />
                    <!-- 多级表头 -->
                    <thead v-if="isMultipleHeader" class="is-multiple-header">
                        <tr
                            v-for="(row, rowIdx) in tableHeader"
                            :key="rowIdx"
                            :class="getHeaderRowClassName(rowIdx)"
                            :style="getHeaderRowStyle(rowIdx)"
                        >
                            <!-- 第一行表头 前置列-->
                            <template v-if="!rowIdx">
                                <th
                                    v-for="(col, idx) in preColumns"
                                    :key="col.name"
                                    :rowspan="tableHeader.length"
                                    colspan="1"
                                    :class="getColumnClass(col) + ' ' + getHeaderCellClassName(col.$props, rowIdx, idx)"
                                    :style="getHeaderCellStyle(col.$props, rowIdx, idx)"
                                >
                                    <div
                                        class="sapi-cell"
                                        :class="'sapi-cell-txt-' + col.align.toLowerCase()"
                                        v-if="col.type === 'index'"
                                    >{{col.label || '#'}}</div>
                                    <div
                                        class="sapi-cell"
                                        :class="'sapi-cell-txt-' + col.align.toLowerCase()"
                                        v-if="canSelectRowLength && col.type === 'selection' && canSelectRowLength"
                                    >
                                        <el-checkbox
                                            :indeterminate="isIndeterminate"
                                            :value="isSelectAll"
                                            @input="changeSelect"
                                        />
                                    </div>
                                    <div
                                        class="sapi-cell"
                                        :class="'sapi-cell-txt-' + col.align.toLowerCase()"
                                        v-if="col.type === 'expand'"
                                        style="text-align: center;"
                                    >{{col.label || ''}}</div>
                                </th>
                            </template>

                            <th
                                v-for="(col, idx) in row"
                                :key="col.name"
                                :rowspan="tHeadRowspan(col, rowIdx)"
                                :colspan="col.colspan"
                                :class="getColumnClass(col) + ' ' + getHeaderCellClassName(col.$props, rowIdx, preColumns.length + idx)"
                                :style="getHeaderCellStyle(col.$props, rowIdx, preColumns.length + idx)"
                            >
                                <table-th-cell :column="col" />
                            </th>
                        </tr>
                    </thead>
                    <!-- 单个表头 -->
                    <thead v-else class="is-once-header">
                        <tr :class="getHeaderRowClassName(0)" :style="getHeaderRowStyle(0)">
                            <!-- 前置列 -->
                            <th
                                v-for="(col, idx) in preColumns"
                                :key="col.name"
                                rowspan="1"
                                colspan="1"
                                :class="getColumnClass(col) + ' ' + getHeaderCellClassName(col.$props, 0, idx)"
                                :style="getHeaderCellStyle(col.$props, 0, idx)"
                            >
                                <div
                                    class="sapi-cell"
                                    :class="'sapi-cell-txt-' + col.align.toLowerCase()"
                                    v-if="col.type === 'index'"
                                >{{col.label || '#'}}</div>
                                <div
                                    class="sapi-cell"
                                    :class="'sapi-cell-txt-' + col.align.toLowerCase()"
                                    v-if="canSelectRowLength && col.type === 'selection' && canSelectRowLength"
                                >
                                    <el-checkbox
                                        :indeterminate="isIndeterminate"
                                        :value="isSelectAll"
                                        @input="changeSelect"
                                    />
                                </div>
                                <div
                                    class="sapi-cell"
                                    :class="'sapi-cell-txt-' + col.align.toLowerCase()"
                                    v-if="col.type === 'expand'"
                                    style="text-align: center;"
                                >{{col.label || ''}}</div>
                            </th>
                            <th
                                v-for="(col, idx) in columns"
                                :key="col.name"
                                rowspan="1"
                                colspan="1"
                                :class="getColumnClass(col) + ' ' + getHeaderCellClassName(col.$props, 0, preColumns.length + idx)"
                                :style="getHeaderCellStyle(col.$props, 0, preColumns.length + idx)"
                            >
                                <table-th-cell :column="col" />
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <table-body
                :class="{'has-sapi-table-footer': showSummary && hasYScrollbar}"
                ref="tableBody"
            />

            <!-- 表尾合计行 -->
            <table-summary-row
                ref="tableFooter"
                :class="{'sapi-table-footer-overflow': hasYScrollbar}"
                v-if="showSummary"
                :key="allColumns.length"
            />

            <!-- 溢出文本提示 -->
            <el-tooltip
                :el-tooltip="tooltipEffect"
                placement="top"
                ref="tooltip"
                :content="tooltipContent"
            ></el-tooltip>
        </div>
    </div>
</template>
<script>
import TableBody from './table-body.vue'
import TableColgroup from './table-colgroup.js'
import ResizeObserver from 'resize-observer-polyfill'
import { uniqueId } from './utils.js'
import TableThCell from './table-th-cell.js'

export default {
    name: 'SapiTable',
    components: {
        TableBody,
        TableColgroup,
        TableThCell,
        // 统计行
        'table-summary-row': () => import('./table-summary-row.vue')
    },
    provide () {
        return {
            table: this
        }
    },
    props: {
        data: {
            type: Array,
            default () {
                return []
            }
        },
        // 是否展开全部
        defaultExpandAll: {
            type: Boolean,
            default: false
        },
        // 是否懒加载，只能逐级加载
        lazy: {
            type: Boolean,
            default: false
        },
        // 懒加载,函数
        load: {
            type: Function,
            required: false
        },
        // 如果不指定hasChildren,则通过children.length来判断是否有子级
        treeProps: {
            type: Object,
            default () {
                return {
                    // 必须
                    children: 'children'
                    // 可选
                    // hasChildren: 'hasChildren'
                }
            }
        },
        // 是否带斑马纹表格 (非树形组件才有效)
        stripe: {
            type: Boolean,
            default: true
        },
        // 是否带竖边框
        border: {
            type: Boolean,
            default: false
        },
        // Table 的高度，默认为自动高度。
        height: {
            type: [Number, String],
            default: 'auto'
        },
        maxHeight: {
            type: [Number, String],
            default: 'unset'
        },
        // 使用虚拟滚动，不指定rowKey，会获得更好的性能
        rowKey: {
            type: [String, Function],
            default: ''
        },
        // 是否单选
        highlightCurrentRow: {
            type: Boolean,
            default: false
        },
        // 当前行row key
        currentRowKey: {
            type: [String, Number],
            default: ''
        },
        // {prop: 'date', order: ''} // order可能的值 ''|'up'|'down'
        defaultSort: {
            type: Object,
            default () {
                return {}
            }
        },
        // 表格尾部是否展示合计行
        showSummary: {
            type: Boolean,
            default: false
        },
        // 表格尾部合计行文本
        sumText: {
            type: String,
            default: '合计'
        },
        // 合计行计算方法
        summaryMethod: {
            type: Function
        },
        // 合并行或列的方法
        spanMethod: {
            type: Function
        },
        emptyText: {
            type: String,
            default: '暂无数据'
        },
        // 是否显示表头
        showHeader: {
            type: Boolean,
            default: true
        },
        // 是否开启虚拟滚动，（必须指定表格高度height）
        virtualScroll: {
            type: Boolean,
            default: false
        },
        // 虚拟滚动一行的高度
        virtualItemHeight: {
            type: Number,
            default: 41
        },
        // 虚拟滚动加载的行数
        virtualRowNum: {
            type: Number,
            default: 20
        },
        // 缓冲区像素高度
        virtualBufferPx: {
            type: Number,
            default: 100
        },
        // tooltip effect 属性
        tooltipEffect: {
            type: String,
            default: 'dark' // dark/light
        },
        // 展示树形数据时，树节点的缩进
        indent: {
            type: Number,
            default: 16
        },
        // 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className
        rowClassName: {
            type: [Function, String],
            default: ''
        },
        // 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style
        rowStyle: {
            type: [Function, Object],
            default () {
                return {}
            }
        },
        // 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className
        cellClassName: {
            type: [Function, String],
            default: ''
        },
        // 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Styl
        cellStyle: {
            type: [Function, Object],
            default () {
                return {}
            }
        },
        // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className
        headerRowClassName: {
            type: [Function, String],
            default: ''
        },
        // 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style
        headerRowStyle: {
            type: [Function, Object],
            default () {
                return {}
            }
        },
        // 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className
        headerCellClassName: {
            type: [Function, String],
            default: ''
        },
        // 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style
        headerCellStyle: {
            type: [Function, Object],
            default () {
                return {}
            }
        },
        // 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组
        expandRowKeys: {
            type: Array,
            default () {
                return []
            }
        },
        // 是否禁用选择控件的回调
        disabledSelection: {
            type: Function
        },
        // 树形行展开和收起的图标
        treeRowIcon: {
            type: Object,
            default () {
                return {
                    openIcon: 'el-icon-caret-right',
                    closeIcon: 'el-icon-caret-bottom'
                }
            }
        },
        // 固定列是否显示阴影效果
        hasFixedShadow: {
            type: Boolean,
            default: true
        },
        // 树形表格展开按钮位置
        extendBtnIndex: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            // 全部列 (不包括多级表头的列)
            allColumns: [],
            // 已经加载的行
            hasLoadRow: [],
            // 树形表格最深的等级
            deepLevel: 0,
            // 行号 (总数)
            allRowIndex: 0,
            // 当前选中得行
            selectRows: [],
            // 左侧滚动位置
            tableScrollLeft: 0,
            // scrollWidth - clientWidth 的距离
            tableScrollWidth: 0,
            // 多级表头
            tableHeader: [],
            // 当前选中的行
            currentRow: null,
            tableOrder: null,
            // 筛选器数据
            filters: [],
            // 可以选择的最大行数
            canSelectRowLength: 0,
            // 最大级别
            maxLevel: 1,
            // 是否树形表格
            isTreeTable: false,
            // 表格列的动态样式
            dynamicColumnStyle: '',
            // 检测是否支持粘性布局
            isSupportSticky: false,
            // 是否有垂直滚动条
            hasYScrollbar: false,
            // 滚动条宽度
            scrollbarW: 0,
            // 是否显示左侧固定列阴影
            isFixedLeft: false,
            // 是否显示右侧固定阴影
            isFixedRight: false,
            // 溢出的文本内容
            tooltipContent: '',
            // 表头的高度
            tableHeaderH: 42,
            tableFooterH: 42
        }
    },
    computed: {
        // 表格数据
        dataList () {
            // 筛选
            if (this.filters.length) {
                return this.data.filter(row => {
                    return this.filters.every(temp => {
                        return temp.items.some(val => temp.filterMethod(val, row, {
                            property: temp.property,
                            label: temp.label
                        }))
                    })
                })
            }
            return this.data
        },
        // 是否需要表格边框
        hasBorder () {
            return this.border || this.isMultipleHeader || this.isTreeTable
        },
        // 是否多级表头
        isMultipleHeader () {
            return this.allColumns.some(item => item.isHeadColumn)
        },
        // 唯一的id
        uniqueId () {
            return 'sapi-table_' + uniqueId()
        },
        // 表体列
        columns () {
            const middleColumns = this.allColumns
                .filter(item => {
                    // 多级表头
                    // if (this.isMultipleHeader) {
                    //     return !item.isHeadColumn && !item.type
                    // }
                    return !item.isHeadColumn && !item.type && !item.fixed
                }).sort((a, b) => a.orderIndex - b.orderIndex)
            // 重新排序列
            return [...this.fixedLeftColumns, ...middleColumns, ...this.fixedRightColumns]
        },
        // 左侧固定列
        fixedLeftColumns () {
            return this.allColumns.filter(item => {
                if (item.type || item.fixed === 'right') return false
                return !item.isHeadColumn && item.fixed
            })
        },
        // 右侧固定列
        fixedRightColumns () {
            return this.allColumns.filter(item => !item.isHeadColumn && !item.type && (item.fixed === 'right'))
        },
        // 前置列
        preColumns () {
            // 如果有固定列，扩展行无效
            const types = this.fixedLeftColumns.length + this.fixedRightColumns.length ? ['index', 'selection'] : ['index', 'selection', 'expand']
            return this.allColumns
                // 对象数组去重
                .filter((item, idx, seft) => types.includes(item.type) && seft.findIndex(temp => temp.type === item.type) === idx)
        },
        isIndeterminate () {
            return !this.isSelectAll && !!this.selectRows.length
        },
        // 是否全选
        isSelectAll () {
            return this.canSelectRowLength && this.selectRows.length === this.canSelectRowLength
        },
        // // 定义的列宽
        allColumnsWidth () {
            const widths = []
            const list = [...this.preColumns, ...this.columns]
            for (const item of list) {
                if (!item.width) {
                    // 表格列最小宽度
                    widths.push(+item.minWidth || 48)
                } else {
                    const w = +item.width
                    if (Number.isNaN(w)) continue
                    widths.push(w)
                }
            }
            if (widths.length) {
                return widths.reduce((a, b) => a + b)
            } else {
                return 48
            }
        },
        // // 表格最大宽度
        tableMaxWidth () {
            const hasAuto = this.columns.some(item => !item.width)
            if (hasAuto) {
                return '100%'
            } else {
                return `${this.allColumnsWidth}px`
            }
        },
        // 前置列宽
        preColumnsWidth () {
            return this.computeFixedColWidth(this.preColumns)
        },
        // 左侧固定列宽度
        fixedLeftWidth () {
            return this.computeFixedColWidth([...this.preColumns, ...this.fixedLeftColumns]) + 'px'
        },
        // 右侧固定列宽度
        fixedRightWidth () {
            return this.computeFixedColWidth(this.fixedRightColumns) - 2 + 'px'
        }
    },
    watch: {
        allRowIndex (val) {
            this.$nextTick(() => {
                // 计算可以选择的行数
                this.canSelectRowLength = this.getTableRows().filter(row => !row.isDisabledSelection).length
            })
        },
        'allColumns.length': {
            handler (val) {
                if (this.isSupportSticky) {
                    this.setDynamicColumnStyle()
                }
                this.$emit('update-columns', val)
            }
        },
        'dataList.length': {
            handler (val) {
                this.$nextTick(() => {
                    this.$emit('*-table-resize')
                })
            }
        },
        scrollbarW (val) {
            if (this.$refs.tableHeader) {
                this.tableHeaderH = this.$refs.tableHeader.offsetHeight
            }
            if (this.$refs.tableFooter) {
                this.tableFooterH = this.$refs.tableFooter.$el.offsetHeight
            }
        }
    },
    methods: {
        showTooltip (el) {
            const tooltip = this.$refs.tooltip
            this.tooltipContent = el.innerText
            tooltip.referenceElm = el
            tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none')
            tooltip.doDestroy()
            tooltip.setExpectedState(true)
            tooltip.handleShowPopper()
        },
        hideTooltip () {
            const tooltip = this.$refs.tooltip
            if (tooltip) {
                tooltip.setExpectedState(false)
                tooltip.handleClosePopper()
            }
        },
        // 设置是否有垂直滚动条（子级调用）
        setYScrollbar (hasYScrollbar) {
            this.hasYScrollbar = hasYScrollbar
        },
        // 设置列的动态样式
        setDynamicColumnStyle () {
            let dynamicColumnStyle = ''
            // 左侧固定列数
            let fixedLeftLength = this.fixedLeftColumns.length
            if (fixedLeftLength) {
                // 前置列
                this.preColumns.forEach((col, idx) => {
                    dynamicColumnStyle += `.${this.uniqueId} .${col.name} { 
                        left:${idx * (col.width || 48)}px;
                        position: sticky;
                        z-index: 2;
                    }`
                })
            }

            // 左侧固定列
            this.fixedLeftColumns.forEach((col, idx) => {
                let left = this.preColumnsWidth
                if (idx) {
                    left += Number(this.fixedLeftColumns[idx - 1].width || this.fixedLeftColumns[idx - 1].minWidth)
                }

                dynamicColumnStyle += `.${this.uniqueId} .${col.name} { 
                    left:${left}px;
                    position: sticky;
                    z-index: 2;
                }`
            })
            // 右侧固定列
            const fixedRightColumns = this.fixedRightColumns
                .map(col => ({
                    minWidth: col.minWidth,
                    width: col.width,
                    name: col.name
                })).reverse()
            fixedRightColumns.forEach((col, idx) => {
                let left = 0
                if (idx) {
                    left += Number(fixedRightColumns[idx - 1].width || fixedRightColumns[idx - 1].minWidth)
                }
                dynamicColumnStyle += `.${this.uniqueId} .${col.name} { 
                    right:${left}px;
                    position: sticky;
                    z-index: 2;
                }`
            })
            this.dynamicColumnStyle = dynamicColumnStyle
        },
        // 表头行的 className
        getHeaderRowClassName (rowIndex) {
            if (typeof this.headerRowClassName === 'function') {
                return this.headerRowClassName({
                    rowIndex
                })
            }
            return this.headerRowClassName
        },
        // 获取表格行样式
        getHeaderRowStyle (rowIndex) {
            if (typeof this.headerRowStyle === 'function') {
                return this.headerRowStyle({
                    rowIndex
                })
            }
            return this.headerRowStyle
        },
        // 获取表头单元格class
        getHeaderCellClassName (column, rowIndex, columnIndex) {
            if (typeof this.headerCellClassName === 'function') {
                return this.headerCellClassName({ column, rowIndex, columnIndex })
            }
            return this.headerCellClassName
        },
        // 获取表头单元格style
        getHeaderCellStyle (column, rowIndex, columnIndex) {
            if (typeof this.headerCellStyle === 'function') {
                return this.headerCellStyle({ column, rowIndex, columnIndex })
            }
            return this.headerCellStyle
        },
        // 清空已经懒加载的行
        clearHasLoadRowKeys () {
            // 先收起所有的
            this.hasLoadRow.forEach(key => {
                this.toggleTreeRowExpansion(key, false)
            })
            this.hasLoadRow = []
        },
        // 设置已经加载的行
        setHasLoadRowKeys (rowKeys) {
            this.hasLoadRow = [...new Set([...this.hasLoadRow, ...rowKeys])]
        },
        clearFilter (prop) {
            if (prop) {
                const find = this.allColumns.find(col => col.prop === prop)
                if (find) {
                    find.resetFilter()
                }
            } else {
                this.allColumns.forEach(col => {
                    col.resetFilter()
                })
            }
        },
        // 横向滚动（外部调用）
        scrollLeft (scrollLeft) {
            if (this.$refs.tableHeader) {
                this.$refs.tableHeader.scrollLeft = scrollLeft
            }
            if (this.$refs.tableFooter) {
                this.$refs.tableFooter.$el.scrollLeft = scrollLeft
            }
            this.isFixedLeft = !!scrollLeft
        },
        // 列的class
        getColumnClass (col) {
            if (this.isSupportSticky && col.fixed) {
                const isEnd = this.fixedLeftColumns.length ? this.fixedLeftColumns[this.fixedLeftColumns.length - 1].name === col.name : false
                if (isEnd) {
                    return `sapi-table-left-fixed-last-column ${col.name}`
                }
                const isEndRight = this.fixedRightColumns.length ? this.fixedRightColumns[0].name === col.name : false
                if (isEndRight) {
                    return `sapi-table-right-fixed-start-column ${col.name}`
                }
            }
            return col.name
        },
        // 计算固定的列 总长度
        computeFixedColWidth (columns) {
            let w = 0
            for (const col of columns) {
                // 前置列
                if (col.type) {
                    const t = Number(col.width || 48)
                    if (Number.isNaN(t)) continue
                    w += t
                } else {
                    const t = Number(col.width)
                    if (Number.isNaN(t)) continue
                    w += t
                }
            }
            return w
        },
        // 是否有子级
        hasChildren (tableDataItem) {
            let hasChildren = false
            if (typeof this.treeProps.hasChildren === 'string' && this.treeProps.hasChildren.trim().length) {
                hasChildren = tableDataItem[this.treeProps.hasChildren]
            } else {
                hasChildren = !!this.getChildren(tableDataItem).length
            }
            if (hasChildren && !this.isTreeTable) {
                this.isTreeTable = true
            }
            return hasChildren
        },
        // 获取子级
        getChildren (tableDataItem) {
            return tableDataItem[this.treeProps.children] || []
        },
        // 是否已经加载
        hasLoad (tableDataItem) {
            return this.hasLoadRow.some(rowKey => rowKey === tableDataItem[this.rowKey])
        },
        _lazyLoad (tableDataItem) {
            if (typeof this.load === 'function') {
                return new Promise((resolve, reject) => {
                    this.load(this.dataList, tableDataItem, resolve, reject)
                })
            } else {
                return Promise.reject('必须指定 tableData load 函数!!')
            }
        },
        // 懒加载子级
        async _addChildren (tableDataItem) {
            try {
                const children = await this._lazyLoad(tableDataItem)
                // 不是数组
                if (!Array.isArray(children)) return
                // 添加加载记录
                this.hasLoadRow.push(tableDataItem[this.rowKey])

                // 懒加载，只能逐级加载，所以把children设置为[]
                for (const item of children) {
                    item[this.treeProps.children] = []
                }
                // 是否有子级
                const hasChildren = !!children.length
                this.$set(tableDataItem, this.treeProps.hasChildren, hasChildren)
                this.$set(tableDataItem, this.treeProps.children, children)
                return hasChildren
            } catch (err) {
                console.error(err)
            }
        },
        // 重新计算内容调整大小
        tableResize () {
            this.$emit('*-table-resize')
        },
        /**
         * 迭代行
         * @params {function} callback
         */
        forEachTableRows (callback) {
            const rows = this.getTableRows()
            const { length } = rows
            for (let i = 0; i < length; i++) {
                if (callback(rows[i])) return
            }
        },
        // 获取前置置列
        getPreColumn (type) {
            return this.preColumns.find(item => item.type === type)
        },
        changeSelect (isSelect, isClear) {
            this.forEachTableRows(row => {
                if (!row.isDisabledSelection && row.isSelect !== isSelect) {
                    row.isSelect = isSelect
                    row.changeSelect(isSelect, false)
                }
            })
            this.$emit('select-all', [...this.selectRows])
            this.$emit('selection-change', [...this.selectRows])
        },
        // 清空用户选择
        clearSelection () {
            this.changeSelect(false)
        },
        // 选择所有
        toggleAllSelection () {
            this.changeSelect(true)
        },
        // 切换某一行的选中状态, noEmitEvent 是否发射选择事件
        toggleRowSelection (item, isSelect, noEmitEvent = false) {
            this.forEachTableRows(row => {
                if (row.tableDataItem === item || row.tableDataItem[this.rowKey] === item) {
                    if (!row.isDisabledSelection) {
                        if (typeof isSelect === 'boolean') {
                            row.isSelect = isSelect
                        } else {
                            row.isSelect = !row.isSelect
                        }
                        row.changeSelect(row.isSelect, !noEmitEvent)
                    }
                    return true
                }
            })
        },
        // 切换某一扩展行的展开状态
        toggleRowExpansion (item, isExpanded) {
            this.forEachTableRows(row => {
                if (row.tableDataItem === item || row.tableDataItem[this.rowKey] === item) {
                    if (typeof isExpanded === 'boolean') {
                        if (row.isShowExpandRow !== Boolean(isExpanded)) {
                            row.changeExpandRow()
                        }
                    } else {
                        row.changeExpandRow()
                    }
                    return true
                }
            })
        },
        // 切换某一树形菜单的展开状态
        toggleTreeRowExpansion (item, isExpanded) {
            this.forEachTableRows(row => {
                if (row.tableDataItem === item || row.tableDataItem[this.rowKey] === item) {
                    if (typeof isExpanded === 'boolean') {
                        if (row.isExpandChild !== isExpanded) {
                            row.publishChangeExpand()
                        }
                    } else {
                        row.publishChangeExpand()
                    }
                    return true
                }
            })
        },
        // 打开指定层级的
        toggleLevelTreeRow (level, isExpanded) {
            this.forEachTableRows(row => {
                if (row.hasChildren && row.level === level) {
                    if (typeof isExpanded === 'boolean') {
                        if (row.isExpandChild !== isExpanded) {
                            row.publishChangeExpand()
                        }
                    } else {
                        row.publishChangeExpand()
                    }
                }
            })
        },
        // 获取多级表头
        getTableHeader () {
            // 创建一个执行队列, 当队列为空的时候则结束
            const queue = []
            const vlen = this.$slots.default.length
            for (let k = 0; k < vlen; k++) {
                const vnode = this.$slots.default[k]
                if (!vnode.componentInstance) continue
                if (vnode.componentInstance.comName !== 'SapiTableColumn') continue
                queue.push(vnode.componentInstance)
            }
            let stackLevel = 0
            const tableHeader = []
            while (queue.length) {
                const list = [...queue]
                // this.tableHeader[stackLevel] = list
                const { length } = list
                for (let i = 0; i < length; i++) {
                    queue.shift()
                    const childNode = list[i]
                    // 移除，前置列
                    if (['index', 'selection', 'expand'].includes(childNode.type)) continue
                    if (tableHeader[stackLevel]) {
                        tableHeader[stackLevel].push(childNode)
                    } else {
                        tableHeader[stackLevel] = [childNode]
                    }
                    childNode.isHeadColumn = false
                    if (childNode.$slots.default && childNode.$slots.default.length) {
                        let len = childNode.$slots.default.length
                        for (let j = 0; j < len; j++) {
                            const temp = childNode.$slots.default[j]
                            if (!temp.componentInstance) continue
                            if (temp.componentInstance.comName !== 'SapiTableColumn') continue
                            childNode.isHeadColumn = true
                            queue.push(temp.componentInstance)
                        }
                    }
                }
                stackLevel++
            }
            this.tableHeader = tableHeader
        },
        // 计算跨行
        tHeadRowspan (col, rowIdx) {
            if (col.isHeadColumn) {
                return 1
            } else {
                return this.tableHeader.length - rowIdx
            }
        },
        // 获取行，row：tableRowRef、tableExpandRowRef
        getTableRows (row = 'tableRowRef') {
            return this.$refs.tableBody.$refs[row] || []
        },
        // 滚动到指定行
        scrollToRow (item) {
            this.forEachTableRows(row => {
                if (row.tableDataItem === item || row.tableDataItem[this.rowKey] === item) {
                    this.$emit('*-scroll-to-row', row)
                    return true
                }
            })
        },
        // 单选，表格的 highlight-current-row 属性为false，也可以通过这个方法选中
        setCurrentRow (row) {
            let rowItem = row
            if (this.rowKey && typeof row === 'string' || typeof row === 'number') {
                this.forEachTableRows(item => {
                    if (item.tableDataItem[this.rowKey] === row) {
                        rowItem = item.tableDataItem
                        return true
                    }
                })
            }
            // 当表格的当前行发生变化的时候会触发该事件，
            this.$emit('current-change', rowItem, this.currentRow) // currentRow, oldCurrentRow
            this.currentRow = rowItem
        },
        // 排序
        onSort (prop, order) {
            if (this.tableOrder && this.tableOrder.prop === prop && this.tableOrder.order === order) {
                this.tableOrder = {
                    prop,
                    order: ''
                }
            } else {
                this.tableOrder = {
                    prop,
                    order
                }
            }

            this.$emit('sort-change', this.tableOrder)
        },
        // 检测是否支持粘性布局
        checkSticky () {
            const { CSS } = window
            this.isSupportSticky = !!(CSS && CSS.supports && CSS.supports('position', 'sticky'))
        },
        // 获取表格内容滚动元素
        getScrollElement () {
            return this.$refs.tableBody.$refs.tableBody
        }
    },
    created () {
        this.tableOrder = this.defaultSort
        // 插入colomn
        this.onInsertTableColumn = tableColumn => {
            this.allColumns.push(tableColumn)
        }
        this.$on('*-insert-table-column', this.onInsertTableColumn)
        this.checkSticky()
    },
    mounted () {
        // 卸载column
        this.onUninstallTableColumn = tableColumn => {
            const findIndex = this.allColumns.findIndex(col => col === tableColumn)
            if (findIndex > -1) {
                this.allColumns.splice(findIndex, 1)
            }
        }
        this.$on('*-uninstall-table-column', this.onUninstallTableColumn)

        this.onSelectRowsFn = (row, emitEvent) => {
            const findIndex = this.selectRows.findIndex(temp => temp === row)
            if (findIndex > -1) {
                this.selectRows.splice(findIndex, 1)
                if (emitEvent) {
                    this.$emit('select', [...this.selectRows], row)
                    this.$emit('selection-change', [...this.selectRows])
                }
            } else {
                this.selectRows.push(row)
                if (emitEvent) {
                    this.$emit('select', [...this.selectRows], row)
                    this.$emit('selection-change', [...this.selectRows])
                }
            }
        }
        this.$on('*-select-rows', this.onSelectRowsFn)

        // 获取多级表头
        if (this.$slots.default && this.isMultipleHeader) {
            this.getTableHeader()
        }
        this.$watch('allColumns', () => {
            // 更新头部
            this.$nextTick(this.getTableHeader)
        })

        this.observer = new ResizeObserver(() => {
            this.$emit('*-table-resize')
        })

        this.observer.observe(this.$refs.sapiTable)

        if (this.data.length > 100 && !this.virtualScroll) {
            console.warn('表格数据量过大，请尝试使用虚拟滚动功能！')
        }
    },
    beforeDestroy () {
        this.$off('*-insert-table-column', this.onInsertTableColumn)
        this.$off('*-uninstall-table-column', this.onUninstallTableColumn)
        this.$off('*-select-rows', this.onSelectRowsFn)
        this.observer.disconnect()
    }
}
</script>
<style lang="less">
    @import './index.less';
</style>
