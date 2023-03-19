// mobileTip.vue
<template>
  <div class="Box">
    <div class="contentBox">
      <i class="el-icon-success icon success" v-if="type === 'success'" ></i>
      <i class="el-icon-error icon error"  v-if="type === 'error'" ></i>
      <i class="el-icon-warning icon info"  v-if="type === 'info'"></i>
      <span>{{ msg }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sapiMessage',
  data() {
    return {
    }
  },
  props: {
    msg: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'success'
    }
  },
}
</script>

<style lang="less" scoped>
  .Box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    overflow-x: hidden;
    overflow-y: hidden;
    justify-content:center;
    align-items: center;
    z-index: 999999;
  }
   .contentBox{
      max-width: 80%;
      min-height: 120px;
      background: rgba(1,1,1,0.7);
      color: rgb(221, 215, 215);
      border-radius: 8px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content:center;
      /* font-size:28px; */
    }
    .contentBox span{
      word-break: break-all;
      margin: 0 16px;
    }
    .icon{
      font-size: 40px;
      margin-bottom: 16px;
    }
    .info{
      color: #909399;
    }
    .success{
      color: #67c23a;
    }
    .error{
      color: #f56c6c;
    }
</style>

