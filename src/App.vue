<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Dom from "@/views/index.vue";
export default {
  name: 'App',
  components: {
    Dom
  },
  methods: {
    handleClickA(){
      console.log('handleClickA')
      this.$router.push({path: '/aPage'})
    },
    handleClickB(){
      this.$router.push({path: '/bPage'})
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
