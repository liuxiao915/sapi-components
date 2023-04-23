export default {
    functional: true,
    name: 'SapiTableThCell',
    inject: ['table'],
    props: {
        column: {
            type: Object,
            required: true
        }
    },
    render (h, cxt) {
        const { column } = cxt.props
        const { table } = cxt.injections
        // 自定义表头
        if (column.$scopedSlots.header) {
            return (<div class={{ 'sapi-cell': true, ['sapi-cell-txt-' + (column.headerAlign.toLowerCase() || column.align.toLowerCase())]: true }}>
                {column.$scopedSlots.header({
                    column: column.$props
                })}
            </div>)
        }

        return (<div class={{ 'sapi-cell': true, 'sapi-is-filter_cell': column.filterItems.length, ['sapi-cell-txt-' + (column.headerAlign.toLowerCase() || column.align.toLowerCase())]: true }}>
            {column.label}
            {/* 排序按钮 */}
            {column.sort && (<span class='sapi-cell-sortable'>
                <i
                    onClick={table.onSort.bind(table, column.prop, 'down')}
                    class={{ 'active': table.tableOrder && table.tableOrder.prop === column.prop && table.tableOrder.order === 'down' }}></i>
                <i
                    onClick={table.onSort.bind(table, column.prop, 'up')}
                    class={{ 'active': table.tableOrder && table.tableOrder.prop === column.prop && table.tableOrder.order === 'up' }}></i>
            </span>)}
            {/* 筛选 */}
            {!!column.filters.length && (<el-dropdown size='small' trigger='click' hide-on-click={column.hideDropdown} placement='bottom' ref='dropdownRef'>
                <i class='el-icon-arrow-down el-icon--right' style='cursor: pointer' ></i>
                <el-dropdown-menu slot='dropdown'>
                    {column.filters.map(item => (<el-dropdown-item key={item.value} >
                        <el-checkbox value={column.filterActive(item.value)} onInput={column.onChangeFilter.bind(column, item.value)}>{item.text}</el-checkbox>
                    </el-dropdown-item>))}
                    <el-dropdown-item divided >
                        <el-button type='text' disabled={!column.filterItems.length} size='mini' onClick={column.onFilter}>筛选</el-button>
                        <el-button type='text' size='mini' onClick={column.resetFilter}>重置</el-button>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            )
            }
        </div>)
    }
}
