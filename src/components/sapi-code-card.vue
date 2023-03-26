<template>
  <div v-html="component.options.__sourceCodeTitle"></div>
  <div class="blcok-card">
    <component :is="component" />
  </div>
  <div class="code-card">
    <sapi-icon title="获取json" name='JSON' v-show="false" style="cursor: pointer;margin-right: 16px" @click="$emit('getCode',component.setup().option)"/>
    <button title="复制代码" variant="text" :class="'copy-btn'" style="cursor: pointer" :data-clipboard-text="component.options.__sourceCode" @click="copyCode()">
      <sapi-icon name="file-copy" style="cursor: pointer;" />
    </button>
    <button title="查看代码" variant="text" style="cursor: pointer" @click="handleCodeVisible">
      <sapi-icon :name="codeVisible?'unexpand':'expand'" style="cursor: pointer;" />
    </button>
  </div>
  <div v-show="codeVisible" class="component-source">
    <pre>
      <code ref="code" class="html">
        <p v-text="component.options.__sourceCode"></p>
      </code>
    </pre>
  </div>
</template>

<script>
import * as highlight from 'highlight.js';
import 'highlight.js/styles/github.css'
import Clipboard from 'clipboard'
import {defineComponent, nextTick, onMounted, ref, getCurrentInstance} from "vue"
export default defineComponent({
    name: "sapi-code-card",
    props: {
      title: String,
      description: String,
      component: {
        type: Object,
        required: true
      }
    },
    setup(){
      const { proxy } = getCurrentInstance()
      const codeVisible = ref(false)
      const code = ref(null)
      const init = ()=>{
        try {
          highlight(code)
        }catch {

        }
      }
      const handleCodeVisible = ()=>{
        codeVisible.value = !codeVisible.value
      }
      const copyCode = () => {
        // 复制代码
        const clipboard = new Clipboard('.copy-btn')
        clipboard.on('success', () => {
          proxy.$message({ type: 'success', text: '复制成功' })
          clipboard.destroy()
        })
        clipboard.on('error', () => {
          proxy.$message({ type: 'error', text: '复制失败' })
          clipboard.destroy()
        })
      }
      onMounted(async ()=>{
        await nextTick()
        init()
      })
      return{
        codeVisible,
        handleCodeVisible,
        copyCode
      }
    }
})
</script>

<style scoped lang="less">
  .code-card{
    display: flex;
    justify-content: center;
    padding: 12px 0;
    border-top: 1px dashed #f0f0f0;
    opacity: 0.7;
    transition: opacity .3s;
    background-color: #eeeeee;
  }
  .component-source{
    border: 1px solid #eeeeee;
  }
  :deep(code) {
    margin-top: 50px!important;
  }
</style>
