<template>
  <Transition name="down">
    <div class="sapi-message" :style="style[type]" v-show='isShow'>
      <!-- 上面绑定的是样式 -->
      <!-- 不同提示图标会变 -->
      <i class="iconfont" :class="[style[type].icon]"></i>
      <span class="message">{{ message }}</span>
    </div>
  </Transition>
</template>
<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'sapiMessage',
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      // warn 警告  error 错误  success 成功
      default: 'warn'
    }
  },
  setup (props) {
    // 定义一个对象，包含三种情况的样式，对象key就是类型字符串
    const style = {
      warn: {
        icon: 'icontishi',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)',
        top: '25px'
      },
      error: {
        icon: 'iconguanbi5',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)'
      },
      success: {
        icon: 'iconqiyong',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)'
      }
    }
    // 控制动画
    const isShow = ref(false)
    // 组件模板渲染成功后触发
    onMounted(() => {
      isShow.value = true
    })
    return { style, isShow }
  }
}
</script>
<style scoped lang="less">
.down {
  &-enter {
    &-from {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
.sapi-message {
  min-width: 150px;
  max-width: 400px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  padding: 10px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 4px;
  }
}
</style>