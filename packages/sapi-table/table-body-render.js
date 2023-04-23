import SapiTableRow from './table-row.vue'
import SapiTableExpandRow from './table-expand-row.js'

export default {
    functional: true,
    name: 'SapiTableContent',
    inject: ['table'],
    components: {
        SapiTableRow,
        SapiTableExpandRow
    },
    props: {
        // 表格数据
        dataList: {
            type: Array,
            default () {
                return []
            }
        },
        // 列的开始
        rowStartIndex: {
            type: Number,
            default: 0
        }
    },
    render (h, { props: { dataList, rowStartIndex }, injections: { table } }) {
        const { columns, preColumns, emptyText } = table
        // 暂无数据
        if (!dataList || !dataList.length) {
            return (<tbody>
                <tr class='sapi-table-empty-container'>
                    <td rowspan='1' colspan={columns.length + preColumns.length}>{table.$scopedSlots.empty ? table.$scopedSlots.empty() : emptyText}</td>
                </tr>
            </tbody>)
        }
        const { getChildren, rowKey, getPreColumn } = table
        // 是否有扩展列
        const expandRow = getPreColumn('expand')
        const rows = []
        const { length } = dataList // 树形数据
        let getRowKey = () => rows.length.toString()
        if (typeof rowKey === 'function') {
            getRowKey = row => rowKey(row)
        } else if (rowKey.trim().length) {
            getRowKey = item => item[rowKey]
        }
        let rowIndex = rowStartIndex

        for (let i = 0; i < length; i++) {
            const dataItem = dataList[i]
            // 存放将来要访问的节点
            const stack = [{
                parentVnode: null,
                dataItem
            }]

            while (stack.length) {
                const chilNode = stack.pop()
                const rowKey = getRowKey(chilNode.dataItem)
                const vnode = (<SapiTableRow
                    key={rowKey}
                    row-key={rowKey}
                    table-data-item={chilNode.dataItem}
                    parent-vnode={chilNode.parentVnode}
                    row-index={rowIndex}
                    ref='tableRowRef'
                    refInFor
                />)
                rows.push(vnode)
                if (expandRow) {
                    rows.push(<SapiTableExpandRow
                        key={rowKey + 'expand'}
                        row-key={rowKey + 'expand'}
                        row-index={rowIndex}
                        table-data-item={chilNode.dataItem}
                        parent-vnode={vnode}
                        expand-column={expandRow}
                        ref='tableExpandRowRef'
                        refInFor
                    />)
                }
                rowIndex++
                const children = getChildren(chilNode.dataItem)
                const len = children.length
                // 没有子级
                if (!len) continue

                for (let j = len - 1; j >= 0; j--) {
                    stack.push({
                        parentVnode: vnode,
                        dataItem: children[j]
                    })
                }
            }
        }
        // 设置总数
        table.allRowIndex = rowIndex

        return (<tbody>
            {rows}
        </tbody>)
    }
}
