import AxiosAsync from '@/plug/axios'
let script

export const is = !!~window.navigator.userAgent
  .toLowerCase()
  .indexOf('micromessenger')

/**
 * 加载微信 JSSDK
 */
export const load = () =>
  new Promise((resolve, reject) => {
    if (!is) {
      return reject(new Error('Must in WeChat.'))
    }

    if (!script) {
      script = document.createElement('script')
      script.src = 'https://m.sz.centanet.com/zt/js/jweixin-1.0.0.js'
      script.onload = resolve
      script.onerror = reject
      document.head.appendChild(script)
    }
  })

/**
 * 更新微信初始化配置
 */
export const updateConfig = async () => {
  const axios = await AxiosAsync()
  const {
    data: res
  } = await axios.get(
    'https://m.sz.centanet.com/partner/weixin/jssdkjsonp?url=' +
      encodeURIComponent(window.location.href),
    { responseType: 'text' }
  )

  const data = eval(res)
  if (data) {
    window.wx.config({
      debug: false,
      appId: data.AppId,
      timestamp: data.Timestamp,
      nonceStr: data.NonceStr,
      signature: data.Signature,
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
    })
  } else {
    throw new Error('非预期响应')
  }
}
