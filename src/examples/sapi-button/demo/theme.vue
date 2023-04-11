<docs>
  <h2>不同颜色主题按钮</h2>
  <p>提供浅灰色、蓝色、红色、黄色和绿色为主题的按钮。</p>
</docs>
<template>
  <div class="sapi-demo-block-column">
    <div class="sapi-demo-block-row">
      <sapi-button theme="default">
        填充按钮
      </sapi-button>
      <sapi-button theme="default" variant="outline">
        描边按钮
      </sapi-button>
      <sapi-button theme="default" variant="dashed">
        虚框按钮
      </sapi-button>
      <sapi-button theme="default" variant="text">
        文字按钮
      </sapi-button>
    </div>
    <div class="sapi-demo-block-row">
      <sapi-button theme="primary">
        填充按钮
      </sapi-button>
      <sapi-button theme="primary" variant="outline">
        描边按钮
      </sapi-button>
      <sapi-button theme="primary" variant="dashed">
        虚框按钮
      </sapi-button>
      <sapi-button theme="primary" variant="text">
        文字按钮
      </sapi-button>
    </div>
    <div class="sapi-demo-block-row">
      <sapi-button theme="danger">
        填充按钮
      </sapi-button>
      <sapi-button theme="danger" variant="outline">
        描边按钮
      </sapi-button>
      <sapi-button theme="danger" variant="dashed">
        虚框按钮
      </sapi-button>
      <sapi-button theme="danger" variant="text">
        文字按钮
      </sapi-button>
    </div>
    <div class="sapi-demo-block-row">
      <sapi-button theme="warning">
        填充按钮
      </sapi-button>
      <sapi-button theme="warning" variant="outline">
        描边按钮
      </sapi-button>
      <sapi-button theme="warning" variant="dashed">
        虚框按钮
      </sapi-button>
      <sapi-button theme="warning" variant="text">
        文字按钮
      </sapi-button>
    </div>
    <div class="sapi-demo-block-row">
      <sapi-button theme="success">
        填充按钮
      </sapi-button>
      <sapi-button theme="success" variant="outline">
        描边按钮
      </sapi-button>
      <sapi-button theme="success" variant="dashed">
        虚框按钮
      </sapi-button>
      <sapi-button theme="success" variant="text">
        文字按钮
      </sapi-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Theme',
  setup() {
    return {}
  }
}
</script>
<style scoped lang="less">
  @import '../index.less';
</style>
