<template>
    <div class="sapi-table-footer">
        <table
            cellspacing="0"
            cellpadding="0"
            class="sapi-table"
            :class="{'sapi-table-has-border': table.hasBorder}"
            :style="{'min-width': table.allColumnsWidth + 'px'}"
        >
            <table-colgroup />
            <tbody>
                <tr>
                    <td
                        rowspan="1"
                        :colspan="!idx ? table.preColumns.length + 1 : 1"
                        v-for="(col, idx) in table.columns"
                        :key="col.name"
                        :class="table.getColumnClass(col)"
                    >
                        <div
                            class="sapi-cell"
                            :class="'sapi-cell-txt-' + col.align.toLowerCase()"
                        >{{summary[idx]}}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import TableColgroup from './table-colgroup.js'

export default {
    name: 'SapiTableSummaryRow',
    components: {
        TableColgroup
    },
    inject: ['table'],
    data () {
        return {
            // 统计数据
            summary: []
        }
    },
    methods: {
        // 修正数值
        checkNum (val) {
            if (Number.isNaN(val)) return ''

            if (val.toString().includes('.')) {
                const decimal = val.toString().split('.').pop()
                // 判断小数是否大于两位
                if (decimal.length > 2) {
                    return +val.toFixed(2)
                } else {
                    return val
                }
            }

            return val
        }
    },
    watch: {
        'table.dataList': {
            handler (newVal) {
                if (!newVal.length) return
                if (typeof this.table.summaryMethod === 'function') {
                    this.summary = this.table.summaryMethod({
                        columns: this.table.columns.map(col => col.$props),
                        data: [...newVal]
                    })
                    return
                }
                const { columns } = this.table
                const { length } = columns
                this.summary[0] = this.table.sumText
                // 从第二个开始
                for (let i = 1; i < length; i++) {
                    this.summary[i] = ''
                    const prop = columns[i].prop
                    // 不是数字
                    if (Number.isNaN(Number(newVal[0][prop]))) continue
                    const list = newVal.map(val => +val[prop])
                    if (list.length) {
                        const val = list.reduce((a, b) => a + b)
                        this.$set(this.summary, i, this.checkNum(val))
                    }
                }
            },
            immediate: true,
            deep: true
        }
    }
}
</script>
