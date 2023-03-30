const fs = require('fs');
const { parse } = require('@vue/compiler-sfc');
const sourceType = ['template', 'script', 'styles']
const handlerSource = (source) => {
    if (!source) {
        return
    }
    let sourceStr = ''
    sourceType.forEach(typeItem => {
        if (source[typeItem] && !Array.isArray(source[typeItem])) {
            sourceStr += `<${typeItem}>${source[typeItem].content}<\/${typeItem}>\n\n`
        }
        if (Array.isArray(source[typeItem])) {
            sourceStr += source[typeItem].map(
              sourceItem => `<${sourceItem.type}>${sourceItem.content}<\/${sourceItem.type}>\n\n`
            ).join('')
        }
    })
    return sourceStr
}

module.exports = function (source, map) {
    // 2. 2. 读取文件内容
    const file = fs.readFileSync(map.file).toString()
    // 3. 利用
    const parsed = parse(file).descriptor
    // 3. 源码转换
    const sourceCode = handlerSource(parsed)
    const sourceCodeTitle = parsed.customBlocks[0].content
    // 4. 将结果添加到 组件对象上面
    this.callback(
        null,
        `module.exports = function(Component) {
          Component.options = {}
          Component.options.__sourceCode = ${JSON.stringify(sourceCode)}
          Component.options.__sourceCodeTitle = ${JSON.stringify(sourceCodeTitle)}
        }`,
        map
    )
}
