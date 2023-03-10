<template>
  <div class="layout">
    <header>
      <slot name="header">组件库</slot>
    </header>
    <section class="left-menu">
      <div v-for="(item, index) in state.menuData" :key="index" @click="selectTabs(item, index)">{{ item.label }}</div>
    </section>
  </div>
  <!-- <sapiIcon /> -->
    <router-view>
      <!-- <component :is="activeTab"></component> -->
    </router-view>
</template>
<script>
// import sapiIcon from '@/examples/sapi-icon/usage/index.vue'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
// const context = require.context('../examples/', true, /\/index.vue$/)
// const components = {}
// context.keys().forEach((key) => {
//   const name = key.replace(/^\.\/(.*)\.\w+$/, '$1').split('/')[0]
//   components[`${name}`] = context(key).default || context(key)
// })
export default {
  props: {
    menuData:{
      type: Array,
      default: () => []
    }
  },
  // components: {
  //   sapiIcon
  // },
  setup() {
    const router = useRouter()
    const activeTab = ref('')
    const state = reactive({
      menuData: [
        {path: '/icon', label: 'icon 图标'}
      ]
    })
    const selectTabs = (item, index) => {
      router.push({
        path: item.path,
        query: {}
      })
    }
    return {
      state,
      activeTab,
      selectTabs
    }
  }
}
</script>
<style lang="less" scoped>
header {
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  border-bottom: 1px solid #000;
}
</style>
