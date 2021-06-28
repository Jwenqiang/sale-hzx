/**
 * DMP-数据管理平台 JS接入介绍 https://dmp.tencent.com/helpcenter/detail/931/2983
 * 行为数据类型和构成 https://dmp.tencent.com/helpcenter/detail/932/2973
 */

const include = () => {
  !(function(g, d, t, e, v, n, s) {
    if (g.gdt) return
    v = g.gdt = function() {
      v.tk ? v.tk.apply(v, arguments) : v.queue.push(arguments)
    }
    v.sv = '1.0'
    v.bt = 0
    v.queue = []
    n = d.createElement(t)
    n.async = !0
    n.src = e
    s = d.getElementsByTagName(t)[0]
    s.parentNode.insertBefore(n, s)
  })(
    window,
    document,
    'script',
    '//qzonestyle.gtimg.cn/qzone/biz/gdt/dmp/user-action/gdtevent.min.js'
  )
}

let DMP

export const init = id => {
  if (!DMP && !window.gdt) {
    include(
      window,
      document,
      'script',
      '//qzonestyle.gtimg.cn/qzone/biz/gdt/dmp/user-action/gdtevent.min.js'
    )
  }

  DMP = window.gdt
  DMP('init', id)
  DMP('track', 'PAGE_VIEW')
  return DMP
}

/**
 * e.g. trace('PAGE_VIEW', { key: val, ... })
 * @param {String} typ   行为类型
 * @param {Object} data  行为数据
 */
export const track = (typ, data) => {
  if (!DMP) throw new Error('Please init your DMP.')
  DMP('track', typ, data)
}

/**
<script>
  !(function (g, d, t, e, v, n, s) {
    if (g.gdt) return
    v = g.gdt = function () {
      v.tk ? v.tk.apply(v, arguments) : v.queue.push(arguments)
    }
    v.sv = '1.0'
    v.bt = 0
    v.queue = []
    n = d.createElement(t)
    n.async = !0
    n.src = e
    s = d.getElementsByTagName(t)[0]
    s.parentNode.insertBefore(n, s)
  })(
    window,
    document,
    'script',
    '//qzonestyle.gtimg.cn/qzone/biz/gdt/dmp/user-action/gdtevent.min.js'
  )
  gdt('init', '1111824534')
  gdt('track', 'PAGE_VIEW')
</script>
<noscript
  ><img
    height="1"
    width="1"
    style="display: none"
    src="https://a.gdt.qq.com/pixel?user_action_set_id=1111824534&action_type=PAGE_VIEW&noscript=1"
/></noscript>
 */
