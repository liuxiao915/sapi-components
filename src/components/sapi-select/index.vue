<template>
  <div class="sapi-select" :class="{'readonly':readonly===''||readonly===true}">
      <div @click="handleClick" class="input-wrap" :class="{'delete-icon':clearIconFlag,active:visible}">
        <input :readonly="!canInp" :placeholder="choInp || placeholderText" class="sapi-select-input" v-model="input"
            @blur="handleInpBlur" @focus="handleInpFocus" @input="handleInpKey">
        <i class="icon-caret-right sapi-select-icon" :class="{'active':visible}"></i>
        <i class="icon-caret-right sapi-select-icon" @click.stop="clear" :class="{'active':visible}"></i>
      </div>
      <div ref="selectList" :id="selectId" class="sapi-select-box-wrap" :style="{left:sLeft,top:sTop,width:sWidth}" :class="{active:visible}">
          <i class="up-arrow icon-caret-right"></i>
          <div  class="sapi-select-box-list" @mousedown.stop="emptyFn" :class="listClass">
              <sapi-scroll ref="scrollbar" :style="{maxHeight:maxHeight,height:height}">
                  <component :is="currentView" :showTip="true" ref="treeRef" :expand-on-click-node="expandOnClickNode" :defaultExpandAll="defaultExpandAll" :actived-id="nodeId" :lazy-load="lazyLoad" :render-content="renderContent" :select-after="getSelectNode" :data="isKeyWrite && input ? searchList :datas" :props="props" @on-click="treeClick"></component>
                  <ul v-if="isTree!==true" class="sapi-select-box-list-ul">
                      <template v-if="isKeyWrite && input">
                          <slot :row="item" :$index="index" v-for="(item,index) in searchList">
                              <li class="label" :Key="index" :title="item[props.label]" v-text="item[props.label]" :class="{disabled:item[props.disabled]===true,active:item.active}" @click.stop="nodeClick(item)"></li>
                          </slot>
                      </template>
                      <template v-else>
                          <slot :row="item" :$index="index" v-for="(item,index) in datas">
                              <li class="label" :Key="index" :title="item[props.label]" v-text="item[props.label]" :class="{disabled:item[props.disabled]===true,active:item.active}" @click.stop="nodeClick(item)"></li>
                          </slot>
                      </template>
                  </ul>
                  <p class="empty-p" v-if="(isKeyWrite && input && searchList.length===0) || (!(isKeyWrite && input) && datas.length===0)">无匹配数据</p>
              </sapi-scroll>
          </div>
      </div>
  </div>
</template>

