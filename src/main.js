import Vue from 'vue'
import App from './App.vue'

import Router from './router'
import VueTap from 'vue-js-tap'
import '@/asset/styles/index.less'
import './plug/vant'
import './plug/device'
import './plug/lazyload'
import { log, error } from '@/common/trace'

Vue.use(VueTap)

Vue.config.productionTip = false

Vue.prototype.$_publicPath = process.env.BASE_URL
Vue.prototype.$_log = log
Vue.prototype.$_error = error

new Vue({
  name: 'Main',
  router: Router,
  render: h => h(App)
}).$mount('#app')
