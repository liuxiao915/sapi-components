<!--
  图标组件
  示例：<svg-icon iconClass="edit" />
  说明：组件实现项目自由图标库，将svg切图放入src/assets/icons路径下即可在组件中通过文件名称引用，组件属性如下
    - iconClass svg文件名称
    - className 样式的类名
-->
<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'sapiIcon',
  props: {
    iconClass: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.name || this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
