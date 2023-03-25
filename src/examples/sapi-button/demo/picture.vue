<docs>
  <h2>图标按钮</h2>
  <p>图标按钮由图标+文字或图标构成。通过图标可增强识别性，以便直观理解。</p>
</docs>
<template>
  <div class="demo-button-icon">
    <div class="demo-button-row">
      <div class="demo-button-col">
        <sapi-button theme="primary">
          新建
        </sapi-button>
        <sapi-button variant="outline">
          上传文件
        </sapi-button>
      </div>
      <div class="demo-button-col">
        <sapi-button
          shape="circle"
        >
        </sapi-button>
        <sapi-button
          shape="circle"
        >
        </sapi-button>
      </div>
    </div>
  </div>
</template>
<script>
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
