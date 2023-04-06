<template>
  <div>
    <sapiMars3d @onload="onMapload" />
  </div>
</template>  

<script>
import sapiMars3d from "@/components/sapi-mars3d";
export default {
  components: {
    sapiMars3d
  },
  setup() {
    const markDataList = [
      {
        id: 0,
        name: "南山区",
        position: [113.95073239750282, 22.564112402018165, 0],
        image: require("@/assets/images/mars3d/yellow.png"),
      },
      {
        id: 2,
        name: "宝安区",
        position: [113.84573239750282, 22.650112402018165, 0],
        image: require("@/assets/images/mars3d/yellow.png"),
      },
      {
        id: 4,
        name: "光明区",
        position: [113.93073239750282, 22.754112402018165, 0],
        image: require("@/assets/images/mars3d/yellow.png"),
      },
      {
        id: 6,
        name: "罗湖区",
        position: [114.15073239750282, 22.571112402018165, 0],
        image: require("@/assets/images/mars3d/yellow.png"),
      },
      {
        id: 8,
        name: "福田区",
        position: [114.03073239750282, 22.534112402018165, 0],
        image: require("@/assets/images/mars3d/yellow.png"),
      },
      {
        id: 10,
        name: "龙岗区",
        position: [114.26673239750282, 22.722112402018165, 0],
        image: require("@/assets/images/mars3d/yellow.png"),
      },
      {
        id: 12,
        name: "盐田区",
        position: [114.26873239750282, 22.611112402018165, 0],
        image: require("@/assets/images/mars3d/yellow.png"),
      },
      {
        id: 14,
        name: "坪山区",
        position: [114.35173239750282, 22.663112402018165, 0],
        image: require("@/assets/images/mars3d/yellow.png"),
      },
      {
        id: 16,
        name: "大鹏新区",
        position: [114.47673239750282, 22.591112402018165, 0],
        image: require("@/assets/images/mars3d/yellow.png"),
      },
      {
        id: 18,
        name: "深汕合作区",
        position: [115.027275, 22.864112402018165, 0],
        image: require("@/assets/images/mars3d/yellow.png"),
      },
      {
        id: 20,
        name: "龙华区",
        position: [114.02073239750282, 22.640112402018165, 0],
        image: require("@/assets/images/mars3d/yellow.png"),
      },
    ]
      const clickCallbackFun = (e) => {
      alert("进入回调");
      console.log("监听layer，单击了矢量对象", e);
    }
    const onMapload = (map) => {
      // 默认视角在深圳
      // const map = map;
      const markLayer = map.addMarkLayer(
        markDataList,
        clickCallbackFun,
        {
          styleOptions: {
            scale: 0.5,
            highlightScale: 0.5,
          },
        }
      );
    }
  }
};
</script>
	  
<style>

</style>