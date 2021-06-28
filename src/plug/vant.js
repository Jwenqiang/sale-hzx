import Vue from 'vue'
import {
  Icon,
  Toast,
  // Field,
  Button,
  // Dialog,
  Overlay,
  Loading,
  // Swipe,
  // SwipeItem,
  Popup,
  Sticky
} from 'vant'

Vue.use(Icon)
Vue.use(Toast)
Vue.use(Button)
Vue.use(Overlay)
Vue.use(Loading)
Vue.use(Popup)
Vue.use(Sticky)

/**
 * async component
 */
export const Dialog = () =>
  Promise.all([
    import(/* webpackChunkName: "vant-dialog" */ 'vant/es/dialog/style/less'),
    import(/* webpackChunkName: "vant-dialog" */ 'vant/es/dialog')
  ]).then(([, { default: Dialog }]) => Dialog.Component)
Vue.component('van-dialog', Dialog)

Vue.component('van-field', () =>
  Promise.all([
    import(/* webpackChunkName: "vant-field" */ 'vant/es/field/style/less'),
    import(/* webpackChunkName: "vant-field" */ 'vant/es/field')
  ]).then(([, Field]) => Field)
)
Vue.component('van-swipe', () =>
  Promise.all([
    import(/* webpackChunkName: "vant-swipe" */ 'vant/es/swipe/style/less'),
    import(/* webpackChunkName: "vant-swipe" */ 'vant/es/swipe')
  ]).then(([, Swipe]) => Swipe)
)
Vue.component('van-swipe-item', () =>
  Promise.all([
    import(
      /* webpackChunkName: "vant-swipe" */ 'vant/es/swipe-item/style/less'
    ),
    import(/* webpackChunkName: "vant-swipe" */ 'vant/es/swipe-item')
  ]).then(([, SwipeItem]) => SwipeItem)
)
