import * as mars3d from "mars3d";
// map对象上可以操作的常用方法有：
// map.controls 控件对象操作
// console.log("地图上已有控件", map.controls)
// map.controls.locationBar.show = false //隐藏该控件
// map.controls.timeline.zoomTo(startTime, stopTime) //时间线控件赋值

// //Popup相关
// map.openPopup(position, content, options) //打开Popup弹窗
// map.closePopup()//关闭弹窗

// //Tooltip相关
// map.openTooltip(position, content, options) //打开Tooltip弹窗
// map.closeTooltip()//关闭Tooltip弹窗

// //SmallTooltip相关 
// map.openSmallTooltip(position, message) //显示小提示窗，一般用于鼠标操作的提示。
// map.closeSmallTooltip()//关闭小提示窗

// //右键菜单相关
// map.getContextMenu() //获取绑定的右键菜单数组
// map.bindContextMenu(mapContextmenuItems) //绑定地图的默认右键菜单
// map.unbindContextMenu() //解除绑定的右键菜单
// map.openContextMenu(position, content, options) //打开右键菜单
// map.closeContextMenu() //关闭右键菜单
 

export const initOPenPopup = (map) => {
  map.on(mars3d.EventType.popupOpen, function (event) {
    const container = event.container // popup对应的DOM
  })
  map.on(mars3d.EventType.popupClose, function (event) {
    const container = event.container // popup对应的DOM
  })
}

export const bindMapDom = () => {
  // 关闭弹窗
  map.closeTooltip()
  console.log('clickCallbackFun--openPopup')
  // 传入坐标和内容，可以直接任意弹出
  const position = [113.95073239750282, 22.564112402018165, 0]
  map.openPopup(position, "你好你好你好你好你好")
}