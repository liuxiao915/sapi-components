<template>
    <div @mouseover="mouseover" :class="'sapi-scrollbar__wrapper' + (this.classes ? ' ' + this.classes : '')"
        ref="scrollWrapper" :style="this.styles">
        <div :class="'sapi-scrollbar__area' + (this.dragging ? ' ' : ' sapi-scrollbar-transition')" ref="scrollArea"
            @wheel="scroll" @touchstart="startDrag" @touchmove="onDrag" @touchend="stopDrag" :style="{
                marginTop: this.top * -1 + 'px',
                marginLeft: this.left * -1 + 'px'
            }">
            <slot></slot>
            <component v-if="ready" :is="verticalView" :area="{ height: scrollAreaHeight }"
                :wrapper="{ height: scrollWrapperHeight }" :scrolling="vMovement" :dragging-from-parent="dragging"
                :on-change-position="handleChangePosition" :on-dragging="handleScrollbarDragging"
                :on-stop-drag="handleScrollbarStopDrag">
            </component>
            <component v-if="ready" :is="horizontalView" :area="{ width: scrollAreaWidth }"
                :wrapper="{ width: scrollWrapperWidth }" :scrolling="hMovement" :dragging-from-parent="dragging"
                :on-change-position="handleChangePosition" :on-dragging="handleScrollbarDragging"
                :on-stop-drag="handleScrollbarStopDrag">
            </component>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sapi-scroll',
    props: {
        classes: String,
        styles: Object,
        speed: {
            type: Number,
            default: 80
        },
        onMaxScroll: Function,
        direction: {
            type: String,
            default: 'vertical'
        },
        resizeable: Boolean
    },

    components: {
        VerticalScrollbar() {
            return import('./vertical-scrollbar.vue');
        },
        HorizontalScrollbar() {
            return import('./horizontal-scrollbar.vue');
        }
    },
    data() {
        return {
            ready: false,
            top: 0,
            left: 0,
            scrollAreaHeight: null,
            scrollAreaWidth: null,
            scrollWrapperHeight: null,
            scrollWrapperWidth: null,
            vMovement: 0,
            hMovement: 0,
            dragging: false,
            start: {
                y: 0,
                x: 0
            },
            allowBodyScroll: false,

            verticalView: null,
            horizontalView: null,
            timeout: null
        };
    },

    methods: {
        mouseover() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.calculateSize();
            }, 300);
        },
        scroll(e) {
            // Make sure the content height is not changed
            this.calculateSize(() => {
                // Set the wheel step
                let num = this.speed;
                // DOM events
                let shifted = e.shiftKey;
                let scrollY = e.deltaY > 0 ? num : -num;
                let scrollX = e.deltaX > 0 ? num : -num;
                // Fix Mozilla Shifted Wheel~
                if (shifted && e.deltaX == 0) { scrollX = e.deltaY > 0 ? num : -num; }
                // Next Value
                let nextY = this.top + scrollY;
                let nextX = this.left + scrollX;
                // Is it Scrollable?
                let canScrollY =
                    this.scrollAreaHeight > this.scrollWrapperHeight;
                let canScrollX = this.scrollAreaWidth > this.scrollWrapperWidth;
                // Vertical Scrolling
                if (canScrollY && !shifted) this.normalizeVertical(nextY);
                // Horizontal Scrolling
                if (shifted && canScrollX) this.normalizeHorizontal(nextX);
            });
            // prevent Default only if scrolled content is not at the top/bottom
            if (!this.allowBodyScroll) {
                e.preventDefault();
                e.stopPropagation();
            }
        },

        // DRAG EVENT JUST FOR TOUCH DEVICE~
        startDrag(e) {
            this.touchEvent = e;
            const evt = e.changedTouches ? e.changedTouches[0] : e;
            // Make sure the content height is not changed
            this.calculateSize(() => {
                // Prepare to drag
                (this.dragging = true),
                    (this.start = {
                        y: evt.pageY,
                        x: evt.pageX
                    });
            });
        },

        onDrag(e) {
            if (this.dragging) {
                e.preventDefault();
                e.stopPropagation();
                // Prevent Click Event When it dragging
                if (this.touchEvent) {
                    this.touchEvent.preventDefault();
                    this.touchEvent.stopPropagation();
                }
                let evt = e.changedTouches ? e.changedTouches[0] : e;

                // Invers the Movement
                let yMovement = this.start.y - evt.clientY;
                let xMovement = this.start.x - evt.clientX;

                // Update the last e.client
                this.start = {
                    y: evt.clientY,
                    x: evt.clientX
                };
                // The next Vertical Value will be
                let nextY = this.top + yMovement;
                let nextX = this.left + xMovement;
                this.normalizeVertical(nextY);
                this.normalizeHorizontal(nextX);
            }
        },

        stopDrag(e) {
            this.dragging = false;
            this.touchEvent = false;
        },
        scrollToY(y) {
            this.normalizeVertical(y);
        },
        scrollToX(x) {
            this.normalizeHorizontal(x);
        },

        normalizeVertical(next) {
            if (this.top === next) {
                return;
            }
            const elementSize = this.getSize();
            // Vertical Scrolling
            const lowerEnd = elementSize.scrollAreaHeight - elementSize.scrollWrapperHeight;
            // Max Scroll Down
            const maxBottom = next > lowerEnd;
            if (maxBottom) next = lowerEnd;
            // Max Scroll Up
            const maxTop = next < 0;
            if (maxTop) next = 0;
            // Update the Vertical Value if it's needed
            const shouldScroll = this.top !== next;
            this.allowBodyScroll = !shouldScroll;
            if (shouldScroll) {
                (this.top = next),
                    (this.vMovement = next / elementSize.scrollAreaHeight * 100 || 0);
                if (this.onMaxScroll && (maxTop || maxBottom)) {
                    this.onMaxScroll({
                        top: maxTop,
                        bottom: maxBottom,
                        right: false,
                        left: false
                    });
                }
            }
        },

        normalizeHorizontal(next) {
            const elementSize = this.getSize();
            // Horizontal Scrolling
            const rightEnd = elementSize.scrollAreaWidth - this.scrollWrapperWidth;
            // Max Scroll Right
            const maxRight = next > rightEnd;
            if (maxRight) next = rightEnd;

            // Max Scroll Left
            const maxLeft = next < 0;
            if (next < 0) next = 0;

            // Update the Horizontal Value
            const shouldScroll = this.left !== next;
            this.allowBodyScroll = !shouldScroll;
            if (shouldScroll) {
                (this.left = next), (this.hMovement = next / elementSize.scrollAreaWidth * 100 || 0);
                if (this.onMaxScroll && (maxRight || maxLeft)) {
                    this.onMaxScroll({
                        right: maxRight,
                        left: maxLeft,
                        top: false,
                        bottom: false
                    });
                }
            }
        },

        handleChangePosition(movement, orientation) {
            // Make sure the content height is not changed
            this.calculateSize(() => {
                // Convert Percentage to Pixel
                let next = movement / 100;
                if (orientation === 'vertical') { this.normalizeVertical(next * this.scrollAreaHeight); }
                if (orientation === 'horizontal') { this.normalizeHorizontal(next * this.scrollAreaWidth); }
            });
        },

        handleScrollbarDragging() {
            this.dragging = true;
        },

        handleScrollbarStopDrag() {
            this.dragging = false;
        },

        getSize() {
            // The Elements
            let $scrollArea = this.$refs.scrollArea;
            let $scrollWrapper = this.$refs.scrollWrapper;
            if($scrollWrapper) {
                // Get new Elements Size
                let elementSize = {
                    // Scroll Area Height and Width
                    scrollAreaHeight: $scrollArea.clientHeight,
                    scrollAreaWidth: $scrollArea.clientWidth,
    
                    // Scroll Wrapper Height and Width
                    scrollWrapperHeight: $scrollWrapper.clientHeight,
                    scrollWrapperWidth: $scrollWrapper.clientWidth
                };
                return elementSize;
            }
        },

        calculateSize(cb) {
            if (typeof cb !== 'function') cb = null;
            let elementSize = this.getSize();
            if (
                elementSize.scrollWrapperHeight !== this.scrollWrapperHeight ||
                elementSize.scrollWrapperWidth !== this.scrollWrapperWidth ||
                elementSize.scrollAreaHeight !== this.scrollAreaHeight ||
                elementSize.scrollAreaWidth !== this.scrollAreaWidth
            ) {
                if (
                    elementSize.scrollWrapperHeight /
                    elementSize.scrollAreaHeight > 1
                ) {
                    this.scrollToY(0);
                } else if (this.top > elementSize.scrollAreaHeight - 10) {
                    this.scrollToY(elementSize.scrollAreaHeight);
                }

                if (
                    elementSize.scrollWrapperWidth /
                    elementSize.scrollAreaWidth >
                    1
                ) {
                    this.scrollToX(0);
                }

                // Scroll Area Height and Width
                (this.scrollAreaHeight = elementSize.scrollAreaHeight),
                    (this.scrollAreaWidth = elementSize.scrollAreaWidth),
                    // Scroll Wrapper Height and Width
                    (this.scrollWrapperHeight =
                        elementSize.scrollWrapperHeight),
                    (this.scrollWrapperWidth = elementSize.scrollWrapperWidth),
                    // Make sure The wrapper is Ready, then render the scrollbar
                    (this.ready = true);

                return cb ? cb() : false;
            } else return cb ? cb() : false;
        }
    },
    created() {
        switch (this.direction) {
            case 'vertical':
                this.verticalView = 'VerticalScrollbar';
                break;
            case 'horizontal':
                this.horizontalView = 'HorizontalScrollbar';
                break;
            default:
                this.verticalView = 'VerticalScrollbar';
                this.horizontalView = 'HorizontalScrollbar';
                break;
        }
    },
    mounted() {
        this.$nextTick(() => {
            // Attach The Event for Responsive View~
            this.resizeable !== false && window.addEventListener('resize', this.calculateSize);
        });
    },

    beforeDestroy() {
        // Remove Event
        this.resizeable !== false &&
            window.removeEventListener('resize', this.calculateSize);
    }
};
</script>

