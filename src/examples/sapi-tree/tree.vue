<!--
 @Description: 树形组件添加上下文菜单
 @Author: liux
 @Date: 2023-06-09 16:47:36
 @LastEditTime: 2023-06-09 16:47:36
-->
<template>
  <sapi-tree ref="treeNav"
      :data="treeData" 
      :props="struProps"
      :render-content="renderContent"
      :select-after="activeNode"
      :actived-id="activeNodeId"
      @on-click="treeNodeClick"></sapi-tree>

    <!--上下文菜单（架构增删改查）-->
  <div class="selector-wrapper" @click="selWrapperClick" @mousewheel.stop="emptyFn" :class="selectorWrapper">
      <div class="drop-down-selector" ref="selectorWrapper" :style="{left:selectorWrapperLeft,top:selectorWrapperTop}">
          <p class="add-siblings" v-if="permissions.ADD && struOperatorObj.AddSame!==false" @click="changeHandleType(0)">
              <img src="~@/static/images/add-same.png" />
              <span v-text="$t('structure.addStruSiblingTitle')"></span>
          </p>
          <p class="add-children" v-if="permissions.ADD  && struOperatorObj.AddChild!==false" @click="changeHandleType(1)">
              <img src="~@/static/images/add-next.png" />
              <span v-text="$t('structure.addStruChildTitle')"></span>
          </p>
          <p class="edit-stru" v-if="permissions.UPDATE && struOperatorObj.Edit!==false" @click="changeHandleType(2)">
              <img src="~@/static/images/stru-edit.png" />
              <span v-text="$t('structure.editStruTitle')"></span>
          </p>
          <p class="delete-stru" v-if="permissions.DELETE && struOperatorObj.Delete!==false" @click="changeHandleType(3)">
              <img src="~@/static/images/stru-delete.png" />
              <span v-text="$t('structure.delStruTitle')"></span>
          </p>
      </div>
  </div>
</template>
<script>

export default {
  data() {
      return {
          apiParams: {
              searchValue: '',
              containsChild: false
          },
          enabledFlag: null,
          treeId: null,
          treeData: [],
          struProps: {
              children: 'children',
              label: 'sceneName',
              parentId: 'parentSceneId',
              value: 'sceneId',
              hasChild: 'hasChild'
          },
          activeNodeId: null,
          activeTree: {
              sceneName: '',
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
          struOperateView: "",
          currentView: null,
          struOperateVisible: false,
          treeOperateOption: {},
          struOperateTitle: "",
          parentActiveNodeId: "",

          selectorWrapper: null,
          selectorWrapperLeft: 0,
          selectorWrapperTop: 0,
          stationRefresh: false,
          pagename: '情景管理',
          modelCode: null
      };
  },
 
  watch: {
      selectorWrapper (val) {
          if(val) {
              this.$utils.addClass(this._currActiveIcon, 'node-icon-active')
          } else {
              this.$utils.removeClass(this._currActiveIcon, 'node-icon-active')
          }
      },
      '$route' (to, from) {
          if (to.name === from.name) {
              this.loadPage()
          }
      }
  },
  methods: {
      emptyFn() {},
      loadData() {
          this.$get(`${this.$webConfig.domBaseUrl}/${this.$webConfig.domVersion}/scenes/trees`, {
              enabledFlag: this.enabledFlag,
              modelCode: this.modelCode
          }, function (res) {
              this.treeData = res;
              if (!this.treeData || this.treeData.length === 0) {
                  this.formTypeDetail = {
                      pagename: this.pagename
                  }
                  this.currentView = "type-first";
                  return;
              }
              // 第一次加载默认选中首节点
              if (!this.activeNodeId && this.treeData.length > 0) {
                  this.$nextTick(() => {
                      this.$refs.treeNav && this.$refs.treeNav.defaultExpandNode();
                      // 初始化选中
                      this.activeNodeId = this.treeData[0].sceneId;
                      this.getNodeInfo(this.treeData[0].sceneId);
                  });
              }
              if(this.activeNodeId) {
                  this.getNodeInfo(this.activeNodeId);
              }
              this.currentView = "stru-view";
          })
      },
      getNodeInfo (sceneId) {
          this.$get(`${this.$webConfig.domBaseUrl}/${this.$webConfig.domVersion}/scenes?sceneId=${sceneId}`, {}, function(res) {
              this.formTypeDetail = res;
          });
      },
      // 点击下三角，渲染内容如下
      renderContent(data) {
          var struName = data[this.struProps.label];
          var iconHtml = "<font>N</font>",
              className = 'treeNode treeRoot',
              iconNode;

          // 架构可以进行新增、修改、删除、查看
          iconNode =
              "<span class='nodeIcon add-btn-span' @click='loadContextMenu'></span>";

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

          this.$nextTick(function() {
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
          this.currentView = "stru-view";
          this.formTypeDetail = data;
          // 初始化当前选中节点信息，后续需用到
          this.activeNode(data);
          this.getNodeInfo(data.sceneId);
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
                  this.struOperateView = "stru-add";
                  this.struOperateVisible = true;
                  if (type === 0) {
                      this.struOperateTitle = "新增同级";
                      this.treeOperateOption = {
                          parentSceneId: this.activeTree.parentSceneId,
                          sceneName: this.activeTree.sceneName,
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
                          sceneName: this.activeTree.sceneName,
                          parentSceneName: this.activeTree.sceneName,
                          sceneId: this.sceneId,
                          rowNum: this.activeTree.rowNum,
                          enabledFlag: this.activeTree.enabledFlag,
                          modelCode: this.activeTree.modelCode
                      }
                      
                      this.struOperateTitle = "新增子级";
                  }
                  break;
              case 2: // 修改
                  this.currentView = "stru-edit";
                  this.formTypeDetail = this.activeTree;
                  break;
              case 3: // 删除
                  this.struOperateVisible = false;
                  this.deleteStru();
                  this.parentActiveNodeId = this.activeTree.parentSceneId;
                  break;
          }
      },
      // 删除架构
      deleteStru() {
          this.$deleteTips(function() { 
              this.$delete(`${this.$webConfig.domBaseUrl}/${this.$webConfig.domVersion}/scenes?sceneId=${this.activeTree.sceneId}`, function(res) {
                      this.activeTree = {
                          sceneName: '',
                          sceneId: "",
                          parentSceneName: '',
                          parentSceneId: "",
                          rowNum: null,
                          enabledFlag: null
                      };
                      this.activeNodeId = '';
                      this.loadData();
                      Vue.successMsg("删除成功");
                  }, function (err) {
                      Vue.errorMsg(err.response.data.description)
                  }
              );
          });
      },
      loadPage () {
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
  .use-footer-btns {
      margin-bottom: 0;
  }
</style>
