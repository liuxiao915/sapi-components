## API
closureIcon
### Button Props

| 名称     | 类型     | 默认值    | 说明   | 必传                                                                                           |
| -------- | ------- | ------- | -------| --- |
| value    | Boolean  | false  | v-model:value 控制弹框是否显示  | Y
| inWidth    | String/Number  | -  | 弹框宽度  | N     
| inHeight    | String/Number  | -  | 弹框高度  | N  
| inPadding    | String/Number  | 40  | 弹框四边内边距  | N
| maskClosable    | Boolean  | true  | 点击遮罩层是否关闭  | N
| closureIcon    | Boolean  | true  | 是否显示关闭图标  | N
| size    | String  | middle  | 弹框大小，分别是large、middle、small  | N
| title    | String  | 这是一个弹窗的标题  | 弹框标题  | N
| bottomHeight    | String/Number  | 390  | 默认弹框和大弹框底部大小  | N
| bottomBackground    | String  | -  | 弹框底部的box颜色  | N
| bottomPadding    | String/Number  | -  | 弹框底部的box的内边距  | N

### Button Solt

#### slot有两个插槽

> 默认插槽

> top title下方插槽  <template #top>

