import * as mars3d from "mars3d";

export const flyToPoint = (map) => {
  console.log('mapmap', map)
  map.flyToPoint(new mars3d.LngLatPoint(117,40), { duration: 0 })
}