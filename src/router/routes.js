import { isApp } from '@/common/app'
import pagesConfig from '@/config/pages'

/**
 * 路由 meta 属性：
 * typ: 页面类型，0=楼盘单页
 */

const routes = [
  { path: '/', redirect: { name: 'appDownloadGift' } },

  /**
   * 楼盘单页
   */
  ...pagesConfig.map(item => ({
    name: item.key,
    path: item.path || '/' + item.key,
    meta: {
      typ: 0,
      title: item.title || item.name,
      estateId: item.estateId,
      version: item.version,
      cityName: item.cityName
    },
    component: item.component
  })),

  /**
   * 活动单页
   */
  // APP 新用户下载有礼 202104
  {
    path: '/newApp',
    name: 'appDownloadGift',
    meta: { title: '新用户下载有礼', version: '1.0.7' },
    component: () =>
      import(/* webpackChunkName: "app0" */ '@/views/app-download-gift'),

    children: [
      {
        path: 'my-prize',
        name: 'appDownloadGiftMyPrize',
        meta: { title: '我的奖品', varsRouteName: 'appDownloadGift' },
        component: () =>
          import(
            /* webpackChunkName: "app0" */ '@/views/app-download-gift/my-prize'
          ),
        beforeEnter: (to, from, next) => {
          next(isApp ? true : { name: 'appDownloadGift', replace: true })
        }
      }
    ]
  },
  {
    path: '/newAppPC',
    name: 'appDownloadGiftPC',
    meta: { title: '新人下载有礼' },
    component: () =>
      import(/* webpackChunkName: "app0-pc" */ '@/views/app-download-gift/pc')
  },

  /**
   * 20210512 腾讯推广单页 @李欣欣
   */
  {
    path: '/20210512',
    redirect: { name: '20210512-new', replace: true }
  },
  {
    path: '/20210512/new',
    name: '20210512-new',
    meta: { title: '用中原好房，安心选好房', version: '1.0.16' },
    component: () =>
      import(/* webpackChunkName: "ac3dad45-0" */ '@/views/20210512/new')
  },
  {
    path: '/20210512/secondhand',
    name: '20210512-secondhand',
    meta: { title: '用中原好房，安心选好房', version: '1.0.16' },
    component: () =>
      import(/* webpackChunkName: "ac3dad45-1" */ '@/views/20210512/secondhand')
  }
]

export default routes
