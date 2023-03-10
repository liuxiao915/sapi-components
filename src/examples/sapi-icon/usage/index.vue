<template>
  <div style="display: flex;flex-wrap: wrap">
    <div v-for="(item,index) in iconNameList" :key="index" class="icons-view__wrapper" @mouseleave="focusOut" @mouseover="focus(index)">
        <ioc-icon :name="item" style="fill: blue"></ioc-icon>
        <p v-if="showCode !== index" style="margin-top: 12px">{{item}}</p>
        <div v-if="showCode === index" style="margin-top: 12px">
          <ioc-icon :data-clipboard-text="item" class="file-copy"  name="file-copy" @click="copyCode('.file-copy')"/>
          <ioc-divider layout="vertical" />
          <ioc-icon :data-clipboard-text="iocIconList[index]" class="file-icon" name="file-icon" @click="copyCode('.file-icon')"/>
        </div>
    </div>
  </div>
  <div v-if="key === 'api'">
    <md class="markdown-body" />
  </div>
</template>

<script>
import {defineComponent, ref, watch} from 'vue'
import md from '../ioc-icon.md'
import props from '@/examples/common/props'
import IocDivider from "@/components/divider";
import Clipboard from "clipboard";
export default defineComponent({
  components: {
    IocDivider,
    md
  },
  props,
  setup (props) {
    const key = ref(props.tabActive)
    watch(
      () => props.tabActive,
      () => {
        key.value = props.tabActive
      }
    )
    const iocIconList = ref([])
    const showCode = ref(-1)
    const getNameList = ()=>{
      const moduleList = require.context('../../../assets/icons/', false, /\.svg$/)
      const requireAll = requireContext => requireContext.keys().map(requireContext)
      let iconList = requireAll(moduleList)
      const iconNameList = iconList.map(module => {
        const name = module.default.id.substring(5)
        iocIconList.value.push(`<ioc-icon name='${name}' />`)
        return name
      })
      return iconNameList
    }
    const focus = e=>{
      showCode.value = e
    }
    const focusOut = ()=>{
      showCode.value = -1
    }
    const copyCode = id => {
      // 复制代码
      const clipboard = new Clipboard(id)
      clipboard.on('success', () => {
        message.success('复制成功');
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        message.success('复制失败，请联系管理员');
        clipboard.destroy()
      })

    }
    return {
      key,
      iconNameList:getNameList(),
      iocIconList,
      showCode,
      focus,
      focusOut,
      copyCode
    }
  }
})
</script>
<style lang="less" scoped>
.icons-view__wrapper {
  width: calc(16.6667%);
  height: 100px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: 6px;
  position: relative;
  &:hover{
    background: #eeeeee;
  }
}
.svg-icon{
  font-size: 24px;
}

.ioc-divider--vertical{
  border-left: 1px solid #bfbfbfcc;
}
.file-copy,.file-icon{
  font-size: 16px;
  cursor: pointer
}
</style>
