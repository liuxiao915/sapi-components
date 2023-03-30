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
  position: relative;
  z-index: 10;
  height: 100%;
  header {
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    border-bottom: 1px solid #d0d7de;
    position: fixed;
    width: 100%;
    z-index: 100;
    background: #ffffff;
    padding: 0 12px;
  }
  main {
    display: flex;
    padding-top: 50px;
    height: calc(100% - 50px);
  }
  .left {
    width: 200px;
    padding: 12px;
    border-right: 1px solid #d0d7de;
    overflow-y: auto;
    .menu-item {
      cursor: pointer;
    }
  }
  .right {
    flex: 1;
    padding: 12px;
    overflow-y: auto;
  }
}
</style>