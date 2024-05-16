<template>
  <div ref="sapiScreenShot" class="modal-card">
    <sapi-button ghost theme="primary" variant="outline" @click="ScreenShortStart">js-web-screen-shot截屏</sapi-button>
    <!-- :data-html2canvas-ignore="true"属性可以在导出图片的时候隐藏该标签 -->
    <sapi-button ghost theme="primary" variant="outline" :data-html2canvas-ignore="true" @click="html2canvasStart">html2canvas截屏</sapi-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import html2canvas from 'html2canvas'
import ScreenShort from "js-web-screen-shot"
  const ScreenShortStart = () => {
    new ScreenShort({
      enableWebRtc: false, // 是否启用webrtc，值为false则使用html2canvas来截图
      loadCrossImg: false, // 跨域
      level: 9999, // 层级
      completeCallback: (callback) => {
        console.log('callback', callback)
        base64ToImage(callback.base64, 'ScreenShort.png')
      },
      closeCallback: (callback) => {console.log('callback', callback)}
    })
  }
  const sapiScreenShot = ref(null)
  const html2canvasStart = () => {
      const width = sapiScreenShot.value.offsetWidth // dom宽
      const height = sapiScreenShot.value.offsetHeight // dom高
      const scale = 2 // 放大倍数
      html2canvas(sapiScreenShot.value, {
        dpi: window.devicePixelRatio * 2,
        scale: scale,
        width: width,
        heigth: height,
        useCORS: true, // 【重要】开启跨域配置
        backgroundColor: '#fff'
      }).then(canvas => {
        console.log('canvas', canvas)
        // 转blob文件流
        // const blob = await new Promise(resolve => {
        //   canvas.toBlob(resolve, 'image/png')
        // })
        // // blob文件流转File对象
        // const file = new File([blob], 'element.png', { type: 'image/png' })
        // // 转base64格式图片
        // const base64 = canvas.toDataURL('image/png')
        const imgData = canvas.toDataURL('image/jpeg')
        const aLink = document.createElement('a')
        aLink.style.display = 'none'
        aLink.href = imgData
        aLink.download = 'xxx.png'
        // 触发点击-然后移除
        document.body.appendChild(aLink)
        aLink.click()
        document.body.removeChild(aLink)
      }).finally(() => {})
      
  }
  const base64ToImage = (base64Data, filename) => {
    // 将base64的数据部分提取出来
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data.split(',')[1]);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        const begin = sliceIndex * sliceSize;
        const end = Math.min(begin + sliceSize, bytesLength);
        const bytes = new Uint8Array(end - begin);
        for (let i = begin, j = 0; i < end; ++i, ++j) {
            bytes[j] = byteCharacters.charCodeAt(i);
        }
        byteArrays[sliceIndex] = bytes;
    }
    // 使用Blob将字节转换为文件对象
    const blob = new Blob(byteArrays, { type: 'image/png' });
    // 创建一个指向Blob的URL
    const imageUrl = URL.createObjectURL(blob);
    // 创建一个a标签用于下载
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    // 清除Blob URL
    URL.revokeObjectURL(imageUrl);
  }
</script>

<style lang="less" scoped>

</style>
