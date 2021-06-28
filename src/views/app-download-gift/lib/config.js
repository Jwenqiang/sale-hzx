import { isDebug } from '@/config'
import { run } from '@/common/gio'

export const baseURL = isDebug
  ? 'http://10.6.14.156:1000'
  : 'https://sz.centanet.com/partner/actapi'
// export const baseURL = 'https://sz.centanet.com/partner/actapi'

/**
 * 默认 APP 分享信息
 */
export const defaultAppShareObject = {
  shareTitle: '中原找房送惊喜，下载App赢万元大奖',
  shareDesc: '有机会赢iPhone12，祝好运！',
  // link: location.href,
  shareImage: 'https://sz.centanet.com/partner/house/shareImg/app0422.jpg'
}

export const channelLangMap = {
  bujihenggang: '布吉横岗区',
  bujipinghu: '布吉平湖区',
  dongbuwanqu: '东部湾区',
  liantang: '莲塘区',
  shatoujiao: '沙头角区',
  longgangzhongxinchengnan: '龙岗中心城南区',
  longgangzhongxinchengbei: '龙岗中心城北区',
  futianzhong: '福田中区',
  nanshan: '南山区',
  futiandong: '福田东区',
  futianxi: '福田西区',
  baocheng: '宝城区',
  qianhaizimaoxili: '前海自贸及西丽区',
  huizhanwanqu: '会展湾区',
  huaqiaocheng: '华侨城区',
  qianhaiwan: '前海湾区',
  bantianguanlan: '坂田观澜区',
  longhua: '龙华',
  futiannan: '福田南区',
  luohudong: '罗湖东区',
  luohunan: '罗湖南区',
  luohuxi: '罗湖西及白沙岭区',
  luohubei: '罗湖北区',
  luohuzhong: '罗湖中区',
  guanwang: '官网',
  '2ji': '二级市场'
}

/**
 * e.g.
 * trackClickMonitor.call(vm, '抽奖按钮')
 * trackClickMonitor.call(vm, '抽奖按钮', false) // 不包含渠道名
 */
export const trackClickMonitor = function(buttonName, channel) {
  const loc = []
  if (channel !== false) {
    const _channel = channel || this?.$route.query.utm_source
    loc.push(channelLangMap[_channel])
  }
  loc.push(buttonName)

  run('track', 'clickmonitor', { location: loc.join('-') })
}
