import ResizeObserver from 'resize-observer-polyfill';
import { throttle } from '@/utils/index'
export const resizeObserver = (el, fn) => {
  return new ResizeObserver(throttle(entries => {
    console.log('entries::::', entries)
    if (entries && entries.length) {
      entries.forEach(entity => {
        // contentRect: 位置大小信息  target:dom信息
        // const { contentRect, target } = entity;
        if(fn) fn()
      })
    }
  }, 500))
}
export const observe = (el, fn) => {
  resizeObserver.observe(el);
}
export const unobserve = (el, fn) => {
  resizeObserver.unobserve(el);
}