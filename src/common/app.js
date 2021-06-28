/**
 * APP 对接相关
 * 暂不清楚具体 APP 对接逻辑，待优化
 */
import CurrentDevide from 'current-device'
import { log } from '@/common/trace'

let userInfo
let resolveUserInfoPromise

export const isApp = !!~navigator.userAgent.indexOf('salehouse-webview')

/**
 * 初始化 APP，在 vm 对象创建时调用
 */
export const init = () => {
  window.observeUserInfo = info => {
    if (typeof info === 'string') info = JSON.parse(info)
    userInfo = info
    if (resolveUserInfoPromise) resolveUserInfoPromise(info)
    log('Got userinfo at observer: ', info)
    log('Got userinfo at observer (string): ', JSON.stringify(info))
  }

  triggerUserInfo({ open: false })
}

/**
 * 触发获取用户
 * @param {Object}  options
 * @param {Boolean} options.open  是否打开弹窗
 */
export const triggerUserInfo = ({ open } = {}) => {
  log('triggerUserInfo: ', open)
  if (CurrentDevide.ios()) {
    if (window?.webkit?.messageHandlers?.getPlatform) {
      // window.webkit.messageHandlers.getUserInfoNoLogin.postMessage(null) // 方法3 只请求  不获取数据
      open
        ? window.webkit.messageHandlers.getUserInfo.postMessage(null)
        : window.webkit.messageHandlers.getUserInfoNoLogin.postMessage(null)
    }
  } else {
    if (window?.salehouse?.getPlatform) {
      // platform = window.salehouse.getPlatform() // 方法1 android
      // const info = window.salehouse.getUserInfoNoLogin() // 不弹出登录
      const info = open
        ? window.salehouse.getUserInfo()
        : window.salehouse.getUserInfoNoLogin()
      if (info) {
        userInfo = info
        log('Got userinfo at beforeCreate: ', info)
      }
    }
  }
}

/**
 * 获取用户信息
 * @param {Object}  options         参数
 * @param {Number}  options.timeout 获取用户信息超时，单位ms，默认 1000
 * @param {Boolean} options.open    是否弹出 APP 登录框
 */
export const getUserInfo = ({ timeout = 1000, open = false } = {}) =>
  new Promise((resolve, reject) => {
    if (userInfo) {
      resolve(userInfo)
    } else {
      let timer
      if (timeout) {
        timer = setTimeout(() => {
          reject(new Error('获取用户信息超时'))
        }, timeout || 1000)
      }

      resolveUserInfoPromise = obj => {
        clearTimeout(timer)
        if (obj) {
          resolve(obj)
        } else {
          reject(new Error('未知用户信息'))
        }
      }

      triggerUserInfo({ open })
    }
  })

/**
 * 打开分享弹框
 * @param {Object} shareInfo
 * @param {String} shareInfo.shareTitle  分享标题
 * @param {String} shareInfo.shareDesc   分享描述
 * @param {String} shareInfo.shareImage  分享图片链接地址
 */
export const openShare = ({ shareInfo } = {}) => {
  if (!shareInfo || typeof shareInfo !== 'object') return

  const json = JSON.stringify(shareInfo)
  if (CurrentDevide.ios()) {
    window.webkit.messageHandlers.showShareAlert.postMessage(json)
  } else {
    window.salehouse.showShareAlert(json)
  }
}

export function setCookie(p1, p2, exdays) {
  log(1)
  let exdate = new Date()
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
  let expires = exdays != 0 ? `expires=${exdate.toGMTString()}` : ''
  if (p2 == 'token') {
    window.document.cookie = `b016fa8eaf8753e3e653d2a55e8ab72d=${p1};path=/;${expires};domain=centanet.com`
  } else {
    window.document.cookie = `ck_user=id=${p1}&city=${p2};path=/;${expires};domain=centanet.com`
    window.document.cookie = `ck_user_wap=id=${p1}&city=${p2};path=/;${expires};domain=centanet.com`
  }
}
