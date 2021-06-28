import Vue from 'vue'

const userAgent = navigator.userAgent
Vue.prototype.$_device = {
  ua: userAgent,
  ios: userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
