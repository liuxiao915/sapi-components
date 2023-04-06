<template>
  <div id="zoom-tool">
    <div class="zoom-content">
      <div class="zoom-out-btn" @click="zoomOut" />
      <div class="zoom-in-btn" @click="zoomIn" />
    </div>
  </div>
</template>

<script>
// import * as mars3d from 'mars3d'

export default {
  data() {
    return {
      zommdata: [2.5, 2, 2, 2.5, 2, 2, 2.5, 2, 2]
    }
  },
  computed: {},
  methods: {
    zoomIn() {
      if (!window.etopMap.map) return
      let arr = document.querySelector('#distance-legend-tool > div > div.distance-legend-text').innerText.split(' ');
      if (Number(arr[0]) <= 10 && arr[1] == 'm') return
      window.etopMap.map.zoomIn()
    },
    zoomOut() {
      if (!window.etopMap.map) return
      window.etopMap.map.zoomOut()
    }
  }
}
</script>

<style lang="less" scoped>
#zoom-tool {
  position: absolute;
  //bottom: 19px;
  user-select: none;
  //left: 19px;
  bottom: 0;
  left: 0;
  z-index:10;
}

.zoom-content {
  display: flex;
  color: #54b5ff;
  background-color: rgba(11, 36, 68, 0.8);

  >.zoom-out-btn,
  .zoom-in-btn {
    border: 1px solid rgba(84, 181, 255, 0.3);
    cursor: pointer;
    height: 30px;
    width: 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .zoom-out-btn {
    background-image: url(../images/etop/icon_subtract.png);
  }

  .zoom-in-btn {
    border-left: none;
    background-image: url(../images/etop/icon_add.png);
  }
}
</style>
