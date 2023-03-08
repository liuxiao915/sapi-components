<template>
    <div class="online-chart-rank">
        <simpleBar v-if="data.length" class="online-chart-rank-scrollbar">
            <ul class="online-chart-rank-content">
                <li v-for="(item, idx) in data" :key="idx">
                    <div>
                        <i>{{ idx + 1 }}</i>
                        <span :style="{color: color}">{{ getName(item) }}</span>
                    </div>
                    <span :style="{color: color}">{{ getScore(item) }}</span>
                </li>
            </ul>
        </simpleBar>
        <sapi-nodata v-else></sapi-nodata>
    </div>
</template>

<script>
import SimpleBar from 'simplebar-vue'

export default {
    components: {
        SimpleBar,
        'sapi-nodata': () => import('@/components/sapi-nodata.vue')
    },
    props: {
        data: {
            type: Array,
            default () {
                return []
            }
        },
        props: {
            type: Object,
            default () {
                return {
                    name: 'name',
                    // 名字格式
                    nameFormatter: '{value}',
                    score: 'score',
                    // 分数格式
                    scoreFormatter: '{value}'
                }
            }
        },
        // 字体颜色
        color: {
            type: String,
            default: '#666'
        }
    },
    methods: {
        getName (item) {
            const val = item[this.props.name]
            return this.props.nameFormatter.replace('{value}', val)
        },
        getScore (item) {
            const val = item[this.props.score]
            return this.props.scoreFormatter.replace('{value}', val)
        }
    }
}
</script>
<style lang="less" scoped>
.online-chart-rank {
    width: 100%;
    height: 100%;
    .online-chart-rank-content {
        margin: 0;
        padding: 0;
        list-style: none;
        width: 100%;
        padding-right: 12px;

        > li {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 10px;
            box-sizing: border-box;
            &:first-child {
                margin-top: 11px;
            }
            &:not(:first-child) {
                margin-top: 16px;
            }
            > div {
                flex-grow: 2;
                min-width: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                > i {
                    display: inline-block;
                    background-color: #1990ff;
                    color: #fff;
                    width: 22px;
                    height: 22px;
                    line-height: 22px;
                    text-align: center;
                    font-style: normal;
                    font-size: 14px;
                    border-radius: 50%;
                }
                > span {
                    margin-left: 35px;
                    font-size: 16px;
                    // color: #666;
                }
            }
            > span {
                margin-left: 8px;
                font-size: 16px;
                // color: #666;
            }
        }
    }
}
.online-chart-rank-scrollbar {
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    /deep/ .simplebar-scrollbar:before {
        background-color: rgba(0, 0, 0, 0.2);
    }
}
</style>
