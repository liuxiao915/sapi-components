<template>
  <div class="wrapper">
    <div v-for="(item,index) in iconNameList" :key="index" class="icons-list" @mouseleave="focusOut" @mouseover="focus(index)">
        <sapi-icon :name="item" style="fill: blue"></sapi-icon>
        <p v-if="showCode !== index" style="margin-top: 12px">{{item}}</p>
        <div v-if="showCode === index" style="margin-top: 12px">
          <sapi-icon :data-clipboard-text="item" class="file-copy" name="file-copy" @click="copyCode('.file-copy')"/>
          <sapi-icon :data-clipboard-text="iocIconList[index]" class="file-icon" name="file-icon" @click="copyCode('.file-icon')"/>
        </div>
    </div>
  </div>
  <md class="markdown-body" />
</template>

<script>
import {defineComponent, ref, getCurrentInstance} from 'vue'
import md from './sapi-icon.md'
import Clipboard from "clipboard";
export default defineComponent({
  components: {
    md
  },
  setup (props) {
    const { proxy } = getCurrentInstance()
    const iocIconList = ref([])
    const showCode = ref(-1)
    const getNameList = ()=>{
      const moduleList = require.context('../../assets/icons/', false, /\.svg$/)
      const requireAll = requireContext => requireContext.keys().map(requireContext)
      let iconList = requireAll(moduleList)
      const iconNameList = iconList.map(module => {
        const name = module.default.id.substring(5)
        iocIconList.value.push(`<sapi-icon name='${name}' />`)
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
        proxy.$message({ type: 'success', text: '复制成功' })
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        proxy.$message({ type: 'error', text: '复制失败' })
        clipboard.destroy()
      })
    }
    return {
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
.wrapper {
  display: grid;
  grid-gap: 10px 20px;
  grid-template-columns: repeat(auto-fill, 185px);
  margin-bottom: 20px;
}
.icons-list {
  text-align: center;
  width: 100%;
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
.file-copy,.file-icon{
  font-size: 16px;
  cursor: pointer
}
</style>
