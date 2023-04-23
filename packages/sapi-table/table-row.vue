<template>
    <tr
        :class="{
            'sapi-table-row-is__close': !isVisible,
            'sapi-table-row__stripe': !table.isTreeTable && table.stripe && rowIndex % 2,
            'sapi-current-row': isHighlight,
            'sapi-editable-row': hasEditableCell,
            [rowClassName]: true
        }"
        :style="rowStyle"
        @click="rowClick"
        :key="rowKey"
    >
        <!-- 前置列 -->
        <td
            v-for="(preColumn, idx) in table.preColumns"
            :key="preColumn.name"
            rowspan="1"
            colspan="1"
            :style="getCellStyle(preColumn, idx)"
            :class="table.getColumnClass(preColumn) + ' ' + getCellClassName(preColumn, idx)"
        >
            <div
                class="sapi-cell"
                :class="'sapi-cell-txt-' + preColumn.align.toLowerCase()"
                v-if="preColumn.type === 'index'"
            >{{formatRowIndex}}</div>
            <div
                class="sapi-cell"
                :class="'sapi-cell-txt-' + preColumn.align.toLowerCase()"
                v-if="preColumn.type === 'selection'"
            >
                <el-checkbox
                    v-model="isSelect"
                    @change="changeSelect"
                    :disabled="isDisabledSelection"
                />
            </div>
            <div
                class="sapi-cell sapi-cell-expand__btn"
                :class="'sapi-cell-txt-' + preColumn.align.toLowerCase()"
                v-if="preColumn.type === 'expand'"
                @click.stop="changeExpandRow"
            >
                <i :class="isShowExpandRow ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            </div>
        </td>
        <!-- 数据列 -->
        <sapi-table-tds
            :key="rowKey"
            ref="tableTdRef"
            :row-index="rowIndex"
            :table-data-item="tableDataItem"
            :level="level"
            :is-expand-child="isExpandChild"
            @on-change-expand="changeExpand"
        />
    </tr>
</template>
<script>
import SapiTableTds from './table-td.js'

