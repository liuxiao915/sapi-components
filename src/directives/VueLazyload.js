export const Lazyload = (Vue) => {
  return class Lazy {
    constructor(options) {
      this.options = options
      this.lazyImgpool = []
    }
    bindLazy (el, bindings, vnode) {
      Vue.nextTick().then(() => {
        console.log(el, bindings, vnode);
        const lazyImg = new LazyImg({
          el,
          src: bindings.value,
          options: this.options,
          imgRender: this.imgRender.bind(this)
        })
        this.lazyImgpool.push(lazyImg)
      })
    }
  }
}
export class Lazyimg {
  constructor({el, src, options, imgRender}) {
      this.el = el
      this.src = src
      this.options = options
      this.imgRender = imgRender
      this.loaded = false
  }
}

export const VueLazyload = {
  install (Vue, options) {
    const LazyClass = Lazyload(Vue)
    const lazyload = new LazyClass(options)
    Vue.directive('lazy', {
      bind: lazyload.bindLazy.bind(lazyload)
    })
  }
}

