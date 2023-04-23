<template>
    <div>
        <div
            @click.stop="changeEdit"
            :class="{'sapi-edit-table-cell': !disabled}"
            v-show="!isEdit"
            key="input-txt"
        >
            <slot>
                <span>{{txt}}</span>
            </slot>
        </div>
        <div v-show="isEdit" key="input" class="sapi-editable-cell-input">
            <slot name="input"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SapiEditTableCell',
    inject: ['tableRow'],
    props: {
        // 是否禁用编辑
        disabled: {
            type: Boolean,
            default: false
        },
        // 是否自动获取焦点
        autofocus: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            isEdit: false,
            txt: '',
            inputCom: null
        }
    },
    methods: {
        changeEdit () {
            if (this.disabled) {
                return
            }
            this.isEdit = true
            if (this.inputCom) {
                this.$nextTick(() => {
                    this.inputCom.focus()
                })
            }
        }
    },
    mounted () {
        this.tableRow.hasEditableCell = true
        if (!this.autofocus) return
        const [input] = this.$slots.input
        if (input) {
            const { componentInstance } = input

            if (componentInstance && !componentInstance.elForm) {
                const [elInput] = componentInstance.$children
                this.inputCom = elInput
            } else if (componentInstance && componentInstance.elForm) {
                this.inputCom = componentInstance
            }
            if (this.inputCom) {
                this.txt = this.inputCom.value
                this.blurFn = () => {
                    this.isEdit = false
                    this.$nextTick(() => {
                        this.txt = this.inputCom.value
                    })
                }
                this.inputCom.$on('blur', this.blurFn)
            }
        }
    },
    beforeDestroy () {
        this.inputCom && this.inputCom.$off('blur', this.blurFn)
    }
}
</script>

