<template>
  <div class="tree-box">
    <div id="my-tree" class="treeItem">虚拟根节点0</div>
  </div>
</template>

<script>
export default {
  name: 'myTree',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    var list = [{
      "id": "1",
      "name": "一级目录1",
      "fatherId": "0",
    },
    {
      "id": "2",
      "name": "二级目录1",
      "fatherId": "1"
    },
    {
      "id": "3",
      "name": "二级目录2",
      "fatherId": "1"
    },
    {
      "id": "4",
      "name": "三级目录1",
      "fatherId": "2"
    },
    {
      "id": "5",
      "name": "三级目录2",
      "fatherId": "2"
    },
    {
      "id": "6",
      "name": "一级目录2",
      "fatherId": "0"
    },
    {
      "id": "7",
      "name": "三极目录3",
      "fatherId": "3"
    },
    {
      "id": "8",
      "name": "四级目录1",
      "fatherId": "7"
    },
    {
      "id": "9",
      "name": "五级目录1",
      "fatherId": "8"
    }
    ];
    function MyTree(list, rootId) {
      this.list = JSON.parse(JSON.stringify(list));
      this.rootId = rootId;
      this.nodesMap = {};
      this.treeData = [];
    }

    MyTree.prototype = {
      init: function () {
        this.treeData = this.initTreeData(this.list);
        for (let i = 0; i < this.treeData.length; i++) {
          this.createDom(this.treeData[i]);
        }
      },
      // 将数组初始化为树结构
      initTreeData: function (arr) {
        for (let i = 0; i < arr.length; i++) this.nodesMap[arr[i].id] = arr[i];
        let reArr = [];
        for (let i = 0; i < arr.length; i++) {
          arr[i]['showChilds'] = true;
          if (!this.nodesMap[arr[i].fatherId]) reArr.push(arr[i]);
          else {
            let fatherNode = this.nodesMap[arr[i].fatherId];
            fatherNode.childs = fatherNode.childs || [];
            fatherNode.childs.push(arr[i]);
          }
        }
        return reArr;
      },

      // 根据数组渲染树
      createDom: function (data) {
        let self = this;
        let fatherDom = document.getElementById(`${this.rootId}-my-tree-${data.fatherId}`);
        // 虚拟根节点
        if (!fatherDom) fatherDom = document.getElementById(this.rootId);
        let dom = document.createElement("div");
        dom.id = `${this.rootId}-my-tree-${data.id}`;
        dom.className = 'treeItem';
        let iconDom = document.createElement("div");
        iconDom.id = `${this.rootId}-my-tree-icon-${data.id}`;
        iconDom.className = "itemIcon";
        iconDom.innerHTML = "-";
        // if (data.showChilds) iconDom.innerHTML = "-";
        // else iconDom.innerHTML = "+";
        dom.appendChild(iconDom);
        dom.innerHTML += data.name;
        fatherDom.appendChild(dom);
        iconDom = document.getElementById(`${this.rootId}-my-tree-icon-${data.id}`);
        iconDom.onclick = function () {
          self.iconClickHandler(iconDom);
        };
        // 递归渲染子树
        if (data.childs && data.childs.length > 0) {
          for (let i = 0; i < data.childs.length; i++) this.createDom(data.childs[i]);
        }
      },

      iconClickHandler(dom) {
        if (!dom || !dom.id) return;
        let id = dom.id;
        if (id.indexOf("my-tree-icon-") == -1) return;
        id = id.substring(id.indexOf("my-tree-icon-") + 13);
        let node = this.nodesMap[id];
        if (!node) return;
        if (node.showChilds) {
          this.hideHandler(dom);
          dom.innerHTML = "+";
        } else {
          this.showHandler(dom);
          dom.innerHTML = "-";
        }
      },

      // 隐藏子树
      hideHandler: function (dom) {
        if (!dom || !dom.id) return;
        let id = dom.id;
        if (id.indexOf("my-tree-icon-") == -1) return;
        id = id.substring(id.indexOf("my-tree-icon-") + 13);
        let node = this.nodesMap[id];
        if (!node) return;
        let childs = node.childs;
        if (!childs) return;
        node.showChilds = false;
        for (let i = 0; i < childs.length; i++) {
          let childDom = document.getElementById(`${this.rootId}-my-tree-${childs[i].id}`);
          if (!childDom) continue;
          childDom.style.display = 'none';
          let childIconDom = document.getElementById(`${this.rootId}-my-tree-icon-${childs[i].id}`);
          this.hideHandler(childIconDom);
        }
      },

      // 渲染子树
      showHandler: function (dom) {
        if (!dom || !dom.id) return;
        let id = dom.id;
        if (id.indexOf("my-tree-icon-") == -1) return;
        id = id.substring(id.indexOf("my-tree-icon-") + 13);
        let node = this.nodesMap[id];
        if (!node) return;
        let childs = node.childs;
        if (!childs) return;
        node.showChilds = true;
        for (let i = 0; i < childs.length; i++) {
          let childDom = document.getElementById(`${this.rootId}-my-tree-${childs[i].id}`);
          if (!childDom) continue;
          childDom.style.display = 'block';
          let childIconDom = document.getElementById(`${this.rootId}-my-tree-icon-${childs[i].id}`);
          // let childNode = this.nodesMap[childs[i].id];
          childIconDom.innerHTML = "+";
          // 递归渲染子树
          this.hideHandler(childIconDom);
        }
      }
    }

    var myTree = new MyTree(list, "my-tree");
    myTree.init();
    return {}
  }
}
</script>

<style lang="less" scoped>
.tree-box {
  display: inline-block;
  height: 100px;
  width: 100px;
}
</style>
