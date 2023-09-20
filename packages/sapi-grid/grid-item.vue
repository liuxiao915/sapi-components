<template>
  <div :class="['sapi-grid-item']" @click="handleChange($event, item)">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, inject } from "vue";
export default defineComponent({
  name: 'sapiGridItem',
  props: {
    type: {
      type: String,
      default: 'middle',
      validator(val) {
        return ['large', 'middle', 'small', 'mini'].includes(val)
      }
    },
    item: {
      type: [String, Number, Object]
    }
  },
  setup(props, { emit }) {
    const active = inject('active', 0)
    const handleChange = (e, item) => {
      emit('change', item)
    }
    return {
      handleChange
    }
  }
})
</script>

<style scoped lang="less">
.sapi-grid-item {
  display: flex;
  padding: 12px;
  background-color: green;
  &:hover {
    background-color: pink;
  }
}
.active {
  background-color: red;
}
.large {
  grid-column-end: span 12;
}
.middle {
  grid-column-end: span 6;
}
.small {
  grid-column-end: span 4;
}
.mini {
  grid-column-end: span 3;
}
</style>
