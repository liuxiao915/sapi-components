<template>
  <canvas id="full-star" />
  <router-view></router-view>
</template>

<script>
import { onMounted } from "vue";
import { createStar } from '@/utils/canvas.js'
import { frontShow } from '@/utils/color-effects.js'
export default {
  name: 'App',
  setup() {
    onMounted(() => {
      // 初始化星空
      const canvas = document.getElementById('full-star')
      createStar(canvas)
      // 初始化点击页面出现彩色字体特效
      frontShow.init()
    })
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
#full-star {
  position: absolute;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
}
</style>
