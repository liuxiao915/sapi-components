<!--
 @Description: 树形组件添加上下文菜单
 @Author: liux
 @Date: 2023-06-09 16:47:36
 @LastEditTime: 2023-06-09 16:47:36
-->
<template>
    <sapi-tree ref="treeNav" :data="treeData" :props="struProps" :render-content="renderContent" :select-after="activeNode"
        :actived-id="activeNodeId" @on-click="treeNodeClick"></sapi-tree>
    <!--上下文菜单（架构增删改查）-->
    <div class="selector-wrapper" @click="selWrapperClick" @mousewheel.stop="emptyFn" :class="selectorWrapper">
        <div class="drop-down-selector" ref="selectorWrapper" :style="{ left: selectorWrapperLeft, top: selectorWrapperTop }">
            <p class="add-siblings" v-if="struOperatorObj.AddSame !== false" @click="changeHandleType(0)">
                <span>新增同级</span>
            </p>
            <p class="add-children" v-if="struOperatorObj.AddChild !== false" @click="changeHandleType(1)">
                <span>新增子级</span>
            </p>
            <p class="edit-stru" v-if="struOperatorObj.Edit !== false" @click="changeHandleType(2)">
                <span>修改</span>
            </p>
            <p class="delete-stru" v-if="struOperatorObj.Delete !== false" @click="changeHandleType(3)">
                <span>删除</span>
            </p>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            enabledFlag: null,
            treeData: [],
            struProps: {
                children: 'children',
                label: 'name',
                parentId: 'parentSceneId',
                value: 'sceneId',
                hasChild: 'hasChild'
            },
            activeNodeId: null,
            activeTree: {
                name: '',
                sceneId: "",
                parentSceneName: '',
                parentSceneId: "",
                rowNum: null,
                enabledFlag: null
            },
            struOperatorObj: {
                AddSame: false,
                AddChild: false,
                Edit: false,
                Delete: false,
                Browse: false,
                Import: false
            },
            struOperateVisible: false,
            treeOperateOption: {},
            struOperateTitle: "",
            parentActiveNodeId: "",

            selectorWrapper: null,
            selectorWrapperLeft: 0,
            selectorWrapperTop: 0,
            modelCode: null
        };
    },

    watch: {
        selectorWrapper(val) {
            if (val) {
                this.$utils.addClass(this._currActiveIcon, 'node-icon-active')
            } else {
                this.$utils.removeClass(this._currActiveIcon, 'node-icon-active')
            }
        }
    },
    methods: {
        emptyFn() { },
        loadData() {
            this.treeData = [
                {
                    "code": "110",
                    "children": [],
                    "dictDataId": "163a6837-05b0-4718-88b9-5879233fc93b",
                    "parentDictDataId": null,
                    "name": "11"
                },
                {
                    "code": "12345678901234567890123456789012345678901234567890",
                    "children": [
                        {
                            "code": "12345678901234567890123456789012345678901234567891",
                            "children": [],
                            "dictDataId": "7a49834e-9bc3-4937-a87f-a4b495d1dd4a",
                            "parentDictDataId": "a7d44e7d-82dc-4f99-8a22-af19b7f8064c",
                            "name": "12345678901234567890123456789012345678"
                        },
                        {
                            "code": "122",
                            "children": [],
                            "dictDataId": "5f3234d9-9e3c-4ef9-bc74-3283163045f6",
                            "parentDictDataId": "a7d44e7d-82dc-4f99-"
                        }
                    ],
                    "dictDataId": "a7d44e7d-82dc-4f99-8a22-af19b7f8064c",
                    "parentDictDataId": null,
                    "name": "111111111"
                },
                {
                    "code": "11111",
                    "children": [],
                    "dictDataId": "810bceed-3576-4aa3-9b8b-af35e35518ff",
                    "parentDictDataId": null,
                    "name": "1111"
                },
                {
                    "code": "11",
                    "children": [
                        {
                            "code": "22",
                            "children": [
                                {
                                    "code": "33",
                                    "children": [],
                                    "dictDataId": "14bc17dd-2b3a-4d15-9961-5c11e043c464",
                                    "parentDictDataId": "267b985c-e9be-466a-b5ea-75eaec61b9c5",
                                    "name": "33"
                                }
                            ],
                            "dictDataId": "267b985c-e9be-466a-b5ea-75eaec61b9c5",
                            "parentDictDataId": "ae1e7122-31a9-480f-9b7c-63da7a95c67a",
                            "name": "22"
                        },
                        {
                            "code": "4",
                            "children": [],
                            "dictDataId": "98b7f903-9d5f-49a6-88b0-075e94f65e87",
                            "parentDictDataId": "ae1e7122-31a9-480f-9b7c-63da7a95c67a",
                            "name": "4"
                        },
                        {
                            "code": "7897",
                            "children": [],
                            "dictDataId": "1330cf75-8bd6-4d95-ba26-334020a950bc",
                            "parentDictDataId": "ae1e7122-31a9-480f-9b7c-63da7a95c67a",
                            "name": "1221"
                        }
                    ],
                    "dictDataId": "ae1e7122-31a9-480f-9b7c-63da7a95c67a",
                    "parentDictDataId": null,
                    "name": "11"
                },
                {
                    "code": "123",
                    "children": [],
                    "dictDataId": "d47188b3-130d-45e2-9671-1f8249357be0",
                    "parentDictDataId": null,
                    "name": "123"
                },
                {
                    "code": "6545",
                    "children": [
                        {
                            "code": "1233",
                            "children": [],
                            "dictDataId": "179f486b-b51e-4e8a-914a-8fe680257ece",
                            "parentDictDataId": "2798d7af-de25-412e-8338-d553145b1d81",
                            "name": "123"
                        },
                        {
                            "code": "12333",
                            "children": [],
                            "dictDataId": "822686db-6269-42e4-b5af-fe08b153275b",
                            "parentDictDataId": "2798d7af-de25-412e-8338-d553145b1d81",
                            "name": "1233"
                        }
                    ],
                    "dictDataId": "2798d7af-de25-412e-8338-d553145b1d81",
                    "parentDictDataId": null,
                    "name": "6545"
                },
                {
                    "code": "12313213",
                    "children": [],
                    "dictDataId": "4f56f741-aaab-4f9d-bb0c-617e9499518f",
                    "parentDictDataId": null,
                    "name": "13123213"
                }
            ]
            // 第一次加载默认选中首节点
            if (!this.activeNodeId && this.treeData.length > 0) {
                this.$nextTick(() => {
                    this.$refs.treeNav && this.$refs.treeNav.defaultExpandNode();
                    // 初始化选中
                    this.activeNodeId = this.treeData[0].sceneId;
                });
            }
        },

        // 点击下三角，渲染内容如下
        renderContent(data) {
            var struName = data[this.struProps.label];
            var iconHtml = "<font>N</font>",
                className = 'treeNode treeRoot',
                iconNode;

            // 架构可以进行新增、修改、删除、查看
            iconNode = "<i class='nodeIcon add-btn-span icon-ellipsis' @click='loadContextMenu'></i>";
            // 这里有两种返回方式，第一种就是直接返回html字符串，另外一种是返回一个对象，比如{html:'<div></div>',vm:this}
            // 这里vm需要返回的原因是：renderContent距离sapi-tree太远，难以定位，（假如renderContent定义跟sapi-tree引入不在同一个组件，必须使用该方式）
            return {
                html: `<div class='${className}'>${iconHtml}<span title='${struName}' class='text'>${struName}</span>${iconNode}</div>`,
                vm: this
            };
        },
        // 架构操作按钮
        loadContextMenu(data, e) {
            if (data.parentSceneId) {
                this.struOperatorObj = {
                    AddSame: true,
                    AddChild: false,
                    Edit: true,
                    Delete: true
                };
            } else {
                this.struOperatorObj = {
                    AddSame: true,
                    AddChild: true,
                    Edit: true,
                    Delete: true
                };
            }

            // 初始化当前选中的节点信息
            this.activeNode(data);
            var bodyHeight = document.body.clientHeight - 217;
            this._currActiveIcon = e.target
            var x = e.clientX - 90;
            var y = e.clientY + 26;

            this.selectorWrapper = "active";
            this.selectorWrapperLeft = x + "px";
            this.selectorWrapperTop = y + "px";
            if (y < bodyHeight) {
                return;
            }
            this.$nextTick(function () {
                var drop = this.$refs.selectorWrapper;
                y -= drop.clientHeight + 46;
                this.selectorWrapperTop = y + "px";
                let className = " upDropNode";
                this.selectorWrapper = "active" + className;
            });
        },
        selWrapperClick(e) {
            this.selectorWrapper = null;
        },
        // 点击架构，加载岗位
        treeNodeClick(data, e) {
            console.log(data)
            
            // 初始化当前选中节点信息，后续需用到
            this.activeNode(data);
        },
        // 当前初始化节点
        activeNode(node) {
            this.activeTree = node;
            // 激活当前节点
            this.activeNodeId = node.sceneId
        },
        changeHandleType(type) {
            this.parentActiveNodeId = null; // 用于新增、修改后架构的刷新
            this.treeOperateOption = {};
            switch (type) {
                case 0: // 新增同级
                case 1: // 新增子级
                    this.struOperateVisible = true;
                    if (type === 0) {
                        this.struOperateTitle = "新增同级";
                        this.treeOperateOption = {
                            parentSceneId: this.activeTree.parentSceneId,
                            name: this.activeTree.name,
                            parentSceneName: this.activeTree.parentSceneName,
                            sceneId: this.sceneId,
                            rowNum: this.activeTree.rowNum,
                            enabledFlag: this.activeTree.enabledFlag,
                            modelCode: this.activeTree.modelCode
                        }
                        this.parentActiveNodeId = this.activeTree.parentSceneId;
                    } else {
                        this.treeOperateOption = {
                            parentSceneId: this.activeTree.sceneId,
                            name: this.activeTree.name,
                            parentSceneName: this.activeTree.name,
                            sceneId: this.sceneId,
                            rowNum: this.activeTree.rowNum,
                            enabledFlag: this.activeTree.enabledFlag,
                            modelCode: this.activeTree.modelCode
                        }

                        this.struOperateTitle = "新增子级";
                    }
                    break;
                case 2: // 修改
                    
                    break;
                case 3: // 删除
                    this.struOperateVisible = false;
                    this.parentActiveNodeId = this.activeTree.parentSceneId;
                    break;
            }
        },
        loadPage() {
            this.modelCode = '';
            this.activeNodeId = null;
            this.loadData();
        }
    },
    created() {
        this.loadPage()
    }
};
</script>

<style lang="less">
@import './index.less';
.use-footer-btns {
    margin-bottom: 0;
}
.sapi-tree {
    width: 250px;
}
.icon-ellipsis {
    transform: rotate(90deg);
}
</style>
