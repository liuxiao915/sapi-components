var renderModel = {};

//按需加载进行追加子节点
function expandedAddChild(that, item, target) {
	var children = that.props.children;
	if(!item[children] || item[children].length === 0) {
		return;
	}

	var parent = target.parentNode.parentNode;
	var childNode = parent.querySelector(".tree-node-childs");
	var index = parent.getAttribute("data-index");
	var parentIndex = parent.getAttribute("data-parent-index");
	if(parentIndex) {
		parentIndex += "," + index;
	} else {
		parentIndex = index;
	}

	var childHtml = renderModel.addChildHTML(that, item[children], parentIndex, false, false);
	parent.className += " tree-node-expanded";
	if(childNode){
		childNode.innerHTML = childHtml;
	}
}

//点击展开收缩图标时进行展开事件
function expandedClickFn(that, target, item, children, parentIndex, index,e) {
	var grandfather = target.parentNode.parentNode;
	//展开
	var childDiv = grandfather.querySelector(".tree-node-childs");
	if(!childDiv) {
		return;
	}

	//已经存在的就不在进行html拼接
	if(childDiv.childNodes && childDiv.childNodes.length > 0) {
		grandfather.className = grandfather.className + " tree-node-expanded";
		that.expandedClick(item, e, true);
		return;
	}

	if(parentIndex) {
		parentIndex += "," + index;
	} else {
		parentIndex = index;
	}

	var datas = item[children];
	var html = renderModel.addChildHTML(that, datas, parentIndex, false, false);
	childDiv.innerHTML = html;

	grandfather.className = grandfather.className + " tree-node-expanded";
	that.expandedClick(item, e, true);
}

//获取自定义事件名称等
function getEventName(target) {
	if(target.className.indexOf("sapi-tree") > -1) {
		return;
	}
	if(target.className.search(/(\b)+tree-node-label(\b)+/) > -1) {
		return;
	}

	let event1 = target.getAttribute("@click");
	let event2 = target.getAttribute("@click.stop");

	if(event1) {
		return {
			name: event1,
			stop: false
		};
	} else if(event2) {
		return {
			name: event2,
			stop: true
		};
	}

	return getEventName(target.parentNode);
}

//点击node的icon时的回调函数，作用在tree-node-label上
renderModel.expandedClick = function(that, item, target, parentIndex, index,e) {
	var grandfather = target.parentNode.parentNode;
	var children = that.props.children;

	//收缩
	if(grandfather.className.search(/\*?tree-node-expanded\b/) > -1) {
		that.expandedClick(item, e, false);
		grandfather.className = grandfather.className.replace(/\s*?tree-node-expanded\b/g, "");
		return;
	}

	//只允许一个顶层节点打开
	if(that.uniqueOpened === true) {
		let expandedDom = that.$el.querySelector("li.tree-node-expanded");
		if(expandedDom) {
			let currentIndex = index;
			if(parentIndex) {
				currentIndex = parentIndex.split(",")[0];
			}
			if(expandedDom && expandedDom.getAttribute("data-index") !== currentIndex) {
				expandedDom.className = expandedDom.className.replace(" tree-node-expanded", "");
			}
		}
	}

	//后台按需加载
	if(that.props.hasChild && item[children] && item[children].length === 0) {
		that.addChild(item, function() {
			expandedAddChild(that, item, target);
			that.expandedClick(item, e, true);
		});
		return;
	}

	/*return;*/

	expandedClickFn(that, target, item, children, parentIndex, index,e);
}

//点击node的label时的回调函数
renderModel.nodeClick = function(that, item, target) {
	let flag = that.handlerClick(item, target);
	if(flag === false) {
		return;
	}

	var treeNode = that.$el;
	if(treeNode) {
		var activeNode = treeNode.querySelector(".tree-node-text.active");
		if(activeNode) {
			activeNode.className = activeNode.className.replace(/\s*?active\b/g, "");
		}
	}

	let key = that.props.value;
	if(key) {
		that.$_activedId = item[key];
	}

	var parentNode = target.parentNode;
	parentNode.className = parentNode.className + " active";
}

//把所有数据全部转变为html
renderModel.appendAllNode = function(that, datas) {
	var children = that.props.children;
	var label = that.props.label;
	var innerHtml = "<ul class='tree-ul'>";
	var data, hasChild, className = "";
	var renderContent = that.renderContent;
	for(var i = 0, ii = datas.length; i < ii; i++) {
		data = datas[i];
		if(data[children] && data[children].length > 0) {
			hasChild = true;
			className = "";
		} else {
			hasChild = false;
			className = " tree-node-no-child";
		}

		var labelText = data[label];
		if(typeof renderContent === "function") {
			let res = renderContent(data, i);
			if(typeof res === "string") {
				labelText = res;
			} else {
				labelText = res.html;
			}
		}

		innerHtml += "<li class='tree-node tree-node-expanded" + className + "' data-index='" + i + "'><div class='tree-node-text'><span class='tree-node-icon icon-arrow-right'></span>";
		innerHtml += '<span class="tree-node-label">' + labelText + '</span></div>';
		if(hasChild) {
			var childHtml = renderModel.addChildHTML(that, data[children], i, true, true);
			innerHtml += '<div class="tree-node-childs">' + childHtml + '</div>';
		}

		innerHtml += "</li>";
	}

	innerHtml += "</ul>";

	return innerHtml;
}

