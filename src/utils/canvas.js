export function createStar (canvas, w = window.screen.width, counts = 80, alpha = 1) {
  var ctx = canvas.getContext('2d')
  const h = 919 // window.screen.height
  canvas.width = w
  canvas.height = 919 // h
  function Build () {
    this.ctx = ctx
    this.counts = counts // 最大粒子数
    this.initSize = 8 // 粒子初始化最大大小
    this.maxSize = 12 // 粒子在达到多少尺寸后消失
    this.halfWidth = w / 2
    this.halfHeight = h / 2
    this.arr = [] // 用于存储粒子
  }
  Build.prototype.init = function () {
    this.run()
    this.animate()
  }
  Build.prototype.add = function (item) {
    var grd = this.ctx.createRadialGradient(item.x, item.y, item.size / 2, item.x, item.y, item.size)
    if (item.size > this.maxSize) {
      return
    } else {
      grd.addColorStop(0, item.color)
    }
    this.ctx.fillStyle = grd
    this.ctx.beginPath()
    this.ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2, true)
    this.ctx.transform(1, 0, 0, 1, 0, item.z)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.globalAlpha = alpha
  }
  Build.prototype.run = function () {
    var nums = 0
    const colorList = ['', '#0263C6', '#B9DBFF', '#F4F5FF', '#00FFF9', '#00ADFF', '#FFFFFF']
    while (nums < this.counts) {
      var item = {
        x: Math.ceil(Math.random() * w),
        y: Math.ceil(Math.random() * h),
        positionX: Math.random() * w - this.halfWidth,
        positionY: Math.random() * h - this.halfHeight,
        fl: 200,
        speed: Math.random() * 0.6,
        positionZ: Math.random() * 250,
        r: Math.ceil(Math.random() * this.initSize),
        color: colorList[Math.ceil(Math.random() * 6)]
      }
      this.arr.push(item)
      nums++
    }
  }
  Build.prototype.clear = function () {
    ctx.clearRect(0, 0, w, h)
  }
  Build.prototype.render = function () {
    this.clear()
    for (var item of this.arr) {
      this.draw(item)
    }
  }
  Build.prototype.animate = function () {
    this.render()
    /* api自带方法 */
    window.requestAnimationFrame(() => {
      this.animate()
    })
  }
  Build.prototype.draw = function (item) {
    if (item.positionZ > -item.fl) {
    /* 连续修改scale，保持变化，用于控制量子大小，在屏幕上的位置 */
      var scale = item.fl / (item.fl + item.positionZ)
      /* 修改对应数据 */
      item.x = this.halfWidth + item.positionX * scale
      item.y = this.halfHeight + item.positionY * scale
      item.size = item.r * scale
      item.positionZ -= item.speed
    } else {
    /* 初始化超出屏幕的量子。达成屏幕量子数量保持衡量的方法 */
      item.positionZ = Math.random() * 100
    }
    this.add(item)
  }
  var app = new Build()
  app.init()
}