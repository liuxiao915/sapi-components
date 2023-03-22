<template>
  <div class="loader" v-show="show">
    <div class="loader-inner">
      {{label}}
      <div class="loader-line-wrap">
        <div class="loader-line"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: '加载中...'
    }
  },
  watch: {
    label: {
      handler (val) {
        console.log(val)
      },
      immediate: true,
      deep: true
    },
    show: {
      handler (val) {
        console.log(val)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.loader {
  background: rgba(0, 0, 0, 0.7);
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
}

.loader-inner {
  bottom: 0;
  height: 60px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}

.loader-line-wrap {
  animation: spin 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  box-sizing: border-box;
  height: 50px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  transform-origin: 50% 100%;
  width: 100px;
}
.loader-line {
  border: 4px solid transparent;
  border-radius: 100%;
  box-sizing: border-box;
  height: 100px;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}
.loader-line-wrap:nth-child(1) {
  animation-delay: -50ms;
}


.loader-line-wrap:nth-child(1) .loader-line {
  border-color: hsl(0, 80%, 60%);
  height: 90px;
  width: 90px;
  top: 7px;
}

@keyframes spin {
  0%,
  15% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>