// var isTreeNodeLabel = false;

//获取某个节点下的dom
renderModel.getTreeNode = function(target, className, reg) {
	if(target.tagName === "BODY" || target.className.indexOf("sapi-tree") > -1) {
		return "";
	}

	if(target.className.search(/(\b)+tree-node-label(\b)+/) > -1) {
		// isTreeNodeLabel = true;
	}

	// reg = reg || (new RegExp("(\\b)+" + className + "(?!(-|\w+))"));
	reg = reg || (new RegExp("(\\b)+" + className));

	if(target.className.search(reg) > -1) {
		return target;
	} else {
		return renderModel.getTreeNode(target.parentNode, className, reg);
	}
}

//获取树节点上，自定义的事件对象
renderModel.getNodeEvent = function(target) {
	return getEventName(target);
}

//局部进行加载
//items：当前节点数据
//dataParenIndex：父层索引集合，字符串（从顶层往底层一层层的增加）
//expandedIndexs 父层节点索引集合（从顶层往底层减少），这个是用来递归添加子节点html  （激活节点的时候）
//isEach：是否继续加载子节点
//isExpanded：是否展开当前节点
renderModel.addChildHTML = function(that, items, dataParenIndex, isEach, isExpanded, expandedIndexs, expandWithChildren) {
	var html = "";
	var hasChildKey = that.props.hasChild;
	var children = that.props.children;
	var disabled = that.props.disabled;
	var label = that.props.label;
	var showTip = that.showTip;
	var data, hasChild, className = "";
	var paddingLeft = 0;

	dataParenIndex = dataParenIndex + "";
	var indexs = expandedIndexs || [];
	var index = indexs.pop(); //当前节点索引
	var renderContent = that.renderContent; //渲染函数
	var indent = parseInt(that.indent) || 16; //偏移最小单位
	paddingLeft = dataParenIndex.split(",").length * indent; //向左偏移的距离

	for(var i = 0, ii = items.length; i < ii; i++) {
		data = items[i];
		//data[hasChildKey]根据这个标志来判断是否有子节点
		//根据数据children来判断是否有子节点
		var dataLengthFlag = data[children] && data[children].length > 0;
		if(data[hasChildKey] === true || dataLengthFlag) {
			hasChild = true;
			className = "";
			//假如具有完整的遍历索引，那么会递归所有的子节点，那么这里的每层都需要展开的
			if(expandedIndexs !== undefined) {
				if(index === i && indexs.length > 0) {
					className += " tree-node-expanded";
				}
			} else if(isEach !== false || isExpanded === true) {
				if(expandWithChildren) {
					if(dataLengthFlag) {
						className += " tree-node-expanded";
					}
				} else {
					className += " tree-node-expanded";
				}
			}
		} else {
			hasChild = false;
			className = " tree-node-no-child";
		}

		if(disabled && data[disabled] === true) {
			className += " is-disabled";
		}

		var labelText = data[label];
		let hasRender = typeof renderContent === "function"
		if(hasRender) {
			let res = renderContent(data, i);
			if(typeof res === "string") {
				labelText = res;
			} else {
				labelText = res.html;
			}
		}

		var stitle = "";
		if(!hasRender && showTip === true) {
			stitle = 'title="' + labelText + '"' ;
		}

		html += "<div class='tree-node" + className + "' data-parent-index='" + dataParenIndex + "' data-index='" + i + "'>";
		html += "<div class='tree-node-text' style='padding-left:" + paddingLeft + "px;'>";
		html += '<span class="tree-node-icon icon-arrow-right"></span><span class="tree-node-label" ' + stitle + '>' + labelText + '</span></div>';
		if(hasChild) {
			var returnHtml = "";
			//使用递归继续追加子节点html
			if(expandedIndexs !== undefined) {
				//假如是当前子节点，会继续递归
				if(index === i && indexs.length > 0) {
					returnHtml = renderModel.addChildHTML(that, data[children], dataParenIndex + "," + i, isEach, isExpanded, indexs, expandWithChildren);
				}
			} else if(isEach !== false) {
				returnHtml = renderModel.addChildHTML(that, data[children], dataParenIndex + "," + i, isEach, isExpanded, undefined, expandWithChildren);
			}

			html += '<div class="tree-node-childs">' + returnHtml + '</div>';
		}

		html += "</div>";
	}

	return html;
}

//根据索引获取某项数据
renderModel.getItem = function(items, index, parentIndex, that) {
	var children = that.props.children;
	var datas;
	if(parentIndex) {
		var arrs = parentIndex.split(",");
		datas = items[arrs[0]];
		for(var i = 1, ii = arrs.length; i < ii; i++) {
			datas = datas[children][arrs[i]];
		}
		datas = datas[children];
	} else {
		datas = items;
	}

	return datas[index];
}

export default renderModel;