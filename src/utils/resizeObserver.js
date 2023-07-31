import ResizeObserver from 'resize-observer-polyfill';

export default (element, fn) => {
  const observer = new ResizeObserver(entries => {
    if (entries && entries.length) {
      entries.forEach(entity => {
        //contentRect:位置大小信息
        //target:dom信息
        // const { contentRect, target } = entity;
        fn()
      })
    }
  })
  observer.observe(element);
  return observer
}
