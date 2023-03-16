<template>
    <div class="tree-demo">
        <div class="fullline">
            <div class="fullline"> 复杂的树型 </div>
            <sapi-tree :data="list" @expanded-click="expandedClick" :expandOnClickNode="true" :indent="20"
                :selectAfter="getSelectNode" :lazyLoad="expandedAddChild" :render-content="renderContent"
                :props="defaultProps" :actived-id="treeId" @on-click="handlerClick">
            </sapi-tree>
        </div>

        <div class="fullline">
            <div class="fullline">普遍的树型</div>
            <sapi-tree :uniqueOpened="true" :data="datas" :props="menuProps" :node-id="menuId" @node-click="menuClick">
            </sapi-tree>
        </div>
    </div>
</template>  

<script>
import selectTree from "@/components/sapi-tree";
export default {
    components: {
        "sapi-tree": selectTree
    },
    data() {
        return {
            list: [],
            defaultProps: {
                children: "Children",
                label: "label", //树显示，绑定的字段
                value: "id", //初始化时，value绑定的字段
                hasChild: "HasChild" //后台按需加载关键字段
            },
            treeId: "f3715447-83ec-4cbc-adb6-065ebc30e036", //当前选中的节点value
            menuId: "",
            menuProps: {
                children: "Children",
                label: "MenuName",
                nodeKey: "MenuId"
            },
            datas: [],
            url: "/api/plat/structures/brief",
            params: {
                withDept: true,
                nodeIdKey: "parentStruId"
            }
        };
    },
    methods: {
        expandedClick() {
            console.log(arguments);
        },
        menuClick(data) {
            // console.log(data);
        },
        //label点击事件
        handlerClick(data) {
            // console.log(data);
        },
        //自定义文本
        renderContent(data) {
            //<span>--</span>
            return (
                "<span>" +
                data.StruName +
                "</span><i class='float-right'><span class='click-i'>--</span></i>"
            );
        },
        //自定义label绑定的事件
        renderNodeClick(e, item) {
            var target = e.target;
            if (target.className.indexOf("click-i") > -1) {
                console.log(123);
                console.log(item);
                //禁止冒泡
                /*return false;*/
            }
        },
        getSelectNode(item) {
            console.log(item);
        },
        getData() {
            // children: "Children",
            // label: "StruName", //树显示，绑定的字段
            // value: "StruId", //初始化时，value绑定的字段
            // hasChild: "HasChild" //后台按需加载关键字段
            this.list = [
                {
                    "id": "1",
                    "label": "一级目录1",
                    "value": "0",
                },
                {
                    "id": "2",
                    "label": "二级目录1",
                    "value": "1"
                },
                {
                    "id": "3",
                    "label": "二级目录2",
                    "value": "1"
                },
                {
                    "id": "4",
                    "label": "三级目录1",
                    "value": "2"
                },
                {
                    "id": "5",
                    "label": "三级目录2",
                    "value": "2"
                },
                {
                    "id": "6",
                    "label": "一级目录2",
                    "value": "0"
                },
                {
                    "id": "7",
                    "label": "三极目录3",
                    "value": "3"
                },
                {
                    "id": "8",
                    "label": "四级目录1",
                    "value": "7"
                },
                {
                    "id": "9",
                    "label": "五级目录1",
                    "value": "8"
                }
            ];
        },
        //从后台获取数据追加到到节点子类下
        expandedAddChild(item, callback) {
            this.$get(
                "/api/plat/structures/brief",
                {
                    withDept: true,
                    parentStruId: item.StruId
                },
                function (res) {
                    callback(res);
                }
            );
        }
    },
    mounted() {
        this.getData();
        // this.datas = this.$root.$refs.header.menuList;
        // this.$root.$refs.header.$watch("menuList", (val) => {
        //     this.datas = val;
        // });
    }
};
</script>
	  
<style>
.tree-demo {
    width: 200px;
    max-height: 500px;
    overflow: auto;
}
</style>