import { load, updateConfig } from '@/common/wx'
import { defaultAppShareObject } from './config'
import { upLog } from '@/common/trace'

const shareObj = {
  title: defaultAppShareObject.shareTitle,
  desc: defaultAppShareObject.shareDesc,
  link: window.location.href,
  imgUrl: defaultAppShareObject.shareImage
}

/**
 * 设置微信分享
 */
export default async () => {
  // 加载 SDK
  await load()
  if (!window.wx) throw new Error('WeChat JSSDK load error.')

  // 更新微信配置
  await updateConfig()

  // 注册分享事件
  window.wx.ready(function() {
    // 分享好友
    window.wx.onMenuShareAppMessage({
      ...shareObj,
      trigger: function() {
        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
        // alert('用户点击发送给朋友');
      },
      success: function() {},
      cancel: function() {},
      fail: function() {}
    })

    // 分享朋友圈
    window.wx.onMenuShareTimeline({
      ...shareObj,
      success: function() {},
      cancel: function() {},
      fail: function() {}
    })
  })

  window.wx.error(res => {
    upLog({ typ: 'shareErr', res })
  })
}
