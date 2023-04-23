export default {
    name: 'SapiTableExpandRow',
    props: {
        tableDataItem: {
            type: Object,
            required: true
        },
        expandColumn: {
            type: Object,
            required: true
        },
        // 行号
        rowIndex: {
            type: Number,
            required: true
        },
        // 父级vnode
        parentVnode: {
            type: Vue.VNode,
            required: true
        }
    },
    inject: ['table'],
    computed: {
        isVisible () {
            const parentCom = this.parentVnode && this.parentVnode.componentInstance
            if (parentCom) {
                return parentCom.isVisible && parentCom.isShowExpandRow
            }
            return false
        }
    },
    render (h) {
        let content = null
        if (this.expandColumn.$scopedSlots.default) {
            content = h('div', {
                class: {
                    'sapi-cell': true
                }
            }, this.expandColumn.$scopedSlots.default({
                column: this.expandColumn.$props,
                row: this.tableDataItem
            }))
        } else {
            content = h('div', {
                class: {
                    'sapi-cell': true
                }
            }, this.expandColumn.$slots.default)
        }
        const td = h('td', {
            attrs: {
                colspan: this.table.columns.length + this.table.preColumns.length
            }
        }, [content])
        return h('tr', {
            class: {
                'sapi-table-expand__container': true,
                // 是否显示
                'sapi-table-row-is__close': !this.isVisible,
                // 斑马线
                'sapi-table-row__stripe': this.table.stripe && this.rowIndex % 2,
                [this.table.getColumnClass(this.expandColumn)]: true
            }
        }, [td])
    }
}
