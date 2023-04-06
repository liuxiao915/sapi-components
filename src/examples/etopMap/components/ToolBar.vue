<template>
  <!-- <div :class="[this.activeStatus? 'activeContainer' : '']"> -->
  <div id="container">
    <geocoder-search
      v-if="config?.isGeoCoderSearchEnable !== false"
      @changeSearchStatus="changeSearchStatus"
      @updateRegionSwitcher="updateRegionSwitcher"
    />
    <div
      v-if="config?.isFullScreenEnable !== false"
      class="full_screen item"
      title="全屏"
      @click="fullScreen"
    />
    <!-- <div
        v-if="config?.isResetLocationEnable !== false"
        class="environment_filled item"
        title="回到当前位置"
        @click="resetLocation"
      /> -->
    <div v-if="config?.isHomeEnable !== false" class="home item" title="重置" @click="reset" />
    <!-- <div v-if="config?.is3DEnable !== false" class="three_dim item" title="3D" @click="threeDim" /> -->
    <div
      v-if="config?.isPitchFixed === true"
      class="pitch item"
      title="锁定垂直视角"
      @click="setPitch"
    />
  </div>
  <!-- </div> -->
</template>

<script>
import GeocoderSearch from './GeocoderSearch.vue'

export default {
  components: {
    GeocoderSearch
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        isGeoCoderSearchEnable: true,
        isFullScreenEnable: true,
        isResetLocationEnable: true,
        isHomeEnable: true,
        is3DEnable: true,
        isPitchFixed: false
      })
    }
  },
  data() {
    return {
      // 标识是否全屏
      isFullScreen: false,
      //收缩框是否展开
      activeStatus: false,
      //是否允许垂直视角变化
      pitchEnabled: true
    }
  },
  methods: {
    changeSearchStatus(val) {
      this.activeStatus = val
      this.$emit('toggleSearchStatus', val)
    },
    addTerrain() {
      //window.etopMap.terrainUtils.enableTerrain(true)
      window.etopMap.terrainUtils.toggleTerrainProvider()
    },
    closeTerrain() {
      window.etopMap.terrainUtils.enableTerrain(false)
    },
    // 点击全屏时触发
    fullScreen() {
      let div = document.querySelector('.shenshan_box')
      if (!this.isFullScreen) {
        // 开启全屏
        this.$emit('fullScreen')
        let url =
          'url(data:image/png;base64,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)'
        document.querySelector('#container > div.full_screen.item').style.backgroundImage = url
        div.classList.add('newClass')
      } else {
        this.$emit('exitFullscreen')
        window.Cesium.Fullscreen.exitFullscreen()
        let url =
          'url(data:image/png;base64,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)'
        document.querySelector('#container > div.full_screen.item').style.backgroundImage = url
        div.classList.remove('newClass')
      }
      this.isFullScreen = !this.isFullScreen
    },
    // 重置地图
    reset() {
      this.$emit('reset')

      if (!this.$parent.isSZ) this.$parent.toogleSS()

      // 返回到默认地图视口
      // window.etopMap.map.flyHome({
      //   duration: 1
      // })
    },
    // 转换到外部3D地图
    threeDim() {
      this.$emit('threeDim')
    },
    // 回到当前位置
    resetLocation() {
      this.$emit('resetLocation')
    },
    updateRegionSwitcher(res) {
      this.$emit('updateRegionSwitcher', res)
    },
    setPitch() {
      this.pitchEnabled = !this.pitchEnabled
      this.$emit('setPitch', this.pitchEnabled)
    }
  }
}
</script>

<style lang="less" scoped>
.activeContainer {
  //展开搜索框占位
  display: block;
  width: 238px;
}
#container {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  z-index: 99;
  justify-content: space-between;
  .item {
    // display: inline-block;
    //float: right;
    width: 32px;
    height: 32px;
    margin-left: 12px;
    cursor: pointer;
  }
  .full_screen {
    background-image: url(../images/etop/full_screen.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .home {
    background-image: url(../images/etop/home.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .three_dim {
    background-image: url(../images/etop/three_dim.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .pitch {
    background-image: url(../images/etop/pitch.png);
    background-size: 65% 65%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .pitch.item {
    border: 1px solid #2d5e8e;
  }
  .environment_filled {
    border: 1px solid rgba(84, 181, 255, 0.3);
    background-color: rgba(11, 36, 68, 0.8);
    background-image: url(../images/etop/icon_locate.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
</style>