<script>
import sapiTree from "@/components/sapi-tree";
export default {
  name: 'sapi-select',
  components: {
      "sapi-tree": sapiTree
  },
  data() {
      return {
          selectId: "sapi-select-" + Math.ceil(Math.random() * 100000),
          input: "",
          datas: [],
          visible: false,
          currentView: "",
          nodeId: null,
          changeFlag: false,
          isDefault: false,
          inInput: false,
          sLeft: null,
          sTop: null,
          sWidth: null,
          maxHeight: 0,
          windowClickFn: null,
          defaultExpandAll:false,
          isKeyWrite: false,  //表示是不是正在输入的状态
          choInp: '',  // 临时保存已选中的值
          searchList: []
      };
  },
  computed: {
      clearIconFlag() {
          if (!this.input) {
              return false;
          }

          if (
              (this.clearable === "" || this.clearable === true) &&
              this.visible === false
          ) {
              return true;
          }

          return false;
      },
      placeholderText() {
          if (this.readonly === "" || this.readonly === true) {
              return "";
          }

          return this.placeholder
          // return this.placeholder || this.$t("selectOne");
      }
  },
  props: {
      value: { type: [String, Boolean, Number], default: null },
      data: {type: Array,default:function(){ return []}}, //数据源
      props: {
          //数据源匹配的键值集合 label，value，disabled，children，hasChild，前两个为一般下拉列表必须，后两个为树型特有
          type: Object,
          default: function() {
              return {
                  label: null,
                  value: null,
                  disabled: "disabled",
                  children: null,
                  hasChild: null
              };
          }
      },
      placeholder: String, //空值时提示的文字
      width: String, //宽度，带单位
      height: String, //下拉列表的高度，不能超过最高值，超过取最大值
      readonly: { type: [Boolean, String, Number], default: false }, //是否只读，默认为可选择,
      clearable: { type: [Boolean, String], default: false }, //可否清除已选中值，默认不显示,
      matchFailText: String, //匹配失败时显示文本
      isTree: { type: Boolean, default: false }, //是否是树型下拉列表  ，下面的属性都是树的
      expandOnClickNode: {
          //点击label节点时是否展示子节点，默认true，默认展开或者收缩子节点
          type: Boolean,
          default: true
      },
      activeHasChild: {
          //点击有子类的节点时是否能选中，默认true能选中的
          type: Boolean,
          default: true
      },
      exceptId: [String, Array], //排除某个值不能选，或者某几个值不能选
      lazyLoad: Function, //展开时，调用该方法添加子节点,
      activeAfter: Function, //初始化选中之后触发的回调函数
      renderContent: Function, //树型下拉列表，内容渲染函数
      listClass: String, //列表自定义class
      canInp: { type: Boolean, default: false }, // 可否可以输入搜索关键字
      // 弹出选择层宽度的缩放
      popupWidthScale: { type: Number, default: 1 },
      setNodeDisabled: {
          type: Function,
          default: function () { return false }
      }
  },

  methods: {
      handleInpFocus() {
          if (!this.canInp) {
              return
          }
          this.isKeyWrite = true;
          if (!this.choInp || this.input === this.choInp) {
              this.choInp = this.input
              this.input = ''
          }
      },
      handleInpBlur() {
          if (!this.canInp) {
              return
          }

          if(this.visible && this.isKeyWrite && this.searchList.length===0 && this.input) {
              return
          }

          if ((!this.input  || !this.visible || this.searchList.length===0 && this.input) && this.isKeyWrite) {
              if (this.searchList.length===0 && this.input) {
                  this.visible = false
              }
              this.input = this.choInp;
              this.isKeyWrite = false;
              this.choInp = '';
              this.searchList = [];
          }
      },
      getSearchData (txt,arr) {
          var _this=this
          return arr.filter(function f(item) {
              if (item[_this.props.label].includes(txt)) return true
              if (item[_this.props.children]) {
                  return (item[_this.props.children] = item[_this.props.children].filter(f)).length
              }
          })
      },
      handleInpKey () {
          if (!this.canInp) {
              return
          }

          if (this.isTree) {
              var datas=JSON.parse(JSON.stringify(this.datas))
              if(this.input){
                  this.searchList=this.getSearchData(this.input,datas)
                  this.defaultExpandAll=true
              }else{
                  this.searchList=this.datas
                  this.defaultExpandAll=false
              }
          } else {
              this.searchList = this.data.filter(o1=>{
                  return o1[this.props.label].indexOf(this.input) > -1
              })
          }
      },
      emptyFn() {},
      clear(e) {
          this.inInput = false;
          this.$emit("input", null);
          this.$emit("clear");
          this.close();
      },
      handleClick(e) {
          if (
              this.readonly === "" ||
              this.readonly === true ||
              this.visible === true
          ) {
              return;
          }

          document.body.appendChild(this.$refs.selectList);

          //无数据时进行无数据初始化
          if (!this.data || this.data.length === 0) {
              if (this.datas.length === 0) {
                  var data = {};
                  data[this.props.label] = this.$t("noData");
                  data[this.props.value] = null;
                  data[this.props.disabled] = true;
                  this.datas.push(data);
                  this.isDefault = false;
              }
          }

          //初始化展开第一级树
          if (
              this.isTree === true &&
              (this.nodeId === null || this.nodeId === undefined) &&
              this.isDefault === false
          ) {
              this.$refs.treeRef.defaultExpandNode();
              this.isDefault = true;
          }

          this.visible = true;

          let x = e.clientX - e.offsetX; //input节点的左边界线
          let y = e.clientY - e.offsetY; //input节点的上边界线

          let target = e.target;
          let parentNode;

          let className = target.className;
          if (className.indexOf("sapi-select-input") > -1) {
              parentNode = target;
          } else {
              parentNode = target.parentNode;
              //假如当前节点不是input节点，是图标节点
              if (className.indexOf("sapi-select-icon") > -1) {
                  x -= target.offsetLeft;
                  y -= target.offsetTop;
              }
          }

          let sTop = y + parentNode.clientHeight;
          let maxHeight;
          this.upArrow = true;
          let top = 0;
          let subHeight = 40; //10(padding)+10(箭头)+20（预留空间）

          let clientHeight = document.body.clientHeight;
          maxHeight = clientHeight - y - parentNode.clientHeight - subHeight;

          this.maxHeight = maxHeight + "px";

          this.orgiTop = sTop + (this.top || 0)
          this.sTop = this.orgiTop + "px";
          
          // 跟随滚动条滚动 add by zhangmq 2020-08-13
          if (this.$root.$pageBody) {
              this.startScrollTop = this.$root.$pageBody.scrollTop
          } else {
              this.startScrollTop = null
          }
          this.sLeft = x + (this.left || 0) + "px";
          this.sWidth = (this.width || parentNode.clientWidth) * this.popupWidthScale + "px";
          if (this.isTree !== true && this.isDefault === false) {
              this.scrollToY();
              this.isDefault = true;
          }
          setTimeout(() => {
              this.addWindowClick();
          });
      },
      scrollToY() {
          this.$refs.scrollbar.scrollToY(0);
          setTimeout(() => {
              let dom = this.$el.querySelector(
                  ".sapi-select-box-list .label.active"
              );
              if (!dom) {
                  return;
              }
              if (dom.offsetTop < 51) {
                  return;
              }
              this.$refs.scrollbar.scrollToY(dom.offsetTop);
          });
      },
      close() {
          this.visible = false;
      },
      //列表click
      nodeClick(item) {
          if (item[this.props.disabled] === true) {
              return false;
          }

          var data = {};
          for (var key in item) {
              if (key !== "active") {
                  data[key] = item[key];
              }
          }

          var datas = this.datas;
          for (var i = 0, ii = datas.length; i < ii; i++) {
              datas[i].active = false;
          }

          item.active = true;

          this.update(data);
      },
      //树的click
      treeClick(data, target) {
          if (typeof this.setNodeDisabled === 'function' && this.setNodeDisabled(data)) {
              return false;
          }
          //禁止点击时
          if (data[this.props.disabled] === true) {
              return false;
          }

          if (this.activeHasChild === false) {
              //限制有子节点的节点选中
              let childs = data[this.props.children];
              let isStop = childs && childs.length > 0;
              if (isStop === false) {
                  isStop = data[this.props.hasChild];
              }
              if (isStop === true) {
                  return false;
              }
          }

          var nodeId = data[this.props.value];
          let exceptId = this.exceptId;
          //某几个值不能选
          if (exceptId) {
              if (typeof exceptId === "string" && nodeId === exceptId) {
                  Vue.errorMsg(
                      this.$t("sapiSelect.currentNodeNotBeSelected")
                  );
                  return false;
              } else if (
                  Array.isArray(exceptId) &&
                  exceptId.indexOf(nodeId) > -1
              ) {
                  Vue.errorMsg(
                      this.$t("sapiSelect.currentNodeNotBeSelected")
                  );
                  return false;
              }
          }

          this.update(data);
      },
      update(data) {
          this.input = data[this.props.label];
          this.changeFlag = true;
          this.$emit("input", data[this.props.value]);
          this.$emit("change", data);
          //this.close();
          this.removeWindowClick();
          this.$nextTick(function() {
              this.changeFlag = false;
          });

          if (this.isKeyWrite) {
              this.canCangeType = true;
              this.isKeyWrite = false;
              this.choInp = ''
              this.searchList = [];
          }
      },
      mousewheel(e) {
          e.preventDefault();
      },
      getSelectNode(item) {
          if (this.canCangeType) {
              this.canCangeType = false;
              return
          }

          if (!this.isKeyWrite) {
              this.input = item[this.props.label] || this.input;
              if (this.input === undefined) {
                  this.input = this.matchFailText || "";
                  this.$emit("matchFailure");
                  return;
              }

              if (typeof this.activeAfter === "function") {
                  this.activeAfter(item);
              }
          }
      },
      init() {
          var datas = (this.datas = this.data || []);
          var value = this.value;

          this.isDefault = false;
          //常规列表初始化
          if (this.isTree !== true) {
              if (datas.length === 0) {
                  return;
              }
              var label = this.props.label;
              var val = this.props.value;
              var flag = false;
              for (var i = 0, ii = datas.length; i < ii; i++) {
                  //当前选中的值
                  if (value === datas[i][val]) {
                      this.input = datas[i][label];
                      datas[i].active = true;
                      flag = true;
                  } else {
                      datas[i].active = false;
                  }
              }
              if (flag === false && value !== null) {
                  //this.input = "";
                  this.input = this.matchFailText || "";
                  this.$emit("matchFailure");
              }
          } else {
              //显示树型下拉列表组件
              this.currentView = "sapi-tree";
          }
      },
      //移除当前注册的隐藏下拉列表事件
      removeWindowClick() {
          if (typeof this.windowClickFn === "function") {
              this.windowClickFn();
          }
      },
      //注册隐藏下拉列表事件
      addWindowClick() {
          let _this = this;
          if (!this.windowClickFn) {
              this.windowClickFn = function() {
                  document.body.removeEventListener(
                      "mousedown",
                      this.windowClickFn
                  );
                  _this.close();
              };
          }

          document.body.addEventListener(
              "mousedown",
              this.windowClickFn,
              false
          );
      }
  },
  watch: {
      visible(val) {
          if(!this.visible && this.isKeyWrite && this.searchList.length===0 && this.input) {
              this.input = this.choInp;
              this.isKeyWrite = false;
              this.choInp = '';
              this.searchList = [];
          }
      },
      data(val) {
          this.datas = val;
          if (this.value) {
              this.init();
          }
      },
      value(val) {
          this.nodeId = this.value;
          //$emit() 会触发这里更新，但是这里不想执行init
          if (this.changeFlag === false && this.data && this.data.length > 0) {
              this.init();
          } else {
              this.changeFlag = false;
          }

          if (val === undefined || val === null) {
              this.input = "";
          }
      }
  },
  created() {
      this.nodeId = this.value;
      this.props.value = this.props.value || this.props.nodeKey;
      this.init();
      const _this = this
      // 跟随滚动条滚动 add by zhangmq 2020-08-13
      this._pageBodyScroll = (event, container, top) => {
          if (_this.visible && _this.startScrollTop !== null) {
              _this.sTop = (_this.orgiTop + (_this.startScrollTop - top)) + 'px'
          }
      }
      // this.$root.$on('page-body-scroll', this._pageBodyScroll)
  },
  beforeDestroy() {
      if (window[this.selectId]) {
          window[this.selectId].outerHTML = "";
      }

      // this.$root.$off('page-body-scroll', this._pageBodyScroll)
  }
};
</script>
<style lang="less" scoped>
.sapi-select {
    position: relative;
    .el-input__inner {
        padding-right: 22px;
    }
    .el-input__inner[readonly] {
        cursor: pointer;
    }
    .input-wrap {
        position: relative;
    }
    .sapi-select-icon {
        color: #C0C4CC;
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top:-7px;
        width: 14px;
        height: 14px;
        padding-left: 2px;
        line-height: 14px;
        cursor: pointer;
        &.icon-closer {
            display: none;
        }
    }
    .input-wrap {
        position: relative;
        .el-icon-arrow-up {
            transition: all 0.3s;
            transform: rotateZ(180deg);
        }
        .el-icon-arrow-up.active {
            transform: rotateZ(0deg);
        }
        &.delete-icon:hover {
            .icon-closer {
                display: block;
            }
            .el-icon-arrow-up {
                display: none;
            }
        }
        &.active .el-input__inner,
        &:hover .el-input__inner {
            border-color: #458aff;
        }
    }
    &.readonly .input-wrap:hover .el-input__inner {
      border-color: #E4E7ED;
    }
    .sapi-select-box-wrap-input {
        position: relative;
        clear: both;
        height: 38px;
        cursor: pointer;
        overflow: hidden;
    }
}

