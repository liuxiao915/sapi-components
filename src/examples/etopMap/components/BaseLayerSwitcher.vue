<template>
  <div id="container" :style="containerHeight">
    <div class="cur_item item_menu">
      <img :src="curLayerItem.url" alt />
      <div class="label">{{ curLayerItem.name }}</div>
    </div>
    <div class="menu_box" :class="{ menu_open: isShowMenu, menu_close: !isShowMenu }">
      <div
        v-for="(item, index) in layerList"
        :key="index"
        class="item_menu"
        :class="{ item_active: curLayerItem.name === item.name }"
        @click="clickItem(item.name)"
      >
        <img :src="item.url" alt />
        <div class="label">{{ item.name }}</div>
      </div>
    </div>
    <div class="drop_down" @click="switchMenu">
      <div class="triangle" :class="{ up: isShowMenu, down: !isShowMenu }" />
    </div>
    <!-- <a-checkbox
      v-if="checkboxShow"
      class="containerShow"
      v-model:checked="isChecked"
      @change="onCheckAllChange"
      >显示地形</a-checkbox
    > -->
  </div>
</template>

<script>
// 底图菜单列表数据
const layerData = [
  {
    id: 0,
    name: '电子地图',
    url: require('../images/etop/whiteModel.png')
  },
  {
    id: 2,
    name: '卫星影像',
    url: require('../images/etop/imageryMap.png')
  },
  {
    id: 3,
    name: '三维白模',
    url: require('../images/etop/map3d.png')
  },
  {
    id: 4,
    name: '倾斜摄影',
    url: require('../images/etop/icon_digitalmap_nor.png')
  }
]
export default {
  props: {
    // 底层默认选中
    curLayerName: {
      type: String,
      default: '电子地图'
    },
    isTerrainOn: {
      type: Boolean,
      default: false
    },
    // 底图参数
    baseLayerArr: {
      type: Array,
      default: () => ['电子地图', '卫星影像', '三维白模', '倾斜摄影']
    }
  },

  data() {
    //获取自定义的底图图层
    let baselayerList = []
    this.baseLayerArr.forEach((item) => {
      layerData.forEach((e) => {
        if (e.name === item) {
          baselayerList.push(e)
        }
      })
    })

    // console.log("---baselayerList---",baselayerList);

    const curLayerItem = layerData.find((item) => item.name === this.curLayerName) || layerData[0]
    // const checkboxShow = ["电子地图", "卫星影像"].includes(this.curLayerName);

    return {
      // 当前底图菜单列表数据
      layerList: baselayerList,
      // 当前选中底图的数据
      curLayerItem,
      // 是否展开底图菜单
      isShowMenu: false,
      isChecked: false,
      checkboxShow: false
    }
  },
  watch: {
    curLayerName(val) {
      this.clickItem(val)
    },
    baseLayerArr: {
      handler(newValue, oldValue) {
        this.layerList = []
        newValue.forEach((item) => {
          layerData.forEach((e) => {
            if (e.name === item) {
              this.layerList.push(e)
            }
          })
        })
      },
      deep: true
    }
  },
  mounted() {
    //地形的初始化勾选状态可由父组件决定
    this.isChecked = this.isTerrainOn
  },
  computed: {
    containerHeight() {
      return this.isShowMenu
        ? {
            height: 'calc(100% - 40px - 60px - 170px)',
            minHeight: '254px'
          }
        : 'height: 101px'
    }
  },
  methods: {
    onCheckAllChange(e) {
      if (e.target.checked && this.curLayerItem.name === '电子地图') {
        // window.etopMap.terrainUtils.enableTerrain(true);
        window.etopMap.terrainUtils.toggleTerrainProvider()
      } else if (e.target.checked && this.curLayerItem.name === '卫星影像') {
        // window.etopMap.terrainUtils.enableTerrain(true);
        window.etopMap.terrainUtils.toggleTerrainProvider()
      } else {
        window.etopMap.terrainUtils.enableTerrain(false)
      }
    },
    // 展开或关闭底图菜单
    switchMenu() {
      this.isShowMenu = !this.isShowMenu
    },
    // 切换底图
    clickItem(name) {
      let distance = etopMap.map.controls.distanceLegend.distance
      if (distance < 10) {
        window.etopMap.map.zoomOut(3)
      }
      // 如果选择的是当前正在显示的底图则什么都不做
      const curName = this.curLayerItem.name
      if (name === curName) {
        return
      } else {
        //this.checked = false;
        //isTerrainOn父组件传值, 表示map组件初始化时地形的勾选状态, 子组件中无法修改
        //this.isTerrainOn = false
        this.isChecked = false
      }
      this.checkboxShow = false
      window.etopMap.tiandituUtils.removeTiandituLayers()
      window.etopMap.terrainUtils.enableTerrain(false)
      // 收起菜单
      this.isShowMenu = false
      if (name === '电子地图' || name === '卫星影像') {
        this.checkboxShow = true
      }
      // 更新当前选中底图的数据
      layerData.forEach((item) => {
        if (item.name === name) {
          this.curLayerItem = item
        }
      })
      if (name === '电子地图') {
        // 移除原先的底图
        window.etopMap.rmGzWhiteLayer()
        window.etopMap.rmGzSatellite()
        window.etopMap.rmWhiteModel()
        window.etopMap.rmPhotography()
        // 添加规自局的深圳市蓝色版电子地图
        window.etopMap.addGzBlueLayer()
      } else if (name === '白色版') {
        // 移除原先的底图
        window.etopMap.rmGzBlueLayer()
        window.etopMap.rmGzSatellite()
        window.etopMap.rmWhiteModel()
        window.etopMap.rmPhotography()
        // 添加规自局的深圳市白色版电子地图
        window.etopMap.addGzWhiteLayer()
      } else if (name === '卫星影像') {
        // 移除原先的底图
        window.etopMap.rmGzBlueLayer()
        window.etopMap.rmGzWhiteLayer()
        window.etopMap.rmWhiteModel()
        window.etopMap.rmPhotography()
        // 添加规自局的深圳市卫星影像
        window.etopMap.addGzSatellite()
        // window.etopMap.tiandituUtils.addTiandituLayers({
        //   type: "img",
        // });
      } else if (name === '三维白模') {
        // 移除原先的底图
        window.etopMap.rmGzWhiteLayer()
        window.etopMap.rmGzSatellite()
        window.etopMap.rmPhotography()
        if (curName !== '电子地图') {
          // 添加规自局的深圳市蓝色版电子地图
          window.etopMap.addGzBlueLayer()
        }
        // 添加三维白模
        window.etopMap.addWhiteModel()
      } else if (name === '倾斜摄影') {
        // 移除原先的底图
        window.etopMap.rmGzBlueLayer()
        window.etopMap.rmGzWhiteLayer()
        window.etopMap.rmGzSatellite()
        window.etopMap.rmWhiteModel()
        // 添加深圳市倾斜摄影模型(2020年)
        window.etopMap.addPhotography()
      }
      // 抛出事件(change与vue自带change事件重名)
      //this.$emit("change", name);
      this.$emit('changeLayers', name)
    }
  }
}
</script>

