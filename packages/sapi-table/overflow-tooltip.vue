<template>
    <div
        class="sapi-table-cell-txt-overflow"
        @mouseenter.stop="mouseenterItem"
        @mouseleave.stop="mouseleaveItem"
    >
        <slot></slot>
    </div>
</template>
<script>
import { debounce } from './utils.js'

export default {
    inject: ['table'],
    data () {
        return {
            disabledTooltip: true,
            neetChecked: true,
            timer: null
        }
    },
    methods: {
        mouseenterItem () {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                if (!this.neetChecked) {
                    if (!this.disabledTooltip) {
                        this.showTooltip(this.$el)
                    }
                    return
                }
                this.neetChecked = false
                this.wrapper = document.createElement('div')
                const fontSize = window.getComputedStyle(this.$el, null).getPropertyValue('font-size')
                const innerHTML = this.$el.innerHTML
                this.wrapper.innerHTML = innerHTML
                this.wrapper.setAttribute('style', `font-size: ${fontSize}`)
                this.wrapper.setAttribute('class', `sapi-overflow-tooltip-txt-temp`)
                document.body.appendChild(this.wrapper)
                const extendBtnW = innerHTML.includes('sapi-table-extend__btn') ? 11 : 0
                // 21 = .sapi-cell padding-left + pading-right + 1
                if ((this.wrapper.offsetWidth + 21 + extendBtnW) > this.$el.clientWidth) {
                    this.disabledTooltip = false
                } else {
                    this.disabledTooltip = true
                }
                setTimeout(() => {
                    document.body.removeChild(this.wrapper)
                    this.wrapper = null
                }, 0)
                if (!this.disabledTooltip) {
                    this.showTooltip(this.$el)
                }
            }, 300)
        },
        mouseleaveItem () {
            clearTimeout(this.timer)
            this.isShowTooltip && this.table.hideTooltip()
        },
        showTooltip () {
            this.table.showTooltip(this.$el)
            this.isShowTooltip = true
        }
    },
    mounted () {
        this.resizeFn = debounce(() => {
            this.neetChecked = true
        }, 300)
        this.table.$on('*-table-resize', this.resizeFn)
    },
    beforeDestroy () {
        this.table.$off('*-table-resize', this.resizeFn)
    }
}
</script>
