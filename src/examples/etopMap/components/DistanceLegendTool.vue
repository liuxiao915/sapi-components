<template>
    <div v-if="distance" id="distance-legend-tool">
        <div class='distance-legend-content'>
            <div class="distance-legend-text">
                {{ distanceText }}
            </div>
            <div class="distance-legend-line" :style="{ width: `${widthLength}px` }">
                <div class="distance-legend-border" />
            </div>
        </div>
    </div>
</template>

<script>
import * as mars3d from 'mars3d'
import ResizeObserver from 'resize-observer-polyfill';
export default {
    data() {
        return {
            map: null,
            distanceLegend: null,
            distance: 0, // 比例尺尺寸
            widthLength: 0, // 
        }
    },
    computed: {
        // 比例尺文本
        distanceText() {
            const { distance } = this;

            const isThousand = (distance / 1000) >= 1;

            return isThousand ? `${(distance / 1000)} km` : `${distance} m`
        }
    },
    methods: {
        init(map) {
            this.map = map;
            this.addDistanceLegend()
        },
        updateLegendScaleBarLength() {
            const legendScaleBar = document.querySelector(`.mars3d-container .mars3d-distance-legend .legend-scale-bar`)

            const width = parseInt(legendScaleBar.style.width)

            this.widthLength = isNaN(width) ? 0 : width
        },
        // 初始化比例尺
        addDistanceLegend() {
            this.distanceLegend = new mars3d.control.DistanceLegend({
                left: "0.10vw",
                bottom: "6.5vh",
            });
            // 初始比 例尺尺寸 数赋值
            this.distance = this.distanceLegend.distance || 0;

            // 监听比例尺
            this.distanceLegend.on(mars3d.EventType.change, (Event) => {
                this.distance = Event.distance;

                this.$emit('distanceLegendChange', Event);
            })

            this.map.addControl(this.distanceLegend);

            const legendScaleBar = document.querySelector(`.mars3d-container .mars3d-distance-legend .legend-scale-bar`)

            const observer = new ResizeObserver((mutationsList) => {
                const [record] = mutationsList;
                if (record?.attributeName === 'style') this.updateLegendScaleBarLength()
            });

            observer.observe(legendScaleBar, { attributes: true });
        }
    }
}
</script>

<style lang="less" scoped>
#distance-legend-tool {
    position: absolute;
    user-select: none;
    //bottom: 19px;
    //left: 90px;
    left:72px;
    bottom:0;

    .distance-legend-content {
        font-size: 12px;
        width: 120px;
        padding: 2px 5px;
        border-radius: 2px;
        color: #54b5ff;
        border: 1px solid rgba(84, 181, 255, 0.3);
        background-color: rgba(11, 36, 68, 0.8);
    }

    .distance-legend-text {
        min-height: 20px;
        text-align: center;
    }

    .distance-legend-line {
        margin: 0 auto;
        height: 4px;
        border-left: 2px solid #54b5ff;
        border-right: 2px solid #54b5ff;
        padding: 1px 0;

        .distance-legend-border {
            height: 2px;
            background-color: #54b5ff;
        }
    }
}
</style>
