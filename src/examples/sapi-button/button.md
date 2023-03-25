## API

### Button Props

| 名称     | 类型                     | 默认值    | 说明                                                                                                                                              | 必传                                                                                           |
| -------- | ------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | --- |
| block    | Boolean                  | false     | 是否为块级元素                                                                                                                                    | N                                                                                              |
| content  | String / Slot / Function | -         | 按钮内容。类型：string                                                                                                                          | N   |
| default  | String / Slot / Function | -         | 按钮内容。类型：string                                                                                                                         | N   |
| disabled | Boolean                  | false     | 是否禁用按钮                                                                                                                                      | N                                                                                              |
| ghost    | Boolean                  | false     | 是否为镂空按钮                                                                                                                | N                                                                                              |
| icon     | Slot / Function          | -         | 按钮内部图标，可完全自定义。)              | N                                                                                              |
| loading  | Boolean                  | false     | 是否显示为加载状态                                                                                                                                | N                                                                                              |
| shape    | String                   | rectangle | 按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形。可选项：rectangle/square/round/circle                                                        | N                                                                                              |
| size     | String                   | medium    | 组件尺寸。可选项：small/medium/large。) | N                                                                                              |
| theme    | String                   | undefined | 组件风格，依次为默认色、品牌色、危险色、警告色、成功色。可选项：default/primary/danger/warning/success                                            | N                                                                                              |
| type     | String                   | button    | 按钮类型。可选项：submit/reset/button                                                                                                             | N                                                                                              |
| variant  | String                   | base      | 按钮形式，基础、线框、虚线、文字。可选项：base/outline/dashed/text                                                                            | N                                                                                              |
| onClick  | Function                 | -         | 类型：`(e: MouseEvent) => void`<br/>点击时触发                                                                                                 | N                                                                                              |

### Button Events

| 名称  | 参数              | 描述       |
| ----- | ----------------- | ---------- |
| click | `(e: MouseEvent)` | 点击时触发 |
