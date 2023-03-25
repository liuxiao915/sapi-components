<docs>
  <h2>图标按钮</h2>
  <p>图标按钮由图标+文字或图标构成。通过图标可增强识别性，以便直观理解。</p>
</docs>
<template>
  <div class="demo-button-icon">
    <div class="demo-button-row">
      <div class="demo-button-col">
        <sapi-button theme="primary">
          <PlusOutlined />
          新建
        </sapi-button>
        <sapi-button variant="outline">
          <CloudUploadOutlined />
          上传文件
        </sapi-button>
      </div>
      <div class="demo-button-col">
        <sapi-button
          shape="circle"
        >
          <WechatOutlined />
        </sapi-button>
        <sapi-button
          shape="circle"
        >
          <QqOutlined />
        </sapi-button>
      </div>
    </div>
  </div>
</template>
<script>
  // import { PlusOutlined, CloudUploadOutlined, WechatOutlined, QqOutlined } from '@ant-design/icons-vue'
export default {
  name: 'Picture',
  setup(){
    return {}
  }
}
</script>

<style scoped>
.demo-button-row {
  display: flex;
}
.demo-button-col {
  margin-right: 32px;
}
.sapi-button + .sapi-button {
  margin-left: 16px;
}
</style>
