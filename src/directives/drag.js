/**
 * v-drag指令
 * @param {*} 'father' 拖拽的时候限定在父元素内
 * @returns 
 */
export default {
  name: 'drag',
  mounted: function (el, binding) {
    el.style.cursor = 'move';
    el.style.position = 'absolute';
    el.style.zIndex = '199';
    el.onmousedown = function (event) {
      if (event.preventDefault) {
        event.preventDefault()
      } else {
        event.returnValue = false
      }
      // 算出鼠标相对元素的位置
      let disX = null;
      let disY = null;
      if (binding.value === 'father') {
        disX = event.pageX - el.parentNode.offsetLeft;
        disY = event.pageY - el.parentNode.offsetTop;
      } else {
        disX = event.pageX - el.offsetLeft;
        disY = event.pageY - el.offsetTop;
      }
      console.log('event:::', event)
      console.log('el:::', el.offsetLeft)
      document.onmousemove = function (event) {
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let x = event.pageX - disX;
        let y = event.pageY - disY;
        let maxX;
        let maxY;
        if (binding.value === 'father') {
          maxX = el.parentNode.clientWidth - el.clientWidth;
          maxY = el.parentNode.clientHeight - el.clientHeight;
        } else {
          maxX = document.documentElement.clientWidth - el.clientWidth;
          maxY = document.documentElement.clientHeight - el.clientHeight;
        }
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