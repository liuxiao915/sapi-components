import { utils } from '@/utils/index.js'
import watermarkDom from 'watermark-dom'

const watermark = {
    hasLoad: false,
    load (watermarkConfig) {
        const defaultSettings = {
            'watermark_x': 20, // 水印起始位置x轴坐标
            'watermark_y': 20, // 水印起始位置Y轴坐标
            'watermark_rows': 0, // 水印行数
            'watermark_cols': 0, // 水印列数
            'watermark_x_space': 100, // 水印x轴间隔
            'watermark_y_space': 50, // 水印y轴间隔
            'watermark_color': 'black', // 水印字体颜色
            'watermark_fontsize': '25px', // 水印字体大小
            'watermark_alpha': 0.1, // 水印透明度，要求设置在大于等于0.003
            'watermark_width': 200, // 水印宽度
            'watermark_height': 150, // 水印高度
            'watermark_lineheight': 30, // 水印行高
            'watermark_angle': 15,// 水印倾斜度数
            monitor: false
        }
        if (utils.isPlainObject(watermarkConfig.config)) {
            Object.keys(watermarkConfig.config).forEach(key => {
                const val = watermarkConfig.config[key]
                if (!utils.isEmpty(val)) {
                    // 如果是纯数字，转number
                    if (/^\d+$/g.test(val.toString())) {
                        if (key === 'watermark_fontsize') {
                            defaultSettings[key] = val + 'px'
                        } else {
                            defaultSettings[key] = +val
                        }
                    } else {
                        defaultSettings[key] = val
                    }
                }
            })
        }
        this.watermarkStyle && document.head.removeChild(this.watermarkStyle)
        this.watermarkStyle = document.createElement('style')
        // 添加水印自定义样式
        this.watermarkStyle.innerHTML = `#wm_div_id {
                line-height: ${defaultSettings.watermark_lineheight}px;
                white-space: pre-line;
            }`
        document.head.appendChild(this.watermarkStyle)
        const config = {
            ...defaultSettings,
            watermark_prefix: 'idea_',
            watermark_txt: decodeContent(watermarkConfig.content || watermarkConfig.watermark_txt),
            'watermark_font': 'inherit' // 水印字体
        }
        if (this.hasLoad) {
            watermarkDom.load(config)
        } else {
            watermarkDom.init(config)
            this.hasLoad = true
        }
    },
    destroy () {
        this.watermarkStyle && document.head.removeChild(this.watermarkStyle)
        watermarkDom.remove()
        this.watermarkStyle = null
        this.hasLoad = false
    }
}
// 解析内容
export const decodeContent = (template) => {
    let content = ''
    if (template && typeof template === 'string') {
        let basicInfo = utils.localStorage.get('basicInfo')
        if (basicInfo) {
            basicInfo = JSON.parse(basicInfo)
        }
        content = template.replace(/{([^}]*)}/g, function (pat, variable) {
            if (variable === 'date') {
                const today = new Date()
                return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
            }

            if (basicInfo && typeof variable === 'string') {
                const obj = variable.split('.').reduce((pre, cur) => {
                    if (utils.isPlainObject(pre) && Object.prototype.hasOwnProperty.call(pre, cur)) {
                        return pre[cur]
                    }
                    return pre
                }, basicInfo)
                if (!obj) return ''
                return obj
            }

            return pat
        })
    }
    return content
}

export const loadWatermark = () => {
    // 启用水印
    if (Vue.$appConfig && Vue.$appConfig.watermark && Vue.$appConfig.watermark.isUse) {
        return {
            mounted () {
                Vue.nextTick(() => {
                    watermark.load({
                        ...Vue.$appConfig.watermark
                    })
                })
            },
            destroyed () {
                watermark.destroy()
            }
        }
    }
    return {}
}