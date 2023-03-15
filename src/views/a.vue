<template>
  <div>我是aaaa</div>
</template>
<script>
export default {
  props: {
    activeTab: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    console.log('activeTab', props.activeTab)
    return {}
  }
}
</script>
<style lang="less" scoped>

</style>
