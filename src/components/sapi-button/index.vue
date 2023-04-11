<template>
  <button
    :disabled="disabled"
    :autofocus="autofocus"
    :type="type"
    :class="[...buttonClass]"
    @click="$emit('click')"
  >
    <span v-if="$slots.default"><slot /></span>
  </button>
</template>
<script>
import { computed, defineComponent } from 'vue';
import { usePrefixClass,useCommonClassName } from '@/hooks/useConfig';
import './index.less'

export default defineComponent({
  name: 'sapiButton',
  inheritAttrs: false,
  props: {
    /** 是否为块级元素 */
    block: {
      type: Boolean,
      default: false
    },
    /** 是否禁用按钮 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 是否为镂空按钮 */
    plain: {
      type: Boolean,
      default: false
    },
    /** 是否显示为加载状态 */
    loading: {
      type: Boolean,
      default: false
    },
    /** 按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形 */
    shape: {
      type: String,
      default: 'rectangle',
      validator(val) {
        return ['rectangle', 'square', 'round', 'circle'].includes(val)
      }
    },
    /** 组件尺寸 */
    size: {
      type: String,
      default: 'medium',
      validator(val) {
        return ['mini', 'small', 'medium', 'large'].includes(val)
      }
    },
    /** 组件风格，依次为默认色、品牌色、危险色、警告色、成功色 */
    theme: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'primary', 'danger', 'warning', 'success'].includes(val)
      }
    },
    /** 按钮类型 */
    type: {
      type: String,
      default: 'button',
      validator(val) {
        return ['submit', 'reset', 'button'].includes(val)
      }
    },
    /** 按钮形式，基础、线框、虚线、文字 */
    variant: {
      type: String,
      default: 'base',
      validator(val) {
        return ['base', 'outline', 'dashed', 'text'].includes(val)
      }
    }
  },
  setup(props){
    const { autofocus,disabled } = props
    const COMPONENT_NAME = usePrefixClass('sapiButton');
    const { STATUS, SIZE } = useCommonClassName('sapiButton');
    const mergeTheme = computed(() => {
      const { theme, variant } = props;
      if (theme) return theme;
      if (variant === 'base') return 'primary';
      return 'default';
    });
    const buttonClass =computed(()=>[
      COMPONENT_NAME.value,
      SIZE.value[props.size],
      `${COMPONENT_NAME.value}--variant-${props.variant}`,
      `${COMPONENT_NAME.value}--theme-${mergeTheme.value}`,
        {
          [STATUS.value.disabled]: disabled,
          [STATUS.value.loading]: props.loading,
          [`${COMPONENT_NAME.value}--shape-${props.shape}`]: props.shape !== 'rectangle',
          [`${COMPONENT_NAME.value}--plain`]: props.plain,
        },
    ])
    return{
      COMPONENT_NAME,
      disabled,
      buttonClass,
      autofocus,
      type:props.type,
      loading:props.loading
    }
  }
})
</script>
