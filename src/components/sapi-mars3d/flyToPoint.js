import * as mars3d from "mars3d";

export const flyToPoint = (map, option = []) => {
  console.log('mapmap', map)
  const options = option.length ? option : [117, 40, 100000]
  map.flyToPoint(new mars3d.LngLatPoint(...options), { duration: 0.1 })
}