## 使用
#### 安装vue-fragment
```base
npm i -s vue-fragment
```

#### 让vue支持jsx语法
> 
```base
npm install\
  babel-plugin-syntax-jsx\
  babel-plugin-transform-vue-jsx\
  babel-helper-vue-jsx-merge-props\
  babel-preset-env\
  --save-dev
```

#### 导入方式
```javascrtipt
import SapiTable from '@/components/sapi-table'
import SapiTableColumn from '@/components/sapi-table-column'
```

## Table Attributes

参数 | 说明 | 类型 | 可选值 | 默认值
:-|:- |:- |:- |:-
data|显示的数据|--|--|--
height|Table 内容的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则为css 的height。注意这个高度和 Table 的 style.height 的值是不同的|string/number|--|--
max-height|Table 内容的最大高度。合法的值为数字或者单位为 px 的高度|string/number|--|--
stripe|是否为斑马纹 table|boolean|--|true
border|是否带有纵向边框|boolean|--|false
show-header|是否显示表头|boolean|--|false
highlight-current-row|是否要高亮当前行|boolean|--|false
current-row-key|当前行的 key，只写属性|String,Number|--|--
row-class-name|行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className|Function({row, rowIndex})/String|--|--
row-style	|行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style	|Function({row, rowIndex})/Object|--|--
cell-class-name|单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className|--|--
cell-style	|单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style | Function({row, column, rowIndex, columnIndex})/Object|--|--
header-row-class-name	|表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className|	Function({row, rowIndex})/String|--|--
header-row-style|	表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style|	Function({row, rowIndex})/Object|--|--
header-cell-class-name|表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className|	Function({column, rowIndex, columnIndex})/String|--|--
header-cell-style|表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style|Function({column, rowIndex, columnIndex})/Object|--|--
row-key	|行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。|	Function(row)/String|--|--
empty-text	|空数据时显示的文本内容，也可以通过 slot="empty" 设置	|String	|--|	暂无数据
default-expand-all|	是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效|	Boolean|	—	|false
expand-row-keys	|可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。	|Array|	—|
tooltip-effect	|tooltip effect 属性	String	|dark/light
show-summary	|是否在表尾显示合计行	|Boolean|	—|	false
sum-text|	合计行第一列的文本	|String|	—|	合计
summary-method	|自定义的合计计算方法	|Function({ columns, data })	|—|	—
span-method	|合并行或列的计算方法|	Function({ row, column, rowIndex, columnIndex })|	—	|—
indent|	展示树形数据时，树节点的缩进	|Number |	—	|16
lazy|	是否懒加载子节点数据|	Boolean|	—|	—
load |	加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了当前节点数据（跟el-table 不同，el-table 第一个是当前节点数据，第二个参数是节点的层级信息）|	Function(tableData, treeNode, resolve)|	—|	—
tree-props	|渲染嵌套数据的配置选项|	Object|	—|	{ hasChildren: 'hasChildren', children: 'children' }
disabled-selection | 禁用选择控件的回调方法 | Function({row, rowIndex}): Boolean | |
tree-row-icon | 树形行展开和收起的图标 | Object | -- |{ openIcon: 'el-icon-caret-right', closeIcon: 'el-icon-caret-bottom' }
has-fixed-shadow | 固定列是否显示阴影效果 | Boolean | -- | true
extend-btn-index | 树形扩展行按钮位置 | number | -- | 0
virtual-scroll | 是否开启虚拟滚动(必须指定表格高度height，不支持树形表格）| Boolean | -- | false
virtual-item-height | 虚拟滚动一行的高度 | Numbert | -- | 41
virtual-row-num | 虚拟滚动加载的行数 | Number | -- | 20
virtual-buffer-px | 虚拟滚动缓冲区像素高度 | Number | -- | 100
extend-btn-index | 树形表格展开按钮位置 | Number | -- | 0


## Table Events

事件名 | 说明 | 参数
:-|:-|:-
select| 当用户手动勾选数据行的 Checkbox 时触发的事件| selection, row
select-all| 当用户手动勾选全选 Checkbox 时触发的事件| selection
selection-change| 当选择项发生变化时会触发该事件 | selection
sort-change | 当表格的排序条件发生变化的时候会触发该事件 | { prop,order }
current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow
expand-change | 当用户对某一行展开或者关闭的时候会触发该事件 （扩展行） | row, expanded
tree-expand-change | 当用户对某一行展开或者关闭的时候会触发该事件 （树形）|  row, expanded
update-columns | 表格列数更新 | columnsLength
cell-click | 当某个单元格被点击时会触发该事件 | row, column, cell, event
cell-dblclick | 当某个单元格被双击击时会触发该事件 | row, column, cell, event
row-click | 当某一行被点击时会触发该事件 | row, column, event
row-dblclick | 当某一行被双击时会触发该事件 | row, column, event
scroll-vertical | 上下滚动表格内容触发的事件 | event
scroll-horizontal | 左右滚动表格内容触发的事件 | event

## Table Methods

方法名 | 说明 | 参数 
:-|:-|:-
clearSelection |用于多选表格，清空用户的选择 | —
toggleRowSelection | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）；noEmitEvent （noEmitEvent为true则不发射事件） 不发射选择事件 | row/rowId, selected, noEmitEvent
toggleAllSelection | 用于多选表格，切换所有行的选中状态	| -
toggleRowExpansion | 切换某一扩展行的展开状态 | row/rowId, selected
toggleTreeRowExpansion | 切换某一树形行的展开状态 | row/rowId, selected
toggleLevelTreeRow | 切换指定层级树形行的展开状态 | level, selected
setCurrentRow | 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态 | row/rowId
clearFilter | 不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态 | prop 
tableResize | 重新计算内容调整大小 | --
scrollToRow | 滚动到指定行 | row/rowId
getScrollElement | 获取表格内容滚动元素 | -- 


## Table-column Attributes

参数 | 说明 | 类型 |可选值 | 默认值 
:-|:-|:-|:-|:-
type | 对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮 | string | selection/index/expand | -
index|如果设置了 type=index，可以通过传递 index 属性来自定义索引number, Function(index, row)|-
label|显示的标题|string|-
prop|对应列内容的字段名|string|-
width|对应列的宽度|string|-|-
min-width|对应列的最小宽度|string|-|-
fixed|列是否固定在左侧或者右侧，true 表示固定在左侧|string, boolean|true, left, right|-
sort|是否显示排序按钮|boolean|-|-
filters|数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性|Array[{ text, value }]|-|-
filterMethod|数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。|Function(value, row, column)|-|-
show-overflow-tooltip|当内容过长被隐藏时显示 tooltip|boolean|-|-
align|单元格文本对齐方式|string|left/center/right|-
header-align|表头单元格文本对齐方式|string|left/center/right|-
order-index|列的排序 （动态表头的时候，列的顺序可能不正确，可以通过指定order-index解决）|number|-|-

## Table-column Scoped Slot
name|说明
:-|:-
-|自定义列的内容，参数为 { row, column, $index }
header|自定义表头的内容. 参数为 { column }

## Editable-cell Attributes
参数 | 说明 | 类型 | 可选值 | 默认值
:-|:-|:-|:-|:-
disabled | 是否禁用编辑 | Boolean | -- | false
autofocus | 是否自动获取光标 | Boolean | -- | true

## Editable-cell Scoped Slot
name|说明
:-|:-
-|非编辑状态，显示的内容 （默认输入框的文本）
input| 输入框的插槽
