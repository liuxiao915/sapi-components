<template>
  <div class="loading" v-show="options.show">
    <div class="load-box">
      <sapi-icon name="loading" style="fill: blue"></sapi-icon>
      <span>{{ options.label }}</span>
    </div>
  </div>
</template>

<script>
import sapiIcon from '@/components/sapi-icon.vue'
export default {
  name: 'sapiIoading',
  props: {
    options: {
      type: Object,
      default: {
        show: false,
        label: '加载中...'
      }
    },
  },
  components: {
    sapiIcon
  }
}
</script>

<style scoped lang="less">
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .load-box {
    background-color: rgba(0, 0, 0, .5);
    width: 100px;height: 100px;border-radius: 5px;
    box-shadow:0px 1px 15px rgba(0,0,0, .5);color: #fff;
    display: flex;flex-direction: column;align-items: center;
    justify-content: center;letter-spacing: .8px;
    font-size: 13px;
    .svg-icon {
      font-size: 24px;
      width: 30px;margin-bottom: 8px;
      -webkit-animation:rotate .8s linear infinite;
    }
  }
}

@keyframes rotate{
  to{
    transform: rotate(360deg);
  }
}
</style>
