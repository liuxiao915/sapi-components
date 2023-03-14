<template>
  <sapi-layout :data="state.menuData" @selectTabs="selectTabs">
    <template #right>
      <router-view></router-view>
    </template>
  </sapi-layout>
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
        {path: '/icon', name: 'icon', label: 'icon 图标'},
        {path: '/tree', name: 'tree', label: '树形'},
        {path: '/mars3d', name: 'mars3d', label: 'gis地图'},
      ]
    })
    const selectTabs = (item, index) => {
      // activeTab.value = item.name
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
