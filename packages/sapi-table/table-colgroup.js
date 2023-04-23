export default {
    functional: true,
    name: 'SapiTableColgroup',
    inject: ['table'],
    render (h, { injections }) {
        const { table: { preColumns, columns } } = injections
        return <colgroup>
            {preColumns.map(columnItem => {
                return <col name={columnItem.name} width={columnItem.width || 48} key={columnItem.name}></col>
            })}
            {columns.map(columnItem => {
                const style = {}
                if (columnItem.minWidth) {
                    Object.assign(style, {
                        'min-width': `${columnItem.minWidth}px`
                    })
                }
                if (columnItem.width) {
                    return <col name={columnItem.name} width={columnItem.width} key={columnItem.name} style={style}></col>
                }
                return <col name={columnItem.name} key={columnItem.name} style={style}></col>
            })}
        </colgroup>
    }
}
