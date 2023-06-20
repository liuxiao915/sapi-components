<template>
	<div class="dialog" :class="{active:value,visibility:isLoading===true}">
		<div ref="dialogBox" class="dialog-box">
			<div class="dialog-box-header">
				<div class="dialog-box-header-btns">
					<slot name="todo"></slot>
				</div>
				<div ref="dialogBoxHeaderTitle" class="dialog-box-header-title" :class="{nomove:(moveable===false||isMax===true)}">
					<slot name="title"></slot>
				</div>
				<div class="dialog-box-header-close float-right">
					<span class="dialog-btns-reset" v-show="isMax" @click.stop="resetClick"></span>
					<span class="dialog-btns-max" v-show="!isMax&&hasMax!==false" @click.stop="maxClick"></span>
					<span class="dialog-btns-close" @click.stop="closeClick()"></span>
				</div>
			</div>
			<div ref="dialogBoxBody" class="dialog-box-body" :class="{'max-class':isMax===true}">
        <div class="form-error-tips"></div>
				<slot></slot>
        <div v-if="$slots['footer']" class="footer">
          <slot name="footer"></slot>
        </div>
			</div>
			<slot name="dialogBox"></slot>
		</div>
		<slot name="moreDialog"></slot>
    <slot name="other"></slot>
	</div>
</template>

<script>
	export default {
    name: 'sapi-dialog',
		data() {
			return {
				isLoading: false,
				id: null,
				isClose: false,
				isMax: false,
				_left: null,
				_top: null,
				_width: null,
				_height: null
			}
		},
		props: ["width", "height", "left", "top", "moveable", "value", "zIndex", "hasMax", "isLoad", "maxHeight"],
		methods: {
			resetClick() {
				this.isMax = false;
				this.open(this._width, this._height, this._left, this._top);
				setTimeout(() => {
					var dom = this.$refs['dialogBoxBody'] // this.$el.querySelector(".dialog-box-body");
					if(dom) {
						dom.scrollTop = 0;
					}
				}, 10);
			},
			maxClick() {
				this.isMax = true;
				this.open("100%", "100%", "0", "0");
			},
			closeClick() {
				this.isClose = true;
				this.$emit("input", false);
				this.$emit("on-close");
				this.close();
			},
			setCurrentDialog() {
				setTimeout(() => {
					var doms = document.querySelectorAll(".dialog.current-dialog");
					if(doms.length > 0) {
						for(var i = 0, ii = doms.length; i < ii; i++) {
							doms[i].className = doms[i].className.replace(/\s+current-dialog/g, "");
						}
					}

					var dom = this.$el;
					dom.className = dom.className + " current-dialog";
					dom = null;
				}, 50);
			},
			open(width, height, left, top) {
				this.$emit("on-resize", this.isMax);
				var box = this.$refs.dialogBox // this.$el.querySelector(".dialog-box");
				box.style.width = width;
				box.style.height = height;
				box.style.left = left;
				box.style.top = top;
				this.setCurrentDialog();
			},
			close() {
				setTimeout(() => {
					var dom = this.$el;
					dom.className = dom.className.replace(/\s+current-dialog/g, "");
					var doms = document.querySelectorAll(".dialog.active");
					if(doms.length > 0) {
						var ele = doms[doms.length - 1];
						ele.className = ele.className + " current-dialog";
					}

					dom = null;
				}, 100);
			},
			init() {
				//初始化height、width、left、top、zindex;
				var body = document.body;
				var _width = this.width;
				if(_width && _width.indexOf("%") > -1) {
					_width = body.clientWidth * parseFloat(_width) / 100 + "px";
				}

				var _height = this.height;
				if(_height && _height.indexOf("%") > -1) {
					_height = body.clientHeight * parseFloat(_height) / 100 + "px";
				}

				var _top = this.top;
				if(_top && _top.indexOf("%") > -1) {
					_top = body.clientHeight * parseFloat(_top) / 100 + "px";
				}

				var _left = this.left;
				if(_left && _left.indexOf("%") > -1) {
					_left = body.clientWidth * parseFloat(_left) / 100 + "px";
				}

				var width = this._width = _width || (body.clientWidth / 2 + "px");
				var height = this._height = _height || "auto";
				var left = this._left = _left || (parseInt(body.clientWidth - parseInt(width)) / 2) + "px";
				var top = this._top = _top || "50px";
				var zindex = this.zIndex;

				var box = this.$refs.dialogBox // this.$el.querySelector(".dialog-box");
				box.style.width = width;
				box.style.height = height;
				box.style.left = left;
				box.style.top = top;

				if(zindex !== undefined) {
					box.parentNode.style.zIndex = zindex;
				}

				//初始化最大高度

				var clientHeight = body.clientHeight;
				setTimeout(() => {
					var _maxHeight = this.maxHeight;
					if(_maxHeight) {
                        this.$refs.dialogBoxBody
						this.$refs.dialogBoxBody.style.maxHeight = _maxHeight;
					} else {
						this.$refs.dialogBoxBody.style.maxHeight = (document.body.clientHeight - parseFloat(top) - this.$refs.dialogBoxHeaderTitle.clientHeight) + "px";
					}

					this.setCurrentDialog();
					box = null;
					delete this.init;
				}, 100);

				this.$emit("on-open");

				if(this.moveable === false) {
					return;
				}

				var moveBtn = this.$refs.dialogBoxHeaderTitle // box.querySelector(".dialog-box-header-title");
				var clientx, clienty, moveStart = false,
					moveBox = document.querySelector("body>.dialog-move-box");

				//初始化拖动虚拟框
				if(!moveBox) {
					var divEle = document.createElement("div");
					divEle.className = "dialog-move-box";
					document.body.appendChild(divEle);
					moveBox = document.querySelector("body>.dialog-move-box");
				}

				//虚拟框根据鼠标的移动进行移动
				function moveFunc(e) {
					if(!moveStart) {
						return;
					}

					var left = (parseInt(moveBox.style.left) + e.clientX - clientx);
					var top = (parseInt(moveBox.style.top) + e.clientY - clienty);

					moveBox.style.left = left + "px";
					moveBox.style.top = top + "px";
					clientx = e.clientX;
					clienty = e.clientY;
				}

				moveBtn.addEventListener("mousedown", function(e) {
					e.preventDefault();
					if(this.className.indexOf("nomove") > -1) {
						return;
					}

					clientx = e.clientX;
					clienty = e.clientY;
					box = this.parentNode.parentNode;
					moveBox.style.top = box.style.top || "";
					moveBox.style.left = box.style.left || "";
					moveBox.style.height = box.offsetHeight + "px";
					moveBox.style.width = box.offsetWidth + "px";
					moveBox.className = moveBox.className + " active";
					moveStart = true;
					document.body.addEventListener("mousemove", moveFunc, false);
				}, false);

				document.addEventListener("mouseup", function(e) {
					if(moveStart === true) {
						document.body.removeEventListener("mousemove", moveFunc);
						box.style.top = moveBox.style.top;
						box.style.left = moveBox.style.left;
						moveBox.className = moveBox.className.replace(/ active/g, "");
						moveStart = false;
						box = null;
					}
				}, false);

				moveBtn = null;
				body = null;
			}
		},
		watch: {
			value(val) {
				if(val === false) {
                    this.$closeWaringTips(".form-error-tips")
					this.close();
					return;
				}

				if(this.init) {
					this.init();
					return;
				}

				this.resetClick();
				this.$emit("on-open");
			},
			isLoad(val) {
				this.isLoading = val;
				if(val === true) {
					this.$loading(true);
				} else {
					this.$loading(false);
				}
            }
		},
		mounted() {
			if(this.value && this.init) {
				this.init();
			}
		}
	}
