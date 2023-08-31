<!--
 @Description: 
 @Author: liux
 @Date: 2023-08-31 10:01:05
 @LastEditTime: 2023-08-31 10:01:05
-->
<template>
  <div class="sapi-video">
    <video id="myVideo" width="400" height="300">
      <source :src="url" type="video/mp4">
    </video>
    <button @click="orientationChange">切换屏幕方向</button>
  </div>
</template>
<script>
import { defineComponent, onMounted } from 'vue';
export default defineComponent({
  name: 'sapi-video',
  setup() {
    const url = require('@/assets/media/video.mp4')
    const toggleOrientation = () => {
      var video = document.getElementById('myVideo');
      if (video.webkitDisplayingFullscreen) {
        // 如果视频正在全屏播放，则退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
          // 否则，进入全屏播放
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      }
    }

    const orientationChange = (mq) => {
      console.log('orientation:::::', 'orientation' in window)
      console.log('matchMedia:::::', 'matchMedia' in window)
      if ('orientation' in window) {
        if (window.orientation == 180 || window.orientation == 0) { 
          console.log('竖屏');
        } 
        if (window.orientation == 90 || window.orientation == -90 ){ 
          console.log('横屏');
        } 
      } else if ('matchMedia' in window) {
        if (mq.matches) {
          console.log("设备处于纵向方向");
        } else {
          console.log("设备处于横向方向");
        }
      } else {
        var width = window.innerWidth;
        var height = window.innerHeight;
        if (width > height) {
          // 横向方向
          return 'landscape';
        } else if (width < height) {
          // 纵向方向
          return 'portrait';
        } else {
          // 宽高相等，无法确定方向
          return 'undefined';
        }
      }
    };
    
    
    onMounted(() => {
      if ('orientation' in window) {
        window.addEventListener("orientationchange",orientationChange);
      } else if ('matchMedia' in window) {
        // 监听设备方向变化
        var mediaQueryList = window.matchMedia("(orientation: portrait)");
        console.log('mediaQueryList:::', mediaQueryList)
        mediaQueryList.addEventListener(orientationChange);
        // 初始化时立即执行一次回调函数
        orientationChange(mediaQueryList);
      }
    })
    return {
      url,
      toggleOrientation,
      orientationChange
    }
  }
})
</script>
<style lang="less" scoped>
.sapi-video {
  width: 100%;
  height: 100%;
}
</style>