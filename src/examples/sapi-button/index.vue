<template>
  <div v-if="key === 'demo'">
    <sapi-code-card v-for="(item,index) in components" :key="index" :component="item" :name="item.name"></sapi-code-card>
  </div>
  <div v-if="key === 'api'">
    <md class="markdown-body" />
  </div>
  <div v-if="key === 'design'">
    <h1>啥都没有</h1>
  </div>
</template>

<script>
import {defineComponent, ref, watch} from 'vue'
import md from './button.md'
import props from '@/examples/common/props'
import {getComponentList} from "@/examples/common/component";

export default defineComponent({
  components: {
    md
  },
  props,
  setup (props) {
    const key = ref(props.tabActive)
    watch(
      () => props.tabActive,
      () => {
        key.value = props.tabActive
      }
    )
    const components = getComponentList(require.context('./demo/', true, /\.vue$/))
    return {
      key,
      components
    }
  }
})
</script>
