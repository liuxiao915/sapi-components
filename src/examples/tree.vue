<template>
  <div class="tree-demo">
    <div class="fullline">
      <div class="fullline"> 复杂的树型 </div>
      <!--:expanded - add - child = "expandedAddChild"-->
      <sapi-tree :data="list" @expanded-click="expandedClick" :expandOnClickNode="true" :indent="20" :selectAfter="getSelectNode" :lazyLoad="expandedAddChild" :render-content="renderContent" :props="defaultProps" :actived-id="treeId" @on-click="handlerClick">
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
                label: "StruName", //树显示，绑定的字段
                value: "StruId", //初始化时，value绑定的字段
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
            var url = "/api/plat/structures/brief";
            if (this.treeId) {
                url = "/api/plat/structures/{struId}/parentAndSiblings";
            }

            this.$get(
                url,
                {
                    withDept: true,
                    struId: this.treeId
                },
                function(res) {
                    this.list = res;
                }
            );
        },
        //从后台获取数据追加到到节点子类下
        expandedAddChild(item, callback) {
            this.$get(
                "/api/plat/structures/brief",
                {
                    withDept: true,
                    parentStruId: item.StruId
                },
                function(res) {
                    callback(res);
                }
            );
        }
    },
    created() {},
    mounted() {
        this.getData();
        var _this = this;

        _this.datas = this.$root.$refs.header.menuList;

        this.$root.$refs.header.$watch("menuList", function(val) {
            _this.datas = val;
        });
    },
    watch: {
        list(val) {
            console.log(val);
        }
    }
};
</script>
	  
<style>
.tree-demo {
    width: 90%;
    max-height: 500px;
    overflow: auto;
}
</style>