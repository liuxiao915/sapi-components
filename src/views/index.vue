<template>
  <div>
    <selectTree />
  </div>
</template>
<script>
import selectTree from "@/examples/tree";
export default {
  components: {
    "sapi-tree": selectTree
  },
  setup() {
    return {}
  }
}
</script>
<style lang="less" scoped>

</style>
