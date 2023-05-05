import renderModel from "./renderPrivateMethods.js";
import './index.less';
export default {
	data() {
		return {
			$_renderContentVm: null
		}
	},
	methods: {
		render() {
			var datas = this.data;
			if (!datas || datas.length === 0) {
				this.$el.innerHTML = "";
				return;
			}

			var label = this.props.label,
				disabled = this.props.disabled,
				children = this.props.children,
				hasChildKey = this.props.hasChild,
				// nodeKey = this.props.value,
				showTip = this.showTip;

			var innerHtml = "<ul class='tree-ul'>";
			var data, hasChild, className = "";

			var defaultExpandAll = this.defaultExpandAll;
			var renderContent = this.renderContent;
			let that = this;
			for (var i = 0, ii = datas.length; i < ii; i++) {
				data = datas[i];
				if (data[hasChildKey] === true || (data[children] && data[children].length > 0)) {
					hasChild = true;
					if (defaultExpandAll === true) {
						className = " tree-node-expanded";
					} else {
						className = "";
					}

				} else {
					hasChild = false;
					className = " tree-node-no-child";
				}

				if (disabled && data[disabled] === true) {
					className += " is-disabled";
				}

				var labelText = data[label];
				let hasRender = typeof renderContent === "function"
				if (hasRender) {
					let res = renderContent(data, i);
					if (typeof res === "string") {
						labelText = res;
					} else {
						labelText = res.html;
						this.$_renderContentVm = res.vm;
					}
				}
				var stitle = "";
				if(!hasRender && showTip === true) {
					stitle = labelText;
				}

				innerHtml += "<li class='tree-node" + className + "' data-index='" + i + "'><div class='tree-node-text'><span class='tree-node-icon icon-caret-right'></span>";
				innerHtml += '<span class="tree-node-label" title="' + stitle + '">' + labelText + '</span></div>';
				if (hasChild) {
					if (defaultExpandAll === true) {
						var childHtml = renderModel.addChildHTML(that, data[children], i, true, true, undefined, this.expandWithChildren);
						innerHtml += '<div class="tree-node-childs">' + childHtml + '</div>';
					} else {
						innerHtml += '<div class="tree-node-childs"></div>';
					}

				}

				innerHtml += "</li>";
			}

			innerHtml += "</ul>";

			this.$el.innerHTML = innerHtml;
		},
		treeClick(e) {
			if (!this.data || this.data.length === 0) {
				return;
			}

			e.stopPropagation();

			let target = e.target;
			let that = this;

			//获取text节点
			let textDom = renderModel.getTreeNode(target, "tree-node-text");
			if (!textDom) {
				return;
			}

			//获取当前节点数据
			let parent = textDom.parentNode;
			let parentIndex = parent.getAttribute("data-parent-index");
			let dataIndex = parent.getAttribute("data-index");
			let item = renderModel.getItem(that.data, dataIndex, parentIndex, that);

			if (target.className.indexOf("tree-node-icon") > -1) {
				renderModel.expandedClick(that, item, target, parentIndex, dataIndex, e);
				return;
			}

			//返回事件对象
			let event = renderModel.getNodeEvent(target);
			if (event) {
				//获取组件this
				let vm = this.$_renderContentVm;
				if (!vm) {
					vm = this.$parent;
					//如果在弹窗里面操作，这里会默认为弹窗的，所以必须再返回上一层
					if (vm.isMax !== undefined && vm.hasMax !== undefined && vm.maxClick) {
						vm = vm.$parent;
					}
				}

				let fn = vm[event.name];
				if (typeof fn === "function") {
					fn.call(vm, item, e);
					//停止冒泡
					if (event.stop === true) {

						return;
					}
				}
			}

			var dom = textDom.lastChild;
			renderModel.nodeClick(that, item, dom);
			//点击节点文本时会展开子节点
			if (this.expandOnClickNode === true) {
				renderModel.expandedClick(that, item, textDom.firstChild, parentIndex, dataIndex, e);
			}
		},
		//选中某个node点，并使之高亮
		setActiveNode() {
			let that = this;
			var datas = that.data,
				flag = false,
				children = that.props.children,
				key = that.props.value,
				id = that.activedId;

			if (!key || id === null || id === undefined) {
				return;
			}

			var arrIndexs = [];
			var foreachNode = function (node) {
				var childs = node[children];
				if (childs && childs.length > 0) {
					for (var j = 0, jj = childs.length; j < jj; j++) {
						if (childs[j][key] === id) {
							flag = true;
							arrIndexs.push(j);
							return;
						}

						foreachNode(childs[j]);

						if (flag === true) {
							arrIndexs.push(j);
							break;
						}
					}
				}
			}

			var index;

			//树根遍历
			for (var i = 0, ii = datas.length; i < ii; i++) {
				if (datas[i][key] === id) {
					index = i;
					flag = true;
					break;
				}

				//子类遍历
				foreachNode(datas[i]);
				if (flag === true) {
					index = i;
					break;
				}
			}

			var dom = that.$el;

			if (flag) {
				//全部展开，不需要展开下一级
				if (that.defaultExpandAll === true) {
					arrIndexs.push(index);
					let strIndex = "li";
					let parentIndex;
					if (arrIndexs.length > 1) {
						parentIndex = arrIndexs.reverse().slice(0, arrIndexs.length - 1).join(",");
						strIndex = "div[data-parent-index='" + parentIndex + "']";
					}

					var laberNode = dom.querySelector(strIndex + "[data-index='" + arrIndexs[arrIndexs.length - 1] + "']");
					if (!laberNode) {
						return;
					}

					var activeNode = laberNode.querySelector(".tree-node-text");
					activeNode.className = activeNode.className + " active";

					if (typeof that.selectAfter === "function") {
						const item = renderModel.getItem(that.data, arrIndexs[arrIndexs.length - 1], parentIndex, that);
						that.selectAfter.call(that.parent, item);
					}

					return;
				}

				var lis = dom.querySelectorAll("ul>li");
				if (!lis || lis.length === 0) {
					return;
				}

				var li = lis[index];
				var innerHtml = "";
				//激活的节点是当前li层
				if (arrIndexs.length === 0) {
					var textNode = li.querySelector(".tree-node-text");
					textNode.className = textNode.className + " active";
					item = datas[index];
					if (item && item[children] && item[children].length > 0) {
						innerHtml = renderModel.addChildHTML(that, item[children], "" + index, false);
						li.querySelector(".tree-node-childs").innerHTML = innerHtml;
						if (li.className.indexOf("tree-node-expanded") === -1) {
							li.className = li.className + " tree-node-expanded";
						}
					}

					if (typeof that.selectAfter === "function") {
						that.selectAfter.call(that.parent, item);
					}
					return;
				}

				//当前节点数据
				var treeNodes = datas[index]
				//拷贝一份数据索引
				var indexs = [].concat(arrIndexs);


				//追加子节点，直到激活节点为止
				let childs = li.querySelector(".tree-node-childs");
				let isHasChild = childs.children && childs.children.length > 0
				if (isHasChild === false) {
					innerHtml = renderModel.addChildHTML(that, treeNodes[children], index + "", "", "", indexs);
					childs.innerHTML = innerHtml;
				}

				//把顶层节点的索引推进去
				arrIndexs.push(index);

				//父层索引集合
				var parentIndex = arrIndexs.reverse().slice(0, arrIndexs.length - 1).join(",");
				//当前节点索引
				var currenIndex = arrIndexs[arrIndexs.length - 1];

				//展开当前顶层节点
				//li.querySelector(".tree-node-childs").innerHTML = innerHtml;
				if (li.className.indexOf("tree-node-expanded") === -1) {
					li.className = li.className + " tree-node-expanded";
				}

				//激活当前节点、展开下面节点
				var item = null;
				var treeNode = li.querySelector("div[data-parent-index='" + parentIndex + "'][data-index='" + currenIndex + "']");
				if (treeNode) {
					textNode = treeNode.querySelector(".tree-node-text");
					textNode.className = textNode.className + " active";
					item = renderModel.getItem(that.data, currenIndex, parentIndex, that);
					if (isHasChild === false && item && item[children] && item[children].length > 0) {
						innerHtml = renderModel.addChildHTML(that, item[children], parentIndex + "," + currenIndex, false);
						treeNode.querySelector(".tree-node-childs").innerHTML = innerHtml;
						if (treeNode.className.indexOf("tree-node-expanded") === -1) {
							treeNode.className = treeNode.className + " tree-node-expanded";
						}
					}
				}

				if (typeof that.selectAfter === "function") {
					item = item !== null ? item : renderModel.getItem(that.data, currenIndex, parentIndex, that);
					that.selectAfter(item);
				}
			} else {
				var activeDom = dom.querySelector(".tree-node-text.active");
				if (activeDom) {
					activeDom.className = activeDom.className.replace(" active", "");
				}

				if (typeof that.selectAfter === "function") {
					that.selectAfter({});
				}
			}
		}
	}
}