<style lang="less" scoped>
#container {
  position: absolute;
  // top: 65px;
  // right: 19px;
  top: 44px;
  z-index: 99;
  right: 0;
  width: 80px;
  border: 1px solid rgba(84, 181, 255, 0.3);
  background-color: rgba(11, 36, 68, 0.8);
  display: flex;
  flex-direction: column;
  // max-height: 404px;
  height: fit-content;
  max-height: 335px;

  .cur_item {
    cursor: auto !important;
    margin-bottom: 5px !important;
  }
  .item_menu {
    width: 60px;
    margin: 7px auto 8px auto;
    cursor: pointer;
    img {
      width: 60px;
      height: 45px;
    }
    .label {
      color: #fff;
      text-align: center;
    }
  }
  .menu_box::-webkit-scrollbar {
    display: none;
  }
  .menu_box {
    max-height: 100%;
    transition: all 1s;
    overflow-y: auto;

    .item_active {
      img {
        border: 1px solid #beb60e;
      }
      .label {
        color: #beb60e;
      }
    }
  }
  .menu_open {
    flex: 1;
  }
  .menu_close {
    flex: 0;
  }
  .drop_down {
    position: relative;
    height: 20px;
    border: 1px solid rgba(84, 181, 255, 0.3);
    background-color: rgba(84, 181, 255, 0.1);
    cursor: pointer;
    .triangle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
    }
    .down {
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid #54b5ff;
    }
    .up {
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #54b5ff;
    }
  }
}
::v-deep .containerShow {
  position: absolute;
  bottom: -40px;
  right: 0;
  width: 80px;
  white-space: nowrap;
  border: 1px solid rgba(84, 181, 255, 0.3);
  color: #fff;
  background-color: rgba(11, 36, 68, 0.8);
  .ant-checkbox-checked::after {
    border: none;
  }
  .ant-checkbox-checked {
    .ant-checkbox-inner {
      width: 14px;
      height: 14px;
      background: #54b5ff !important;
    }
    .ant-checkbox-inner::after {
      left: 14%;
      border: 2px solid #000;
      position: absolute;
      display: table;
      border-top: 0;
      border-left: 0;
      transform: rotate(45deg) scale(1) translate(-50%, -50%);
      opacity: 1;
      transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
      content: ' ';
    }
  }
  .ant-checkbox {
    .ant-checkbox-inner {
      width: 14px;
      height: 14px;
      margin: 0 2px;
      background: rgba(8, 12, 54, 0.9);
    }
  }
  span {
    padding: 0;
  }
}
</style>
