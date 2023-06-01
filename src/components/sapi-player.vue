<template>
  <div class="sapi-player" id="container" :style="{height: height}">
    <!-- player-fullscreen='true'(防止横屏)  webkit-playsinline(对IOS-兼容)  playsinline(对IOS 10+兼容) x5-video-orientation="landscape|portrait" 视频跟着手机自动旋转-->
    <video v-if="url" class="player video-js vjs-default-skin vjs-big-play-centered"
      :id="videoId" x5-video-player-fullscreen="true" x5-playsinline playsinline webkit-playsinline>
      <source :src="url" type="application/x-mpegURL" />
    </video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'videojs-contrib-hls'
import 'video.js/dist/video-js.css'
import { ref, reactive, watch, onBeforeUnmount } from 'vue'

export default {
  name: 'sapiPlayer',
  props: {
    // 视频地址
    url: {
      type: String,
      default: ''
    },
    // 视频高度
    height: {
      type: [Number,String],
      default: '100%'
    }
  },
  setup(props) {
    const player = ref(null)
    const videoId = ref('')
    const state = reactive({
      options: {
        autoplay: true, // 设置自动播放
        muted: true, // 设置了它为true，才可实现自动播放,同时视频也被静音 （Chrome66及以上版本，禁止音视频的自动播放）
        preload: 'auto', // 预加载
        controls: true // 显示播放的控件
      }
    })
    watch(() => props.url, (val) => {
      if(val) {
        changeSource()
      }
    })
    const changeSource = () => {
      if (player.value) {
        player.value.dispose()
      }
      videoId.value = 'videoId' + (1000000 * Math.random()).toFixed(0)
      document.getElementById('container').innerHTML = ''
      var str = `<video id="${videoId.value}" class="player video-js vjs-default-skin vjs-big-play-centered" x5-video-player-fullscreen="true" x5-playsinline playsinline webkit-playsinline>
        <source src="${props.url}" type="application/x-mpegURL" />
      </video>`
      document.getElementById('container').innerHTML = str
      player.value = videojs(videoId.value, state.options)
    }
    onBeforeUnmount(() => {
      if (player.value) {
        player.value.dispose()
      }
    })
    return {
      player,
      videoId,
      status,
      state,
      height
    }
  }
}
</script>

<style lang="less" scoped>
.sapi-player {
  position: relative;
  width: 100%; 
  .player {
    width: 100%; 
    height: 100%;
  }
}
</style>
