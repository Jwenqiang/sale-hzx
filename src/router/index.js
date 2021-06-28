import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { title } from '@/config'
import { log } from '@/common/trace'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  log('Router navigate from -> to', from, to)
  let _title = to.meta.title || title
  const isDebug = to.query.debug === '1'
  window.version = to.meta.version + ' ' + to.name
  document.title = (isDebug ? `${window.version} ` : '') + _title
  if (isDebug) window.console.log(window.version)
  next()
})

export default router
