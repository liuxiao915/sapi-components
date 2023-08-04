<docs>
  <h2>基础按钮</h2>
  <p>基础按钮包括填充按钮、描边按钮、虚框按钮、和文字按钮。</p>
  <h4>填充按钮</h4>
  <p>一般用于主按钮，是用户在整个页面需要关注优先级最高的操作，引导用户关注并操作。</p>
  <h4>描边按钮</h4>
  <p>描边按钮常见白底加文字的形式，在视觉强调程度上弱于填充按钮，通常与填充按钮搭配成组使用。</p>
  <h4>虚框按钮</h4>
  <p>按钮边框线为虚线，常用于表单中的添加配置项。</p>
  <h4>文字按钮</h4>
  <p>直接使用文字作为按钮。是视觉吸引力最弱的一个按钮，通常出现在表格操作栏、标题和字段旁等。</p>
</docs>
<template>
  <div class="wrapper">
    <sapi-button v-drag theme="default" variant="base">填充按钮</sapi-button>
    <sapi-button theme="default" variant="outline">描边按钮</sapi-button>
    <sapi-button theme="default" variant="dashed">虚框按钮</sapi-button>
    <sapi-button theme="default" variant="text">文字按钮</sapi-button>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: 'Base',
  setup() {
    const visible = ref(true)
    return {
      visible
    }
  }
}
</script>
<style scoped lang="less">
  @import '../index.less';
  .wrapper {
    position: relative;
  }
</style>
