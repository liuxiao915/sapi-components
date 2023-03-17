<template>
  <sapi-layout :data="state.menuData" @selectTabs="selectMenu">
    <template #right>
      <div class="sapi-tabs">
        <div :class="['sapi-tabs-item', activeTab === index ? 'active' : '']" v-for="(item, index) in state.tabsData" :key="index" @click="changeTab(item)">{{ item.label }}</div>
      </div>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </template>
  </sapi-layout>
</template>
<script>
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
  setup() {
    const router = useRouter()
    const activeMenu = ref('')
    const activeTab = ref(0)
    const state = reactive({
      menuData: [
        {path: '/icon', name: 'icon', label: 'icon 图标'},
        {path: '/tree', name: 'tree', label: '树形'},
        {path: '/mars3d', name: 'mars3d', label: 'gis地图'},
        {path: '/echarts', name: 'echarts', label: 'echarts图表'},
      ],
      tabsData: [
        {label: '实例', value: 0},
        {label: 'API', value: 1},
        {label: '指南', value: 2},
      ]
    })
    const selectMenu = (item, index) => {
      activeMenu.value = item.name
      router.push({
        path: item.path,
        query: {}
      })
    }
    const changeTab = (item) => {
      activeTab.value = item.value
    }
    return {
      state,
      activeMenu,
      activeTab,
      changeTab,
      selectMenu
    }
  }
}
</script>
<style lang="less" scoped>
.sapi-tabs {
  display: flex;
  height: 50px;
  margin-bottom: 12px;
  .sapi-tabs-item {
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    background-color: #327ab4;
    border-radius: 5px;
    margin-right: 10px;
    &.active {
      color: #3636dd;
    }
  }
}
</style>
