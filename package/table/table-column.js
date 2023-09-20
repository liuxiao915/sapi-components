import { h } from 'vue'
export default {
    name: 'SapiTableColumn',
    props: {
        prop: {
            type: String
        },
        label: {
            type: String
        },
        width: {
            type: String
        },
        minWidth: {
            type: String
        },
        fixed: {
            type: Boolean
        },
        align: {
            type: String
        },
        headerAlign: {
            type: String
        },
        sortable: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        owner() {
            let parent = this.$parent;
            while (parent && !parent.tableId) {
                parent = parent.$parent;
            }
            return parent;
        },
    },
    mounted() {
        const props = ['prop', 'label', 'width', 'minWidth', 'fixed', 'align', 'headerAlign', 'sortable'];
        const column = this.getPropsData(props);
        if (this.$slots.default) {
            column.renderCell = (props) => this.$slots.default(props);
        }
        if (this.$slots.header) {
            column.renderHeader = (props) => this.$slots.header(props);
        }
        this.columnConfig = column;
        // 注册 watcher
        this.registerNormalWatchers();
        this.owner.insertColumn(this.columnConfig)
    },
    destroyed() {
        this.owner.removeColumn(this.columnConfig)
    },
    render() {
        // slots 也要渲染，需要计算合并表头
        return h('div', this.$slots.default);
    },
    methods: {
        getPropsData(...props) {
            return props.reduce((prev, cur) => {
                if (Array.isArray(cur)) {
                    cur.forEach((key) => {
                        prev[key] = this[key];
                    });
                }
                return prev;
            }, {});
        },
        getColumnElIndex(children, child) {
            return [].indexOf.call(children, child);
        },
        registerNormalWatchers() {
            const props = ['prop', 'label'];
            props.forEach(key => {
              this.$watch(key, (newVal) => {
                this.columnConfig[key] = newVal;
              });
            });
          },
    }
}