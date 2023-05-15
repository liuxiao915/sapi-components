<template>
  <div class="sapi-grid" @click="handleClick" :style="{gap: gutter + 'px', gridAutoRows: height + 'px', 'grid-template-columns': `repeat(auto-fill, minmax(${width}px, 1fr))`}">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, provide } from "vue";

const getElParentNode = function(target, parentClassName) {
  if (target.className === parentClassName) {
    return target;
  }
  let parentNode = target.parentNode;
  let targetParentNode = null;
  while(!targetParentNode) {
    if (parentNode.className === parentClassName) {
      targetParentNode = parentNode;
    } else {
      parentNode = parentNode.parentNode;
    }
  }
  return targetParentNode;
}

export default defineComponent({
  name: 'sapiGrid',
  props: {
    modelValue: {
      type: [String, Number],
      default: 0
    },
    gutter: {
      type: [String, Number],
      default: 12
    },
    width: {
      type: Number,
      default: 90
    },
    height: {
      type: Number,
      default: 90
    }
  },
  setup(props, { emit }) {
    const active = ref(props.modelValue)
    provide('active', active.value)
    const handleClick = (e) => {
      const event = e || window.event;
      const target = event.target || event.srcElement;
      if(target.className == "sapi-grid-item"){
        const targetItem = getElParentNode(target, 'sapi-grid-item');
        const items = Array.prototype.slice.call(target.parentNode.querySelectorAll('.sapi-grid-item'));
        for(let item of items) {
          item.classList.remove('active');
        }
        targetItem.classList.add('active');
        emit('handleClick')
      }
    }
    return {
      active,
      handleClick
    }
  }
})
</script>

<style scoped lang="less">
.sapi-grid {
  position: relative;
  width: 100%;
  display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); // auto-fill：表示自动填充，让一行中尽可能的容纳更多的单元格
  grid-auto-flow: row dense; // row: 放置顺序是"先行后列"  dense: 表示尽可能填满表格
}
</style>