.sapi-select-box-wrap {
    display: none;
    position: absolute;
    z-index: 199;
    min-width: 80px;
    padding-top: 12px;
    &.active {
        display: block;
    }
    .icon-caret-right {
        top: 3px;
        left: 35px;
        transform: rotate(90deg) translateX(-2px);
    }
    .sapi-select-box-list-ul > li {
        padding: 0px 20px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 34px;
        line-height: 34px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .sapi-select-box-list-ul > li:hover {
        background-color: #f5f7fa;
    }
    .sapi-select-box-list-ul .active,
    .sapi-select-box-list-ul :active {
        color:  #458aff;
        background-color: #f5f7fa;
        font-weight: bold;
    }
    .sapi-select-box-list-ul .disabled {
        color: #C0C4CC;
        cursor: not-allowed;
        &:hover {
            color: #C0C4CC;
            background-color: #FFFFFF;
        }
    }
    &.readonly .sapi-select-icon,
    &.readonly .sapi-select-box {
        display: none;
    }
    &.readonly .el-input__inner[readonly] {
        cursor: default;
    }
    .sapi-tree {
        .tree-node-icon,
        .tree-node-text,
        .tree-node-label {
            height: 34px;
            line-height: 34px;
        }
        .tree-node-label {
            font-size: 14px;
        }
        .tree-node > .tree-node-text {
            overflow: hidden;
        }
        .tree-node-text:hover {
            background: #f5f7fa;
        }
        .tree-node-text.active,
        .tree-node-text:active {
            color:  #458aff;
            background: #f5f7fa;
            font-weight: bold;

            &:hover{
                background: #f5f7fa;
            }
        }
        .is-disabled > .tree-node-text {
            background-color: #FFFFFF;
            &:hover {
                background-color: #FFFFFF;
            }
            & > .tree-node-label {
                color: #C0C4CC;
                cursor: not-allowed;
            }
        }
    }
    .sapi-select-box-list {
        padding: 5px 0px;
        border-radius: 4px;
        background-color: #FFFFFF;
        .empty-p{
            text-align: center;
            color: #ccc;
            line-height: 30px;
        }

        .treeNode:hover .text{
            padding-right:0;
        }
    }
}

</style>