<style>
.sapi-scrollbar-transition,
.sapi-scrollbar__scrollbar-vertical,
.sapi-scrollbar__scrollbar-horizontal {
    transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
}

.sapi-scrollbar-transition--scrollbar {
    transition: opacity 0.2s linear;
    -moz-transition: opacity 0.2s linear;
    -webkit-transition: opacity 0.2s linear;
    -o-transition: opacity 0.2s linear;
}

.sapi-scrollbar__wrapper {
    overflow: hidden !important;
    position: relative;
    background: white;
}

.sapi-scrollbar__wrapper:hover .sapi-scrollbar__scrollbar-vertical,
.sapi-scrollbar__wrapper:hover .sapi-scrollbar__scrollbar-horizontal {
    opacity: 1;
}

.sapi-scrollbar__scrollbar-vertical,
.sapi-scrollbar__scrollbar-horizontal {
    opacity: 0;
    position: absolute;
    background: transparent;
}

.sapi-scrollbar__scrollbar-vertical .scrollbar,
.sapi-scrollbar__scrollbar-horizontal .scrollbar {
    position: relative;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    cursor: pointer;
}

.sapi-scrollbar__scrollbar-vertical .scrollbar:hover,
.sapi-scrollbar__scrollbar-horizontal .scrollbar:hover {
    background: rgba(0, 0, 0, 0.3);
}

.sapi-scrollbar__scrollbar-vertical {
    width: 6px;
    height: 100%;
    top: 0;
    right: 0;
}

.sapi-scrollbar__scrollbar-vertical .scrollbar {
    min-height: 10px;
    width: 6px;
}

.sapi-scrollbar__scrollbar-horizontal {
    height: 6px;
    width: 100%;
    bottom: 0;
    right: 0;
}

.sapi-scrollbar__scrollbar-horizontal .scrollbar {
    height: 6px;
}</style>
