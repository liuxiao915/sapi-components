<template>
  <div class="container">
    <span class="icon-file-copy" @click="handleCopy(code, $event)" title="复制代码"></span>
    <div class="code-box" v-highlight>
      <pre>
        <code class="highlightAuto">{{ code }}</code>
      </pre>
    </div>
  </div>
</template>
 
<script>
import clip from '@/utils/clipboard'
 
export default {
  name: 'sapi-copy-code',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  setup() {
    const handleCopy = (text, event) => {
      clip(text, event)
    }
    return {
      handleCopy
    }
  }
}
</script>
 
<style lang="less" scoped>
.container {
  position: relative;
  .icon-file-copy {
    position: absolute;
    right: 10px;
    top: 25px;
    font-size: 20px;
    cursor: pointer;
  }
  code {
    max-height: 360px;
    padding: 0 24px;
    color: #58727e;
    font-weight: 400;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', STHeiti, 'Microsoft Yahei', Tahoma, Simsun, sans-serif;
    line-height: 26px;
    background-color: #eff2f5; 
    border-radius: 10px;
  }
}
</style>