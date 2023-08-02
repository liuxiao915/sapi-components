
import copy from "./copy";
import resize from "./resize";
const directives = { // 指令对象
  copy,
  resize
}
 
export default {
  install(app) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    });
  }
}