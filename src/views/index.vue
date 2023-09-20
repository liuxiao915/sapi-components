<template>
  <sapi-layout :data="state.menuData" @selectTabs="selectMenu">
    <template #right>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.name" />
      </router-view>
    </template>
  </sapi-layout>
</template>
<script>
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { routes } from '@/router'

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
    const meun = routes[0].children.map(item => {
      return {
        path: item.path,
        name: item.name,
        label: item.meta.label
      }
    })
    const state = reactive({
      menuData: meun,
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
