import { findParent } from '@/utils/index.js'
/**
 * v-drag指令
 * @param {*} 'father' 拖拽的时候限定在父元素内
 * @returns 
 */
// pageX 和clientX 都是鼠标事件的属性，表示鼠标相对于页面或当前视口的水平坐标。
// pageX 表示鼠标相对于整个文档页面的水平坐标，即从页面左边缘开始计算。
// clientX 表示鼠标相对于当前视口的水平坐标，即从当前视口的左边缘开始计算。
// offsetLeft 是元素的属性，表示元素的左外边距到其包含元素的左内边距之间的像素距离。
// 当元素的position属性为static时，offsetLeft表示元素相对于其最近的有定位属性（position为relative, absolute, fixed等）的父元素的左内边距的距离。
// 当元素的position属性为relative或者absolute时，offsetLeft表示元素相对于其包含块（containing block）的左内边距的距离。
// 综上所述，pageX和clientX是与鼠标事件相关的属性，而offsetLeft是一个元素的属性，它们之间没有直接的联系。

// getBoundingClientRect 用于获取某个元素相对于视窗的位置集合。
// 这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
// const { top, right, bottom, left } = el.getBoundingClientRect()





// 网页可见区域宽： document.body.clientWidth;
// 网页可见区域高： document.body.clientHeight;
// 网页可见区域宽： document.body.offsetWidth " (包括边线和滚动条的宽)";
// 网页可见区域高： document.body.offsetHeight " (包括边线的宽)";
// 网页正文全文宽： document.body.scrollWidth;
// 网页正文全文高： document.body.scrollHeight;
// 网页被卷去的高： document.body.scrollTop;
// 网页被卷去的高： document.documentElement.scrollTop;
// 网页被卷去的左： document.body.scrollLeft;
// 网页正文部分上： window.screenTop;
// 网页正文部分左： window.screenLeft;
// 屏幕分辨率的高： window.screen.height;
// 屏幕分辨率的宽： window.screen.width;
// 屏幕可用工作区高度： window.screen.availHeight;
// 屏幕可用工作区宽度： window.screen.availWidth;
 
// 你的屏幕设置是  window.screen.colorDepth " 位彩色";
// 你的屏幕设置  window.screen.deviceXDPI " 像素/英寸";


export default {
  name: 'drag',
  mounted (el, binding) {
    el.style.cursor = 'move';
    el.style.position = 'absolute';
    el.style.zIndex = '199';
    console.log('getBoundingClientRect::::', el.getBoundingClientRect());
    el.onmousedown = (event) => {
      if (event.preventDefault) {
        event.preventDefault()
      } else {
        event.returnValue = false
      }
      // 算出鼠标相对元素的位置
      let disX = event.pageX - el.offsetLeft;
      let disY = event.pageY - el.offsetTop;
      const { top, right, bottom, left } = el.getBoundingClientRect()
      console.log('event.pageX:::', event.pageX)
      console.log('el.offsetTop:::', el.offsetTop)
      // let disX = event.pageX - left;
      // let disY = event.pageY - top;
      
      document.onmousemove = (event) => {
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let x = event.pageX - disX;
        let y = event.pageY - disY;
        console.log('x:::', x)
        let maxX;
        let maxY;
        const parentNode = findParent(el, 'position', 'static')
        console.log('parentNode:::', parentNode)
        if (binding.value === 'father') {
          maxX = parentNode.clientWidth - el.clientWidth;
          maxY = parentNode.clientHeight - el.clientHeight;
        } else {
          maxX = document.documentElement.clientWidth - el.clientWidth;
          maxY = document.documentElement.clientHeight - el.clientHeight;
        }
        console.log('maxX:::', maxX)
        if (x < 0) {
          x = 0;
        } else if (x > maxX) {
          x = maxX;
        }

        if (y < 0) {
          y = 0;
        } else if (y > maxY) {
          y = maxY;
        }
        // 移动当前元素
        el.style.left = x + 'px';
        el.style.top = y + 'px';
      }
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      }
    }
  }
}