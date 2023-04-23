<template>
    <div class="sapi-table-body-container" ref="tableBody" :style="tBodyStyle">
        <table
            cellspacing="0"
            cellpadding="0"
            class="sapi-table sapi-table-conetnt"
            :class="{'sapi-table-has-border': table.hasBorder}"
            :style="tableStyle"
        >
            <table-colgroup />
            <sapi-table-content :data-list="dataList" :row-start-index="startIndex" />
        </table>

        <!-- 横向滚动替代品 -->
        <div class="sapi-table-scroll-toolbar" ref="scrollX"></div>
        <!-- 虚拟滚动占位符 placeholder -->
        <div
            v-if="table.virtualScroll"
            class="sapi-table-virtual-scroll-spacer"
            :style="{height: virtualSpacerHeight + 'px'}"
        ></div>
    </div>
</template>
<script>
import TableColgroup from './table-colgroup.js'
import SapiTableContent from './table-body-render.js'
import { debounce } from './utils.js'

export default {
    name: 'SapiTableBody',
    inject: ['table'],
    components: {
        TableColgroup,
        SapiTableContent
    },
    data () {
        return {
            tableBodyScrollLeft: 0,
            scrolling: false,
            // 虚拟滚动开始坐标
            startIndex: 0,
            // 虚拟滚动位置
            virtualScrollTop: 0
        }
    },
    computed: {
        // 虚拟滚动结束下标
        endIndex () {
            return this.startIndex + this.table.virtualRowNum
        },
        // 表格数据
        dataList () {
            // 虚拟滚动
            if (this.table.virtualScroll) {
                return this.table.dataList.slice(this.startIndex, this.endIndex)
            }
            return this.table.dataList
        },
        // 虚拟滚动高度
        virtualSpacerHeight () {
            return this.table.virtualItemHeight * this.table.dataList.length
        },
        tableStyle () {
            const style = {
                'min-width': this.table.allColumnsWidth + 'px'
            }
            if (this.scrolling) {
                Object.assign(style, {
                    'pointer-events': 'none'
                })
            }
            if (this.table.virtualScroll) {
                Object.assign(style, {
                    'transform': `translateY(${this.virtualScrollTop}px)`,
                    'will-change': 'transform'
                })
            }
            return style
        },
        tBodyStyle () {
            const style = {
                'overflow-x': 'auto',
                'overflow-y': 'hidden'
            }
            if (this.table.height !== 'auto') {
                // 判断是否有单位
                if (/^\d+$/g.test(this.table.height.toString())) {
                    style.height = this.table.height + 'px'
                } else {
                    style.height = this.table.height
                }
                style['overflow-y'] = 'auto'
            }
            if (this.table.maxHeight !== 'unset') {
                // 判断是否有单位
                if (/^\d+$/g.test(this.table.maxHeight.toString())) {
                    style.maxHeight = this.table.maxHeight + 'px'
                } else {
                    style.maxHeight = this.table.maxHeight
                }
                style['overflow-y'] = 'auto'
            }
            return style
        }
    },
    methods: {
        // 设置头部滚动
        scrollLeft (scrollLeft) {
            if (scrollLeft === this.tableBodyScrollLeft) return
            this.tableBodyScrollLeft = scrollLeft
            this.table.scrollLeft(scrollLeft)
        }
    },
    mounted () {
        const scrollBody = this.$refs.tableBody
        this.disabledScrollFn = false
        // 检测是否右侧是否固定状态
        const fixedRightFn = () => {
            if (!this.table.isSupportSticky) return
            this.table.isFixedRight = this.tableBodyScrollLeft !== this.boxRect.scrollWidth - this.boxRect.clientWidth
        }

        let isScrollY = false
        // 滚动结束的函数
        const scrollEndFn = debounce(() => {
            this.scrolling = false
            if (!isScrollY) {
                fixedRightFn()
            }
            isScrollY = false
        }, 300)

        let ticking = false

        let requestAnimationFrameFn = event => {
            this.scrolling = true
            if (!isScrollY) {
                const scrollLeft = this.boxRect.left - this.$refs.scrollX.getBoundingClientRect().left
                if (scrollLeft === this.tableBodyScrollLeft) {
                    isScrollY = true
                }
                this.scrollLeft(scrollLeft)
                this.table.$emit('scroll-horizontal', event)
            } else {
                this.table.$emit('scroll-vertical', event)
            }
            scrollEndFn()
            ticking = false
        }
        // 虚拟滚动
        if (this.table.virtualScroll) {
            let virtualScrollTop = scrollBody.scrollTop
            let startIndex = this.startIndex
            this.virtualScrollTopTemp = virtualScrollTop
            const virtualScrollFn = () => {
                virtualScrollTop = scrollBody.scrollTop
                startIndex = Math.floor(virtualScrollTop / this.table.virtualItemHeight)
                if (virtualScrollTop <= this.table.virtualBufferPx) {
                    this.virtualScrollTop = this.virtualScrollTopTemp = this.startIndex = 0
                } else if (Math.abs(virtualScrollTop - this.virtualScrollTopTemp) > this.table.virtualBufferPx) {
                    // // 2 是一个滚动的距离 （100 / 48 = 2）
                    this.startIndex = (startIndex - 2)
                    this.virtualScrollTop = this.startIndex * this.table.virtualItemHeight
                    this.virtualScrollTopTemp = virtualScrollTop
                }
            }

            requestAnimationFrameFn = event => {
                this.scrolling = true
                if (!isScrollY) {
                    const scrollLeft = this.boxRect.left - this.$refs.scrollX.getBoundingClientRect().left
                    if (scrollLeft === this.tableBodyScrollLeft) {
                        isScrollY = true
                    }
                    this.scrollLeft(scrollLeft)
                    this.table.$emit('scroll-horizontal', event)
                } else {
                    this.table.$emit('scroll-vertical', event)
                }

                if (isScrollY) {
                    virtualScrollFn()
                }

                scrollEndFn()
                ticking = false
            }
        }
        // 滚动
        const scrollFn = event => {
            if (this.disabledScrollFn) return
            if (!ticking) {
                // 使用requestAnimationFrame优化性能
                window.requestAnimationFrame(() => {
                    requestAnimationFrameFn(event)
                })
            }
            ticking = true
        }

        scrollBody.addEventListener('scroll', scrollFn)
        // 监听表格大小变化
        const tableResize = debounce(() => {
            const { left } = scrollBody.getBoundingClientRect()
            const { offsetWidth, clientWidth, scrollLeft, scrollWidth } = scrollBody
            // 容器dom信息
            this.boxRect = {
                left,
                scrollWidth,
                clientWidth
            }
            // 设置是否有垂直滚动条
            this.table.setYScrollbar(offsetWidth > clientWidth)
            this.table.scrollbarW = offsetWidth - clientWidth
            this.scrollLeft(scrollLeft)
            fixedRightFn()
        }, 300)
        this.table.$on('*-table-resize', tableResize)
        const that = this
        // 滚动到某一行
        const scrollToRowFn = row => {
            that.disabledScrollFn = true
            const rowOffsetTop = row.$el.offsetTop
            const bodyScrollTop = scrollBody.scrollTop
            const scrollDistance = bodyScrollTop - rowOffsetTop
            this.$utils.animate({
                // 间隔10毫秒执行step函数
                delay: 10,
                // 动画持续的事件 200毫秒
                duration: 200,
                // 帧动画
                step (p) {
                    scrollBody.scrollTop = bodyScrollTop - p * scrollDistance
                },
                // 进度增量函数，直接返回p是匀速
                delta (p) {
                    let np = 1.2 * p
                    return np >= 1 ? 1 : np
                },
                // 动画执行完成回调
                callback () {
                    that.disabledScrollFn = false
                    that.table.setCurrentRow(row.tableDataItem)
                    setTimeout(() => {
                        that.table.setCurrentRow(null)
                    }, 1000)
                }
            })
        }
        this.table.$on('*-scroll-to-row', scrollToRowFn)

        this.$once('hook:beforeDestroy', () => {
            scrollBody.removeEventListener('scroll', scrollFn)
            this.table.$off('*-table-resize', tableResize)
            this.table.$off('*-scroll-to-row', scrollToRowFn)
        })
    }
}
</script>
