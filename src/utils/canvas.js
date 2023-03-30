export function createStar (canvas, w = 6400, counts = 100, alpha = 1) {
  var ctx = canvas.getContext('2d')
  const h = 1080
  canvas.width = w
  canvas.height = h
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
    this.render()
    this.animate()
  }
  Build.prototype.add = function (coor) {
    var grd = this.ctx.createRadialGradient(coor.x, coor.y, coor.size / 2, coor.x, coor.y, coor.size)
    if (coor.size > this.maxSize) {
      return
    } else {
      grd.addColorStop(0, coor.color)
      // grd.addColorStop(1, 'white')
    }
    this.ctx.fillStyle = grd
    this.ctx.beginPath()
    this.ctx.arc(coor.x, coor.y, coor.size, 0, Math.PI * 2, true)
    this.ctx.transform(1, 0, 0, 1, 0, coor.z)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.globalAlpha = alpha
  }
  Build.prototype.run = function () {
    var nums = 0
    const colorList = ['', '#0263C6', '#B9DBFF', '#F4F5FF', '#00FFF9', '#00ADFF', '#FFFFFF']
    while (nums < this.counts) {
      var coor = {
        x: Math.ceil(Math.random() * w),
        y: Math.ceil(Math.random() * h),
        posx: Math.random() * w - this.halfWidth,
        posy: Math.random() * h - this.halfHeight,
        fl: 200,
        speed: Math.random() * 0.6,
        posz: Math.random() * 250,
        r: Math.ceil(Math.random() * this.initSize),
        color: colorList[Math.ceil(Math.random() * 6)]
      }
      this.arr.push(coor)
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
    var _this = this
    this.render()
    /* api自带方法 */
    window.requestAnimationFrame(function () {
      _this.animate()
    })
  }
  Build.prototype.draw = function (item) {
    if (item.posz > -item.fl) {
    /* 连续修改scale，保持变化，用于控制量子大小，在屏幕上的位置 */
      var scale = item.fl / (item.fl + item.posz)
      /* 修改对应数据 */
      item.x = this.halfWidth + item.posx * scale
      item.y = this.halfHeight + item.posy * scale
      item.size = item.r * scale
      item.posz -= item.speed
    } else {
    /* 初始化超出屏幕的量子。达成屏幕量子数量保持衡量的方法 */
      item.posz = Math.random() * 100
    }
    this.add(item)
  }
  var app = new Build()
  app.init()
}