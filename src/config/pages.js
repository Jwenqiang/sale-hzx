/**
 * key: unique key
 * name: page name
 * title: page title, defualt is page name
 * path: page path, default is `/${key}`
 * version: page version
 * estateId: 楼盘 id，用于表单数据提交，每个页面不同
 */
export default [
  {
    key: 'Hdylw',
    name: '恒大悦珑湾',
    version: '1.0.8',
    estateId: '10318', // 用于表单数据提交，楼盘ID
    cityName: '中山',
    component: () => import(/* webpackChunkName: "hdylw" */ '@/views/hdylw')
  },
  {
    key: 'Ycmt',
    version: '1.0.11',
    name: '颐翠名庭',
    estateId: '202004201048130d87400f0d6e72e05e', // 用于表单数据提交，楼盘ID
    cityName: '深圳',
    component: () => import(/* webpackChunkName: "ycmt" */ '@/views/ycmt')
  },
  {
    key: 'Qlbs',
    name: '清林半山',
    version: '1.0.14',
    estateId: '20200224102209e38c464c931edebe08',
    cityName: '深圳',
    component: () => import(/* webpackChunkName: "qlbs" */ '@/views/qlbs')
  },
  {
    key: 'Jxhwc',
    name: '锦绣海湾城',
    version: '1.0.12',
    estateId: '10160',
    cityName: '中山',
    component: () => import(/* webpackChunkName: "jxhwc" */ '@/views/jxhwc')
  },
  {
    key: 'Xhsj',
    name: '星河盛境',
    version: '1.0.9',
    estateId: '2021031210363737a33ac6d5c44bf79a',
    cityName: '深圳',
    component: () => import(/* webpackChunkName: "xhsj" */ '@/views/xhsj')
  },
  {
    key: 'Blth',
    name: '保利天汇',
    version: '1.0.7',
    estateId: '10317',
    cityName: '中山',
    component: () => import(/* webpackChunkName: "blth" */ '@/views/blth')
  },
  {
    // 4006622712,1030
    // 工号：125620
    key: 'Hcmy',
    name: '汇城茗院',
    version: '1.0.3',
    estateId: '10396',
    cityName: '深圳',
    component: () => import(/* webpackChunkName: "hcmy" */ '@/views/hcmy')
  },
  {
    key: 'Wkddh',
    name: '万科大都会',
    version: '1.0.4',
    estateId: '10524',
    cityName: '深圳',
    component: () => import(/* webpackChunkName: "wkddh" */ '@/views/wkddh')
  },
  {
    key: 'Xhtd3',
    name: '星河天地三期',
    version: '1.0.3',
    estateId: '10652',
    cityName: '深圳',
    component: () => import(/* webpackChunkName: "xhtd3" */ '@/views/xhtd3')
  },

  {
    key: 'Wkdhsjhy',
    name: '万科都会四季花园',
    version: '1.0.3',
    estateId: '20210331103957478C1DEB852966CABB',
    cityName: '深圳',
    component: () => import(/* webpackChunkName: "wkdhsjhy" */ '@/views/wkdhsjhy')
  },

  /**
   * 信达泰禾金尊府(信达金尊府)
   * https://sz.centanet.com/xinfang/lp-20190308112231f897d4becc3bf0fa04/
   */
  {
    key: 'Xdthjzf',
    name: '信达金尊府',
    version: '1.0.3',
    estateId: '20190308112231f897d4becc3bf0fa04',
    cityName: '深圳',
    component: () =>
      import(/* webpackChunkName: "xdthjzf" */ '@/views/xdthjzf')
  }
]
