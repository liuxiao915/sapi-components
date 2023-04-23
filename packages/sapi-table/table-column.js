
import { uniqueId } from './utils.js'

export default {
    name: 'SapiTableColumn',
    inject: ['table'],
    props: {
        prop: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        // 宽度
        width: {
            type: [String, Number],
            default: ''
        },
        minWidth: {
            type: [String, Number],
            default: ''
        },
        // 类型
        type: {
            type: String,
            default: ''
        },
        // 如果设置了 type=index，可以通过传递 index 属性来自定义索引
        index: {
            type: Function
        },
        // 列是否固定在左侧或者右侧，true 表示固定在左侧 （如果有固定列，扩展行无效；固定列通过 sticky 实现，IE 11 会降级成横向滚动）
        fixed: {
            type: [Boolean, String],
            default: false
        },
        // 是否显示排序按钮
        sort: {
            type: Boolean,
            defalut: false
        },
        // 筛选器数据
        filters: {
            type: Array,
            default () {
                return []
            }
        },
        // 过滤方法
        filterMethod: {
            type: Function
        },
        // 当内容过长被隐藏时显示 tooltip
        showOverflowTooltip: {
            type: Boolean,
            default: false
        },
        // left/center/right 文本对齐方式
        align: {
            type: String,
            default: 'left'
        },
        // left/center/right 文本对齐方式
        headerAlign: {
            type: String,
            default: ''
        },
        // 列的排序
        orderIndex: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            // 必须，组件名称,标识用
            comName: 'SapiTableColumn',
            isHeadColumn: false,
            rowspan: 1,
            // 筛选器数据
            filterItems: [],
            hideDropdown: false
        }
    },
    computed: {
        name () {
            return 'sapi-table-column_' + uniqueId()
        },
        colspan () {
            if (this.isHeadColumn) {
                let colspan = 0
                this.forEachChildren(child => {
                    if (!child.isHeadColumn) {
                        colspan++
                    }
                })
                return colspan
            } else {
                return 1
            }
        }
    },
    methods: {
        /**
        * 迭代slots child
        * @params {function} callback
        */
        forEachChildren (callback) {
            const rows = this.$slots.default
            const { length } = rows
            for (let i = 0; i < length; i++) {
                const temp = rows[i]
                if (!temp.componentInstance) continue
                if (temp.componentInstance.comName !== this.comName) continue
                const stack = [temp.componentInstance]
                while (stack.length) {
                    const child = stack.pop()
                    if (callback(child)) {
                        return
                    }
                    if (!child.$slots.default) continue
                    const len = child.$slots.default.length
                    for (let j = len - 1; j >= 0; j--) {
                        const item = child.$slots.default[j]
                        if (!item.componentInstance) continue
                        if (item.componentInstance.comName !== this.comName) continue
                        stack.push(item.componentInstance)
                    }
                }
            }
        },
        // 筛选数据
        onFilter () {
            this.hideDropdown = true
            const find = this.table.filters.find(item => item.property === this.prop)
            if (find) {
                this.$set(find, 'items', [...this.filterItems])
            } else {
                this.table.filters.push({
                    property: this.prop,
                    label: this.label,
                    filterMethod: this.filterMethod,
                    items: [...this.filterItems]
                })
            }
            // console.log(this.table.filters, 'filters=filters')
            setInterval(() => {
                this.hideDropdown = false
            }, 0)
        },
        onChangeFilter (value, isActive) {
            if (isActive) {
                this.filterItems.push(value)
            } else {
                const findIndex = this.filterItems.indexOf(value)
                if (findIndex > -1) {
                    this.filterItems.splice(findIndex, 1)
                }
            }
        },
        // 重置筛选
        resetFilter () {
            this.hideDropdown = true
            const findIndex = this.table.filters.findIndex(item => item.property === this.prop)
            if (findIndex > -1) {
                this.table.filters.splice(findIndex, 1)
            }
            this.filterItems = []
            setInterval(() => {
                this.hideDropdown = false
            }, 0)
        },
        filterActive (val) {
            return this.filterItems.includes(val)
        }
    },
    mounted () {
        this.order = this.defaultSort
        this.isHeadColumn = this.$slots.default && this.$slots.default.some(vnode => vnode.componentInstance && vnode.componentInstance.comName === this.comName)

        this.table.$emit('*-insert-table-column', this)
    },
    destroyed () {
        this.table.$emit('*-uninstall-table-column', this)
    },
    render (h) {
        return h('div', {
            key: this.name
        }, this.$slots.default)
    }
}
