<template>
  <div class="sapi-layout">
    <header>
      <slot name="header">组件库</slot>
    </header>
    <main>
      <section class="left">
        <div class="menu-item" v-for="(item, index) in data" :key="index" @click="selectTabs(item, index)">{{ item.label }}</div>
      </section>
      <section class="right">
        <slot name="right"></slot>
      </section>
    </main>
  </div>
</template>
<script>
export default {
  name: 'sapiLayout',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const selectTabs = (item, index) => {
      emit('selectTabs', item, index)
    }
    return {
      selectTabs
    }
  }
}
</script>
<style lang="less" scoped>
.sapi-layout {
  height: 100%;
  header {
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    border-bottom: 1px solid #000;
  }
  main {
    display: flex;
  }
  .left {
    width: 200px;
    height: 100%;
    border-right: 1px solid #000;
    overflow-y: auto;
    .menu-item {
      cursor: pointer;
    }
  }
  .right {
    flex: 1;
  }
}
</style>