export default {
    name: 'SapiTableRows',
    inject: ['table'],
    provide () {
        return {
            tableRow: this
        }
    },
    components: {
        SapiTableTds
    },
    props: {
        tableDataItem: {
            type: Object,
            required: true
        },
        treeNodes: {
            type: Array,
            default () {
                return []
            }
        },
        // 行号
        rowIndex: {
            type: Number,
            required: true
        },
        rowKey: {
            type: [String, Number],
            required: true
        },
        // 父级vnode
        parentVnode: {
            required: true
        }
    },
    data () {
        return {
            // 是否展开子级
            isExpandChild: false,
            // 是否选择
            isSelect: false,
            // 是否显示展开扩展行
            isShowExpandRow: false,
            // 是否有编辑单元格
            hasEditableCell: false
        }
    },
    computed: {
        // 是否显示
        isVisible () {
            const parentList = []
            let parent = this.parentCom
            while (parent) {
                parentList.push(parent)
                parent = parent.parentCom
            }
            if (parentList.length) {
                return parentList.every(row => row.isExpandChild)
            }
            return true
        },
        // 父级组件
        parentCom () {
            return this.parentVnode && this.parentVnode.componentInstance
        },
        // 父级级别
        parentLevel () {
            // 节点层级 第一级的父级是0
            let parentLevel = 0
            let parent = this.parentCom
            while (parent) {
                ++parentLevel
                parent = parent.parentCom
            }
            return parentLevel
        },
        // 当前级别
        level () {
            const level = this.parentLevel + 1
            // 设置最大级别
            if (level > this.table.maxLevel) {
                this.table.maxLevel = level
            }
            return level
        },
        // 格式化
        formatRowIndex () {
            const { getPreColumn } = this.table
            const indexColumn = getPreColumn('index')
            // 计算函数
            if (indexColumn && typeof indexColumn.index === 'function') {
                return indexColumn.index(this.rowIndex, this.tableDataItem)
            }
            return this.rowIndex + 1
        },
        // 是否单选
        isHighlight () {
            const { currentRow, currentRowKey } = this.table
            if (currentRowKey) {
                return currentRow && currentRow[currentRowKey] === this.tableDataItem[currentRowKey]
            }
            return currentRow === this.tableDataItem
        },
        rowClassName () {
            const { rowClassName } = this.table
            if (typeof rowClassName === 'function') {
                return rowClassName({
                    row: this.tableDataItem,
                    rowIndex: this.rowIndex
                })
            }
            return rowClassName
        },
        rowStyle () {
            const { rowStyle } = this.table
            if (typeof rowStyle === 'function') {
                return rowStyle({
                    row: this.tableDataItem,
                    rowIndex: this.rowIndex
                })
            }
            return rowStyle
        },
        // 是否有子级
        hasChildren () {
            const { hasChildren } = this.table
            return hasChildren(this.tableDataItem)
        },
        // 是否隐藏选择按钮
        isDisabledSelection () {
            const { disabledSelection } = this.table
            if (typeof disabledSelection === 'function') {
                return disabledSelection({
                    row: this.tableDataItem,
                    rowIndex: this.rowIndex
                })
            }
            return false
        },
        // 子级数量
        childrenLength () {
            const { getChildren } = this.table
            return getChildren(this.tableDataItem).length
        }
    },
    watch: {
        isHighlight (val) {
            //  如果高亮状态row时收起状态，切换成展开
            if (val) {
                let parent = this.parentCom
                while (parent) {
                    if (!parent.isExpandChild) {
                        parent.publishChangeExpand()
                    }
                    parent = parent.parentCom
                }
            }
        },
        childrenLength (val) {
            if (val) return
            this.clearHasLoadRow()
        }
    },
    methods: {
        // 删除已经加载的树形数据key
        clearHasLoadRow () {
            const { hasLoadRow } = this.table
            const findIdx = hasLoadRow.findIndex(rowKey => rowKey === this.rowKey)
            if (findIdx > -1) {
                hasLoadRow.splice(findIdx, 1)
                this.changeExpand(false)
            }
        },
        // 外部调用的展开和收起子级
        publishChangeExpand () {
            if (!this.hasChildren) {
                console.warn('只能展开或收起有子级的节点！')
                return
            }
            this.$refs.tableTdRef._changeExpand()
            // 展开操作，把所有父级展开
            if (this.isExpandChild) {
                let parent = this.parentCom
                while (parent) {
                    if (parent.isExpandChild !== this.isExpandChild) {
                        parent.$refs.tableTdRef._changeExpand()
                        parent = parent.parentCom
                    } else {
                        parent = null
                    }
                }
            }
        },
        // 展开和收起子级
        changeExpand (isExpandChild) {
            this.isExpandChild = isExpandChild
            this.table.$emit('tree-expand-change', this.tableDataItem, this.isExpandChild)
        },
        // 选择
        changeSelect (isSelect, isEmitEvent = true) {
            this.table.$emit('*-select-rows', this.tableDataItem, isEmitEvent)
        },
        // change展开扩展行
        changeExpandRow () {
            this.isShowExpandRow = !this.isShowExpandRow
            this.table.$emit('expand-change', this.tableDataItem, this.isShowExpandRow)
        },
        // 点击行，执行的操作
        rowClick () {
            this.selectRow()
            const { rowClick } = this.table
            if (typeof rowClick === 'function') {
                rowClick({
                    row: this.tableDataItem,
                    rowIndex: this.rowIndex
                })
            }
        },
        // 单选
        selectRow () {
            const { highlightCurrentRow } = this.table
            if (highlightCurrentRow) {
                this.table.setCurrentRow(this.tableDataItem)
            }
        },
        // 获取单元格样式
        getCellClassName (columnItem, columnIdx) {
            const { cellClassName } = this.table
            if (typeof cellClassName === 'function') {
                return cellClassName({
                    rowIndex: this.rowIndex,
                    columnIndex: columnIdx,
                    row: this.tableDataItem,
                    column: columnItem.$props
                })
            }
            return cellClassName
        },
        getCellStyle (columnItem, columnIdx) {
            const { cellStyle } = this.table
            if (typeof cellStyle === 'function') {
                return cellStyle({
                    rowIndex: this.rowIndex,
                    columnIndex: columnIdx,
                    row: this.tableDataItem,
                    column: columnItem.$props
                })
            }
            return cellStyle
        }
    },
    mounted () {
        const { defaultExpandAll, expandRowKeys } = this.table
        this.isExpandChild = defaultExpandAll

        this.isShowExpandRow = expandRowKeys.some(key => key === this.rowKey)
    },
    beforeDestroy () {
        // 删除已经选择的
        if (this.isSelect) {
            this.changeSelect(false, false)
        }
        // 删除已经加载的树形数据key
        this.clearHasLoadRow()
    }
}
</script>
