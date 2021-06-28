# sales-single-page

[TOC]

## Index

以下为该项目包含的全部页面名称及对应地址，当前共有 11 个楼盘单页和 2 个其他主题页，共 13 个主题。

- 恒大悦珑湾 <https://sz.centanet.com/partner/house/sale/0330/#/Hdylw>
- 颐翠名庭 <https://sz.centanet.com/partner/house/sale/0401/#/Ycmt>
- 清林半山 <https://sz.centanet.com/partner/house/sale/0419/#/Qlbs>
- 锦绣海湾城 <https://sz.centanet.com/partner/house/sale/0419/#/Jxhwc>
- 星河盛境 <https://sz.centanet.com/partner/house/sale/newm1/#/Xhsj>
- 新用户下载有礼 202104 <https://sz.centanet.com/partner/house/activity/appDown/#/newAppPC>
- 保利天汇 <https://sz.centanet.com/partner/house/sale/newm1/#/Blth>
- 汇城茗院 <https://sz.centanet.com/partner/house/sale/newm1/#/Hcmy>
- 万科大都会 <https://sz.centanet.com/partner/house/sale/newm1/#/Wkddh>
- 星河天地三期 <https://sz.centanet.com/partner/house/sale/newm1/#/Xhtd3>
- 20210512 腾讯推广单页：[新房](https://sz.centanet.com/partner/house/zt/txHouse/#/20210512/new?sem=GDT&hmpl=xf) / [二手房](https://sz.centanet.com/partner/house/zt/txHouse/#/20210512/secondhand?sem=GDT&hmpl=esf)
- 万科都会四季花园 <https://sz.centanet.com/partner/house/sale/newm1/#/Wkdhsjhy>
- 信达泰禾金尊府(信达金尊府) <https://sz.centanet.com/partner/house/sale/0517/#/Xdthjzf>

## References

仅包含线上部署且非本仓库项目，本仓库项目线上地址请到下方 [Topics](#Topics) 找到对应主题。

- 赢 iPhone12 来中原找房一键咨询 <https://sz.centanet.com/partner/house/activity/call/index.html>
- 中房翰林门 <https://sz.centanet.com/partner/house/sale/0312/#/hlm>
- 兴围华府 <https://sz.centanet.com/partner/house/sale/0312/#/xwhf>
- 玖裕茗苑 <https://sz.centanet.com/partner/house/sale/0304/#/jymy>
- 海德园 <https://sz.centanet.com/partner/house/sale/hdy/#/hdy>
- 宏发新领域花园 <https://sz.centanet.com/partner/house/sale/0312/#/lyhy>
- 皓玥华府 <https://sz.centanet.com/partner/house/sale/0414/#/home>
- 半山臻境 <https://sz.centanet.com/partner/house/sale/0312/#/bszj>
- 定制找房 202105 <https://sz.centanet.com/partner/house/zt/dzzf/#/dsju?sem=wechat&hmpl=gzh03>

## 开发相关

### 楼盘单页拨打电话二维码

PC 单页点击电话联系按钮时候弹出的二维码地址格式：

```
https://sz.centanet.com/wxqcode/工号_城市区号_短号_4006622712.jpg
```

### 进线接口

楼盘表单页测试提交时，名称统一输入**前端测试**，以标记测试数据，便于后端跳过相关业务处理。

进线接口详细信息已存储至 Postman，如需示例可参考[定制找房](https://sz.centanet.com/partner/house/zt/dzzf/#/dsju?sem=wechat&hmpl=gzh03)或项目中 `views/20210512/components/card.vue@submit()` 这部分代码，也可以联系 hezx@centaline.com.cn 或相关负责人。



## APP 相关

对接 APP 获取 userInfo 见 `src/common/app.js` 。

以下为 Android APP 端获取的用户信息示例，最下方为未登录用户：

```json
{
    "versionCode": 7270,
    "OSVersion": "29",
    "platform": "android",
    "deviceId": "XeJCXGA+gkEDADl3qX4O/6ww",
    "data": {
        "IsSetNewPwd": true,
        "NickName": "",
        "Phone": "170****2477",
        "UserId": "U124056320",
        "UserToken": "k/thAcjjffEJJJVVgXQvRWBY-0yM9D-xdFOYJBpnhsvsvVTbvNnNZuLUaFJyUFJJJyTuyIppimTBxWqAVbLcWuCIwhKVFTWhsYyQrgVR/FY/levfgbDhNhzK7lpq0THCAL1sil4MYR8MmDMn7yJJRn-h30MnF2JeP/xQq62aHgF1gkDTGhxB6jHOoJgCUzAuBm"
    },
    "cityCode": "0755",
    "cityName": "深圳"
}
```

```json
{
    "versionCode": 7280,
    "OSVersion": "29",
    "platform": "android",
    "deviceId": "YDsQ77QFyYADAOyV/srKN3n3",
    "data": {
        "IsSetNewPwd": false,
        "NickName": "",
        "Phone": "18566735533",
        "UserId": "U100072891",
        "UserPhotoUrl": "https://pic.centanet.com/other/user/systemuserphoto.jpg",
        "UserToken": "-VQwR4VstNo-xuINdcw/Um4Z9pTSCRC42aHzfy75gRP6DMjgHuGmeHNXAH/3WB0I1McdNHbuYjcmPlO0soNyOMrRJ-9LgC2WjUl0NJnKJXde3DEftB7LlyIcurkctM8-HgMkuHZR2IarKgvcQ7ORa2o5XscdCBWjrCMrfzbqzpsKTkgZBlJbeEd6oWbRMDs-",
        "IsNewUser": false,
        "CreateTime2": 1618197146
    },
    "cityCode": "0760",
    "cityName": "中山"
}
```

```json
{
    "versionCode": 7270,
    "OSVersion": "29",
    "platform": "android",
    "deviceId": "YDsQ77QFyYADAOyV/srKN3n3",
    "cityCode": "0755",
    "cityName": "深圳"
}
```



## Topics

项目包含的页面见 `src/config/pages.js` ，如未特别配置 `path` 路径，访问地址即为 `key`，例如：`path/to/index.html#/Hdylw` ，注意大小写。

### 恒大悦珑湾 `hdylw`

#### CHANGE LOG

##### `hdylw-1.0.8` 2021/5/13

- 同步 html,body 样式调整，修正滚动动画加载的问题。
- 修复移除切换路由报错的问题。

##### `hdylw-1.0.7` 2021/4/23

- 同步更新接口参数。

##### `hdylw-1.0.6` 2021/4/6

- 支持 `?debug=1` 开启 debug 模式，方便查看当前页面版本。
- 修复表单提交数据无法获取 Sem 和 Hpml 的问题。
- 兼容 iOS 底部横条边距。

##### `hdylw-1.0.5` 2021/4/2

- 代码结构调整，独立并更新常用变量、组件，减少代码耦合。界面无大变化。

##### `hdylw-1.0.4` 2021/4/1

- 更新电话号码

##### `hdylw-1.0.3` 2021/3/31

- 增加卡片顶部标题框的背景两侧三角形阴影。

##### `hdylw-1.0.2` 2021/3/30

- 修复图片路径错误导致点击图片无法预览。

##### `hdylw-1.0.1` 2021/3/30

- 更新 publicPath 配置项，兼容子目录部署。

##### `hdylw-1.0.0` 2021/3/30

- First version.

### 颐翠名庭 `ycmt`

#### CHANGE LOG

##### `ycmt-1.0.11` 2021/5/17

- 推荐楼盘，兴围华府替换为半山臻境。
- 移除底部楼盘推荐虚线边框。

##### `ycmt-1.0.10` 2021/5/13

- 修复样板房未及时移除 scroll 事件监听的问题。

##### `ycmt-1.0.9` 2021/5/13

- 同步 html,body 样式调整，修正滚动动画加载的问题。

##### `ycmt-1.0.8` 2021/4/29

- 所有标题直接使用字体，移除所有图片文字资源和引用 #3cca0b6378b011b9aa72431643aa1898c83f995f

##### `ycmt-1.0.7` 2021/4/26

- 因 whatwg-url 存在 ES8 特性和浏览器兼容冲突，改用 url-parse 处理 url 。

##### `ycmt-1.0.6` 2021/4/26

- 下方楼盘推荐链接带上当前地址的全部 route query 数据。

##### `ycmt-1.0.5` 2021/4/25

- 修复主力户型咨询按钮样式问题。

##### `ycmt-1.0.4` 2021/4/23

- 同步更新接口参数。

##### `ycmt-1.0.3` 2021/4/6

- 样板房轮播更新，两侧都能显示图片。
- 支持 `?debug=1` 开启 debug 模式，方便查看当前页面版本。
- 修复表单提交数据无法获取 Sem 和 Hpml 的问题。
- 兼容 iOS 底部横条边距。

##### `ycmt-1.0.2` 2021/4/2

- 底部按钮增加放大动画。
- 代码结构调整，独立并更新常用变量、组件，减少代码耦合。界面无大变化。

##### `ycmt-1.0.1` 2021/4/1

- 修复电话拨打无效问题。
- 文字样式微调。

##### `ycmt-1.0.0` 2021/4/1

- First version.

### 清林半山 qlbs

#### CHANGELOG

##### `qlbs-1.0.14` 2021/5/17

- 推荐楼盘，兴围华府替换为半山臻境。
- 移除底部楼盘推荐虚线边框。

##### `qlbs-1.0.13` 2021/5/13

- 修复样板房未及时移除 scroll 事件监听的问题。

##### `qlbs-1.0.12` 2021/5/13

- 同步 html,body 样式调整，修正滚动动画加载的问题。

##### `qlbs-1.0.11` 2021/4/29

- 所有标题直接使用字体，移除所有图片文字资源和引用 #3cca0b6378b011b9aa72431643aa1898c83f995f

##### `qlbs-1.0.10` 2021/4/26

- 因 whatwg-url 存在 ES8 特性和浏览器兼容冲突，改用 url-parse 处理 url 。

##### `qlbs-1.0.9` 2021/4/26

- 下方楼盘推荐链接带上当前地址的全部 route query 数据。

##### `qlbs-1.0.8` 2021/4/25

- 修复主力户型咨询按钮样式问题。

##### `qlbs-1.0.7` 2021/4/23

- 同步更新接口参数。

##### `qlbs-1.0.6` 2021/4/19

- 修复样板房 swiper transform scale 不生效的问题。
- 更换点击查看的大图为大尺寸。

##### `qlbs-1.0.5` 2021/4/19

- 更新楼盘推荐链接。

##### `qlbs-1.0.4` 2021/4/16

- 文案内容更新。

##### `qlbs-1.0.3` 2021/4/16

- 样式微调，加粗户型标题文字。

##### `qlbs-1.0.2` 2021/4/16

- 样式微调，加粗项目亮点标题。

##### `qlbs-1.0.1` 2021/4/16

- 默认首页路由跳转 Qlbs 清林半山单页。

##### `qlbs-1.0.0` 2021/4/16

- Copy from Ycmt page.

### 锦绣海湾城 jxhwc

#### CHANGELOG

##### `jxhwc-1.0.12` 2021/5/17

- 移除底部楼盘推荐虚线边框。

##### `jxhwc-1.0.11` 2021/5/13

- 修复样板房未及时移除 scroll 事件监听的问题。

##### `jxhwc-1.0.10` 2021/5/13

- 同步 html,body 样式调整，修正滚动动画加载的问题。

##### `jxhwc-1.0.9` 2021/4/29

- 所有标题直接使用字体，移除所有图片文字资源和引用 #3cca0b6378b011b9aa72431643aa1898c83f995f

##### `jxhwc-1.0.8` 2021/4/26

- 因 whatwg-url 存在 ES8 特性和浏览器兼容冲突，改用 url-parse 处理 url 。

##### `jxhwc-1.0.7` 2021/4/26

- 下方楼盘推荐链接带上当前地址的全部 route query 数据。

##### `jxhwc-1.0.6` 2021/4/25

- 修复主力户型咨询按钮样式问题。

##### `jxhwc-1.0.5` 2021/4/23

- 同步更新接口参数。

##### `jxhwc-1.0.4` 2021/4/20

- 修复样板房 swiper transform scale 不生效的问题。
- 更换点击查看的大图为大尺寸。

##### `jxhwc-1.0.3` 2021/4/17

- 更新锦绣海湾城电话。

##### `jxhwc-1.0.2` 2021/4/19

- 更新楼盘推荐链接和电话号码。

##### `jxhwc-1.0.1` 2021/4/16

- 移除电脑端底部按钮点击弹出拨号二维码的逻辑，该楼盘暂无二维码。

##### `jxhwc-1.0.0` 2021/4/16

- Copy from Qlbs page.

### 星河盛境 xhsj

蓝湖：<https://lanhuapp.com/web/#/item/project/stage?pid=355cc515-fc95-40c8-a55f-fd1e28aeb2a6>

#### CHANGELOG

##### `xhsj-1.0.9` 2021/5/17

- 推荐楼盘，兴围华府替换为汇城茗院。
- 移除底部楼盘推荐虚线边框。

##### `xhsj-1.0.8` 2021/5/13

- 修复样板房未及时移除 scroll 事件监听的问题。

##### `xhsj-1.0.7` 2021/5/13

- 同步 html,body 样式调整，修正滚动动画加载的问题。

##### `xhsj-1.0.6` 2021/4/29

- 引入“方正正大黑简体”字体，块标题不使用图片文字，优化项目体积 #74c573e9904151072c94a5d48c3c28b97552e1f9
- 各按钮的右侧移除箭头图标 #7da430471bbe179280c446abc9c1fb2581b736c1
- 底部拨号按钮文案内容调整为“欢迎致电售楼处” #b6442beb15d04c577c01fa76232aa338fa9ec243

##### `xhsj-1.0.5` 2021/4/28

- 页面上方增加填写表单。

##### `xhsj-1.0.4` 2021/4/26

- 因 whatwg-url 存在 ES8 特性和浏览器兼容冲突，改用 url-parse 处理 url 。

##### `xhsj-1.0.3` 2021/4/26

- 下方楼盘推荐链接带上当前地址的全部 route query 数据。

##### `xhsj-1.0.2` 2021/4/25

- 修复主力户型咨询按钮样式问题。

##### `xhsj-1.0.1` 2021/4/25

- 新增调试代码用于排查表单请求出现错误的情况。
- 移除弃用的 route.meta.formURL 字段。

##### `xhsj-1.0.0` 2021/4/25

- First version.

### 新用户下载有礼 202104

[在线文档 - 新用户下载有礼活动.docx](https://docs.qq.com/doc/DRWhPWXl1dndwZ0Fh)

[在线文档 - 新用户下载有礼渠道链接.xlsx](https://docs.qq.com/sheet/DQ2txZUFsV0tLU2dY)

[JIRA SH需求&问题跟踪平台 SH-11112 深圳新用户下载有礼活动集团支持需求](http://jira.centaline.com.cn/browse/SH-11112)

[蓝湖原型、设计](https://lanhuapp.com/url/RpJQg) 密码: Bp5A

#### 生产环境

线上固定地址（渠道码见上方文档）：<https://sz.centanet.com/partner/house/activity/appDown/#/newApp?utm_source=渠道码>

#### 接口地址

##### 本地测试

接口地址：<http://10.6.14.156:1000/swagger/ui/index#/NewDownloadPrize>

Base URL: <http://10.6.14.156:1000>

[测试数据清理](http://10.6.14.156:1001/NewDownload/index)

##### 线上

接口文档：<http://10.6.252.31/partner/actapi/swagger/ui/index#/NewDownloadPrize>

Base URL: <https://sz.centanet.com/partner/actapi>

##### 参数

Code = -1  概率错误   抽奖失败 网络错误
Code = 0  抱歉~你不符合参与资格
Code = 1  抱歉~你已经参与过本次活动了
Code = 2  请绑定专属经纪人
Code = 3   抽奖成功

#### 其他

**绑定经纪人推荐码：**

王东铭：119141

陈玉鸣：121728

**测试内部员工手机号：**

15118083986

#### CHANGE LOG

##### `app-down-1.0.7` 2021/6/1

- 加载出错时始终显示不符合不显示网络错误。

##### `app-down-1.0.6` 2021/5/10

- start use @centanet/common-web module.

##### `app-down-1.0.5` 2021/4/25

- 登记页获取验证码增加内部员工判断，禁止内部员工参与活动。#7455c047
- 活动页面标题调整为**新用户下载有礼**。#6c779862
- 防止数据被缓存导致调试日志不会记录的问题。#054c4b13

##### `app-down-1.0.4` 2021/4/25

- GIO 埋点调整，按钮点击不包含区域来源信息。

##### `app-down-1.0.3` 2021/4/25

- 活动页面标题调整。
- 引入微信 SDK 支持自定义分享标题、描述和图片（因安全域名原因，该更新待测试）。
- 完善生产环境调试跟踪能力。

##### `app-down-1.0.2` 2021/4/23

 - 抽奖滚动动画速度微调；修复最后一点位置滚动较慢时时快时慢的问题；抽奖成功后增加一点延迟。

##### `app-down-1.0.1` 2021/4/23

- APP 端获取资格请求错误时不显示 Toast 防止出现 Network Error 影响体验。
- 增加用于调试确定线上版本的代码，便于调试。

##### `app-down-1.0.0` 2021/4/23

- 首个正式版本

### 保利天汇 blth

蓝湖：<https://lanhuapp.com/web/#/item/project/board?from=nav&pid=df92da9d-2646-4fce-8636-9da12c9127e3>

#### CHANGE LOG

##### `blth-1.0.7` 2021/5/17

- 移除底部楼盘推荐虚线边框。

##### `blth-1.0.6` 2021/5/13

- 修复样板房未及时移除 scroll 事件监听的问题。

##### `blth-1.0.5` 2021/5/13

- 同步 html,body 样式调整，修正滚动动画加载的问题。

##### `blth-1.0.4` 2021/4/29

- 修改电话号码 #cde3c4d529604f43419b9a39e06ba68d0158dfa0

##### `blth-1.0.3` 2021/4/29

- 所有标题直接使用字体，移除所有图片文字资源和引用 #3cca0b6378b011b9aa72431643aa1898c83f995f

##### `blth-1.0.2` 2021/4/29

- 引入“方正正大黑简体”字体，块标题不使用图片文字，优化项目体积 #4949a6ab
- 各按钮的右侧移除箭头图标 #3a82dd2b
- 底部拨号按钮文案内容调整为“欢迎致电售楼处” #ea42346b

##### `blth-1.0.1` 2021/4/28

- 项目详情块中的文案调整。
- 项目详情块中的图片增加点击放大支持。

##### `blth-1.0.0` 2021/4/28

- First version.

### 汇城茗院 hcmy

蓝湖：<https://lanhuapp.com/web/#/item/project/board?from=nav&pid=95254424-dc6e-4bb4-aa52-30590dc714b8>

#### CHANGE LOG

##### `hcmy-1.0.3` 2021/5/17

- 推荐楼盘，兴围华府替换为万科大都会。
- 移除底部楼盘推荐虚线边框。

##### `hcmy-1.0.2` 2021/5/13

- 同步 html,body 样式调整，修正滚动动画加载的问题。

##### `hcmy-1.0.1` 2021/4/29

- 引入“方正正大黑简体”字体，块标题不使用图片文字，优化项目体积 #47420f279980fef8c468a559fad1ab2fe32de179
- 各按钮的右侧移除箭头图标 #f9dbeec390cacee961d1f5250253a945673f0d26
- 底部拨号按钮文案内容调整为“欢迎致电售楼处” #04661320fcb5a2f2abac1acee861096a60857726

##### `hcmy-1.0.0` 2021/4/28

- First version.

### 万科大都会 wkddh

#### CHANGE LOG

##### `wkddh-1.0.4` 2021/5/17

- 移除底部楼盘推荐虚线边框。
- 推荐楼盘，兴围华府替换为半山臻境。

##### `wkddh-1.0.3` 2021/5/13

- 同步 html,body 调整，修正滚动动画加载的问题。

##### `wkddh-1.0.2` 2021/5/7

- 更新文案。

##### `wkddh-1.0.1` 2021/5/7

- 修复详情快的图片打开大图尺寸配置错误。

##### `wkddh-1.0.0` 2021/5/7

- First version.

### 星河天地三期 xhtd3

#### CHANGE LOG

##### `xhtd3-1.0.3` 2021/5/17

- 推荐楼盘，兴围华府替换为半山臻境。
- 移除底部楼盘推荐虚线边框。

##### `xhtd3-1.0.2` 2021/5/13

- 同步 html,body 样式调整，修正滚动动画加载的问题。

##### `xhtd3-1.0.1` 2021/5/7

- 更新文案。

##### `xhtd3-1.0.0` 2021/5/7

- First version.

### 20210512 腾讯推广单页（新房/二手房）

李欣欣-腾讯推广专题

线上地址：

新房：<https://sz.centanet.com/partner/house/zt/txHouse/#/20210512/new?sem=GDT>

二手房：<https://sz.centanet.com/partner/house/zt/txHouse/#/20210512/secondhand?sem=GDT>

#### 进线接口

v1.0.14 版本更换了接口，详细接口信息和示例见 Postman。

#### CHANGE LOG

##### `20210512-1.0.16` 2021/5/31

- 更新新房标题使用的字段，使用 EstName 显示，不使用 AdName。

##### `20210512-1.0.15` 2021/5/27

- 进线接口传入数据更新。

##### `20210512-1.0.14` 2021/5/27

- DMP 支持 sem 定义不同渠道商，目前支持 GDT/HTGDT。

- 进线接口更换。

##### `20210512-1.0.13` 2021/5/21

- DMP 用户行为改为 RESERVATION 预约。

##### `20210512-1.0.12` 2021/5/20

- 优化 DMP 初始化，修复可能的数据接入问题。

##### `20210512-1.0.11` 2021/5/20

- DMP SDK 由提交表单时引入改为页面打开时引入。

##### `20210512-1.0.10` 2021/5/14

- 更新进线提交参数内容。

##### `20210512-1.0.9` 2021/5/14

- 修正表单提交 ProCode 属性为空的问题。

##### `20210512-1.0.8` 2021/5/13

- 页面标题调整为“中原找房，安心找好房”。

##### `20210512-1.0.7` 2021/5/13

- [需求调整] 表单提交的 EstateName 区分新房和二手房并使用对应数据。

##### `20210512-1.0.6` 2021/5/13

- DMP 数据仅首次提交手机号时上报行为。 #f10e2727b45de72891b9ae0e071a8ad2542ec133

##### `20210512-1.0.5` 2021/5/13

- 对接 DMP 数据平台，上报行为数据。
- 修复列表图片未加载完成时高度太高的问题。

##### `20210512-1.0.4` 2021/5/13

- [需求调整] 移除二手房、新房顶部表单，微调顶部 banner 部分尺寸。
- [需求调整] 新房列表每一页数据按照售价升序，无价格的排在后面。

##### `20210512-1.0.3` 2021/5/12

- 列表图片增加动画效果，项目滚动到可视区域时动画进入。
- 设置默认背景图片，图片加载中显示默认图片。
- 修复 iOS 下标签渐隐效果会出现黑色的兼容问题。
- 样式细节优化和修复。

##### `20210512-1.0.2` 2021/5/12

- 样式微调，二手房列表标题最多显示两行。

##### `20210512-1.0.1` 2021/5/12

- 微调新房、二手房列表样式。

##### `20210512-1.0.0` 2021/5/12

- First version.

### 万科都会四季花园 wkdhsjhy

#### CHANGE LOG

##### `wkdhsjhy-1.0.3` 2021/5/18

- 修复底部楼盘推荐第一个汇城茗院链接链接地址不正确的问题。

##### `wkdhsjhy-1.0.2` 2021/5/17

- 修复路由被移除的问题。
- 移除底部楼盘推荐虚线边框。

##### `wkdhsjhy-1.0.1` 2021/5/13

- 修复详情块标题未修改为万科都会四季花园。

##### `wkdhsjhy-1.0.0` 2021/5/13

- First version.

### 信达泰禾金尊府(信达金尊府) xdthjzf

#### CHANGE LOG

##### `xdthjzf-1.0.3` 2021/5/17

- 户型文案修正。

##### `xdthjzf-1.0.2` 2021/5/17

- 页面文案修正。
- 移除底部楼盘推荐虚线边框。
- 更新户型图片。

##### `xdthjzf-1.0.1` 2021/5/17

- 更新图片和颜色样式。

##### `xdthjzf-1.0.0` 2021/5/14

- First version.