</script>
<style lang="less" scoped>
  .dialog {
	display: none;
	position: fixed;
	z-index: 100;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.1);
}

.dialog>.dialog {
	background: rgba(0, 0, 0, 0.2);
}

.dialog.active {
	display: block;
}

.dialog.current-dialog {
	z-index: 105;
}

.dialog-move-box{
	display: none;
	position: absolute;
	min-width: 180px;
	min-height: 49px;
	left: 0;
	top: 0;
	z-index: 1000;
	border: 3px solid #ddd;
	border-radius: 5px;
	box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.07);
	cursor: move;
}

.dialog-move-box.active{
	display: block;
}

.dialog-box {
	position: relative;
	min-width: 180px;
	min-height: 49px;
	left: 0;
	top: 0;
	overflow: hidden;
	border-radius: 5px;
	background: #fff;
	box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.07);
}

.dialog-box-header {
	position: relative;
	z-index: 100;
	height: 49px;
	line-height: 49px;
	text-align: center;
	overflow: hidden;
	border-bottom: 1px solid #ddd;
	background: #fff;
	-ms-box-sizing: content-box;
	-webkit-box-sizing: content-box;
	box-sizing: content-box;
}

.dialog-box-header-btns {
	position: absolute;
	z-index: 3;
	left: 0;
	height: 49px;
}

.dialog-box-header-close {
	margin-left: 10px;
	margin-right: 18px;
}

.dialog-box-header-close>span {
	display: inline-block;
	width: 16px;
	height: 16px;
	vertical-align: middle;
	cursor: pointer;
}

.dialog-box-header-close>span:hover {
	background-color: #f1f1f1;
}

// .dialog-btns-min {
// 	background: url(../../images/min-btn.png) no-repeat center;
// }

// .dialog-btns-reset {
// 	background: url(../../images/reset-dialog-btn.png) no-repeat center;
// }

// .dialog-btns-max {
// 	background: url(../../images/max-btn.png) no-repeat center;
// }

// .dialog-btns-close {
// 	background: url(../../images/close-btn.png) no-repeat center;
// }

.dialog-box-header-title {
	float: left;
	width: calc(100% - 90px);
	height: 49px;
	margin: auto;
	padding-left: 90px;
	font-size: 14px;
	text-align: center;
	overflow: hidden;
	line-height: 49px;
	text-overflow: ellipsis;
	white-space: nowrap;
	cursor: move;
}

.dialog-box-header-title.nomove {
	cursor: default;
}

.dialog-box-body {
	margin-top: -30px;
	padding-top: 30px;
	height: calc(100% - 50px);
	overflow: auto;
}

.max-class.dialog-box-body {
	max-height: calc(100% - 50px)!important;
}

.dialog-min {
	position: fixed;
	z-index: 1003;
	bottom: 10px;
	/*width: calc(100% - 50px);*/
	min-height: 49px;
	margin: 0px 15px;
	overflow: hidden;
	overflow-x: auto;
}

.dialog-min-box {
	min-width: calc(100% - 50px);
}

.dialog-min-box>.dialog-min-box-item {
	float: left;
	margin-top: 5px;
	width: 180px;
	height: 49px;
	margin-right: 5px;
	border-radius: 5px;
	border: 1px solid #ddd;
	background: #fff;
}

.dialog-min-box .dialog-box-header-title {
	width: calc(100% - 80px);
	padding-left: 16px;
	cursor: default;
	text-align: left;
}
</style>