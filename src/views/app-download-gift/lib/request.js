import AxiosAsync from '@/plug/axios'
import { baseURL } from './config'

let AxiosInstance

export const getAxios = async () => {
  if (!AxiosInstance) {
    const Axios = await AxiosAsync()
    AxiosInstance = Axios.create({
      baseURL,
      timeout: 15000
    })
  }
  return AxiosInstance
}

/**
 * base request
 */
export const request = async opts => {
  const Axios = await getAxios()
  const { data: res } = await Axios(opts)
  if (!res.IsSuccess) throw new Error(res.Msg)
  return res
}

/**
 * 验证是否是同事
 * @param {String} mobile  手机号
 * @returns Promise<Boolean>  返回是否是内部员工
 */
export const CheckIsColleague = async mobile => {
  const Axios = await getAxios()
  const { data: res } = await Axios.get(
    '/api/NewDownloadPrize/CheckIsColleague',
    {
      params: { mobile }
    }
  )
  return !!res.Src
}

/**
 * 验证用户是否已注册
 * @param {String} mobile  手机号
 */
export const RegisterInfoByPhone = async mobile => {
  const res = await request({
    url: '/api/NewDownloadPrize/RegisterInfoByPhone',
    params: { mobile }
  })
  return res
}

/**
 * 发送验证码
 * @param {String} mobile  手机号
 */
export const SendSmsCodeAsync = async mobile => {
  const Axios = await getAxios()
  const { data: res } = await Axios({
    baseURL: '',
    timeout: 20000,
    url: 'https://sz.centanet.com/partner/huihan/SmsGetCode',
    params: { mobile, appName: 'xzyl' }
  })
  if (res.code !== 0) throw new Error(res.msg)
  return res
}

/**
 * 获取抽奖页面初始化数据
 * @param {String}
 */
export const GetAllPrizeUser = async () =>
  request({
    url: '/api/NewDownloadPrize/GetAllPrizeUser'
  })

/**
 * 提交参与资格
 * @param {String} mobile  手机号
 */
export const SubmitUserInfo = async (mobile, captchaCode, source) =>
  request({
    url: '/api/NewDownloadPrize/SubmitUserInfo',
    method: 'post',
    data: {
      Mobile: mobile,
      SmsCode: captchaCode,
      Source: source
    }
  })

/**
 * 获取用户抽奖条件
 * @param {String} mobile  手机号
 * @param {String} userId  用户 ID
 * @param {String} token   Token
 */
export const GetUserPermission = async (mobile, userId, token) =>
  request({
    url: '/api/NewDownloadPrize/GetUserPermission',
    params: {
      mobile,
      userId,
      token,
      r: Date.now()
    }
  })

/**
 * 抽奖
 * @param {String} mobile  手机号
 * @param {String} userId  用户 ID
 * @param {String} token   Token
 */
export const GetRandomPrize = async (mobile, userId, token) => {
  const Axios = await getAxios()
  const { data: res } = await Axios({
    method: 'post',
    url: '/api/NewDownloadPrize/GetRandomPrize',
    data: {
      Mobile: mobile,
      UserId: userId,
      Token: token
    }
  })
  return res
}

/**
 * 查询中奖信息及发货信息
 * @param {String} mobile  手机号
 * @returns
 */
export const GetPrizeAndSite = mobile =>
  request({
    url: '/api/NewDownloadPrize/GetPrizeAndSite',
    params: { mobile }
  })

/**
 * 填写收货地址
 */
export const SendAddress = params =>
  request({
    url: '/api/NewDownloadPrize/SendAddress',
    method: 'post',
    data: params
  })
