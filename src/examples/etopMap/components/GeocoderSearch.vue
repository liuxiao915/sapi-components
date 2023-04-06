<template>
    <div class="geoCoder-search-main">
        <div :class="['geoCoder-search-content', this.activeStatus ? 'search-content-open' : '']">
            <div class="search-form">
                <div class="search-arrow-icon" @click="searchIconClick">
                    <span></span>
                </div>
                <input type="text" placeholder="搜索" v-model="keyword" />
            </div>
            <div class="search-icon-btn" @click="searchIconClick"></div>
        </div>
        <div class="geoCoder-render-list" :style="renderListDynamicStyle">
            <div :title="team.name" class="geoCoder-render-team" v-for="(team) in searchList" :key="team.std_addr_id"
                @click="() => flyTo(team)">
                {{ team.name }}
            </div>
            <div class="geoCoder-render-team" v-if="notFoundTips">未检索出信息</div>
        </div>
    </div>
</template>

<script>
import axios from '@/hooks/axios'
import * as mars3d from 'mars3d'
import iconLocatePng from '../images/etop/icon_locate.png'

export default {
    name: 'GeocoderSearch',
    data() {
        return {
            keyword: '',
            activeStatus: false,
            popupStatus: false,
            searchList: [],
            graphicLayer: null,
            notFoundTips: false,
        }
    },
    computed: {
        inputDynamicStyle() {
            return this.activeStatus ? {
                border: '1px solid rgba(84, 181, 255, 0.3)',
                borderRight: '0',
                width: '200px'
            } : {
                width: '0px',
                border: 'none',
                borderRight: '0',
                padding: '0',
            }
        },
        renderListDynamicStyle() {
            return this.popupStatus ? {
                maxHeight: '385px',
            } : {
                maxHeight: '0px',
                border: 'none'
            }
        }
    },
    methods: {
        searchIconClick() {
            this.activeStatus = !this.activeStatus;
            this.$emit('changeSearchStatus',this.activeStatus)

            this.popupStatus = false;
            this.keyword = '';

            this.initGraphicLayer()
        },
        async searchService(val) {
            this.notFoundTips = false;
            const { data } = await axios({
                url: 'http://10.253.102.69/gw/COMMON/addrMatch',
                method: "post",
                headers: {
                    'szvsud-license-key': 'yO+ChHjBx7FZmtGQnUVVCVe8JcKfj0ggEmqjUkBrTOEk9EF+j3Nk65pqSo5W8+Qz'
                },
                data: {
                    query: val,
                    ak: "ebf48ecaa1fd436fa3d40c4600aa051f",
                    region: 440300
                }
            }).catch(() => this.notFoundTips = true)

            this.searchList = data?.result || []

            if (!this.searchList.length) this.notFoundTips = true
        },
        async flyTo(team) {
            const { lng, lat } = team.location || {};

            this.keyword = team.name;

            window.etopMap.map.setCameraView({ lng, lat, alt: 3025 })

            this.graphicLayer.clear();
            this.addBillboardEntity({ lng, lat })

            const res = await window.etopMap.getBorderFeatureByPoint([lng, lat], "community")

            this.$emit('updateRegionSwitcher', res)
        },
        initGraphicLayer() {
            if (this.graphicLayer) return;

            this.graphicLayer = new mars3d.layer.GraphicLayer()
            window.etopMap.map.addLayer(this.graphicLayer)
        },
        addBillboardEntity({ lng, lat }) {
            const graphic = new mars3d.graphic.BillboardEntity({
                position: new mars3d.LngLatPoint(lng, lat, 0),
                style: {
                    image: iconLocatePng,
                    scale: 1,
                    pixelOffset: new mars3d.Cesium.Cartesian2(0, 0) // 偏移量
                },
            })

            this.graphicLayer.addGraphic(graphic)
        },
    },
    watch: {
        keyword(val) {
            if (val) {
                this.popupStatus = true;
                this.searchService(val)
            } else {
                this.popupStatus = false;
                this.searchList = [];
                this.graphicLayer && this.graphicLayer.clear();
            }
        },
        activeStatus(val) {
          if (!val && this.graphicLayer) this.graphicLayer.clear();
        }
    }
}
</script>

<style lang="less" scoped>
.geoCoder-search-main {
    display: inline-block;
    position: relative;

    .geoCoder-search-content {
        display: flex;

        .search-form {
            display: flex;

            .search-arrow-icon {
                width: 0px;
                display: none;
                background-color: rgba(11, 36, 68, 0.8);
                cursor: pointer;
                position: relative;

                span {
                    display: inline-block;
                    border-width: 5px 5px;
                    border-color: transparent;
                    border-style: solid;
                    border-left-color: #54B5FF;
                    position: absolute;
                    top: 10px;
                    left: 7px;
                }
            }

            input {
                overflow: hidden;
                height: 32px;
                color: #54b5ff;
                box-sizing: border-box;
                outline: none;
                background-color: rgba(11, 36, 68, 0.8);
                caret-color: #fff;
                transition: all .5s;
                width: 0px;
                padding: 0;
                border: none;

                &::placeholder {
                    color: #54b5ff;
                }
            }
        }
    }

    .search-content-open {
        .search-form {
            
            .search-arrow-icon {
                display: block;
                width: 20px;
                background-color: rgba(11, 36, 68, 0.8);
                border: 1px solid rgba(84, 181, 255, 0.3);
                border-right: none;
            }

            input {
                border: 1px solid rgba(84, 181, 255, 0.3);
                border-right: 0;
                width: 188px;
                padding-left: 10px;
            }
        }

    }

    .search-icon-btn {
        cursor: pointer;
        background-image: url(../images/etop/icon_search.png);
        border: 1px solid rgba(84, 181, 255, 0.3);
        background-color: rgba(11, 36, 68, 0.8);
        width: 32px;
        height: 32px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .geoCoder-render-list {
        transition: all .5s;
        overflow: hidden;
        position: absolute;
        top: 30px;
        width: 100%;
        box-sizing: border-box;
        color: #54b5ff;
        border: 1px solid rgba(84, 181, 255, 0.3);
        border-top: none;
        background-color: rgba(11, 11, 43, 0.9);
        overflow-y: auto;

        &::-webkit-scrollbar-thumb {
            border-radius: 3px;
            background: #008FFF;
        }

        &::-webkit-scrollbar {
            width: 5px;
        }

        .geoCoder-render-team {
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            &:hover {
                color: #54b5ff;
                background-color: #1f4a7c;
            }
        }
    }
}
</style>
