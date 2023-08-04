/**
 * v-drag指令
 * 可以只在移动头部时操作整个DOM，或者是否允许DOM元素移出屏幕都能实现
 * @param {*} 'father' 拖拽的时候限定在父元素内
 * @returns 
 */
class Drag {
	static zIndex = 1;
	constructor(el, option = {}) {
		this.el = el;
		this.x = 0;
		this.y = 0;
		this.option = option;
		this.init();
		this.timeOutEvent = 0;
		this.ele = null
	}
	init() {
		this.setEleStyle(this.option || {});
		//拖拽事件赋值给头部标签，此处代码可实现仅在移动头部时操作整个DOM块
		// this.ele = this.el.getElementsByClassName('header')[0]
		// if(this.ele){
		// 	this.ele.onmousedown = (e) => {
		// 		this.onMouseDown(e)
		// 		this.el.setCapture && this.el.setCapture() //全局捕获
		// 	}
		// }else{
		// 	this.el.onmousedown = (e) => {
		// 		this.onMouseDown(e)
		// 		this.el.setCapture && this.el.setCapture() //全局捕获
		// 	}
		// }
		this.el.onmousedown = (e) => {
			this.onMouseDown(e)
			this.el.setCapture && this.el.setCapture() //全局捕获
		}
	}
	
	//样式设置
	setEleStyle(option) {
		for (const key in option) {
			this.el.style[key] = option[key]
		}
	}
	//按下ele
	onMouseDown(e) {
		let zIndex = getComputedStyle(this.el).getPropertyValue('z-index');
		zIndex = isNaN(zIndex) ? 1 : zIndex
		Drag.zIndex = Drag.zIndex > zIndex ? Number(Drag.zIndex) + 1 : Number(zIndex) + 1
		this.setEleStyle({
			"zIndex": Drag.zIndex,
			position: 'fixed',
			'cursor': 'move'
		})
		this.x = e.clientX - this.el.offsetLeft;
		this.y = e.clientY - this.el.offsetTop;
		document.onmousemove = (e) => this.onMouseMove(e);
		document.onmouseup = (e) => this.onMouseUp(e)
	}
	//移动move
	onMouseMove(e) {
		let X = e.clientX - this.x
		let Y = e.clientY - this.y;
        //此处使用注释处的代码，此处代码操作DOM块会移出屏幕
		// if (X < 10 - this.el.offsetWidth) {
		// 	X = 10 - this.el.offsetWidth
		// } else if (X > document.documentElement.clientWidth - 10) {
		// 	X = document.documentElement.clientWidth - 10
		// }
		// if (Y < 10 - this.el.clientHeight) {
		// 	Y = 10 - this.el.clientHeight
		// } else if (Y > document.documentElement.clientHeight - 10) {
		// 	Y = document.documentElement.clientHeight - 10
		// }
        //下面代码操作DOM元素不会移出屏幕，-25应更换为-10，按自己需求设置
		if (X < 0) {
			X = 0
		} else if (X > document.documentElement.clientWidth - this.el.offsetWidth) {
			X = document.documentElement.clientWidth - this.el.offsetWidth - 25
		}
		if (Y < 0) {
			Y = 0
		} else if (Y > document.documentElement.clientHeight - this.el.offsetHeight) {
			Y = document.documentElement.clientHeight - this.el.offsetHeight - 25
		}
		this.el.style.left = X + 'px'
		this.el.style.top = Y + 'px'
	}
	//释放
	onMouseUp(e) {
		document.onmousemove = null
		document.onmouseup = null
		this.setEleStyle({
			'cursor': 'pointer'
		})
		this.el.setCapture && this.el.setCapture() //释放全局捕获
	}
	// gtouchstart() {
	// 	this.timeOutEvent = setTimeout(() => {
	// 		this.timeOutEvent = 0;
	// 		//真正长按后应该执行的内容
	// 		console.log("长按事件触发发");
	// 	}, 500); 
	// 	return false;
	// }
 
	// gtouchmove() {
	// 	clearTimeout(this.timeOutEvent); //清除定时器
	// 	this.timeOutEvent = 0;
	// 	console.log("取消了");
	// }
 
	// gtouchend() {
	// 	clearTimeout(this.timeOutEvent); //清除定时器
	// 	if (this.timeOutEvent !== 0) {
	// 		console.log("你这是点击，不是长按");
	// 	}
	// 	return false;
	// }
}
export default {
  name: 'drag',
	mounted(el, binding) {
		new Drag(el, binding.value || {})
	}
}