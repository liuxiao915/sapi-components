<template>
  <div v-for="(item, index) in state.tabList" :key="index">{{ item.label }}
    <ul class="icon_lists">
      <li class="dib">
        <span class="icon iconfont">&#xe731;</span>
        <div class="name">抄表指派</div>
        <div class="code-name">&amp;#xe731;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe7f4;</span>
        <div class="name">撤回</div>
        <div class="code-name">&amp;#xe7f4;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe733;</span>
        <div class="name">工程管理</div>
        <div class="code-name">&amp;#xe733;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe72f;</span>
        <div class="name">文件上传</div>
        <div class="code-name">&amp;#xe72f;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe730;</span>
        <div class="name">文件-上传</div>
        <div class="code-name">&amp;#xe730;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe72e;</span>
        <div class="name">材料</div>
        <div class="code-name">&amp;#xe72e;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe72d;</span>
        <div class="name">查看导入记录</div>
        <div class="code-name">&amp;#xe72d;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe72c;</span>
        <div class="name">信息</div>
        <div class="code-name">&amp;#xe72c;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe72b;</span>
        <div class="name">md-checkbox</div>
        <div class="code-name">&amp;#xe72b;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe729;</span>
        <div class="name">项目，房产，写字楼</div>
        <div class="code-name">&amp;#xe729;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe72a;</span>
        <div class="name">写字楼</div>
        <div class="code-name">&amp;#xe72a;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe728;</span>
        <div class="name">启用</div>
        <div class="code-name">&amp;#xe728;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe727;</span>
        <div class="name">禁用</div>
        <div class="code-name">&amp;#xe727;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe618;</span>
        <div class="name">重命名</div>
        <div class="code-name">&amp;#xe618;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe669;</span>
        <div class="name">2分公司</div>
        <div class="code-name">&amp;#xe669;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6af;</span>
        <div class="name">订单</div>
        <div class="code-name">&amp;#xe6af;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6b0;</span>
        <div class="name">下单</div>
        <div class="code-name">&amp;#xe6b0;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6ef;</span>
        <div class="name">打印机</div>
        <div class="code-name">&amp;#xe6ef;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6bb;</span>
        <div class="name">测量-0</div>
        <div class="code-name">&amp;#xe6bb;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6d1;</span>
        <div class="name">CRM报表</div>
        <div class="code-name">&amp;#xe6d1;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6bc;</span>
        <div class="name">角度测量</div>
        <div class="code-name">&amp;#xe6bc;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe619;</span>
        <div class="name">锁2</div>
        <div class="code-name">&amp;#xe619;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe61a;</span>
        <div class="name">锁1</div>
        <div class="code-name">&amp;#xe61a;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6d2;</span>
        <div class="name">订单报表</div>
        <div class="code-name">&amp;#xe6d2;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe68f;</span>
        <div class="name">向上三角</div>
        <div class="code-name">&amp;#xe68f;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6be;</span>
        <div class="name">面测量</div>
        <div class="code-name">&amp;#xe6be;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe61b;</span>
        <div class="name">统计分析2</div>
        <div class="code-name">&amp;#xe61b;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6bf;</span>
        <div class="name">线测量</div>
        <div class="code-name">&amp;#xe6bf;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6b9;</span>
        <div class="name">已选</div>
        <div class="code-name">&amp;#xe6b9;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe61c;</span>
        <div class="name">delete</div>
        <div class="code-name">&amp;#xe61c;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe61d;</span>
        <div class="name">time</div>
        <div class="code-name">&amp;#xe61d;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe61e;</span>
        <div class="name">cooperation</div>
        <div class="code-name">&amp;#xe61e;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe61f;</span>
        <div class="name">move-copy</div>
        <div class="code-name">&amp;#xe61f;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6b3;</span>
        <div class="name">报告</div>
        <div class="code-name">&amp;#xe6b3;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6f4;</span>
        <div class="name">1370-知识点</div>
        <div class="code-name">&amp;#xe6f4;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6d3;</span>
        <div class="name">报表</div>
        <div class="code-name">&amp;#xe6d3;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe620;</span>
        <div class="name">统计分析</div>
        <div class="code-name">&amp;#xe620;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe621;</span>
        <div class="name">edit</div>
        <div class="code-name">&amp;#xe621;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe622;</span>
        <div class="name">rename2</div>
        <div class="code-name">&amp;#xe622;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe623;</span>
        <div class="name">rename</div>
        <div class="code-name">&amp;#xe623;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6fd;</span>
        <div class="name">新房</div>
        <div class="code-name">&amp;#xe6fd;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe67b;</span>
        <div class="name">复选框_未选择</div>
        <div class="code-name">&amp;#xe67b;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6ac;</span>
        <div class="name">缺项故障</div>
        <div class="code-name">&amp;#xe6ac;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6d4;</span>
        <div class="name">统计分析</div>
        <div class="code-name">&amp;#xe6d4;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6fe;</span>
        <div class="name">房源</div>
        <div class="code-name">&amp;#xe6fe;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe683;</span>
        <div class="name">女生</div>
        <div class="code-name">&amp;#xe683;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe690;</span>
        <div class="name">三角符</div>
        <div class="code-name">&amp;#xe690;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe624;</span>
        <div class="name">align-right</div>
        <div class="code-name">&amp;#xe624;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe625;</span>
        <div class="name">indent-left</div>
        <div class="code-name">&amp;#xe625;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe626;</span>
        <div class="name">close</div>
        <div class="code-name">&amp;#xe626;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe627;</span>
        <div class="name">bullet2</div>
        <div class="code-name">&amp;#xe627;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe628;</span>
        <div class="name">save</div>
        <div class="code-name">&amp;#xe628;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe629;</span>
        <div class="name">back</div>
        <div class="code-name">&amp;#xe629;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe62b;</span>
        <div class="name">田</div>
        <div class="code-name">&amp;#xe62b;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6b1;</span>
        <div class="name">指定收派员下单</div>
        <div class="code-name">&amp;#xe6b1;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe67f;</span>
        <div class="name">人</div>
        <div class="code-name">&amp;#xe67f;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe65a;</span>
        <div class="name">选中</div>
        <div class="code-name">&amp;#xe65a;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe674;</span>
        <div class="name">未选择_方</div>
        <div class="code-name">&amp;#xe674;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe66d;</span>
        <div class="name">选择_方</div>
        <div class="code-name">&amp;#xe66d;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6d5;</span>
        <div class="name">监控报表</div>
        <div class="code-name">&amp;#xe6d5;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe679;</span>
        <div class="name">选择</div>
        <div class="code-name">&amp;#xe679;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe62c;</span>
        <div class="name">accounts</div>
        <div class="code-name">&amp;#xe62c;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6aa;</span>
        <div class="name">联系</div>
        <div class="code-name">&amp;#xe6aa;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6f5;</span>
        <div class="name">ICON_网页设计</div>
        <div class="code-name">&amp;#xe6f5;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe67a;</span>
        <div class="name">选择筛选未选</div>
        <div class="code-name">&amp;#xe67a;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe69a;</span>
        <div class="name">打开文件</div>
        <div class="code-name">&amp;#xe69a;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe62d;</span>
        <div class="name">51</div>
        <div class="code-name">&amp;#xe62d;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe687;</span>
        <div class="name">男性</div>
        <div class="code-name">&amp;#xe687;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6d6;</span>
        <div class="name">新建报表</div>
        <div class="code-name">&amp;#xe6d6;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6a4;</span>
        <div class="name">播放</div>
        <div class="code-name">&amp;#xe6a4;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe62e;</span>
        <div class="name">主页</div>
        <div class="code-name">&amp;#xe62e;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6a5;</span>
        <div class="name">播放(细)</div>
        <div class="code-name">&amp;#xe6a5;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6c1;</span>
        <div class="name">授权</div>
        <div class="code-name">&amp;#xe6c1;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe62f;</span>
        <div class="name">统计分析</div>
        <div class="code-name">&amp;#xe62f;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe68d;</span>
        <div class="name">切换</div>
        <div class="code-name">&amp;#xe68d;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6a7;</span>
        <div class="name">中超－圆角方块-01</div>
        <div class="code-name">&amp;#xe6a7;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe684;</span>
        <div class="name">男</div>
        <div class="code-name">&amp;#xe684;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe630;</span>
        <div class="name">租户排名2</div>
        <div class="code-name">&amp;#xe630;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe675;</span>
        <div class="name">加</div>
        <div class="code-name">&amp;#xe675;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe631;</span>
        <div class="name">主页</div>
        <div class="code-name">&amp;#xe631;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe65b;</span>
        <div class="name">选中</div>
        <div class="code-name">&amp;#xe65b;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe676;</span>
        <div class="name">operation</div>
        <div class="code-name">&amp;#xe676;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe703;</span>
        <div class="name">检查</div>
        <div class="code-name">&amp;#xe703;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe67c;</span>
        <div class="name">向右</div>
        <div class="code-name">&amp;#xe67c;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6d7;</span>
        <div class="name">表格导出</div>
        <div class="code-name">&amp;#xe6d7;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe69b;</span>
        <div class="name">打开</div>
        <div class="code-name">&amp;#xe69b;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe712;</span>
        <div class="name">签到</div>
        <div class="code-name">&amp;#xe712;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe632;</span>
        <div class="name">LC_icon_right_line</div>
        <div class="code-name">&amp;#xe632;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe633;</span>
        <div class="name">LC_icon_desktop_line</div>
        <div class="code-name">&amp;#xe633;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe715;</span>
        <div class="name">设计</div>
        <div class="code-name">&amp;#xe715;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe634;</span>
        <div class="name">LC_icon_date_line</div>
        <div class="code-name">&amp;#xe634;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe635;</span>
        <div class="name">LC_icon_list_line_13</div>
        <div class="code-name">&amp;#xe635;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe636;</span>
        <div class="name">LC_icon_list_line_7</div>
        <div class="code-name">&amp;#xe636;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe637;</span>
        <div class="name">LC_icon_list_line_1</div>
        <div class="code-name">&amp;#xe637;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe638;</span>
        <div class="name">LC_icon_list_line_19</div>
        <div class="code-name">&amp;#xe638;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6f6;</span>
        <div class="name">门店</div>
        <div class="code-name">&amp;#xe6f6;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe639;</span>
        <div class="name">收起</div>
        <div class="code-name">&amp;#xe639;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe63a;</span>
        <div class="name">刷新</div>
        <div class="code-name">&amp;#xe63a;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe69c;</span>
        <div class="name">关闭</div>
        <div class="code-name">&amp;#xe69c;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe63b;</span>
        <div class="name">icon-1460188255726</div>
        <div class="code-name">&amp;#xe63b;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe63c;</span>
        <div class="name">icon-1460187631756</div>
        <div class="code-name">&amp;#xe63c;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe63d;</span>
        <div class="name">icon-1460187718724</div>
        <div class="code-name">&amp;#xe63d;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe63e;</span>
        <div class="name">小图</div>
        <div class="code-name">&amp;#xe63e;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe63f;</span>
        <div class="name">个人中心</div>
        <div class="code-name">&amp;#xe63f;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe640;</span>
        <div class="name">个人中心</div>
        <div class="code-name">&amp;#xe640;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe641;</span>
        <div class="name">删除</div>
        <div class="code-name">&amp;#xe641;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe642;</span>
        <div class="name">编辑</div>
        <div class="code-name">&amp;#xe642;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe643;</span>
        <div class="name">订单</div>
        <div class="code-name">&amp;#xe643;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe644;</span>
        <div class="name">关闭</div>
        <div class="code-name">&amp;#xe644;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe645;</span>
        <div class="name">主页</div>
        <div class="code-name">&amp;#xe645;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe646;</span>
        <div class="name">分享</div>
        <div class="code-name">&amp;#xe646;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe647;</span>
        <div class="name">分享</div>
        <div class="code-name">&amp;#xe647;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe648;</span>
        <div class="name">加</div>
        <div class="code-name">&amp;#xe648;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe673;</span>
        <div class="name">减</div>
        <div class="code-name">&amp;#xe673;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe649;</span>
        <div class="name">正确</div>
        <div class="code-name">&amp;#xe649;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe64a;</span>
        <div class="name">选中</div>
        <div class="code-name">&amp;#xe64a;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe64b;</span>
        <div class="name">关闭</div>
        <div class="code-name">&amp;#xe64b;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe64c;</span>
        <div class="name">关闭</div>
        <div class="code-name">&amp;#xe64c;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe64d;</span>
        <div class="name">邮箱</div>
        <div class="code-name">&amp;#xe64d;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe64e;</span>
        <div class="name">邮箱</div>
        <div class="code-name">&amp;#xe64e;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe64f;</span>
        <div class="name">设置</div>
        <div class="code-name">&amp;#xe64f;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe650;</span>
        <div class="name">设置</div>
        <div class="code-name">&amp;#xe650;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe651;</span>
        <div class="name">权限</div>
        <div class="code-name">&amp;#xe651;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe652;</span>
        <div class="name">定位</div>
        <div class="code-name">&amp;#xe652;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe653;</span>
        <div class="name">定位</div>
        <div class="code-name">&amp;#xe653;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe677;</span>
        <div class="name">加加</div>
        <div class="code-name">&amp;#xe677;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6b6;</span>
        <div class="name">旗子</div>
        <div class="code-name">&amp;#xe6b6;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6d8;</span>
        <div class="name">统计报表</div>
        <div class="code-name">&amp;#xe6d8;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe654;</span>
        <div class="name">收房验房</div>
        <div class="code-name">&amp;#xe654;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe70e;</span>
        <div class="name">科技成果</div>
        <div class="code-name">&amp;#xe70e;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe660;</span>
        <div class="name">退出</div>
        <div class="code-name">&amp;#xe660;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe655;</span>
        <div class="name">情况分析</div>
        <div class="code-name">&amp;#xe655;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe699;</span>
        <div class="name">头像</div>
        <div class="code-name">&amp;#xe699;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe66c;</span>
        <div class="name">添加</div>
        <div class="code-name">&amp;#xe66c;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe617;</span>
        <div class="name">shouqi</div>
        <div class="code-name">&amp;#xe617;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6b2;</span>
        <div class="name">维修单_派工</div>
        <div class="code-name">&amp;#xe6b2;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe69d;</span>
        <div class="name">关闭</div>
        <div class="code-name">&amp;#xe69d;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe667;</span>
        <div class="name">添加</div>
        <div class="code-name">&amp;#xe667;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6d9;</span>
        <div class="name">推荐报表</div>
        <div class="code-name">&amp;#xe6d9;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6b4;</span>
        <div class="name">报告管理</div>
        <div class="code-name">&amp;#xe6b4;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe716;</span>
        <div class="name">设计</div>
        <div class="code-name">&amp;#xe716;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6da;</span>
        <div class="name">统计</div>
        <div class="code-name">&amp;#xe6da;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe688;</span>
        <div class="name">女</div>
        <div class="code-name">&amp;#xe688;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6db;</span>
        <div class="name">报表中心</div>
        <div class="code-name">&amp;#xe6db;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6a2;</span>
        <div class="name">添加部门人员</div>
        <div class="code-name">&amp;#xe6a2;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6dc;</span>
        <div class="name">报表</div>
        <div class="code-name">&amp;#xe6dc;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6dd;</span>
        <div class="name">统计</div>
        <div class="code-name">&amp;#xe6dd;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6de;</span>
        <div class="name">数据统计</div>
        <div class="code-name">&amp;#xe6de;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe70b;</span>
        <div class="name">箭头</div>
        <div class="code-name">&amp;#xe70b;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe863;</span>
        <div class="name">向右</div>
        <div class="code-name">&amp;#xe863;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6fa;</span>
        <div class="name">保密</div>
        <div class="code-name">&amp;#xe6fa;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe713;</span>
        <div class="name">供应商管理</div>
        <div class="code-name">&amp;#xe713;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6f7;</span>
        <div class="name">知识库</div>
        <div class="code-name">&amp;#xe6f7;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe689;</span>
        <div class="name">关闭</div>
        <div class="code-name">&amp;#xe689;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe70c;</span>
        <div class="name">APP</div>
        <div class="code-name">&amp;#xe70c;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe69f;</span>
        <div class="name">公司</div>
        <div class="code-name">&amp;#xe69f;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe864;</span>
        <div class="name">向右</div>
        <div class="code-name">&amp;#xe864;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe70d;</span>
        <div class="name">搜索</div>
        <div class="code-name">&amp;#xe70d;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6df;</span>
        <div class="name">统计7</div>
        <div class="code-name">&amp;#xe6df;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe710;</span>
        <div class="name">最后页</div>
        <div class="code-name">&amp;#xe710;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6e0;</span>
        <div class="name">统计8</div>
        <div class="code-name">&amp;#xe6e0;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6c0;</span>
        <div class="name">测量</div>
        <div class="code-name">&amp;#xe6c0;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6e1;</span>
        <div class="name">表格</div>
        <div class="code-name">&amp;#xe6e1;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe680;</span>
        <div class="name">女</div>
        <div class="code-name">&amp;#xe680;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6b7;</span>
        <div class="name">旗子</div>
        <div class="code-name">&amp;#xe6b7;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6a9;</span>
        <div class="name">联系</div>
        <div class="code-name">&amp;#xe6a9;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6e2;</span>
        <div class="name">统计表01</div>
        <div class="code-name">&amp;#xe6e2;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe600;</span>
        <div class="name">展开</div>
        <div class="code-name">&amp;#xe600;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe704;</span>
        <div class="name">租房</div>
        <div class="code-name">&amp;#xe704;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe656;</span>
        <div class="name">设置</div>
        <div class="code-name">&amp;#xe656;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe659;</span>
        <div class="name">筛选</div>
        <div class="code-name">&amp;#xe659;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6f1;</span>
        <div class="name">目录</div>
        <div class="code-name">&amp;#xe6f1;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6e3;</span>
        <div class="name">电商报表</div>
        <div class="code-name">&amp;#xe6e3;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe691;</span>
        <div class="name">导入</div>
        <div class="code-name">&amp;#xe691;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe70f;</span>
        <div class="name">研发</div>
        <div class="code-name">&amp;#xe70f;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6c3;</span>
        <div class="name">业务报表</div>
        <div class="code-name">&amp;#xe6c3;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6e4;</span>
        <div class="name">表单</div>
        <div class="code-name">&amp;#xe6e4;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe71e;</span>
        <div class="name">部门</div>
        <div class="code-name">&amp;#xe71e;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe717;</span>
        <div class="name">设计</div>
        <div class="code-name">&amp;#xe717;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe692;</span>
        <div class="name">导入</div>
        <div class="code-name">&amp;#xe692;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6e5;</span>
        <div class="name">销售报表</div>
        <div class="code-name">&amp;#xe6e5;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe69e;</span>
        <div class="name">列表</div>
        <div class="code-name">&amp;#xe69e;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6e6;</span>
        <div class="name">表单</div>
        <div class="code-name">&amp;#xe6e6;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6ba;</span>
        <div class="name">竣工测量汇总</div>
        <div class="code-name">&amp;#xe6ba;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6c2;</span>
        <div class="name">授权</div>
        <div class="code-name">&amp;#xe6c2;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe722;</span>
        <div class="name">保存</div>
        <div class="code-name">&amp;#xe722;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6e7;</span>
        <div class="name">上市公司财务报表</div>
        <div class="code-name">&amp;#xe6e7;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe693;</span>
        <div class="name">右三角</div>
        <div class="code-name">&amp;#xe693;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6e8;</span>
        <div class="name">待报价</div>
        <div class="code-name">&amp;#xe6e8;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe661;</span>
        <div class="name">向下</div>
        <div class="code-name">&amp;#xe661;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe705;</span>
        <div class="name">巡检管理</div>
        <div class="code-name">&amp;#xe705;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe601;</span>
        <div class="name">系统设置</div>
        <div class="code-name">&amp;#xe601;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6f0;</span>
        <div class="name">打印机</div>
        <div class="code-name">&amp;#xe6f0;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe721;</span>
        <div class="name">帮助</div>
        <div class="code-name">&amp;#xe721;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe706;</span>
        <div class="name">文章管理</div>
        <div class="code-name">&amp;#xe706;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6a8;</span>
        <div class="name">星星</div>
        <div class="code-name">&amp;#xe6a8;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6e9;</span>
        <div class="name">报表</div>
        <div class="code-name">&amp;#xe6e9;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6a3;</span>
        <div class="name">右三角</div>
        <div class="code-name">&amp;#xe6a3;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6ec;</span>
        <div class="name">导入</div>
        <div class="code-name">&amp;#xe6ec;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6f2;</span>
        <div class="name">进入</div>
        <div class="code-name">&amp;#xe6f2;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe707;</span>
        <div class="name">商管工程</div>
        <div class="code-name">&amp;#xe707;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe697;</span>
        <div class="name">关闭</div>
        <div class="code-name">&amp;#xe697;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe708;</span>
        <div class="name">工程管理</div>
        <div class="code-name">&amp;#xe708;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe602;</span>
        <div class="name">测验</div>
        <div class="code-name">&amp;#xe602;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6ff;</span>
        <div class="name">租房</div>
        <div class="code-name">&amp;#xe6ff;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe603;</span>
        <div class="name">锁</div>
        <div class="code-name">&amp;#xe603;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6f8;</span>
        <div class="name">发帖入口_图文</div>
        <div class="code-name">&amp;#xe6f8;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe604;</span>
        <div class="name">工程巡查</div>
        <div class="code-name">&amp;#xe604;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe718;</span>
        <div class="name">设计</div>
        <div class="code-name">&amp;#xe718;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe65c;</span>
        <div class="name">设置</div>
        <div class="code-name">&amp;#xe65c;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe71d;</span>
        <div class="name">向左</div>
        <div class="code-name">&amp;#xe71d;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe662;</span>
        <div class="name">向下</div>
        <div class="code-name">&amp;#xe662;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe71a;</span>
        <div class="name">开锁</div>
        <div class="code-name">&amp;#xe71a;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6c4;</span>
        <div class="name">icon报表</div>
        <div class="code-name">&amp;#xe6c4;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe709;</span>
        <div class="name">搜房</div>
        <div class="code-name">&amp;#xe709;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe65d;</span>
        <div class="name">设置</div>
        <div class="code-name">&amp;#xe65d;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe714;</span>
        <div class="name">流程</div>
        <div class="code-name">&amp;#xe714;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6a6;</span>
        <div class="name">方块</div>
        <div class="code-name">&amp;#xe6a6;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe71b;</span>
        <div class="name">安全</div>
        <div class="code-name">&amp;#xe71b;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe681;</span>
        <div class="name">男</div>
        <div class="code-name">&amp;#xe681;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6f9;</span>
        <div class="name">侧门</div>
        <div class="code-name">&amp;#xe6f9;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6fb;</span>
        <div class="name">放大镜房子</div>
        <div class="code-name">&amp;#xe6fb;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe71f;</span>
        <div class="name">公司</div>
        <div class="code-name">&amp;#xe71f;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6c5;</span>
        <div class="name">填报设置</div>
        <div class="code-name">&amp;#xe6c5;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe70a;</span>
        <div class="name">参数</div>
        <div class="code-name">&amp;#xe70a;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6ad;</span>
        <div class="name">订单</div>
        <div class="code-name">&amp;#xe6ad;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe71c;</span>
        <div class="name">安全</div>
        <div class="code-name">&amp;#xe71c;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe664;</span>
        <div class="name">收起树</div>
        <div class="code-name">&amp;#xe664;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe719;</span>
        <div class="name">设计</div>
        <div class="code-name">&amp;#xe719;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe668;</span>
        <div class="name">展开树</div>
        <div class="code-name">&amp;#xe668;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe865;</span>
        <div class="name">最后页</div>
        <div class="code-name">&amp;#xe865;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe663;</span>
        <div class="name">减</div>
        <div class="code-name">&amp;#xe663;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe866;</span>
        <div class="name">最后页</div>
        <div class="code-name">&amp;#xe866;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe698;</span>
        <div class="name">关闭</div>
        <div class="code-name">&amp;#xe698;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe720;</span>
        <div class="name">部门</div>
        <div class="code-name">&amp;#xe720;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6ea;</span>
        <div class="name">导入</div>
        <div class="code-name">&amp;#xe6ea;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe867;</span>
        <div class="name">向左</div>
        <div class="code-name">&amp;#xe867;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe68c;</span>
        <div class="name">右三角</div>
        <div class="code-name">&amp;#xe68c;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe723;</span>
        <div class="name">计划</div>
        <div class="code-name">&amp;#xe723;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe68a;</span>
        <div class="name">关闭</div>
        <div class="code-name">&amp;#xe68a;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe8c0;</span>
        <div class="name">211铃铛</div>
        <div class="code-name">&amp;#xe8c0;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6b8;</span>
        <div class="name">旗子</div>
        <div class="code-name">&amp;#xe6b8;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe766;</span>
        <div class="name">回访计划</div>
        <div class="code-name">&amp;#xe766;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6bd;</span>
        <div class="name">测量</div>
        <div class="code-name">&amp;#xe6bd;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe725;</span>
        <div class="name">箭头</div>
        <div class="code-name">&amp;#xe725;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe65e;</span>
        <div class="name">设置</div>
        <div class="code-name">&amp;#xe65e;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe724;</span>
        <div class="name">计划</div>
        <div class="code-name">&amp;#xe724;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6ed;</span>
        <div class="name">打印机</div>
        <div class="code-name">&amp;#xe6ed;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe726;</span>
        <div class="name">箭头</div>
        <div class="code-name">&amp;#xe726;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6a0;</span>
        <div class="name">加公司_Solid</div>
        <div class="code-name">&amp;#xe6a0;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xea68;</span>
        <div class="name">基础设置</div>
        <div class="code-name">&amp;#xea68;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe66e;</span>
        <div class="name">加</div>
        <div class="code-name">&amp;#xe66e;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6ae;</span>
        <div class="name">维修单_派工</div>
        <div class="code-name">&amp;#xe6ae;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6ab;</span>
        <div class="name">517-缺陷提报表</div>
        <div class="code-name">&amp;#xe6ab;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe66f;</span>
        <div class="name">加</div>
        <div class="code-name">&amp;#xe66f;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe670;</span>
        <div class="name">减</div>
        <div class="code-name">&amp;#xe670;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe605;</span>
        <div class="name">导出</div>
        <div class="code-name">&amp;#xe605;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6c6;</span>
        <div class="name">md_日报</div>
        <div class="code-name">&amp;#xe6c6;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe685;</span>
        <div class="name">男</div>
        <div class="code-name">&amp;#xe685;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe711;</span>
        <div class="name">最后页</div>
        <div class="code-name">&amp;#xe711;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6c7;</span>
        <div class="name">799-报表</div>
        <div class="code-name">&amp;#xe6c7;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe67e;</span>
        <div class="name">密码</div>
        <div class="code-name">&amp;#xe67e;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe678;</span>
        <div class="name">选择框</div>
        <div class="code-name">&amp;#xe678;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6c8;</span>
        <div class="name">财务报表</div>
        <div class="code-name">&amp;#xe6c8;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe700;</span>
        <div class="name">竣工验收</div>
        <div class="code-name">&amp;#xe700;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe694;</span>
        <div class="name">左三角</div>
        <div class="code-name">&amp;#xe694;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe68b;</span>
        <div class="name">关闭</div>
        <div class="code-name">&amp;#xe68b;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6c9;</span>
        <div class="name">简历月报表</div>
        <div class="code-name">&amp;#xe6c9;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe672;</span>
        <div class="name">单选-选中</div>
        <div class="code-name">&amp;#xe672;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe67d;</span>
        <div class="name">链接</div>
        <div class="code-name">&amp;#xe67d;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe66b;</span>
        <div class="name">费用</div>
        <div class="code-name">&amp;#xe66b;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe686;</span>
        <div class="name">nan</div>
        <div class="code-name">&amp;#xe686;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe657;</span>
        <div class="name">shouqi</div>
        <div class="code-name">&amp;#xe657;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6ca;</span>
        <div class="name">1173-excel表格</div>
        <div class="code-name">&amp;#xe6ca;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe606;</span>
        <div class="name">系统设置</div>
        <div class="code-name">&amp;#xe606;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe658;</span>
        <div class="name">未选中</div>
        <div class="code-name">&amp;#xe658;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe613;</span>
        <div class="name">支付方式_未选择</div>
        <div class="code-name">&amp;#xe613;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe671;</span>
        <div class="name">支付方式选择</div>
        <div class="code-name">&amp;#xe671;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6eb;</span>
        <div class="name">导入</div>
        <div class="code-name">&amp;#xe6eb;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6a1;</span>
        <div class="name">添加子部门uAdd a sub-department</div>
        <div class="code-name">&amp;#xe6a1;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6fc;</span>
        <div class="name">系统管理</div>
        <div class="code-name">&amp;#xe6fc;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6cb;</span>
        <div class="name">报表</div>
        <div class="code-name">&amp;#xe6cb;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe62a;</span>
        <div class="name">设置</div>
        <div class="code-name">&amp;#xe62a;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe696;</span>
        <div class="name">提示</div>
        <div class="code-name">&amp;#xe696;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe701;</span>
        <div class="name">文档管理</div>
        <div class="code-name">&amp;#xe701;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6f3;</span>
        <div class="name">业务</div>
        <div class="code-name">&amp;#xe6f3;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe607;</span>
        <div class="name">锁</div>
        <div class="code-name">&amp;#xe607;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe695;</span>
        <div class="name">提示</div>
        <div class="code-name">&amp;#xe695;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe665;</span>
        <div class="name">减</div>
        <div class="code-name">&amp;#xe665;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe66a;</span>
        <div class="name">加</div>
        <div class="code-name">&amp;#xe66a;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6cc;</span>
        <div class="name">统计</div>
        <div class="code-name">&amp;#xe6cc;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe65f;</span>
        <div class="name">退出</div>
        <div class="code-name">&amp;#xe65f;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe682;</span>
        <div class="name">女</div>
        <div class="code-name">&amp;#xe682;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6b5;</span>
        <div class="name">旗子</div>
        <div class="code-name">&amp;#xe6b5;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe68e;</span>
        <div class="name">向下三角</div>
        <div class="code-name">&amp;#xe68e;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe608;</span>
        <div class="name">统计分析</div>
        <div class="code-name">&amp;#xe608;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe666;</span>
        <div class="name">公司</div>
        <div class="code-name">&amp;#xe666;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6cd;</span>
        <div class="name">财务报表</div>
        <div class="code-name">&amp;#xe6cd;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe609;</span>
        <div class="name">验房收房</div>
        <div class="code-name">&amp;#xe609;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe60a;</span>
        <div class="name">统计</div>
        <div class="code-name">&amp;#xe60a;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6ce;</span>
        <div class="name">统计分析</div>
        <div class="code-name">&amp;#xe6ce;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe702;</span>
        <div class="name">找房</div>
        <div class="code-name">&amp;#xe702;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6cf;</span>
        <div class="name">报表输出</div>
        <div class="code-name">&amp;#xe6cf;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe60b;</span>
        <div class="name">分享</div>
        <div class="code-name">&amp;#xe60b;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe60c;</span>
        <div class="name">评论</div>
        <div class="code-name">&amp;#xe60c;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe60d;</span>
        <div class="name">审阅</div>
        <div class="code-name">&amp;#xe60d;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe60e;</span>
        <div class="name">同事1</div>
        <div class="code-name">&amp;#xe60e;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe60f;</span>
        <div class="name">同事2</div>
        <div class="code-name">&amp;#xe60f;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe610;</span>
        <div class="name">设置1</div>
        <div class="code-name">&amp;#xe610;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe611;</span>
        <div class="name">设置2</div>
        <div class="code-name">&amp;#xe611;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6d0;</span>
        <div class="name">输出成果报表</div>
        <div class="code-name">&amp;#xe6d0;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe862;</span>
        <div class="name">添加</div>
        <div class="code-name">&amp;#xe862;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe612;</span>
        <div class="name">协作</div>
        <div class="code-name">&amp;#xe612;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe614;</span>
        <div class="name">arrow_down</div>
        <div class="code-name">&amp;#xe614;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe615;</span>
        <div class="name">arrow_up</div>
        <div class="code-name">&amp;#xe615;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe616;</span>
        <div class="name">mail</div>
        <div class="code-name">&amp;#xe616;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe789;</span>
        <div class="name">message</div>
        <div class="code-name">&amp;#xe789;</div>
      </li>

      <li class="dib">
        <span class="icon iconfont">&#xe6ee;</span>
        <div class="name">打印机</div>
        <div class="code-name">&amp;#xe6ee;</div>
      </li>

    </ul>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      tabList: [
        { lable: 'Unicode' },
        { lable: 'Font class' },
        { lable: 'Symbol' }
      ]
    })
    return {
      state
    }
  }
}
</script>
<style lang="less" scoped>
.icon_lists {
  width: 100% !important;
  overflow: hidden;
  *zoom: 1;
  li {
    float:left;
    height: 200px;
    width: 100px;
    margin-bottom: 10px;
    margin-right: 20px;
    text-align: center;
    list-style: none !important;
    cursor: default;
    .code-name {
      line-height: 1.2;
    }
    .name, .code-name {
      color: #666;
    }
  }
  .icon {
    display: block;
    height: 100px;
    line-height: 100px;
    font-size: 36px;
    margin: 10px auto;
    color: #333;
    -webkit-transition: font-size 0.25s linear, width 0.25s linear;
    -moz-transition: font-size 0.25s linear, width 0.25s linear;
    transition: font-size 0.25s linear, width 0.25s linear;
    &:hover {
      font-size: 80px;
    }
  }
  .svg-icon {
    /* 通过设置 font-size 来改变图标大小 */
    width: 1em;
    /* 图标和文字相邻时，垂直对齐 */
    vertical-align: -0.15em;
    /* 通过设置 color 来改变 SVG 的颜色/fill */
    fill: currentColor;
    /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示normalize.css 中也包含这行 */
    overflow: hidden;
  }
}
</style>