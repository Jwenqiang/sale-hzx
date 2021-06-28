import AxiosAsync from '@/plug/axios'

let Axios

/**
 * 进线
 * @param {Object} options  提交数据
 */
export const incoming = async opts => {
  if (!Axios) {
    Axios = await AxiosAsync()
  }

  const { data: res } = await Axios.post(
    'https://sz.centanet.com/partner/huihansubmit/api/EstateActAllShenZhen/PostCustomerData',
    opts
  )

  return res
}
